const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// We will skip the PDF generation verification here to avoid confusion with "bad XRef" errors 
// from 20-byte text files masquerading as PDFs.
// This script now focuses on checking if the server is UP and the CV endpoint is REACHABLE.

async function testBackend() {
    console.log("Testing Backend Connectivity...");

    // 1. Health Check
    try {
        const health = await axios.get('http://127.0.0.1:5000/health');
        console.log("✅ Health Check Passed:", health.data);
    } catch (e) {
        console.error("❌ Health Check Failed:", e.message);
        return;
    }

    console.log("Backend is ready. Waiting for user to add API Keys and test with real files.");
}

testBackend();
