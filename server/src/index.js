import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import Tesseract from "tesseract.js";
import dotenv from "dotenv";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://document-summary-assistant-drab.vercel.app",
    ],
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  })
);

app.use(express.json());

const upload = multer({ dest: "uploads/" });

/
app.get("/", (req, res) => {
  res.send(" Document Summary Assistant Backend Running!");
});

app.post("/api/extract", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    let extractedText = "";

    if (mimeType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;

    } else if (mimeType.startsWith("image/")) {
      const result = await Tesseract.recognize(filePath, "eng");
      extractedText = result.data.text;

    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    fs.unlinkSync(filePath); // cleanup temp file
    res.json({ text: extractedText });

  } catch (error) {
    console.error("❌ Extraction error:", error);
    res.status(500).json({ error: "Text extraction failed" });
  }
});


app.post("/api/summarize", async (req, res) => {
  try {
    const { text, length } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: "Text is too short to summarize." });
    }

    const { pipeline } = await import("@xenova/transformers");
    const summarizer = await pipeline("summarization", "facebook/bart-large-cnn");

    let maxLen, minLen;
    if (length === "short") {
      minLen = 50;
      maxLen = 100;
    } else if (length === "medium") {
      minLen = 120;
      maxLen = 250;
    } else {
      minLen = 250;
      maxLen = 500;
    }

    const result = await summarizer(text, {
      min_length: minLen,
      max_length: maxLen,
      no_repeat_ngram_size: 3,
    });

    res.json({ summary: result[0].summary_text });

  } catch (error) {
    console.error("❌ Summary generation error:", error);
    return res.status(500).json({ error: "Summarization failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
