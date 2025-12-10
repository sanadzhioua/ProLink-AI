const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

router.post('/optimize-about', async (req, res) => {
    const { currentAbout, jobTitle } = req.body;
    try {
        const prompt = `
      Act as a LinkedIn Personal Branding Expert.
      Perform a "LinkedIn Analysis" validation and optimization.
      
      Current About/Profile Content:
      "${currentAbout}"
      
      Target Job Title: "${jobTitle || 'General Professional'}"

      Review:
      1. Tone, clarity, and professionalism.
      2. Gaps or missing information.
      3. SEO Keywords and recruiter visibility.
      4. Engagement strategies.

      Provide a JSON response with:
      1. "markdown_report": A structured markdown report.
         - Header: "## LinkedIn Analysis"
         - Bullet points for "Gap Analysis", "Keyword Strategy", "Engagement Tips".
      2. "optimized_about": A rewritten, highly professional 'About' section.
      3. "post_suggestions": Array of 3 engaging LinkedIn post ideas to boost visibility.
    `;

        const result = await aiService.generateJSON(prompt);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// NEW: Analyze via URL
const puppeteer = require('puppeteer');

router.post('/analyze', async (req, res) => {
    const { linkedinUrl } = req.body;
    console.log(`Analyzing LinkedIn URL: ${linkedinUrl}`);

    try {
        let profileText = "";

        // Launch Puppeteer to scrape (Best Effort)
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US']
        });
        const page = await browser.newPage();

        // Set User Agent to avoid immediate blocking
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

        try {
            await page.goto(linkedinUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

            // Extract visible text from the body
            profileText = await page.evaluate(() => document.body.innerText);

            // Check if we hit auth wall (simple check)
            if (profileText.includes("Sign in") || profileText.includes("Join LinkedIn")) {
                console.warn("Hit LinkedIn Auth Wall. Using limited text.");
            }
        } catch (err) {
            console.error("Puppeteer navigation failed:", err);
            // Fallback: If navigation fails, we might just use the URL itself or partial info
            profileText = `Unable to scrape full content from ${linkedinUrl}. Please analyze based on standard professional practices for a user with this profile link.`;
        } finally {
            await browser.close();
        }

        // Send to AI
        const prompt = `
          Act as a Senior Career Coach.
          The user provided their LinkedIn URL: ${linkedinUrl}
          
          We attempted to scrape their profile content and got:
          """
          ${profileText.substring(0, 8000)}
          """
          
          Based on this scraped content (which might be limited due to privacy settings) OR general best practices if content is sparse:
          1. Analyze the profile strength.
          2. Provide specific recommendations to improve visibility.
          3. Suggest a professional summary/About section if one is missing or weak.
          4. Give 3 post ideas relevant to the implied industry.

          Provide JSON:
          {
            "markdown_report": "Detailed markdown analysis...",
            "optimized_about": "Draft for a new About section...",
            "post_suggestions": ["Post Idea 1", "Post Idea 2", "Post Idea 3"]
          }
        `;

        const result = await aiService.generateJSON(prompt);
        res.json(result);

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "Failed to analyze LinkedIn profile. Please try pasting the text manually." });
    }
});

module.exports = router;
