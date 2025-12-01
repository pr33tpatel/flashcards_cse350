require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json());

app.set("trust proxy", 1); // Trust first proxy for rate limiting

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});

app.get("/api/generate", async (req, res) => {
  res.status(200).json({ status: "awake", message: "server is ready" });
});

app.post("/api/generate", limiter, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // 1. Select the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are an AI study assistant. 
      Analyze the following notes and generate a study summary and a quiz.
      
      The output MUST be a valid JSON object with this exact structure:
      {
        "summary": ["point 1", "point 2", "point 3", "point 4", "point 5"],
        "quiz": [
          {
            "id": 1,
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct": 0  // Index of the correct option (0-3)
          }
        ]
      }
      
      Generate 5 summary points and 4 quiz questions.
      Do not include markdown formatting (like \`\`\`json). Just the raw JSON object.

      NOTES TO ANALYZE:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textData = response.text();

    // Clean and Parse JSON
    // Sometimes AI adds markdown backticks, we clean them just in case
    const cleanedText = textData
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const jsonResponse = JSON.parse(cleanedText);

    res.json(jsonResponse);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
