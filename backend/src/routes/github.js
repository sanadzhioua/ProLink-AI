const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const axios = require('axios');

router.post('/audit', async (req, res) => {
    const { username } = req.body;

    try {
        // 1. Fetch GitHub Data (Public API)
        const userRes = await axios.get(`https://api.github.com/users/${username}`);
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);

        // 2. Prepare Data for AI
        const repos = reposRes.data.map(r => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count
        }));

        const prompt = `
      Act as a Senior Tech Recruiter and Engineering Manager.
      Perform a "GitHub Analysis" on this profile:
      User: ${username}
      Bio: ${userRes.data.bio}
      Top Repos: ${JSON.stringify(repos)}

      Evaluate:
      1. Quality of repositories and READMEs.
      2. consistency of technical skills with a typical senior profile.
      3. Strengths and weaknesses.
      4. Improvements for project presentation.

      Provide a JSON response with:
      1. "score": number 0-100.
      2. "markdown_report": A structured markdown report.
         - Header: "## GitHub Analysis"
         - Subheaders for "Repository Quality", "Skill Consistency", "Recommendations".
         - Bullet points for actionable advice.
      3. "portfolio_md": A ready-to-use markdown snippet for a personal README.md profile page (this is separate from the report).
      4. "top_skills": array of strings (detected languages/tech).
    `;

        const result = await aiService.generateJSON(prompt);
        res.json(result);

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'GitHub user not found' });
        }
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
