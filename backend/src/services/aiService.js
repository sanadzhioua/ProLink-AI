const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

class AIService {
    constructor() {
        console.log("-----------------------------------------");
        console.log("Initializing AI Service...");
        console.log("PREFERRED_AI:", process.env.PREFERRED_AI);

        // Initialize OpenAI
        if (process.env.OPENAI_API_KEY) {
            console.log("✅ OpenAI Key loaded");
            this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        } else {
            console.log("⚠️  OpenAI Key NOT found");
        }

        // Initialize Gemini
        if (process.env.GEMINI_API_KEY) {
            const key = process.env.GEMINI_API_KEY;
            console.log("✅ Gemini Key loaded. Starts with:", key ? key.substring(0, 8) + "..." : "EMPTY");
            // Using gemini-1.5-flash via REST API, so we just check the key here
            this.gemini = true; // Flag to enable Gemini usage
        } else {
            console.log("⚠️  Gemini Key NOT found");
        }
        console.log("-----------------------------------------");
    }

    async generate(prompt) {
        let error = null;

        // Try OpenAI First (if preferred/available)
        if (this.openai && process.env.PREFERRED_AI !== 'GEMINI') {
            try {
                console.log("Attempting OpenAI...");
                const response = await this.openai.chat.completions.create({
                    model: "gpt-4",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                });
                return response.choices[0].message.content;
            } catch (err) {
                console.error("OpenAI Failed:", err.message);
                error = err;
                // Fallthrough to Gemini
            }
        }

        // Try Gemini (as primary or fallback)
        if (this.gemini) {
            try {
                console.log("Attempting Gemini (REST API)...");
                const apiKey = process.env.GEMINI_API_KEY;
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

                const response = await axios.post(url, {
                    contents: [{
                        parts: [{ text: prompt }]
                    }]
                });

                if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                    return response.data.candidates[0].content.parts[0].text;
                }
                throw new Error("No candidates returned from Gemini");

            } catch (err) {
                console.error("Gemini Failed:", err.response ? JSON.stringify(err.response.data) : err.message);
                error = err;
            }
        }

        throw new Error("All AI services failed or are not configured. " + (error ? error.message : ""));
    }

    async generateJSON(prompt) {
        const jsonPrompt = `${prompt}\n\nIMPORTANT: Respond ONLY with valid JSON. Do not use markdown blocks.`;
        const result = await this.generate(jsonPrompt);
        try {
            // Clean markdown code blocks if present
            const cleanResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanResult);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error("Failed to parse AI response as JSON");
        }
    }
}

module.exports = new AIService();
