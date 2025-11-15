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

app.use(cors());

app.use(express.json());

const upload = multer({ dest: "uploads/" });

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
    fs.unlinkSync(filePath);
    res.json({ text: extractedText });
  } catch (error) {
    console.error(" Extraction error:", error);
    res.status(500).json({ error: "Text extraction failed" });
  }
});
app.post("/api/summarize", async (req, res) => {
  console.log("📩 Summarize API Hit");
  try {
    const { text, length } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: "Text is too short to summarize." });
    }

    // Split into sentences
    let sentences = text.split(/(?<=[.!?])\s+/);

    // Choose summary length
    let summaryCount =
      length === "short" ? 3 :
      length === "medium" ? 5 :
      8;

    const summary = sentences.slice(0, summaryCount).join(" ");

    return res.json({ summary });
  } catch (error) {
    console.error("Summarize error:", error);
    res.status(500).json({ error: "Summarization failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
