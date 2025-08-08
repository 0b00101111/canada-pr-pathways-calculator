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
                        
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #4a5568; margin-bottom: 15px;">English Proficiency</h4>
                            <div class="status-radio-group">
                                <label class="status-radio">
                                    <input type="radio" name="englishStatus" value="completed" checked>
                                    Completed test
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="englishStatus" value="booked">
                                    Test booked
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="englishStatus" value="preparing">
                                    Preparing
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="englishStatus" value="none">
                                    Not planning
                                </label>
                            </div>
                            
                            <div id="englishCompleted" class="language-option">
                                <div class="form-group">
                                    <label>Current English Level (CLB)</label>
                                    <select id="calc_english_clb">
                                        <option value="0">No test / Below CLB 4</option>
                                        <option value="4">CLB 4</option>
                                        <option value="5">CLB 5</option>
                                        <option value="6">CLB 6</option>
                                        <option value="7" selected>CLB 7 (IELTS 6.0 all)</option>
                                        <option value="8">CLB 8</option>
                                        <option value="9">CLB 9 (IELTS 7+)</option>
                                        <option value="10">CLB 10</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="englishBooked" class="language-option" style="display: none;">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Target CLB Score</label>
                                        <select id="calc_english_target">
                                            <option value="7">CLB 7</option>
                                            <option value="8">CLB 8</option>
                                            <option value="9" selected>CLB 9</option>
                                            <option value="10">CLB 10</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Test Date</label>
                                        <input type="date" id="calc_english_test_date">
                                    </div>
                                </div>
                            </div>
                            
                            <div id="englishPreparing" class="language-option" style="display: none;">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Current Estimated CLB</label>
                                        <select id="calc_english_current">
                                            <option value="5">CLB 5</option>
                                            <option value="6">CLB 6</option>
                                            <option value="7" selected>CLB 7</option>
                                            <option value="8">CLB 8</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Target CLB</label>
                                        <select id="calc_english_prep_target">
                                            <option value="7">CLB 7</option>
                                            <option value="8">CLB 8</option>
                                            <option value="9" selected>CLB 9</option>
                                            <option value="10">CLB 10</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Target Date</label>
                                        <input type="month" id="calc_english_target_date">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 style="color: #4a5568; margin-bottom: 15px;">French Proficiency</h4>
                            <div class="status-radio-group">
                                <label class="status-radio">
                                    <input type="radio" name="frenchStatus" value="completed">
                                    Have test results
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="frenchStatus" value="learning">
                                    Currently learning
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="frenchStatus" value="planning">
                                    Planning to learn
                                </label>
                                <label class="status-radio">
                                    <input type="radio" name="frenchStatus" value="none" checked>
                                    No plans
                                </label>
                            </div>
                            
                            <div id="frenchCompleted" class="language-option" style="display: none;">
                                <div class="form-group">
                                    <label>French Level (NCLC)</label>
                                    <select id="calc_french_nclc">
                                        <option value="0">No French</option>
                                        <option value="4">NCLC 4</option>
                                        <option value="5">NCLC 5</option>
                                        <option value="6">NCLC 6</option>
                                        <option value="7">NCLC 7 (TEF B2)</option>
                                        <option value="8">NCLC 8</option>
                                        <option value="9">NCLC 9+</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div id="frenchLearning" class="language-option" style="display: none;">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Current Level</label>
                                        <select id="calc_french_current">
                                            <option value="0">Beginner (A0-A1)</option>
                                            <option value="3">Elementary (A2)</option>
                                            <option value="4">Intermediate (B1)</option>
                                            <option value="5">Upper-Int (B1+)</option>
                                            <option value="6">Advanced (B2-)</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Target NCLC 7 by</label>
                                        <input type="month" id="calc_french_target_date">
                                    </div>
                                </div>
                            </div>
                            
                            <div id="frenchPlanning" class="language-option" style="display: none;">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <label>Start Learning</label>
                                        <input type="month" id="calc_french_start">
                                    </div>
                                    <div class="form-group">
                                        <label>Estimated NCLC 7 (12-18 months)</label>
                                        <input type="month" id="calc_french_estimated" readonly>
                                    </div>
                                </div>
                            </div>
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
    
    // English status radio buttons
    document.querySelectorAll('input[name="englishStatus"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('#englishCompleted, #englishBooked, #englishPreparing').forEach(div => {
                div.style.display = 'none';
            });
            
            if (this.value === 'completed') {
                document.getElementById('englishCompleted').style.display = 'block';
            } else if (this.value === 'booked') {
                document.getElementById('englishBooked').style.display = 'block';
            } else if (this.value === 'preparing') {
                document.getElementById('englishPreparing').style.display = 'block';
            }
        });
    });
    
    // French status radio buttons
    document.querySelectorAll('input[name="frenchStatus"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('#frenchCompleted, #frenchLearning, #frenchPlanning').forEach(div => {
                div.style.display = 'none';
            });
            
            if (this.value === 'completed') {
                document.getElementById('frenchCompleted').style.display = 'block';
            } else if (this.value === 'learning') {
                document.getElementById('frenchLearning').style.display = 'block';
            } else if (this.value === 'planning') {
                document.getElementById('frenchPlanning').style.display = 'block';
            }
        });
    });
    
    // Auto-calculate French learning timeline
    const frenchStartInput = document.getElementById('calc_french_start');
    if (frenchStartInput) {
        frenchStartInput.addEventListener('change', function() {
            if (this.value) {
                const startDate = new Date(this.value);
                startDate.setMonth(startDate.getMonth() + 15); // Default 15 months
                const estimatedInput = document.getElementById('calc_french_estimated');
                if (estimatedInput) {
                    estimatedInput.value = startDate.toISOString().substring(0, 7);
                }
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
        document.getElementById('calc_english_clb').value = '7';
        document.getElementById('calc_studying').checked = true;
        document.getElementById('studyingDetails').classList.add('active');
        document.getElementById('calc_study_location').value = 'canada';
    } else if (journey === 'working') {
        document.getElementById('calc_canadian_work').value = '1';
        document.getElementById('calc_english_clb').value = '8';
        document.getElementById('calc_completed_edu').value = 'bachelor';
    } else if (journey === 'dreaming') {
        document.getElementById('calc_foreign_work').value = '3';
        document.getElementById('calc_english_clb').value = '7';
        document.getElementById('calc_completed_edu').value = 'master';
    }
}

// Store user data globally for charts
let currentScenarios = [];

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

    const languageData = {
        english: { current: parseInt(formData.englishCLB) || 0, target: 0, targetDate: null },
        french: { current: parseInt(formData.frenchNCLC) || 0, target: 0, targetDate: null }
    };
    if (document.querySelector('input[name="frenchStatus"]:checked')?.value !== 'none' && document.querySelector('input[name="frenchStatus"]:checked')?.value !== 'completed') {
        languageData.french.target = 7;
        languageData.french.targetDate = formData.frenchTargetDate || formData.frenchEstimatedDate;
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
    
    currentScenarios = ScenarioGenerator.generateTimelineScenarios(userData);
    const recommendations = RecommendationsModule.generateRecommendations(currentScenarios, userData);
    
    displayEnhancedResults(currentScenarios, recommendations);
}


// Gather form data
function gatherFormData() {
    return {
        dob: document.getElementById('calc_dob')?.value,
        married: document.getElementById('calc_marital')?.value === 'married',
        completedEducation: document.getElementById('calc_completed_edu')?.value,
        canadianEducation: document.getElementById('calc_canadian_edu')?.value,
        currentlyStudying: document.getElementById('calc_studying')?.checked,
        studyingDegree: document.getElementById('calc_studying_degree')?.value,
        graduationDate: document.getElementById('calc_graduation_date')?.value,
        studyLocation: document.getElementById('calc_study_location')?.value,
        englishCLB: document.getElementById('calc_english_clb')?.value,
        frenchStatus: document.querySelector('input[name="frenchStatus"]:checked')?.value,
        frenchNCLC: document.getElementById('calc_french_nclc')?.value,
        frenchTargetDate: document.getElementById('calc_french_target_date')?.value,
        frenchEstimatedDate: document.getElementById('calc_french_estimated')?.value,
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
                const scoreColor = scenario.score >= 500 ? '#48bb78' : 
                                  scenario.score >= 470 ? '#ed8936' : 
                                  scenario.score >= 440 ? '#f6ad55' : '#e53e3e';
                
                return `
                    <div class="scenario-card ${scenario.status}">
                        <div class="scenario-header">
                            <div class="scenario-status ${scenario.status}">
                                ${scenario.status.charAt(0).toUpperCase() + scenario.status.slice(1)}
                            </div>
                        </div>
                        <h4 style="color: #2d3748; margin: 10px 0;">
                            ${scenario.icon} ${scenario.name}
                        </h4>
                        <div class="scenario-score" style="color: ${scoreColor};">
                            ${scenario.score}
                        </div>
                        <div class="scenario-timeline">
                            📅 ${scenario.timeline}
                        </div>
                        ${scenario.status !== 'current' ? `
                        <div class="checkbox-group" style="margin-top: 15px;">
                            <input type="checkbox" id="compare-scenario-${index}" onchange="updateChartScenarios()" data-score="${scenario.score}" data-label="${scenario.name.replace(/"/g, '&quot;')}" data-is-french="${scenario.improvements.includes('French proficiency')}">
                            <label for="compare-scenario-${index}" style="margin: 0;">Compare on Chart</label>
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
    updateChartScenarios();
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
    const scenarios = document.querySelectorAll('.scenario-card');
    let exportText = '=== CANADA PR CALCULATOR RESULTS ===\n';
    exportText += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    exportText += 'YOUR SCENARIOS:\n';
    scenarios.forEach(card => {
        const name = card.querySelector('h4')?.textContent || '';
        const score = card.querySelector('.scenario-score')?.textContent || '';
        const timeline = card.querySelector('.scenario-timeline')?.textContent || '';
        exportText += `${name}: ${score} points (${timeline})\n`;
    });

    exportText += '\nNEXT STEPS:\n';
    exportText += '1. Take official language tests (IELTS/CELPIP for English, TEF/TCF for French)\n';
    exportText += '2. Get Educational Credential Assessment (ECA) for foreign degrees\n';
    exportText += '3. Create Express Entry profile when ready\n';
    exportText += '4. Monitor draw scores and requirements\n';

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CRS_Score_Timeline_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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

// Make functions globally available
if (typeof window !== 'undefined') {
    window.getEnhancedCalculatorHTML = getEnhancedCalculatorHTML;
    window.initializeEnhancedCalculator = initializeEnhancedCalculator;
    window.calculateEnhancedCRS = calculateEnhancedCRS;
    window.updateChartScenarios = updateChartScenarios;
    window.exportResults = exportResults;
    window.resetCalculator = resetCalculator;
}