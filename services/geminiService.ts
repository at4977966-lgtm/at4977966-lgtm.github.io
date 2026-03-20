import { GoogleGenAI } from "@google/genai";
import { Player } from "../types";

const processEnvApiKey = process.env.API_KEY;

/**
 * Analyzes a player's telemetry data to determine cheat risk using Gemini.
 */
export const analyzePlayerRisk = async (player: Player): Promise<{ riskScore: number; analysis: string }> => {
  if (!processEnvApiKey) {
    console.warn("API Key missing for Gemini Service");
    return { 
      riskScore: 0, 
      analysis: "API Key is missing. Unable to perform AI analysis. Please configure your environment." 
    };
  }

  const ai = new GoogleGenAI({ apiKey: processEnvApiKey });

  const prompt = `
    Analyze the following Free Fire player telemetry for potential cheating behavior.
    
    Player Data:
    - Name: ${player.name}
    - K/D Ratio: ${player.kdRatio}
    - Headshot Rate: ${player.headshotRate}%
    - Average Ping: ${player.ping}ms
    - User Reports: ${player.reports}
    - Status: ${player.status}
    
    Context:
    - High headshot rates (>80%) combined with high K/D are suspicious.
    - User reports indicate manual flagging.
    - Low ping variance with high reaction time implies macro usage? (Just a theory for the AI to consider).

    Provide a short, professional "Anti-Cheat System Log" style response.
    Output format should be plain text, concise.
    Start with "RISK ASSESSMENT: [LOW/MEDIUM/HIGH/CRITICAL]".
    Then provide a 1-sentence reason.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text || "";
    // Simple heuristic to extract a score for demo purposes based on text analysis
    let score = 10;
    if (text.includes("MEDIUM")) score = 45;
    if (text.includes("HIGH")) score = 85;
    if (text.includes("CRITICAL")) score = 99;

    return {
      riskScore: score,
      analysis: text
    };
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return {
      riskScore: 0,
      analysis: "AI Service unavailable. Could not verify player integrity."
    };
  }
};