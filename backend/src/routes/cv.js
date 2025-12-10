const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
console.log("PDF PARSE IMPORT:", pdf, typeof pdf);
const mammoth = require('mammoth');
const aiService = require('../services/aiService');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// EXTRACT TEXT FROM FILE
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        let extractedText = '';

        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        } else if (req.file.mimetype.includes('wordprocessingml')) {
            const result = await mammoth.extractRawText({ path: filePath });
            extractedText = result.value;
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }

        // Cleanup file
        // fs.unlinkSync(filePath); 

        res.json({ text: extractedText, filePath: filePath });
    } catch (error) {
        console.error("Extraction ERROR:", error);
        res.status(500).json({ error: `Extraction failed: ${error.message}` });
    }
});

// OPTIMIZE CV
router.post('/optimize', async (req, res) => {
    const { cvText, jobDescription } = req.body;

    try {
        const prompt = `
      Act as an expert Career Coach and Resume Writer.
      Analyze the following CV text:
      "${cvText.substring(0, 10000)}"
      
      ${jobDescription ? `Against this Job Description: "${jobDescription.substring(0, 2000)}"` : ''}

      Perform a deep analysis focusing on:
      1. Sructure, format, and readability.
      2. Grammar and spelling issues.
      3. ATS compatibility and keyword optimization.
      4. Missing or weak sections.
      5. Impact of skills and experience presentation.

      Provide a JSON response with:
      1. "score": number 0-100 (ATS Score).
      2. "markdown_report": A structured report in markdown format. 
         - Use "## CV Analysis" as the main header.
         - Use "### [Section Name]" for sub-sections.
         - Include actionable advice in bullet points.
         - Highlight strengths and weaknesses clearly.
         - Maintain a professional tone.
      3. "summary": A brief professional summary of the candidate (max 3 lines).
    `;

        const result = await aiService.generateJSON(prompt);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
