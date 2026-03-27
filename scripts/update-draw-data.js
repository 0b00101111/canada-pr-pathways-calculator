#!/usr/bin/env node
// Fetches latest Express Entry draw data from IRCC and updates draw-data.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const IRCC_JSON_URL = 'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_4_en.json';
const DRAW_DATA_PATH = path.join(__dirname, '..', 'js', 'draw-data.js');
const INDEX_HTML_PATH = path.join(__dirname, '..', 'index.html');

// Map IRCC drawName to our simplified draw types
function mapDrawType(drawName) {
    const name = drawName.toLowerCase();
    if (name.includes('french')) return 'French Language';
    if (name.includes('provincial') || name.includes('pnp')) return 'PNP';
    if (name.includes('canadian experience')) return 'CEC';
    if (name.includes('physician')) return 'Physicians';
    if (name.includes('senior manager')) return 'Senior Managers';
    if (name.includes('healthcare') || name.includes('social services')) return 'Healthcare';
    if (name.includes('trade')) return 'Trade';
    if (name.includes('education')) return 'Education';
    if (name.includes('stem') || name.includes('science') || name.includes('technology') || name.includes('engineering') || name.includes('math')) return 'STEM';
    if (name.includes('transport')) return 'Transport';
    if (name.includes('agriculture')) return 'Agriculture';
    if (name.includes('researcher')) return 'Researchers';
    if (name.includes('military')) return 'Military';
    if (name.includes('no program specified') || name.includes('general')) return 'General';
    // Fallback: return the original name trimmed
    return drawName.trim();
}

// Parse IRCC date string like "March 18, 2026" to "2026-03-18"
function parseDate(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Parse CRS score string like "393" or "1,234"
function parseCRS(crsStr) {
    return parseInt(String(crsStr).replace(/,/g, ''), 10);
}

// Read existing draw dates from draw-data.js
function getExistingDates() {
    const content = fs.readFileSync(DRAW_DATA_PATH, 'utf-8');
    const dates = new Set();
    const regex = /date:\s*"(\d{4}-\d{2}-\d{2})"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        dates.add(match[1]);
    }
    return dates;
}

// Fetch JSON from URL
function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchJSON(res.headers.location).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

async function main() {
    console.log('Fetching latest draw data from IRCC...');
    const json = await fetchJSON(IRCC_JSON_URL);

    // The JSON structure is { rounds: { r405: {...}, r404: {...}, ... } }
    const roundsObj = json.rounds;
    if (!roundsObj || typeof roundsObj !== 'object') {
        console.error('Unexpected JSON structure. Top-level keys:', Object.keys(json));
        process.exit(1);
    }
    const rounds = Object.values(roundsObj);

    console.log(`Found ${rounds.length} draws from IRCC.`);

    const existingDates = getExistingDates();
    console.log(`Existing draw-data.js has ${existingDates.size} draws.`);

    // Find new draws
    const newDraws = [];
    for (const round of rounds) {
        const date = parseDate(round.drawDateFull);
        const crs = parseCRS(round.drawCRS);
        const drawType = mapDrawType(round.drawName || round.drawText2 || '');

        if (!date || isNaN(crs)) continue;
        if (existingDates.has(date)) continue;

        newDraws.push({ date, crsScore: crs, drawType });
    }

    if (newDraws.length === 0) {
        console.log('No new draws found. Data is up to date.');
        process.exit(0);
    }

    // Sort new draws by date
    newDraws.sort((a, b) => a.date.localeCompare(b.date));
    console.log(`Found ${newDraws.length} new draw(s):`);
    newDraws.forEach(d => console.log(`  ${d.date} - ${d.drawType} - CRS ${d.crsScore}`));

    // Read current file and insert new draws before the closing "];"
    let content = fs.readFileSync(DRAW_DATA_PATH, 'utf-8');
    const newEntries = newDraws.map(d =>
        `    { date: "${d.date}", crsScore: ${d.crsScore}, drawType: "${d.drawType}" }`
    ).join(',\n');

    // Replace the closing "];" with new entries + "];"
    content = content.replace(/\n\];/, `,\n${newEntries}\n];`);
    fs.writeFileSync(DRAW_DATA_PATH, content, 'utf-8');
    console.log('Updated draw-data.js.');

    // Update verification date in index.html
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    let html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
    html = html.replace(
        /\(Last policy verification: [^)]+\)/,
        `(Last policy verification: ${dateStr})`
    );
    fs.writeFileSync(INDEX_HTML_PATH, html, 'utf-8');
    console.log(`Updated verification date to ${dateStr}.`);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
