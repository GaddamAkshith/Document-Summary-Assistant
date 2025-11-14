export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const backendResponse = await fetch(
      "https://document-summary-assistant-camd.onrender.com/api/extract",
      {
        method: "POST",
        headers: {
          // We forward form-data directly as-is
        },
        body: req.body,
      }
    );

    const data = await backendResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("PROXY ERROR extract:", error);
    return res.status(500).json({ error: "Proxy request failed" });
  }
}
