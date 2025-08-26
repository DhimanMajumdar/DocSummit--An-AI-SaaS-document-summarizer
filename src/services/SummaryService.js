import axios from "axios";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function generateSummary(
  text,
  { mode = "short", title = "" } = {}
) {
  const maxChars = 25000;
  if (text.length > maxChars)
    text = text.slice(0, maxChars) + "\n\n[TRUNCATED]";

  const lengthInstruction =
    mode === "short"
      ? "in 3 sentences"
      : mode === "medium"
      ? "in 5-7 sentences"
      : "in 10-12 sentences";

  const prompt = `You are an assistant that writes concise summaries.
Title: ${title}
Summarize the following document ${lengthInstruction}.
Highlight key points and main ideas. Use bullet points if helpful.

${text}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const resp = await axios.post(
      `${GEMINI_ENDPOINT}?key=${GEMINI_KEY}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.data?.candidates?.length > 0) {
      return resp.data.candidates[0].content.parts[0].text;
    }
    return "No summary generated.";
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    throw err;
  }
}

export async function generateSuggestion(text) {
  const prompt = `You are an assistant that gives improvement suggestions.
  Suggestions should be just 4 in number, should be one liner and short as much as possible.
Read the following document and suggest how to improve clarity, readability, and structure:

${text}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const resp = await axios.post(
      `${GEMINI_ENDPOINT}?key=${GEMINI_KEY}`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.data?.candidates?.length > 0) {
      return resp.data.candidates[0].content.parts[0].text;
    }
    return "No suggestions generated.";
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    throw err;
  }
}
