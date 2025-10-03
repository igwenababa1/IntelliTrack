import { GoogleGenAI } from "@google/genai";
import type { TrackingEvent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getTrackingSummary = async (trackingHistory: TrackingEvent[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found. Returning mock summary.");
    const latestStatus = trackingHistory[trackingHistory.length - 1];
    return `Your package is currently in ${latestStatus.location} and its status is: ${latestStatus.status}.`;
  }
  
  const historyText = trackingHistory.map(e => `${e.date} ${e.time}: ${e.status} at ${e.location}. Description: ${e.description}`).join('\n');

  const prompt = `
    You are a helpful and friendly shipping assistant. Based on the following package tracking history, provide a descriptive, multi-sentence summary for the customer.
    The summary should be easy to understand and give a clear picture of the package's current situation. Mention the most recent location and status, and if possible, add context about its journey or what to expect next. Aim for a friendly and reassuring tone.

    For example: "Good news! Your package is out for delivery in New York and is expected to arrive today. It traveled all the way from San Francisco and is now on the final leg of its journey."

    Tracking History:
    ${historyText}

    Summary:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching summary from Gemini API:", error);
    // Fallback to a simpler summary if the API fails
    const latestStatus = trackingHistory[trackingHistory.length - 1];
    return `The latest update shows your package is "${latestStatus.status}" in ${latestStatus.location}.`;
  }
};