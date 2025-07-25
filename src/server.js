require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins for demo; restrict in production

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

app.get('/api/apps', async (req, res) => {
  try {
    // Build filterByFormula from query params
    const { gdpr, offline, mobile, category } = req.query;
    const conditions = [];
    if (gdpr === 'true') conditions.push(`{GDPR Compliant} = 1`);
    if (offline === 'true') conditions.push(`{Offline Functionality} = 1`);
    if (mobile === 'true') conditions.push(`{Mobile Optimization} = 1`);
    if (category) conditions.push(`{Primary Category} = '${category}'`);
    const filterByFormula = conditions.length ? `AND(${conditions.join(',')})` : '';

    const params = {};
    if (filterByFormula) params.filterByFormula = filterByFormula;

    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
      params,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
