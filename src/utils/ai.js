import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const promptAi = async () => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Why is the sky blue?",
  });
  console.log(response.text);
};


export default promptAi;