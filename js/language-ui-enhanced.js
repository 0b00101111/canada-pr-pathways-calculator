// Language UI Enhanced Module
(function(window) {
    'use strict';
    
    class LanguageUIEnhanced {
        constructor() {
            this.currentEnglishTest = 'quick';
            this.currentFrenchTest = 'none';
        }
        
        getHTML() {
            return `
                <div style="margin-bottom: 30px;">
                    <h4 style="color: #4a5568; margin-bottom: 15px;">English Proficiency</h4>
                    
                    <!-- Test Status -->
                    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="englishTestStatus" value="completed" checked style="margin-right: 8px;">
                            Completed
                        </label>
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="englishTestStatus" value="planned" style="margin-right: 8px;">
                            Planning to take
                        </label>
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="englishTestStatus" value="none" style="margin-right: 8px;">
                            No plans
                        </label>
                    </div>
                    
                    <div id="englishTestSection">
                        <!-- Test Type Selection -->
                        <div class="form-group">
                            <label>Test Type</label>
                            <select id="englishTestType" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                <option value="quick">Quick Estimate (Haven't taken test yet)</option>
                                <option value="ielts">IELTS General</option>
                                <option value="celpip">CELPIP</option>
                            </select>
                        </div>
                        
                        <!-- Quick Estimate Input (CLB Direct) -->
                        <div id="englishQuickInput" style="margin-top: 20px;">
                            <div style="background: #fef5e7; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="color: #7c2d12; margin: 0; font-size: 0.9em;">
                                    <strong>⚠️ Important:</strong> This mode assumes the same CLB level for all four abilities (Listening, Reading, Writing, Speaking). 
                                    For accurate CRS calculation, take a practice test and use the IELTS/CELPIP options above to enter individual band scores.
                                </p>
                            </div>
                            <div class="form-group">
                                <label>Estimated CLB Level (applies to all skills)</label>
                                <select id="englishQuickCLB" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                    <option value="0">No English / Below CLB 4</option>
                                    <option value="4">CLB 4 (Basic)</option>
                                    <option value="5">CLB 5 (Modest)</option>
                                    <option value="6">CLB 6 (Competent)</option>
                                    <option value="7" selected>CLB 7 (Good - Minimum for Express Entry)</option>
                                    <option value="8">CLB 8 (Very Good)</option>
                                    <option value="9">CLB 9 (Expert)</option>
                                    <option value="10">CLB 10 (Native-like)</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- IELTS Input -->
                        <div id="englishIELTSInput" style="display: none; margin-top: 20px;">
                            <div style="background: #e6f3ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="color: #1e40af; margin: 0; font-size: 0.9em;">
                                    Enter your IELTS General Training scores for each skill. Minimum CLB 7 (IELTS 6.0 all bands) recommended for Express Entry.
                                </p>
                            </div>
                            <div class="form-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                                <div class="form-group">
                                    <label>Listening</label>
                                    <select id="ielts_listening" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4.5">4.5</option>
                                        <option value="5.0">5.0</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6.0" selected>6.0</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7.0">7.0</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8.0">8.0</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9.0">9.0</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Reading</label>
                                    <select id="ielts_reading" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="3.5">3.5</option>
                                        <option value="4.0">4.0</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5.0">5.0</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6.0" selected>6.0</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7.0">7.0</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8.0">8.0</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9.0">9.0</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Writing</label>
                                    <select id="ielts_writing" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4.0">4.0</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5.0">5.0</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6.0" selected>6.0</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7.0">7.0</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8.0">8.0</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9.0">9.0</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Speaking</label>
                                    <select id="ielts_speaking" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4.0">4.0</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5.0">5.0</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6.0" selected>6.0</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7.0">7.0</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8.0">8.0</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9.0">9.0</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-top: 15px; padding: 12px; background: #f0f9ff; border-radius: 8px;">
                                <p style="margin: 0; font-size: 0.9em; color: #1e40af;">
                                    <strong>CLB Equivalent:</strong> <span id="ieltsClbResult">CLB 7</span>
                                </p>
                            </div>
                        </div>
                        
                        <!-- CELPIP Input -->
                        <div id="englishCELPIPInput" style="display: none; margin-top: 20px;">
                            <div style="background: #e6f3ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                <p style="color: #1e40af; margin: 0; font-size: 0.9em;">
                                    Enter your CELPIP-General scores. The CLB level directly corresponds to your CELPIP score.
                                </p>
                            </div>
                            <div class="form-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                                <div class="form-group">
                                    <label>Listening</label>
                                    <select id="celpip_listening" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7" selected>7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Reading</label>
                                    <select id="celpip_reading" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7" selected>7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Writing</label>
                                    <select id="celpip_writing" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7" selected>7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Speaking</label>
                                    <select id="celpip_speaking" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7" selected>7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-top: 15px; padding: 12px; background: #f0f9ff; border-radius: 8px;">
                                <p style="margin: 0; font-size: 0.9em; color: #1e40af;">
                                    <strong>CLB Level:</strong> <span id="celpipClbResult">CLB 7</span>
                                </p>
                            </div>
                        </div>
                        
                        <!-- Target Date (for planned tests) -->
                        <div id="englishTargetDate" style="display: none; margin-top: 20px;">
                            <div class="form-group">
                                <label>Target Test Date</label>
                                <input type="date" id="englishTestDate" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- French Section -->
                <div style="margin-top: 40px;">
                    <h4 style="color: #4a5568; margin-bottom: 15px;">French Proficiency</h4>
                    
                    <!-- Test Status -->
                    <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="frenchTestStatus" value="completed" style="margin-right: 8px;">
                            Completed
                        </label>
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="frenchTestStatus" value="planned" style="margin-right: 8px;">
                            Planning to take
                        </label>
                        <label style="display: flex; align-items: center; padding: 8px 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer;">
                            <input type="radio" name="frenchTestStatus" value="none" checked style="margin-right: 8px;">
                            No French
                        </label>
                    </div>
                    
                    <div id="frenchTestSection" style="display: none;">
                        <!-- Simplified French input for now -->
                        <div class="form-group">
                            <label>French Level (NCLC)</label>
                            <select id="frenchNCLC" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                                <option value="0">No French</option>
                                <option value="4">NCLC 4</option>
                                <option value="5">NCLC 5</option>
                                <option value="6">NCLC 6</option>
                                <option value="7">NCLC 7 (Minimum for bonus points)</option>
                                <option value="8">NCLC 8</option>
                                <option value="9">NCLC 9</option>
                                <option value="10">NCLC 10</option>
                            </select>
                        </div>
                        
                        <!-- Target Date (for planned tests) -->
                        <div id="frenchTargetDate" style="display: none; margin-top: 20px;">
                            <div class="form-group">
                                <label>Target Test Date</label>
                                <input type="date" id="frenchTestDate" style="padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; width: 100%;">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Reference Guide -->
                <div style="margin-top: 30px; padding: 20px; background: #f7fafc; border-radius: 12px;">
                    <h5 style="color: #2d3748; margin-bottom: 15px;">📊 Quick Reference: CLB to Test Score Mapping</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                        <div>
                            <h6 style="color: #4a5568; margin-bottom: 10px;">IELTS → CLB</h6>
                            <div style="font-size: 0.85em; color: #718096; line-height: 1.6;">
                                • CLB 9: L8.0 R7.0 W7.0 S7.0<br>
                                • CLB 8: L7.5 R6.5 W6.5 S6.5<br>
                                • CLB 7: L6.0 R6.0 W6.0 S6.0<br>
                                • CLB 6: L5.5 R5.0 W5.5 S5.5<br>
                                • CLB 5: L5.0 R4.0 W5.0 S5.0
                            </div>
                        </div>
                        <div>
                            <h6 style="color: #4a5568; margin-bottom: 10px;">Points for CLB Levels</h6>
                            <div style="font-size: 0.85em; color: #718096; line-height: 1.6;">
                                • CLB 10+: Maximum points<br>
                                • CLB 9: High points (recommended)<br>
                                • CLB 7-8: Good (Express Entry minimum)<br>
                                • CLB 5-6: Basic points<br>
                                • French CLB 7+: 50 bonus points!
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        initialize() {
            const self = this;
            
            // English test status handler
            document.querySelectorAll('input[name="englishTestStatus"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const testSection = document.getElementById('englishTestSection');
                    const targetDate = document.getElementById('englishTargetDate');
                    
                    if (this.value === 'none') {
                        testSection.style.display = 'none';
                    } else {
                        testSection.style.display = 'block';
                        targetDate.style.display = this.value === 'planned' ? 'block' : 'none';
                    }
                });
            });
            
            // English test type handler
            const testTypeSelect = document.getElementById('englishTestType');
            if (testTypeSelect) {
                testTypeSelect.addEventListener('change', function() {
                    self.currentEnglishTest = this.value;
                    
                    // Hide all input sections
                    document.getElementById('englishQuickInput').style.display = 'none';
                    document.getElementById('englishIELTSInput').style.display = 'none';
                    document.getElementById('englishCELPIPInput').style.display = 'none';
                    
                    // Show selected input section
                    if (this.value === 'quick') {
                        document.getElementById('englishQuickInput').style.display = 'block';
                    } else if (this.value === 'ielts') {
                        document.getElementById('englishIELTSInput').style.display = 'block';
                        self.updateIELTSCLB();
                    } else if (this.value === 'celpip') {
                        document.getElementById('englishCELPIPInput').style.display = 'block';
                        self.updateCELPIPCLB();
                    }
                });
            }
            
            // IELTS score change handlers
            ['ielts_listening', 'ielts_reading', 'ielts_writing', 'ielts_speaking'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('change', () => self.updateIELTSCLB());
                }
            });
            
            // CELPIP score change handlers
            ['celpip_listening', 'celpip_reading', 'celpip_writing', 'celpip_speaking'].forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener('change', () => self.updateCELPIPCLB());
                }
            });
            
            // French test status handler
            document.querySelectorAll('input[name="frenchTestStatus"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    const testSection = document.getElementById('frenchTestSection');
                    const targetDate = document.getElementById('frenchTargetDate');
                    
                    if (this.value === 'none') {
                        testSection.style.display = 'none';
                    } else {
                        testSection.style.display = 'block';
                        targetDate.style.display = this.value === 'planned' ? 'block' : 'none';
                    }
                });
            });
        }
        
        updateIELTSCLB() {
            const listening = parseFloat(document.getElementById('ielts_listening').value);
            const reading = parseFloat(document.getElementById('ielts_reading').value);
            const writing = parseFloat(document.getElementById('ielts_writing').value);
            const speaking = parseFloat(document.getElementById('ielts_speaking').value);
            
            const clbScores = this.convertIELTStoCLB(listening, reading, writing, speaking);
            const overallCLB = this.getOverallCLB(clbScores.listening, clbScores.reading, clbScores.writing, clbScores.speaking);
            
            document.getElementById('ieltsClbResult').textContent = `CLB ${overallCLB} (L${clbScores.listening} R${clbScores.reading} W${clbScores.writing} S${clbScores.speaking})`;
        }
        
        updateCELPIPCLB() {
            const listening = parseInt(document.getElementById('celpip_listening').value);
            const reading = parseInt(document.getElementById('celpip_reading').value);
            const writing = parseInt(document.getElementById('celpip_writing').value);
            const speaking = parseInt(document.getElementById('celpip_speaking').value);
            
            const overallCLB = Math.min(listening, reading, writing, speaking);
            
            document.getElementById('celpipClbResult').textContent = `CLB ${overallCLB} (L${listening} R${reading} W${writing} S${speaking})`;
        }
        
        getLanguageData() {
            const englishStatus = document.querySelector('input[name="englishTestStatus"]:checked')?.value || 'none';
            const frenchStatus = document.querySelector('input[name="frenchTestStatus"]:checked')?.value || 'none';
            
            let englishData = {
                status: englishStatus,
                score: 0,
                targetDate: null,
                testType: this.currentEnglishTest
            };
            
            if (englishStatus !== 'none') {
                const testType = document.getElementById('englishTestType')?.value || 'quick';
                
                if (testType === 'quick') {
                    englishData.score = parseInt(document.getElementById('englishQuickCLB')?.value || 0);
                } else if (testType === 'ielts') {
                    const listening = parseFloat(document.getElementById('ielts_listening')?.value || 0);
                    const reading = parseFloat(document.getElementById('ielts_reading')?.value || 0);
                    const writing = parseFloat(document.getElementById('ielts_writing')?.value || 0);
                    const speaking = parseFloat(document.getElementById('ielts_speaking')?.value || 0);
                    
                    const clbScores = this.convertIELTStoCLB(listening, reading, writing, speaking);
                    englishData.score = this.getOverallCLB(clbScores.listening, clbScores.reading, clbScores.writing, clbScores.speaking);
                    englishData.bandScores = clbScores;
                } else if (testType === 'celpip') {
                    const listening = parseInt(document.getElementById('celpip_listening')?.value || 0);
                    const reading = parseInt(document.getElementById('celpip_reading')?.value || 0);
                    const writing = parseInt(document.getElementById('celpip_writing')?.value || 0);
                    const speaking = parseInt(document.getElementById('celpip_speaking')?.value || 0);
                    
                    englishData.score = Math.min(listening, reading, writing, speaking);
                    englishData.bandScores = {
                        listening: listening,
                        reading: reading,
                        writing: writing,
                        speaking: speaking
                    };
                }
                
                if (englishStatus === 'planned') {
                    englishData.targetDate = document.getElementById('englishTestDate')?.value || null;
                }
            }
            
            let frenchData = {
                status: frenchStatus,
                score: 0,
                targetDate: null
            };
            
            if (frenchStatus !== 'none') {
                frenchData.score = parseInt(document.getElementById('frenchNCLC')?.value || 0);
                
                if (frenchStatus === 'planned') {
                    frenchData.targetDate = document.getElementById('frenchTestDate')?.value || null;
                }
            }
            
            return {
                english: englishData,
                french: frenchData
            };
        }
        
        // Helper function to convert IELTS to CLB
        convertIELTStoCLB(listening, reading, writing, speaking) {
            // IELTS to CLB conversion tables
            const listeningTable = {
                4.5: 4, 5.0: 5, 5.5: 6, 6.0: 7, 6.5: 7, 7.0: 8, 7.5: 8, 8.0: 9, 8.5: 10, 9.0: 10
            };
            
            const readingTable = {
                3.5: 4, 4.0: 5, 4.5: 5, 5.0: 6, 5.5: 6, 6.0: 7, 6.5: 8, 7.0: 9, 7.5: 9, 8.0: 10, 8.5: 10, 9.0: 10
            };
            
            const writingTable = {
                4.0: 4, 4.5: 4, 5.0: 5, 5.5: 6, 6.0: 7, 6.5: 8, 7.0: 9, 7.5: 10, 8.0: 10, 8.5: 10, 9.0: 10
            };
            
            const speakingTable = {
                4.0: 4, 4.5: 4, 5.0: 5, 5.5: 6, 6.0: 7, 6.5: 8, 7.0: 9, 7.5: 10, 8.0: 10, 8.5: 10, 9.0: 10
            };
            
            return {
                listening: listeningTable[listening] || 0,
                reading: readingTable[reading] || 0,
                writing: writingTable[writing] || 0,
                speaking: speakingTable[speaking] || 0
            };
        }
        
        // Helper function to convert CELPIP to CLB
        convertCELPIPtoCLB(score) {
            // CELPIP scores directly map to CLB levels
            if (score >= 10) return 10;
            if (score >= 9) return 9;
            if (score >= 8) return 8;
            if (score >= 7) return 7;
            if (score >= 6) return 6;
            if (score >= 5) return 5;
            if (score >= 4) return 4;
            return 0;
        }
        
        // Convert individual CLB band to overall CLB (minimum of all bands)
        getOverallCLB(listening, reading, writing, speaking) {
            return Math.min(listening, reading, writing, speaking);
        }
    }
    
    // Export to window
    window.LanguageUIEnhanced = LanguageUIEnhanced;
    
})(window);
