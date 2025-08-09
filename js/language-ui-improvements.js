// language-ui-improvements.js
// Improved language input UI with clear IELTS/CLB mapping

const LanguageUIModule = {
    // IELTS to CLB conversion tables
    conversions: {
        ielts: {
            listening: {
                '8.5-9.0': 10,
                '8.0': 9,
                '7.5': 8,
                '6.0-7.0': 7,
                '5.5': 6,
                '5.0': 5,
                '4.5': 4
            },
            speaking: {
                '7.5-9.0': 10,
                '7.0': 9,
                '6.5': 8,
                '6.0': 7,
                '5.5': 6,
                '5.0': 5,
                '4.0': 4
            },
            reading: {
                '8.0-9.0': 10,
                '7.0-7.5': 9,
                '6.5': 8,
                '6.0': 7,
                '5.0-5.5': 6,
                '4.0-4.5': 5,
                '3.5': 4
            },
            writing: {
                '7.5-9.0': 10,
                '7.0': 9,
                '6.5': 8,
                '6.0': 7,
                '5.5': 6,
                '5.0': 5,
                '4.0-4.5': 4
            }
        },
        celpip: {
            all: {
                '10-12': 10,
                '9': 9,
                '8': 8,
                '7': 7,
                '6': 6,
                '5': 5,
                '4': 4
            }
        }
    },

    // Generate improved language input HTML
    getImprovedLanguageInputHTML: function() {
        return `
            <div class="form-section">
                <h3>🗣️ Language Skills</h3>
                
                <!-- Important Note -->
                <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 0.95em;">
                        <strong>⚠️ Important:</strong> CRS scoring evaluates each language ability (Listening, Speaking, Reading, Writing) separately. 
                        To get maximum transferability points, you need CLB 9+ in ALL four abilities.
                    </p>
                </div>
                
                <!-- English Proficiency -->
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #4a5568; margin-bottom: 15px;">English Proficiency</h4>
                    
                    <!-- Test Type Selection -->
                    <div class="form-group">
                        <label>Which test did/will you take?</label>
                        <select id="english_test_type" onchange="LanguageUIModule.updateEnglishInputs()">
                            <option value="clb">Quick Estimate (Haven't taken test yet)</option>
                            <option value="ielts">IELTS General Training</option>
                            <option value="celpip">CELPIP General</option>
                        </select>
                    </div>
                    
                    <!-- CLB Direct Input (Default) -->
                    <div id="english_clb_inputs" class="language-input-section">
                        <!-- Warning for simplified input -->
                        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
                            <p style="margin: 0 0 8px 0; color: #92400e; font-weight: 600;">
                                ⚠️ Quick Estimate Mode
                            </p>
                            <p style="margin: 0; color: #92400e; font-size: 0.9em;">
                                This assumes the same CLB level for all four abilities (Listening, Speaking, Reading, Writing). 
                                In reality, most people have different scores for each ability.
                            </p>
                            <p style="margin: 8px 0 0 0; color: #92400e; font-size: 0.9em;">
                                <strong>For accurate calculation:</strong> Take a practice test and use the IELTS/CELPIP option above.
                            </p>
                        </div>
                        
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Target CLB Level (applies to all abilities)</label>
                                <select id="english_clb_min">
                                    <option value="0">No test / Below CLB 4</option>
                                    <option value="4">CLB 4 (Minimum for Express Entry)</option>
                                    <option value="5">CLB 5</option>
                                    <option value="6">CLB 6</option>
                                    <option value="7">CLB 7 (Good - IELTS 6.0 equivalent)</option>
                                    <option value="8">CLB 8</option>
                                    <option value="9" selected>CLB 9 (Recommended - IELTS 7.0 equivalent)</option>
                                    <option value="10">CLB 10 (Excellent - IELTS 7.5-8.5 equivalent)</option>
                                </select>
                                <small style="color: #6b7280;">
                                    💡 Tip: CLB 9 in all abilities unlocks maximum transferability points
                                </small>
                            </div>
                        </div>
                        
                        <!-- CLB Reference Guide -->
                        <div style="background: #e0f2fe; border-radius: 8px; padding: 15px; margin-top: 20px;">
                            <strong style="color: #1e40af;">Quick Reference:</strong>
                            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #1e40af; font-size: 0.9em;">
                                <li><strong>CLB 7</strong> ≈ IELTS 6.0 / CELPIP 7 (Minimum competitive)</li>
                                <li><strong>CLB 8</strong> ≈ IELTS 6.5 / CELPIP 8 (Good)</li>
                                <li><strong>CLB 9</strong> ≈ IELTS 7.0 / CELPIP 9 (Recommended for max points)</li>
                                <li><strong>CLB 10</strong> ≈ IELTS 7.5-8.5 / CELPIP 10+ (Excellent)</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- IELTS Inputs -->
                    <div id="english_ielts_inputs" class="language-input-section" style="display: none;">
                        <div class="form-grid" style="grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div class="form-group">
                                <label>Listening</label>
                                <select id="ielts_listening" onchange="LanguageUIModule.calculateCLBFromIELTS()">
                                    <option value="8.5">8.5-9.0 → CLB 10</option>
                                    <option value="8.0">8.0 → CLB 9</option>
                                    <option value="7.5">7.5 → CLB 8</option>
                                    <option value="7.0">6.0-7.0 → CLB 7</option>
                                    <option value="5.5">5.5 → CLB 6</option>
                                    <option value="5.0">5.0 → CLB 5</option>
                                    <option value="4.5">4.5 → CLB 4</option>
                                    <option value="0">Below 4.5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Speaking</label>
                                <select id="ielts_speaking" onchange="LanguageUIModule.calculateCLBFromIELTS()">
                                    <option value="7.5">7.5-9.0 → CLB 10</option>
                                    <option value="7.0">7.0 → CLB 9</option>
                                    <option value="6.5">6.5 → CLB 8</option>
                                    <option value="6.0">6.0 → CLB 7</option>
                                    <option value="5.5">5.5 → CLB 6</option>
                                    <option value="5.0">5.0 → CLB 5</option>
                                    <option value="4.0">4.0 → CLB 4</option>
                                    <option value="0">Below 4.0</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Reading</label>
                                <select id="ielts_reading" onchange="LanguageUIModule.calculateCLBFromIELTS()">
                                    <option value="8.0">8.0-9.0 → CLB 10</option>
                                    <option value="7.0">7.0-7.5 → CLB 9</option>
                                    <option value="6.5">6.5 → CLB 8</option>
                                    <option value="6.0">6.0 → CLB 7</option>
                                    <option value="5.0">5.0-5.5 → CLB 6</option>
                                    <option value="4.0">4.0-4.5 → CLB 5</option>
                                    <option value="3.5">3.5 → CLB 4</option>
                                    <option value="0">Below 3.5</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Writing</label>
                                <select id="ielts_writing" onchange="LanguageUIModule.calculateCLBFromIELTS()">
                                    <option value="7.5">7.5-9.0 → CLB 10</option>
                                    <option value="7.0">7.0 → CLB 9</option>
                                    <option value="6.5">6.5 → CLB 8</option>
                                    <option value="6.0">6.0 → CLB 7</option>
                                    <option value="5.5">5.5 → CLB 6</option>
                                    <option value="5.0">5.0 → CLB 5</option>
                                    <option value="4.0">4.0-4.5 → CLB 4</option>
                                    <option value="0">Below 4.0</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- CLB Summary -->
                        <div id="ielts_clb_summary" style="background: #e0f2fe; border-radius: 8px; padding: 15px; margin-top: 15px;">
                            <strong>Your CLB Levels:</strong>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px;">
                                <div>L: <span id="clb_listening">-</span></div>
                                <div>S: <span id="clb_speaking">-</span></div>
                                <div>R: <span id="clb_reading">-</span></div>
                                <div>W: <span id="clb_writing">-</span></div>
                            </div>
                            <div style="margin-top: 10px;">
                                <strong>Minimum CLB: <span id="clb_minimum" style="color: #dc2626;">-</span></strong>
                                <small style="display: block; margin-top: 5px; color: #6b7280;">
                                    (Used for transferability calculations)
                                </small>
                            </div>
                        </div>
                    </div>
                    
                    <!-- CELPIP Inputs -->
                    <div id="english_celpip_inputs" class="language-input-section" style="display: none;">
                        <div class="form-grid" style="grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div class="form-group">
                                <label>Listening</label>
                                <select id="celpip_listening" onchange="LanguageUIModule.calculateCLBFromCELPIP()">
                                    <option value="10">10-12 → CLB 10</option>
                                    <option value="9">9 → CLB 9</option>
                                    <option value="8">8 → CLB 8</option>
                                    <option value="7">7 → CLB 7</option>
                                    <option value="6">6 → CLB 6</option>
                                    <option value="5">5 → CLB 5</option>
                                    <option value="4">4 → CLB 4</option>
                                    <option value="0">Below 4</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Speaking</label>
                                <select id="celpip_speaking" onchange="LanguageUIModule.calculateCLBFromCELPIP()">
                                    <option value="10">10-12 → CLB 10</option>
                                    <option value="9">9 → CLB 9</option>
                                    <option value="8">8 → CLB 8</option>
                                    <option value="7">7 → CLB 7</option>
                                    <option value="6">6 → CLB 6</option>
                                    <option value="5">5 → CLB 5</option>
                                    <option value="4">4 → CLB 4</option>
                                    <option value="0">Below 4</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Reading</label>
                                <select id="celpip_reading" onchange="LanguageUIModule.calculateCLBFromCELPIP()">
                                    <option value="10">10-12 → CLB 10</option>
                                    <option value="9">9 → CLB 9</option>
                                    <option value="8">8 → CLB 8</option>
                                    <option value="7">7 → CLB 7</option>
                                    <option value="6">6 → CLB 6</option>
                                    <option value="5">5 → CLB 5</option>
                                    <option value="4">4 → CLB 4</option>
                                    <option value="0">Below 4</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Writing</label>
                                <select id="celpip_writing" onchange="LanguageUIModule.calculateCLBFromCELPIP()">
                                    <option value="10">10-12 → CLB 10</option>
                                    <option value="9">9 → CLB 9</option>
                                    <option value="8">8 → CLB 8</option>
                                    <option value="7">7 → CLB 7</option>
                                    <option value="6">6 → CLB 6</option>
                                    <option value="5">5 → CLB 5</option>
                                    <option value="4">4 → CLB 4</option>
                                    <option value="0">Below 4</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- CLB Summary -->
                        <div id="celpip_clb_summary" style="background: #e0f2fe; border-radius: 8px; padding: 15px; margin-top: 15px;">
                            <strong>Your CLB Levels:</strong>
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px;">
                                <div>L: <span id="celpip_clb_listening">-</span></div>
                                <div>S: <span id="celpip_clb_speaking">-</span></div>
                                <div>R: <span id="celpip_clb_reading">-</span></div>
                                <div>W: <span id="celpip_clb_writing">-</span></div>
                            </div>
                            <div style="margin-top: 10px;">
                                <strong>Minimum CLB: <span id="celpip_clb_minimum" style="color: #dc2626;">-</span></strong>
                                <small style="display: block; margin-top: 5px; color: #6b7280;">
                                    (Used for transferability calculations)
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- French section can be added similarly -->
            </div>
        `;
    },

    // Update English input display based on test type
    updateEnglishInputs: function() {
        const testType = document.getElementById('english_test_type').value;
        
        // Hide all sections
        document.getElementById('english_clb_inputs').style.display = 'none';
        document.getElementById('english_ielts_inputs').style.display = 'none';
        document.getElementById('english_celpip_inputs').style.display = 'none';
        
        // Show selected section
        if (testType === 'clb') {
            document.getElementById('english_clb_inputs').style.display = 'block';
        } else if (testType === 'ielts') {
            document.getElementById('english_ielts_inputs').style.display = 'block';
            this.calculateCLBFromIELTS();
        } else if (testType === 'celpip') {
            document.getElementById('english_celpip_inputs').style.display = 'block';
            this.calculateCLBFromCELPIP();
        }
    },

    // Calculate CLB from IELTS scores
    calculateCLBFromIELTS: function() {
        const scores = {
            listening: parseFloat(document.getElementById('ielts_listening').value) || 0,
            speaking: parseFloat(document.getElementById('ielts_speaking').value) || 0,
            reading: parseFloat(document.getElementById('ielts_reading').value) || 0,
            writing: parseFloat(document.getElementById('ielts_writing').value) || 0
        };
        
        const clbScores = {
            listening: this.getIELTStoCLB(scores.listening, 'listening'),
            speaking: this.getIELTStoCLB(scores.speaking, 'speaking'),
            reading: this.getIELTStoCLB(scores.reading, 'reading'),
            writing: this.getIELTStoCLB(scores.writing, 'writing')
        };
        
        // Update display
        document.getElementById('clb_listening').textContent = 'CLB ' + clbScores.listening;
        document.getElementById('clb_speaking').textContent = 'CLB ' + clbScores.speaking;
        document.getElementById('clb_reading').textContent = 'CLB ' + clbScores.reading;
        document.getElementById('clb_writing').textContent = 'CLB ' + clbScores.writing;
        
        const minCLB = Math.min(clbScores.listening, clbScores.speaking, clbScores.reading, clbScores.writing);
        document.getElementById('clb_minimum').textContent = 'CLB ' + minCLB;
        
        // Color code based on minimum
        const minElement = document.getElementById('clb_minimum');
        if (minCLB >= 9) {
            minElement.style.color = '#10b981'; // Green
        } else if (minCLB >= 7) {
            minElement.style.color = '#f59e0b'; // Orange
        } else {
            minElement.style.color = '#dc2626'; // Red
        }
        
        return minCLB;
    },

    // Calculate CLB from CELPIP scores
    calculateCLBFromCELPIP: function() {
        const scores = {
            listening: parseInt(document.getElementById('celpip_listening').value) || 0,
            speaking: parseInt(document.getElementById('celpip_speaking').value) || 0,
            reading: parseInt(document.getElementById('celpip_reading').value) || 0,
            writing: parseInt(document.getElementById('celpip_writing').value) || 0
        };
        
        // CELPIP scores directly map to CLB
        const clbScores = {
            listening: scores.listening >= 10 ? 10 : scores.listening,
            speaking: scores.speaking >= 10 ? 10 : scores.speaking,
            reading: scores.reading >= 10 ? 10 : scores.reading,
            writing: scores.writing >= 10 ? 10 : scores.writing
        };
        
        // Update display
        document.getElementById('celpip_clb_listening').textContent = 'CLB ' + clbScores.listening;
        document.getElementById('celpip_clb_speaking').textContent = 'CLB ' + clbScores.speaking;
        document.getElementById('celpip_clb_reading').textContent = 'CLB ' + clbScores.reading;
        document.getElementById('celpip_clb_writing').textContent = 'CLB ' + clbScores.writing;
        
        const minCLB = Math.min(clbScores.listening, clbScores.speaking, clbScores.reading, clbScores.writing);
        document.getElementById('celpip_clb_minimum').textContent = 'CLB ' + minCLB;
        
        // Color code based on minimum
        const minElement = document.getElementById('celpip_clb_minimum');
        if (minCLB >= 9) {
            minElement.style.color = '#10b981'; // Green
        } else if (minCLB >= 7) {
            minElement.style.color = '#f59e0b'; // Orange
        } else {
            minElement.style.color = '#dc2626'; // Red
        }
        
        return minCLB;
    },

    // Helper function to convert IELTS to CLB
    getIELTStoCLB: function(ieltsScore, ability) {
        const conversions = {
            listening: {
                8.5: 10, 8.0: 9, 7.5: 8, 7.0: 7, 6.0: 7, 5.5: 6, 5.0: 5, 4.5: 4
            },
            speaking: {
                7.5: 10, 7.0: 9, 6.5: 8, 6.0: 7, 5.5: 6, 5.0: 5, 4.0: 4
            },
            reading: {
                8.0: 10, 7.5: 9, 7.0: 9, 6.5: 8, 6.0: 7, 5.5: 6, 5.0: 6, 4.5: 5, 4.0: 5, 3.5: 4
            },
            writing: {
                7.5: 10, 7.0: 9, 6.5: 8, 6.0: 7, 5.5: 6, 5.0: 5, 4.5: 4, 4.0: 4
            }
        };
        
        return conversions[ability][ieltsScore] || 0;
    },

    // Get the minimum CLB value for calculation purposes
    getMinimumCLB: function() {
        const testType = document.getElementById('english_test_type').value;
        
        if (testType === 'clb') {
            return parseInt(document.getElementById('english_clb_min').value) || 0;
        } else if (testType === 'ielts') {
            return this.calculateCLBFromIELTS();
        } else if (testType === 'celpip') {
            return this.calculateCLBFromCELPIP();
        }
        
        return 0;
    }
};

// Make module available globally
if (typeof window !== 'undefined') {
    window.LanguageUIModule = LanguageUIModule;
}
