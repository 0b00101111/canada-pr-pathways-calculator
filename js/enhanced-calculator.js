// enhanced-calculator.js
// Enhanced CRS Calculator with progress tracking

// Get enhanced calculator HTML for the selected journey
function getEnhancedCalculatorHTML(journey) {
    const journeyTitles = {
        'dreaming': 'Planning Your Journey to Canada',
        'studying': 'From Student to Permanent Resident',
        'working': 'Leveraging Your Canadian Experience'
    };
    
    return `
        <div style="background: white; border-radius: 20px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
                <h3 style="font-size: 1.8em; margin-bottom: 10px;">${journeyTitles[journey] || 'Calculate Your CRS Score'}</h3>
                <p style="opacity: 0.95;">Track your progress and see how your score improves over time</p>
            </div>
            
            <div style="padding: 40px;">
                <form id="enhancedCalcForm">
                    <div class="form-section">
                        <h3>👤 Personal Information</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Date of Birth</label>
                                <input type="date" id="calc_dob" required>
                            </div>
                            <div class="form-group">
                                <label>Marital Status</label>
                                <select id="calc_marital" required>
                                    <option value="single">Single</option>
                                    <option value="married">Married/Common-law</option>
                                </select>
                            </div>
                        </div>
                        
                        <div id="spouseSection" style="display: none; margin-top: 20px; padding: 20px; background: white; border-radius: 12px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">Spouse Information</h4>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Spouse's Education</label>
                                    <select id="calc_spouse_edu">
                                        <option value="none">High school or less</option>
                                        <option value="diploma">Diploma/Certificate</option>
                                        <option value="bachelor">Bachelor's degree</option>
                                        <option value="master">Master's or PhD</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Spouse's English Level</label>
                                    <select id="calc_spouse_english">
                                        <option value="0">No test</option>
                                        <option value="4">CLB 4-5</option>
                                        <option value="6">CLB 6</option>
                                        <option value="7">CLB 7-8</option>
                                        <option value="9">CLB 9+</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Spouse's Canadian Work</label>
                                    <select id="calc_spouse_work">
                                        <option value="0">None</option>
                                        <option value="1">1 year</option>
                                        <option value="2">2 years</option>
                                        <option value="3">3+ years</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>🎓 Education</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Highest Completed Education</label>
                                <select id="calc_completed_edu" required>
                                    <option value="none">High school or less</option>
                                    <option value="diploma1">1-year diploma</option>
                                    <option value="diploma2">2-year diploma</option>
                                    <option value="bachelor">Bachelor's degree</option>
                                    <option value="two-or-more">Two or more degrees</option>
                                    <option value="master">Master's degree</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Canadian Education Completed</label>
                                <select id="calc_canadian_edu">
                                    <option value="none">No Canadian education</option>
                                    <option value="1-2year">1-2 year diploma</option>
                                    <option value="3year">3+ year degree</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="calc_studying">
                            <label for="calc_studying" style="margin: 0;">
                                📚 I'm currently studying for a higher degree
                            </label>
                        </div>
                        
                        <div class="in-progress-section" id="studyingDetails">
                            <h4 style="color: #667eea; margin-bottom: 15px;">Current Studies</h4>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Program you're studying</label>
                                    <select id="calc_studying_degree">
                                        <option value="diploma1">1-year diploma</option>
                                        <option value="diploma2">2-year diploma</option>
                                        <option value="bachelor">Bachelor's degree</option>
                                        <option value="master">Master's degree</option>
                                        <option value="phd">PhD</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Expected Graduation</label>
                                    <input type="month" id="calc_graduation_date">
                                </div>
                                <div class="form-group">
                                    <label>Study Location</label>
                                    <select id="calc_study_location">
                                        <option value="canada">Canada</option>
                                        <option value="home">Home Country</option>
                                        <option value="other">Other Country</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>🗣️ Language Skills</h3>
                        <div id="language-input-container">
                            <!-- Enhanced language UI will be injected here -->
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>💼 Work Experience</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Foreign Work Experience</label>
                                <select id="calc_foreign_work">
                                    <option value="0">None</option>
                                    <option value="1">1 year</option>
                                    <option value="2">2 years</option>
                                    <option value="3">3+ years</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Canadian Work Experience</label>
                                <select id="calc_canadian_work">
                                    <option value="0">None</option>
                                    <option value="1">1 year</option>
                                    <option value="2">2 years</option>
                                    <option value="3">3 years</option>
                                    <option value="4">4 years</option>
                                    <option value="5">5+ years</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="checkbox-group">
                            <input type="checkbox" id="calc_future_work">
                            <label for="calc_future_work" style="margin: 0;">
                                📈 I will gain Canadian work experience in the future
                            </label>
                        </div>
                        
                        <div class="in-progress-section" id="futureWorkDetails">
                            <h4 style="color: #667eea; margin-bottom: 15px;">Future Work Experience</h4>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label>Expected to reach 1 year by</label>
                                    <input type="month" id="calc_one_year_work">
                                </div>
                                <div class="form-group">
                                    <label>Expected to reach 2 years by</label>
                                    <input type="month" id="calc_two_year_work">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3>➕ Additional Factors</h3>
                        <div class="checkbox-group">
                            <input type="checkbox" id="calc_sibling">
                            <label for="calc_sibling" style="margin: 0;">
                                I have a sibling who is a Canadian citizen or PR (15 points)
                            </label>
                        </div>
                        <div class="checkbox-group" style="margin-top: 10px;">
                            <input type="checkbox" id="calc_pnp">
                            <label for="calc_pnp" style="margin: 0;">
                                I have a Provincial Nomination (600 points!)
                            </label>
                        </div>
                    </div>
                    
                    <button type="button" class="calculate-button" onclick="calculateEnhancedCRS()">
                        Calculate All Scenarios 🎯
                    </button>
                </form>
                
                <div id="enhancedResults" class="results-section"></div>
            </div>
        </div>
    `;
}

// Initialize enhanced calculator
function initializeEnhancedCalculator(journey) {
    // Initialize the enhanced language UI
    const languageContainer = document.getElementById('language-input-container');
    if (languageContainer && typeof LanguageUIEnhanced !== 'undefined') {
        const languageUI = new LanguageUIEnhanced();
        languageContainer.innerHTML = languageUI.getHTML();
        languageUI.initialize();
        // Store reference globally for data access
        window.languageUI = languageUI;
    }
    
    // Set up event listeners
    const maritalSelect = document.getElementById('calc_marital');
    if (maritalSelect) {
        maritalSelect.addEventListener('change', function() {
            const spouseSection = document.getElementById('spouseSection');
            if (spouseSection) {
                spouseSection.style.display = this.value === 'married' ? 'block' : 'none';
            }
        });
    }
    
    // Currently studying checkbox
    const studyingCheckbox = document.getElementById('calc_studying');
    if (studyingCheckbox) {
        studyingCheckbox.addEventListener('change', function() {
            const section = document.getElementById('studyingDetails');
            if (section) {
                section.classList.toggle('active', this.checked);
            }
        });
    }
    
    // Future work checkbox
    const futureWorkCheckbox = document.getElementById('calc_future_work');
    if (futureWorkCheckbox) {
        futureWorkCheckbox.addEventListener('change', function() {
            const section = document.getElementById('futureWorkDetails');
            if (section) {
                section.classList.toggle('active', this.checked);
            }
        });
    }
    
    // Set date constraints
    const today = new Date();
    const maxDOB = new Date();
    maxDOB.setFullYear(today.getFullYear() - 18);
    
    const dobInput = document.getElementById('calc_dob');
    if (dobInput) {
        dobInput.max = maxDOB.toISOString().split('T')[0];
    }
    
    // Pre-fill based on journey
    prefillByJourney(journey);
}

// Pre-fill form based on journey type
function prefillByJourney(journey) {
    if (journey === 'studying') {
        document.getElementById('calc_completed_edu').value = 'bachelor';
        document.getElementById('calc_canadian_edu').value = '3year';
        // Language will be pre-filled by the enhanced UI
        document.getElementById('calc_studying').checked = true;
        document.getElementById('studyingDetails').classList.add('active');
        document.getElementById('calc_study_location').value = 'canada';
    } else if (journey === 'working') {
        document.getElementById('calc_canadian_work').value = '1';
        // Language will be pre-filled by the enhanced UI
        document.getElementById('calc_completed_edu').value = 'bachelor';
    } else if (journey === 'dreaming') {
        document.getElementById('calc_foreign_work').value = '3';
        // Language will be pre-filled by the enhanced UI
        document.getElementById('calc_completed_edu').value = 'master';
    }
}

// Store user data globally for charts and recalculation
let currentScenarios = [];
let currentUserData = null;
let currentRecommendations = [];

// Main calculation function
function calculateEnhancedCRS() {
    const formData = gatherFormData();

    const educationData = {
        current: formData.completedEducation,
        future: formData.currentlyStudying ? {
            degree: formData.studyingDegree,
            graduationDate: formData.graduationDate,
            location: formData.studyLocation
        } : null
    };

    // Build language data structure for timeline scenarios
    const languageData = {
        english: { 
            current: parseInt(formData.englishCLB) || 0, 
            target: 0, 
            targetDate: null 
        },
        french: { 
            current: parseInt(formData.frenchNCLC) || 0, 
            target: 0, 
            targetDate: null 
        }
    };
    
    // Handle English planned tests
    if (formData.englishStatus === 'planned' && formData.languageData?.english) {
        // For planned tests, current is 0 (or lower estimate), target is the planned score
        languageData.english.current = 0; // They haven't taken the test yet
        languageData.english.target = formData.languageData.english.score || 7; // Their planned CLB level
        languageData.english.targetDate = formData.languageData.english.targetDate;
    } else if (formData.englishStatus === 'completed') {
        // For completed tests, use the score as current
        languageData.english.current = parseInt(formData.englishCLB) || 0;
    }
    
    // Handle French planned tests
    if (formData.frenchStatus === 'planned' && formData.languageData?.french) {
        languageData.french.current = 0; // They haven't taken the test yet
        languageData.french.target = formData.languageData.french.score || 7;
        languageData.french.targetDate = formData.languageData.french.targetDate;
    } else if (formData.frenchStatus === 'completed') {
        languageData.french.current = parseInt(formData.frenchNCLC) || 0;
    }
    
    const userData = {
        dob: formData.dob,
        married: formData.married,
        education: educationData,
        language: languageData,
        foreignWork: formData.foreignWork,
        canadianWork: formData.canadianWork,
        canadianEducation: formData.canadianEducation,
        sibling: formData.sibling,
        pnp: formData.pnp,
        spouse: formData.married ? {
            education: formData.spouseEducation,
            englishCLB: parseInt(formData.spouseEnglish) || 0,
            canadianWork: parseInt(formData.spouseWork) || 0
        } : null
    };
    
    // Store data for recalculation
    currentUserData = userData;
    
    currentScenarios = ScenarioGenerator.generateTimelineScenarios(userData);
    currentRecommendations = RecommendationsModule.generateRecommendations(currentScenarios, userData);
    
    displayEnhancedResults(currentScenarios, currentRecommendations);
}


// Gather form data
function gatherFormData() {
    // Get language data from enhanced UI if available
    let languageData = null;
    if (typeof LanguageUIEnhanced !== 'undefined' && window.languageUI) {
        languageData = window.languageUI.getLanguageData();
    }
    
    // Fallback to basic form elements if enhanced UI not available
    const englishCLB = languageData?.english?.score || 
                       document.getElementById('calc_english_clb')?.value || 0;
    const frenchNCLC = languageData?.french?.score || 
                       document.getElementById('calc_french_nclc')?.value || 0;
    
    return {
        dob: document.getElementById('calc_dob')?.value,
        married: document.getElementById('calc_marital')?.value === 'married',
        completedEducation: document.getElementById('calc_completed_edu')?.value,
        canadianEducation: document.getElementById('calc_canadian_edu')?.value,
        currentlyStudying: document.getElementById('calc_studying')?.checked,
        studyingDegree: document.getElementById('calc_studying_degree')?.value,
        graduationDate: document.getElementById('calc_graduation_date')?.value,
        studyLocation: document.getElementById('calc_study_location')?.value,
        englishCLB: englishCLB,
        englishStatus: languageData?.english?.status || 'none',
        englishTargetDate: languageData?.english?.targetDate || null,
        frenchNCLC: frenchNCLC,
        frenchStatus: languageData?.french?.status || 'none',
        frenchTargetDate: languageData?.french?.targetDate || null,
        languageData: languageData,  // Store full language data for timeline calculation
        foreignWork: parseInt(document.getElementById('calc_foreign_work')?.value || 0),
        canadianWork: parseInt(document.getElementById('calc_canadian_work')?.value || 0),
        sibling: document.getElementById('calc_sibling')?.checked,
        pnp: document.getElementById('calc_pnp')?.checked,
        spouseEducation: document.getElementById('calc_spouse_edu')?.value,
        spouseEnglish: document.getElementById('calc_spouse_english')?.value,
        spouseWork: document.getElementById('calc_spouse_work')?.value
    };
}

// Display enhanced results
function displayEnhancedResults(scenarios, recommendations) {
    const resultsDiv = document.getElementById('enhancedResults');
    if (!resultsDiv) return;
    
    resultsDiv.classList.add('active');
    
    let html = `
        <h3 style="text-align: center; color: #2d3748; margin: 30px 0;">Your CRS Score Timeline</h3>
        
        <div class="scenario-cards">
            ${scenarios.map((scenario, index) => {
                const isExcluded = scenario.excluded || false;
                const scoreColor = isExcluded ? '#9ca3af' : 
                                  scenario.score >= 500 ? '#48bb78' : 
                                  scenario.score >= 470 ? '#ed8936' : 
                                  scenario.score >= 440 ? '#f6ad55' : '#e53e3e';
                const cardOpacity = isExcluded ? 'opacity: 0.6;' : '';
                
                return `
                    <div class="scenario-card ${scenario.status}" style="${cardOpacity}">
                        <div class="scenario-header">
                            <div class="scenario-status ${scenario.status}">
                                ${scenario.status.charAt(0).toUpperCase() + scenario.status.slice(1)}
                            </div>
                            ${isExcluded ? '<span style="background: #ef4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75em; margin-left: 8px;">Excluded</span>' : ''}
                        </div>
                        <h4 style="color: ${isExcluded ? '#9ca3af' : '#2d3748'}; margin: 10px 0;">
                            ${scenario.icon} ${scenario.name}
                        </h4>
                        <div class="scenario-score" style="color: ${scoreColor};">
                            ${scenario.score}
                        </div>
                        <div class="scenario-timeline">
                            📅 ${scenario.timeline}
                        </div>
                        ${scenario.status !== 'current' ? `
                        <div class="scenario-actions" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                            <div class="checkbox-group">
                                <input type="checkbox" id="include-${index}" 
                                       class="include-checkbox" 
                                       ${!isExcluded ? 'checked' : ''}
                                       onchange="recalculateWithSelection()" 
                                       data-scenario-type="${scenario.type}"
                                       data-scenario-name="${scenario.name}"
                                       style="width: 16px; height: 16px; margin-right: 6px;">
                                <label for="include-${index}" style="margin: 0; font-size: 0.9em; color: ${isExcluded ? '#9ca3af' : '#48bb78'}; font-weight: 500;">
                                    ${isExcluded ? '☐' : '✓'} Include in calculation
                                </label>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>

        <div style="margin-top: 40px; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
            <h3 style="text-align: center; color: #2d3748; margin-bottom: 20px;">Your Score vs. Past Express Entry Draws</h3>
            <canvas id="crsChart"></canvas>
        </div>
        
        <div style="margin-top: 30px;">
            ${recommendations.map(rec => `
                <div class="info-box ${rec.type}">
                    <h4>${rec.title}</h4>
                    <p>${rec.message}</p>
                </div>
            `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="exportResults()" style="padding: 14px 30px; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; border: none; border-radius: 10px; font-size: 1em; font-weight: 600; cursor: pointer; margin: 0 10px;">
                📥 Export Results
            </button>
            <button onclick="resetCalculator()" style="padding: 14px 30px; background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%); color: white; border: none; border-radius: 10px; font-size: 1em; font-weight: 600; cursor: pointer; margin: 0 10px;">
                🔄 Start Over
            </button>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Restore achieved status from localStorage
    scenarios.forEach((scenario, index) => {
        if (scenario.status !== 'current') {
            const scenarioId = `${scenario.name}-${scenario.timeline}`;
            const isAchieved = localStorage.getItem(`achieved-${scenarioId}`) === 'true';
            if (isAchieved) {
                const checkbox = document.getElementById(`achieved-${index}`);
                if (checkbox) {
                    checkbox.checked = true;
                    updateAchievedStatus(index, true);
                }
            }
        }
    });
    
    // Initial chart should show all draws and all scenario lines
    renderInitialChart(scenarios, recommendations);
}

function updateChartScenarios() {
    const pnpSelected = document.getElementById('calc_pnp').checked;
    const scenariosToCompare = [{
        value: currentScenarios.find(s => s.status === 'current')?.score || 0,
        label: 'Current Score',
        color: '#48bb78',
        position: 'start'
    }];

    const selectedCheckboxes = document.querySelectorAll('input[id^="compare-scenario-"]:checked');
    let isFrenchPathSelected = false;
    let isStandardPathSelected = false;

    selectedCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.isFrench === 'true') isFrenchPathSelected = true;
        else isStandardPathSelected = true;
        scenariosToCompare.push({
            value: parseInt(checkbox.dataset.score),
            label: checkbox.dataset.label,
            color: '#4299e1',
            position: 'end'
        });
    });

    let pathwayType = 'all';
    if (selectedCheckboxes.length === 1) {
        if (isFrenchPathSelected) pathwayType = 'french';
        else pathwayType = 'standard';
    }

    renderCRSChart(scenariosToCompare, pnpSelected, pathwayType);
}

function exportResults() {
    console.log('Export button clicked!'); // Debug log
    
    try {
        // Gather current form data for profile
        const formData = gatherFormData();
        const age = formData.dob ? AgeModule.calculateAge(formData.dob) : 'Not specified';
    
    let exportText = '=== CANADA PR PATHWAYS CALCULATOR - DETAILED RESULTS ===\n';
    exportText += `Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n`;
    exportText += '=' + '='.repeat(55) + '\n\n';
    
    // Profile Section
    exportText += 'YOUR PROFILE:\n';
    exportText += '-'.repeat(50) + '\n';
    exportText += `Age: ${age}\n`;
    exportText += `Marital Status: ${formData.married ? 'Married/Common-law' : 'Single'}\n`;
    exportText += `Education: ${formatEducation(formData.completedEducation)}\n`;
    exportText += `Canadian Education: ${formatCanadianEducation(formData.canadianEducation)}\n`;
    exportText += `English Level: CLB ${formData.englishCLB || 'Not tested'}\n`;
    exportText += `French Level: ${formData.frenchNCLC ? `NCLC ${formData.frenchNCLC}` : 'No French'}\n`;
    exportText += `Foreign Work Experience: ${formData.foreignWork} year(s)\n`;
    exportText += `Canadian Work Experience: ${formData.canadianWork} year(s)\n`;
    exportText += `Sibling in Canada: ${formData.sibling ? 'Yes' : 'No'}\n`;
    exportText += `Provincial Nomination: ${formData.pnp ? 'Yes (600 points!)' : 'No'}\n`;
    
    if (formData.married && formData.spouseEducation) {
        exportText += '\nSPOUSE PROFILE:\n';
        exportText += `Education: ${formatEducation(formData.spouseEducation)}\n`;
        exportText += `English Level: CLB ${formData.spouseEnglish || 'Not tested'}\n`;
        exportText += `Canadian Work: ${formData.spouseWork} year(s)\n`;
    }
    
    exportText += '\n' + '='.repeat(55) + '\n\n';
    
    // Scenarios with detailed scores
    exportText += 'CRS SCORE SCENARIOS:\n';
    exportText += '-'.repeat(50) + '\n\n';
    
    currentScenarios.forEach((scenario, index) => {
        exportText += `${index + 1}. ${scenario.name}\n`;
        exportText += `   Score: ${scenario.score} points\n`;
        exportText += `   Timeline: ${scenario.timeline}\n`;
        exportText += `   Status: ${scenario.status}\n`;
        if (scenario.improvements && scenario.improvements.length > 0) {
            exportText += `   Key improvements: ${scenario.improvements.join(', ')}\n`;
        }
        exportText += '\n';
    });
    
    exportText += '='.repeat(55) + '\n\n';
    
    // Recommendations section
    exportText += 'PERSONALIZED RECOMMENDATIONS:\n';
    exportText += '-'.repeat(50) + '\n\n';
    
    // Get recommendations from the page
    const recommendationElements = document.querySelectorAll('#enhancedResults .info-box');
    recommendationElements.forEach((rec, index) => {
        const title = rec.querySelector('h4')?.textContent || '';
        const message = rec.querySelector('p')?.textContent || '';
        exportText += `${index + 1}. ${title}\n`;
        exportText += `   ${message.replace(/\n/g, '\n   ')}\n\n`;
    });
    
    exportText += '='.repeat(55) + '\n\n';
    
    // Action items
    exportText += 'IMMEDIATE ACTION ITEMS:\n';
    exportText += '-'.repeat(50) + '\n';
    exportText += '1. Language Tests:\n';
    exportText += '   - Book IELTS/CELPIP (English) if not done\n';
    exportText += '   - Consider TEF/TCF (French) for bonus points\n\n';
    exportText += '2. Educational Credential Assessment (ECA):\n';
    exportText += '   - Apply through WES, IQAS, or other designated organization\n';
    exportText += '   - Processing time: 4-8 weeks\n\n';
    exportText += '3. Create Express Entry Profile:\n';
    exportText += '   - Once you have language tests and ECA\n';
    exportText += '   - Profile valid for 12 months\n\n';
    exportText += '4. Monitor Draw Scores:\n';
    exportText += '   - General draws: Usually 480-530\n';
    exportText += '   - French draws: Usually 350-430\n';
    exportText += '   - CEC draws: Usually 500-550\n\n';
    
    exportText += '='.repeat(55) + '\n\n';
    
    // Disclaimer
    exportText += 'IMPORTANT DISCLAIMER:\n';
    exportText += '-'.repeat(50) + '\n';
    exportText += 'This is an UNOFFICIAL calculator for educational purposes only.\n';
    exportText += 'Immigration rules and requirements can change at any time.\n';
    exportText += 'Always verify information with official IRCC sources at:\n';
    exportText += 'https://www.canada.ca/en/immigration-refugees-citizenship.html\n\n';
    exportText += 'For complex cases, consider consulting a Regulated Canadian\n';
    exportText += 'Immigration Consultant (RCIC) or immigration lawyer.\n\n';
    exportText += 'Calculator last updated: August 2025\n';
    exportText += 'Based on current Express Entry CRS criteria\n';
    
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CRS_Score_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log('Export completed successfully!'); // Debug log
    } catch (error) {
        console.error('Export error:', error);
        alert('Error exporting results. Please check the console for details.');
    }
}

// Helper functions for formatting
function formatEducation(edu) {
    const educationMap = {
        'none': 'High school or less',
        'diploma1': '1-year diploma/certificate',
        'diploma2': '2-year diploma',
        'bachelor': "Bachelor's degree",
        'two-or-more': 'Two or more degrees',
        'master': "Master's degree",
        'phd': 'PhD'
    };
    return educationMap[edu] || edu;
}

function formatCanadianEducation(edu) {
    const canadianEduMap = {
        'none': 'None',
        '1-2year': '1-2 year diploma',
        '3year': '3+ year degree'
    };
    return canadianEduMap[edu] || edu;
}

function resetCalculator() {
    const calcForm = document.getElementById('enhancedCalcForm');
    if (calcForm) calcForm.reset();
    
    const resultsDiv = document.getElementById('enhancedResults');
    if (resultsDiv) resultsDiv.innerHTML = '';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const horizontalLinePlugin = {
    id: 'horizontalLine',
    afterDraw: (chart) => {
        const { ctx, chartArea: { top, right, bottom, left }, scales: { y } } = chart;
        const options = chart.options.plugins.horizontalLine;

        options.lines.forEach(line => {
            if (!line.value) return;
            const yPos = y.getPixelForValue(line.value);
            ctx.save();
            ctx.strokeStyle = line.borderColor || 'grey';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);
            ctx.beginPath();
            ctx.moveTo(left, yPos);
            ctx.lineTo(right, yPos);
            ctx.stroke();
            ctx.restore();

            const text = `${line.label}: ${line.value}`;
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = line.backgroundColor || 'grey';
            const textWidth = ctx.measureText(text).width;
            const labelX = line.position === 'start' ? left + 5 : right - textWidth - 15;
            const labelY = yPos - 15;
            ctx.fillRect(labelX, labelY, textWidth + 10, 20);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, labelX + 5, labelY + 10);
            ctx.restore();
        });
    }
};

function renderCRSChart(scenariosToCompare, hasPNP, pathwayType) {
    const ctx = document.getElementById('crsChart')?.getContext('2d');
    if (!ctx || typeof Chart === 'undefined' || typeof historicalDrawData === 'undefined') return;

    let dataToDisplay = historicalDrawData;
    if (!hasPNP) dataToDisplay = dataToDisplay.filter(d => d.drawType !== 'PNP');
    if (pathwayType === 'french') dataToDisplay = dataToDisplay.filter(d => d.drawType === 'French Language');
    else if (pathwayType === 'standard') dataToDisplay = dataToDisplay.filter(d => d.drawType !== 'French Language');

    const labels = dataToDisplay.map(d => d.date);
    const data = dataToDisplay.map(d => d.crsScore);
    const drawTypeColors = {'General': 'rgba(113, 128, 150, 0.8)', 'PNP': 'rgba(72, 187, 120, 0.8)', 'French Language': 'rgba(229, 62, 62, 0.8)', 'CEC': 'rgba(237, 137, 54, 0.8)'};
    const colors = dataToDisplay.map(d => drawTypeColors[d.drawType]);
    const allScores = [...data, ...scenariosToCompare.map(s => s.value)];
    const maxDataValue = Math.max(...allScores.filter(s => s > 0));
    const yAxisMax = isFinite(maxDataValue) ? Math.ceil((maxDataValue + 20) / 10) * 10 : 600;

    if(window.myCRSChart) window.myCRSChart.destroy();

    window.myCRSChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'CRS Cut-off Score', data, backgroundColor: colors }] },
        plugins: [horizontalLinePlugin],
        options: {
            plugins: {
                horizontalLine: {
                    lines: scenariosToCompare.map(s => ({
                        value: s.value,
                        borderColor: s.color,
                        label: s.label,
                        position: s.position,
                        backgroundColor: s.color
                    }))
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `CRS Score: ${context.parsed.y} (${dataToDisplay[context.dataIndex].drawType})`
                    }
                },
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: false, min: 350, max: yAxisMax },
                x: { title: { display: true, text: 'Draw Date' } }
            }
        }
    });
}

// Mark scenario as achieved
function markAsAchieved(index, scenarioId) {
    const checkbox = document.getElementById(`achieved-${index}`);
    const isChecked = checkbox?.checked || false;
    
    // Save to localStorage
    localStorage.setItem(`achieved-${scenarioId}`, isChecked);
    
    // Update visual status
    updateAchievedStatus(index, isChecked);
}

function updateAchievedStatus(index, isAchieved) {
    const card = document.querySelector(`.scenario-cards .scenario-card:nth-child(${index + 1})`);
    const statusBadge = card?.querySelector('.scenario-status');
    
    if (card && statusBadge) {
        if (isAchieved) {
            card.classList.add('achieved');
            statusBadge.textContent = 'Achieved';
            statusBadge.className = 'scenario-status achieved';
        } else {
            card.classList.remove('achieved');
            const originalStatus = currentScenarios[index]?.status || 'planned';
            statusBadge.textContent = originalStatus.charAt(0).toUpperCase() + originalStatus.slice(1);
            statusBadge.className = `scenario-status ${originalStatus}`;
        }
    }
}

// Recalculate scenarios based on selected improvements
function recalculateWithSelection() {
    if (!currentUserData) return;
    
    // Get which improvements are included
    const includeCheckboxes = document.querySelectorAll('.include-checkbox');
    const includedTypes = [];
    const excludedTypes = [];
    
    includeCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.scenarioType) {
            if (checkbox.checked) {
                includedTypes.push(checkbox.dataset.scenarioType);
            } else {
                excludedTypes.push(checkbox.dataset.scenarioType);
            }
        }
    });
    
    // Create modified user data excluding unchecked improvements
    const modifiedUserData = JSON.parse(JSON.stringify(currentUserData));
    
    if (excludedTypes.includes('english')) {
        modifiedUserData.language.english.target = 0;
        modifiedUserData.language.english.targetDate = null;
    }
    
    if (excludedTypes.includes('french')) {
        modifiedUserData.language.french.target = 0;
        modifiedUserData.language.french.targetDate = null;
    }
    
    if (excludedTypes.includes('education')) {
        modifiedUserData.education.future = null;
    }
    
    // Regenerate scenarios with modified data for score calculation
    const recalculatedScenarios = ScenarioGenerator.generateTimelineScenarios(modifiedUserData);
    
    // But display ALL original scenarios, just update their scores and mark excluded ones
    const allScenarios = ScenarioGenerator.generateTimelineScenarios(currentUserData);
    
    // Update scores for included scenarios
    allScenarios.forEach(scenario => {
        if (scenario.type && excludedTypes.includes(scenario.type)) {
            // Mark as excluded but keep the card
            scenario.excluded = true;
            // Find the matching recalculated scenario to get the updated score
            const matchingRecalc = recalculatedScenarios.find(s => 
                s.name === scenario.name || 
                (s.timeline === scenario.timeline && s.status === scenario.status)
            );
            if (matchingRecalc) {
                scenario.score = matchingRecalc.score;
            }
        } else {
            scenario.excluded = false;
            // Update score from recalculated scenarios
            const matchingRecalc = recalculatedScenarios.find(s => 
                s.name === scenario.name || 
                (s.timeline === scenario.timeline && s.status === scenario.status)
            );
            if (matchingRecalc) {
                scenario.score = matchingRecalc.score;
            }
        }
    });
    
    const newRecommendations = RecommendationsModule.generateRecommendations(recalculatedScenarios, modifiedUserData);
    
    // Store checkbox states by scenario type
    const checkboxStatesByType = {};
    includeCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.scenarioType) {
            checkboxStatesByType[checkbox.dataset.scenarioType] = checkbox.checked;
        }
    });
    
    // Update display with all scenarios (including excluded ones)
    displayEnhancedResults(allScenarios, newRecommendations);
    
    // Restore checkbox states by matching scenario type
    const newCheckboxes = document.querySelectorAll('.include-checkbox');
    newCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.scenarioType && checkboxStatesByType.hasOwnProperty(checkbox.dataset.scenarioType)) {
            checkbox.checked = checkboxStatesByType[checkbox.dataset.scenarioType];
        }
    });
    
    // Update chart based on French qualification
    updateChartAutomatically(includedTypes, recalculatedScenarios);
}

// Render initial chart with all draws and all score lines
function renderInitialChart(scenarios, recommendations) {
    const pnpSelected = document.getElementById('calc_pnp')?.checked || false;
    
    // Check if user has French language scenario
    const hasFrenchScenario = scenarios.some(s => s.type === 'french');
    
    // For initial render, show all draws (including French) if user has any French scenario
    // Otherwise show standard draws only
    let pathwayType = hasFrenchScenario ? 'all' : 'standard';
    
    // Create all scenario lines for the chart
    const scenariosToCompare = scenarios.map(s => ({
        value: s.score,
        label: s.name,
        color: s.status === 'current' ? '#48bb78' : '#4299e1',
        position: s.status === 'current' ? 'start' : 'end'
    }));
    
    renderCRSChart(scenariosToCompare, pnpSelected, pathwayType);
}

// Automatically update chart based on scenario selection
function updateChartAutomatically(includedTypes, scenarios) {
    const pnpSelected = document.getElementById('calc_pnp')?.checked || false;
    const hasFrench = includedTypes.includes('french');
    
    // Determine pathway type for chart
    let pathwayType;
    if (hasFrench) {
        // If French is included, show ALL draws (both French AND general)
        // because having French makes you eligible for both types of draws
        pathwayType = 'all';
    } else {
        // If French is excluded, only show standard draws (no French draws)
        pathwayType = 'standard';
    }
    
    // Create scenarios to compare
    const scenariosToCompare = scenarios.map(s => ({
        value: s.score,
        label: s.name,
        color: s.status === 'current' ? '#48bb78' : '#4299e1',
        position: s.status === 'current' ? 'start' : 'end'
    }));
    
    renderCRSChart(scenariosToCompare, pnpSelected, pathwayType);
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.getEnhancedCalculatorHTML = getEnhancedCalculatorHTML;
    window.initializeEnhancedCalculator = initializeEnhancedCalculator;
    window.calculateEnhancedCRS = calculateEnhancedCRS;
    window.updateChartScenarios = updateChartScenarios;
    window.exportResults = exportResults;
    window.resetCalculator = resetCalculator;
    window.markAsAchieved = markAsAchieved;
    window.recalculateWithSelection = recalculateWithSelection;
}
