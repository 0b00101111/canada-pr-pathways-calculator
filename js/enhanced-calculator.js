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
                    <!-- Personal Information -->
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
                    
                    <!-- Education Section -->
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
                    
                    <!-- Language Section -->
                    <div class="form-section">
                        <h3>🗣️ Language Skills</h3>
                        
                        <!-- English -->
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
                        
                        <!-- French -->
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
                    
                    <!-- Work Experience -->
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
                    
                    <!-- Additional Factors -->
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
                
                <!-- Results Section -->
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
            
            // Update styling
            this.parentElement.parentElement.querySelectorAll('.status-radio').forEach(label => {
                label.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
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
            
            // Update styling
            this.parentElement.parentElement.querySelectorAll('.status-radio').forEach(label => {
                label.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
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
    
    // Set min dates for future events
    const todayStr = today.toISOString().split('T')[0];
    const todayMonth = today.toISOString().substring(0, 7);
    
    document.querySelectorAll('input[type="date"], input[type="month"]').forEach(input => {
        if (input.id !== 'calc_dob') {
            if (input.type === 'date') {
                input.min = todayStr;
            } else {
                input.min = todayMonth;
            }
        }
    });
    
    // Pre-fill based on journey
    prefillByJourney(journey);
}

// Pre-fill form based on journey type
function prefillByJourney(journey) {
    if (journey === 'studying') {
        // Pre-select likely values for students
        document.getElementById('calc_completed_edu').value = 'bachelor';
        document.getElementById('calc_canadian_edu').value = '3year';
        document.getElementById('calc_english_clb').value = '7';
        document.getElementById('calc_studying').checked = true;
        document.getElementById('studyingDetails').classList.add('active');
        document.getElementById('calc_study_location').value = 'canada';
        
    } else if (journey === 'working') {
        // Pre-select likely values for workers
        document.getElementById('calc_canadian_work').value = '1';
        document.getElementById('calc_english_clb').value = '8';
        document.getElementById('calc_completed_edu').value = 'bachelor';
        
    } else if (journey === 'dreaming') {
        // Pre-select typical foreign applicant values
        document.getElementById('calc_foreign_work').value = '3';
        document.getElementById('calc_english_clb').value = '7';
        document.getElementById('calc_completed_edu').value = 'master';
    }
}

// Store user data globally for advanced analysis
let currentUserData = null;

// Main calculation function
function calculateEnhancedCRS() {
    // Gather all form data
    const formData = gatherFormData();
    
    // Parse education and language progress
    const educationData = EducationModule.parseEducationStatus({
        completedDegree: formData.completedEducation,
        currentlyStudying: formData.currentlyStudying,
        studyingDegree: formData.studyingDegree,
        expectedGraduation: formData.graduationDate,
        studyLocation: formData.studyLocation
    });
    
    const languageData = LanguageModule.parseLanguageProgress({
        englishStatus: formData.englishStatus,
        englishCLB: formData.englishCLB,
        englishTargetCLB: formData.englishTargetCLB,
        englishTestDate: formData.englishTestDate,
        englishCurrentCLB: formData.englishCurrentCLB,
        englishTargetDate: formData.englishTargetDate,
        englishTargetCLB: formData.englishPreparingTarget,
        
        frenchStatus: formData.frenchStatus,
        frenchNCLC: formData.frenchNCLC,
        frenchCurrentLevel: formData.frenchCurrentLevel,
        frenchTargetDate: formData.frenchTargetDate,
        frenchEstimatedDate: formData.frenchEstimatedDate
    });
    
    // Calculate age
    const age = AgeModule.calculateAge(formData.dob);
    
    // Prepare user data
    const userData = {
        age: age,
        married: formData.married,
        education: educationData,
        language: languageData,
        foreignWork: formData.foreignWork,
        canadianWork: formData.canadianWork,
        canadianEducation: formData.canadianEducation,
        futureWork: formData.futureWork,
        sibling: formData.sibling,
        pnp: formData.pnp,
        spouse: formData.married ? {
            education: formData.spouseEducation,
            englishCLB: formData.spouseEnglish,
            canadianWork: formData.spouseWork
        } : null,
        englishCLB: languageData.english.current,
        frenchNCLC: languageData.french.current
    };
    
    // Store for advanced analysis
    currentUserData = userData;
    
    // Generate scenarios
    const scenarios = ScenarioGenerator.generateTimelineScenarios(userData);
    
    // Generate recommendations
    const recommendations = RecommendationsModule.generateRecommendations(scenarios, userData);
    
    // Display results
    displayEnhancedResults(scenarios, recommendations, userData);
}

// Gather form data
function gatherFormData() {
    return {
        // Personal
        dob: document.getElementById('calc_dob')?.value,
        married: document.getElementById('calc_marital')?.value === 'married',
        
        // Education
        completedEducation: document.getElementById('calc_completed_edu')?.value,
        canadianEducation: document.getElementById('calc_canadian_edu')?.value,
        currentlyStudying: document.getElementById('calc_studying')?.checked,
        studyingDegree: document.getElementById('calc_studying_degree')?.value,
        graduationDate: document.getElementById('calc_graduation_date')?.value,
        studyLocation: document.getElementById('calc_study_location')?.value,
        
        // English
        englishStatus: document.querySelector('input[name="englishStatus"]:checked')?.value,
        englishCLB: document.getElementById('calc_english_clb')?.value,
        englishTargetCLB: document.getElementById('calc_english_target')?.value,
        englishTestDate: document.getElementById('calc_english_test_date')?.value,
        englishCurrentCLB: document.getElementById('calc_english_current')?.value,
        englishPreparingTarget: document.getElementById('calc_english_prep_target')?.value,
        englishTargetDate: document.getElementById('calc_english_target_date')?.value,
        
        // French
        frenchStatus: document.querySelector('input[name="frenchStatus"]:checked')?.value,
        frenchNCLC: document.getElementById('calc_french_nclc')?.value,
        frenchCurrentLevel: document.getElementById('calc_french_current')?.value,
        frenchTargetDate: document.getElementById('calc_french_target_date')?.value,
        frenchEstimatedDate: document.getElementById('calc_french_estimated')?.value,
        
        // Work
        foreignWork: parseInt(document.getElementById('calc_foreign_work')?.value || 0),
        canadianWork: parseInt(document.getElementById('calc_canadian_work')?.value || 0),
        futureWork: document.getElementById('calc_future_work')?.checked ? {
            oneYear: document.getElementById('calc_one_year_work')?.value,
            twoYears: document.getElementById('calc_two_year_work')?.value
        } : null,
        
        // Additional
        sibling: document.getElementById('calc_sibling')?.checked,
        pnp: document.getElementById('calc_pnp')?.checked,
        
        // Spouse
        spouseEducation: document.getElementById('calc_spouse_edu')?.value,
        spouseEnglish: parseInt(document.getElementById('calc_spouse_english')?.value || 0),
        spouseWork: parseInt(document.getElementById('calc_spouse_work')?.value || 0)
    };
}

// Display enhanced results
function displayEnhancedResults(scenarios, recommendations, userData) {
    const resultsDiv = document.getElementById('enhancedResults');
    if (!resultsDiv) return;
    
    resultsDiv.classList.add('active');
    
    let html = `
        <h3 style="text-align: center; color: #2d3748; margin: 30px 0;">Your CRS Score Timeline</h3>
        
        <!-- Timeline Visualization -->
        <div style="background: linear-gradient(135deg, #f7fafc 0%, #ffffff 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <div style="position: relative; height: 80px; margin: 20px 0;">
                <div style="position: absolute; top: 50%; left: 0; right: 0; height: 4px; background: #e2e8f0; transform: translateY(-50%);"></div>
                ${scenarios.map((scenario, index) => {
                    const position = (index / (scenarios.length - 1)) * 100;
                    const color = scenario.status === 'current' ? '#48bb78' : 
                                 scenario.status === 'in-progress' ? '#ed8936' : '#4299e1';
                    return `
                        <div style="position: absolute; left: ${position}%; top: 50%; transform: translate(-50%, -50%);">
                            <div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                                ${scenario.icon}
                            </div>
                            <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 0.8em; font-weight: 600;">
                                ${scenario.score}
                            </div>
                            <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 0.75em; color: #718096;">
                                ${scenario.timeline}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <!-- Scenario Cards -->
        <div class="scenario-cards">
            ${scenarios.map(scenario => {
                const scoreColor = scenario.score >= 500 ? '#48bb78' : 
                                  scenario.score >= 470 ? '#ed8936' : 
                                  scenario.score >= 440 ? '#f6ad55' : '#e53e3e';
                
                return `
                    <div class="scenario-card ${scenario.status}">
                        <div class="scenario-status ${scenario.status}">
                            ${scenario.status === 'current' ? 'Current' : 
                              scenario.status === 'in-progress' ? 'In Progress' : 'Planned'}
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
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                            ${scenario.score >= 480 ? 
                                '<div style="color: #48bb78;">✅ Competitive for Express Entry</div>' :
                                scenario.score >= 430 && scenario.frenchNCLC >= 7 ?
                                '<div style="color: #4299e1;">✅ Eligible for French draws</div>' :
                                '<div style="color: #e53e3e;">⚠️ Below typical cutoff</div>'
                            }
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <!-- Recommendations -->
        <div style="margin-top: 30px;">
            ${recommendations.map(rec => `
                <div class="info-box ${rec.type === 'success' ? 'success' : rec.type === 'warning' ? 'warning' : ''}">
                    <h4>${rec.title}</h4>
                    <p>${rec.message}</p>
                </div>
            `).join('')}
        </div>
        
        <!-- Action Buttons -->
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="showAdvancedAnalysis()" style="padding: 14px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; font-size: 1em; font-weight: 600; cursor: pointer; margin: 0 10px;">
                📊 View All Scenario Combinations
            </button>
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
}

// Export results function
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
    
    // Create and download file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CRS_Score_Timeline_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Reset calculator function
function resetCalculator() {
    document.getElementById('enhancedCalcForm')?.reset();
    document.getElementById('enhancedResults')?.classList.remove('active');
    const resultsDiv = document.getElementById('enhancedResults');
    if (resultsDiv) resultsDiv.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function showAdvancedAnalysis() {
    if (!currentUserData) {
        alert('Please calculate your score first before viewing advanced analysis.');
        return;
    }
    
    // Generate all possible scenarios
    const advancedScenarios = ScenarioGenerator.generateAdvancedScenarios(currentUserData);
    
    // Display in modal
    displayAdvancedAnalysisModal(advancedScenarios);
}

// Display Advanced Analysis Modal
function displayAdvancedAnalysisModal(scenarios) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'advancedAnalysisModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        overflow-y: auto;
        padding: 20px;
    `;
    
    // Calculate summary statistics
    const summaryStats = calculateAdvancedSummary(scenarios);
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 1400px;
        margin: 0 auto;
        background: white;
        border-radius: 15px;
        padding: 30px;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h2 style="color: #2d3748; margin: 0;">🇨🇦 Advanced Scenario Analysis - All Combinations</h2>
            <button onclick="closeAdvancedAnalysis()" style="background: #e53e3e; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">✕ Close</button>
        </div>
        
        <!-- Summary Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.1em; opacity: 0.9;">Highest Score</h3>
                <div style="font-size: 2.5em; font-weight: bold;">${summaryStats.highest.total}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">${summaryStats.highest.description}</div>
            </div>
            <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 20px; border-radius: 10px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.1em; opacity: 0.9;">Current Score</h3>
                <div style="font-size: 2.5em; font-weight: bold;">${summaryStats.current.total}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">Your starting point</div>
            </div>
            <div style="background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); color: white; padding: 20px; border-radius: 10px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.1em; opacity: 0.9;">French Impact</h3>
                <div style="font-size: 2.5em; font-weight: bold;">+${summaryStats.frenchImpact}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">Average point gain</div>
            </div>
            <div style="background: linear-gradient(135deg, #9f7aea 0%, #805ad5 100%); color: white; padding: 20px; border-radius: 10px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.1em; opacity: 0.9;">Scenarios Above 480</h3>
                <div style="font-size: 2.5em; font-weight: bold;">${summaryStats.above480}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">Out of ${scenarios.length} total</div>
            </div>
        </div>
        
        <!-- Filters -->
        <div style="margin: 20px 0; padding: 15px; background: #f7fafc; border-radius: 8px; display: flex; gap: 20px; flex-wrap: wrap;">
            <div>
                <label style="font-weight: 600; margin-right: 10px; color: #4a5568;">Timeframe:</label>
                <select id="advTimeFilter" onchange="filterAdvancedTable()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e0;">
                    <option value="all">All Times</option>
                    <option value="Current">Current Only</option>
                    <option value="6 months">6 Months</option>
                    <option value="1 year">1 Year</option>
                    <option value="2 years">2 Years</option>
                </select>
            </div>
            <div>
                <label style="font-weight: 600; margin-right: 10px; color: #4a5568;">Application:</label>
                <select id="advAppFilter" onchange="filterAdvancedTable()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e0;">
                    <option value="all">All Types</option>
                    <option value="Solo">Solo Only</option>
                    <option value="Joint">Joint Only</option>
                </select>
            </div>
            <div>
                <label style="font-weight: 600; margin-right: 10px; color: #4a5568;">Min Score:</label>
                <select id="advScoreFilter" onchange="filterAdvancedTable()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e0;">
                    <option value="0">Show All</option>
                    <option value="450">450+</option>
                    <option value="480">480+</option>
                    <option value="500">500+</option>
                    <option value="520">520+</option>
                </select>
            </div>
        </div>
        
        <!-- Table Container -->
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
                <thead style="background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: white; position: sticky; top: 0; z-index: 10;">
                    <tr>
                        <th rowspan="2" style="padding: 10px; border: 1px solid #4a5568;">#</th>
                        <th rowspan="2" style="padding: 10px; border: 1px solid #4a5568;">Time</th>
                        <th rowspan="2" style="padding: 10px; border: 1px solid #4a5568;">Type</th>
                        <th colspan="${currentUserData.married ? '4' : '2'}" style="padding: 10px; border: 1px solid #4a5568; background: #2d3748;">Variables</th>
                        <th colspan="9" style="padding: 10px; border: 1px solid #4a5568; background: #2d3748;">Your Points</th>
                        ${currentUserData.married ? '<th colspan="3" style="padding: 10px; border: 1px solid #4a5568; background: #2d3748;">Spouse Points</th>' : ''}
                        <th rowspan="2" style="padding: 10px; border: 1px solid #4a5568; background: #48bb78;">Total CRS</th>
                    </tr>
                    <tr>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Fr7</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">CA Work</th>
                        ${currentUserData.married ? '<th style="padding: 8px; border: 1px solid #4a5568;">Sp Fr7</th>' : ''}
                        ${currentUserData.married ? '<th style="padding: 8px; border: 1px solid #4a5568;">Sp Work</th>' : ''}
                        <th style="padding: 8px; border: 1px solid #4a5568;">Age</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Edu</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Eng</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Fr</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">CA Exp</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Skill</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">CA Edu</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Fr Bonus</th>
                        <th style="padding: 8px; border: 1px solid #4a5568;">Sibling</th>
                        ${currentUserData.married ? '<th style="padding: 8px; border: 1px solid #4a5568;">Edu</th>' : ''}
                        ${currentUserData.married ? '<th style="padding: 8px; border: 1px solid #4a5568;">Lang</th>' : ''}
                        ${currentUserData.married ? '<th style="padding: 8px; border: 1px solid #4a5568;">Work</th>' : ''}
                    </tr>
                </thead>
                <tbody id="advancedTableBody">
                    ${generateAdvancedTableRows(scenarios)}
                </tbody>
            </table>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f7fafc; border-radius: 8px;">
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; margin: 5px;">
                    <div style="width: 20px; height: 20px; background: #48bb78; border-radius: 4px; margin-right: 8px;"></div>
                    <span>520+ (Excellent)</span>
                </div>
                <div style="display: flex; align-items: center; margin: 5px;">
                    <div style="width: 20px; height: 20px; background: #ed8936; border-radius: 4px; margin-right: 8px;"></div>
                    <span>480-519 (Competitive)</span>
                </div>
                <div style="display: flex; align-items: center; margin: 5px;">
                    <div style="width: 20px; height: 20px; background: #718096; border-radius: 4px; margin-right: 8px;"></div>
                    <span>Below 480</span>
                </div>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Generate table rows for advanced analysis
function generateAdvancedTableRows(scenarios) {
    return scenarios.map(scenario => {
        const scoreClass = scenario.total >= 520 ? 'background: #48bb78; color: white;' :
                          scenario.total >= 480 ? 'background: #ed8936; color: white;' :
                          'background: #718096; color: white;';
        
        const isCurrent = scenario.timeframe === 'Current';
        const rowStyle = isCurrent ? 'background: #fef5e7;' : '';
        
        return `
            <tr class="advanced-row" data-timeframe="${scenario.timeframe}" data-type="${scenario.type}" data-score="${scenario.total}" style="${rowStyle}">
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">${scenario.id}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${scenario.timeframe}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;"><strong>${scenario.type}</strong></td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; color: ${scenario.yourFrench ? '#48bb78' : '#e53e3e'};">${scenario.yourFrench ? '✓' : '✗'}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.yourCAWork}</td>
                ${currentUserData.married ? `<td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; color: ${scenario.spouseFrench ? '#48bb78' : '#e53e3e'};">${scenario.spouseFrench ? '✓' : '✗'}</td>` : ''}
                ${currentUserData.married ? `<td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.spouseCAWork}</td>` : ''}
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.age}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.education}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.firstLangEnglish}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.secondLangFrench}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.canadianExp}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.skillTransfer}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.canadianEducation}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.frenchBonus}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.sibling}</td>
                ${currentUserData.married ? `<td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.spouseEducation}</td>` : ''}
                ${currentUserData.married ? `<td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.spouseLanguage}</td>` : ''}
                ${currentUserData.married ? `<td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center;">${scenario.breakdown.spouseWork}</td>` : ''}
                <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; font-size: 1.1em; text-align: center; ${scoreClass}">${scenario.total}</td>
            </tr>
        `;
    }).join('');
}

// Calculate summary statistics for advanced analysis
function calculateAdvancedSummary(scenarios) {
    const highest = scenarios[0]; // Already sorted by score
    const current = scenarios.find(s => s.timeframe === 'Current' && !s.yourFrench && s.yourCAWork === 0) || scenarios[0];
    
    // Calculate French impact
    const withFrench = scenarios.filter(s => s.yourFrench || s.spouseFrench);
    const withoutFrench = scenarios.filter(s => !s.yourFrench && !s.spouseFrench);
    const avgWithFrench = withFrench.length > 0 ? 
        Math.round(withFrench.reduce((sum, s) => sum + s.total, 0) / withFrench.length) : 0;
    const avgWithoutFrench = withoutFrench.length > 0 ? 
        Math.round(withoutFrench.reduce((sum, s) => sum + s.total, 0) / withoutFrench.length) : 0;
    
    const above480 = scenarios.filter(s => s.total >= 480).length;
    
    return {
        highest: {
            total: highest.total,
            description: `${highest.type}, ${highest.timeframe}`
        },
        current: {
            total: current.total
        },
        frenchImpact: avgWithFrench - avgWithoutFrench,
        above480: above480
    };
}

// Filter advanced table
function filterAdvancedTable() {
    const timeFilter = document.getElementById('advTimeFilter')?.value || 'all';
    const appFilter = document.getElementById('advAppFilter')?.value || 'all';
    const scoreFilter = parseInt(document.getElementById('advScoreFilter')?.value || 0);
    
    const rows = document.querySelectorAll('#advancedTableBody .advanced-row');
    
    rows.forEach(row => {
        const timeframe = row.dataset.timeframe;
        const type = row.dataset.type;
        const score = parseInt(row.dataset.score);
        
        let show = true;
        
        if (timeFilter !== 'all' && timeframe !== timeFilter) show = false;
        if (appFilter !== 'all' && type !== appFilter) show = false;
        if (score < scoreFilter) show = false;
        
        row.style.display = show ? '' : 'none';
    });
}

// Close advanced analysis modal
function closeAdvancedAnalysis() {
    const modal = document.getElementById('advancedAnalysisModal');
    if (modal) {
        modal.remove();
    }
}

// Make functions globally available (must be at the end after all functions are defined)
if (typeof window !== 'undefined') {
    window.getEnhancedCalculatorHTML = getEnhancedCalculatorHTML;
    window.initializeEnhancedCalculator = initializeEnhancedCalculator;
    window.calculateEnhancedCRS = calculateEnhancedCRS;
    window.showAdvancedAnalysis = showAdvancedAnalysis;
    window.closeAdvancedAnalysis = closeAdvancedAnalysis;
    window.filterAdvancedTable = filterAdvancedTable;
    window.exportResults = exportResults;
    window.resetCalculator = resetCalculator;
    
    // Debug log to confirm loading
    console.log('Enhanced calculator functions loaded successfully');
}