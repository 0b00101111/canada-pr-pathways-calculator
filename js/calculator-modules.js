// calculator-modules.js
// Core modules for the enhanced CRS calculator

// Education Module
const EducationModule = {
    parseEducationStatus: function(data) {
        if (data.currentlyStudying) {
            return {
                current: data.completedDegree,
                future: {
                    degree: data.studyingDegree,
                    graduationDate: data.expectedGraduation,
                    location: data.studyLocation
                }
            };
        }
        return { current: data.completedDegree, future: null };
    },
    
    calculateEducationPoints: function(degree, isWithSpouse) {
        const points = {
            'none': { single: 0, married: 0 },
            'diploma1': { single: 90, married: 84 },
            'diploma2': { single: 98, married: 91 },
            'bachelor': { single: 120, married: 112 },
            'two-or-more': { single: 128, married: 119 },
            'master': { single: 135, married: 126 },
            'phd': { single: 150, married: 140 }
        };
        return points[degree] ? 
            (isWithSpouse ? points[degree].married : points[degree].single) : 0;
    },
    
    getCanadianEducationBonus: function(canadianEdu) {
        if (canadianEdu === '3year') return 30;
        if (canadianEdu === '1-2year') return 15;
        return 0;
    }
};

// Language Module
const LanguageModule = {
    parseLanguageProgress: function(data) {
        const result = {
            english: { current: 0, target: 0, targetDate: null },
            french: { current: 0, target: 0, targetDate: null }
        };
        
        // Parse English status
        if (data.englishStatus === 'completed') {
            result.english.current = parseInt(data.englishCLB) || 0;
        } else if (data.englishStatus === 'booked') {
            result.english.current = 6; // Assume basic level
            result.english.target = parseInt(data.englishTargetCLB) || 9;
            result.english.targetDate = data.englishTestDate;
        } else if (data.englishStatus === 'preparing') {
            result.english.current = parseInt(data.englishCurrentCLB) || 6;
            result.english.target = parseInt(data.englishTargetCLB) || 9;
            result.english.targetDate = data.englishTargetDate;
        }
        
        // Parse French status
        if (data.frenchStatus === 'completed') {
            result.french.current = parseInt(data.frenchNCLC) || 0;
        } else if (data.frenchStatus === 'learning') {
            result.french.current = parseInt(data.frenchCurrentLevel) || 0;
            result.french.target = 7;
            result.french.targetDate = data.frenchTargetDate;
        } else if (data.frenchStatus === 'planning') {
            result.french.current = 0;
            result.french.target = 7;
            result.french.targetDate = data.frenchEstimatedDate;
        }
        
        return result;
    },
    
    calculateLanguagePoints: function(englishCLB, frenchNCLC, isWithSpouse) {
        let points = 0;
        
        // English points (first language)
        const engTable = {
            single: [0, 0, 0, 0, 6, 6, 9, 17, 23, 31, 34],
            married: [0, 0, 0, 0, 6, 6, 8, 16, 22, 29, 32]
        };
        const engIndex = Math.min(englishCLB, 10);
        points += (isWithSpouse ? engTable.married[engIndex] : engTable.single[engIndex]) * 4;
        
        // French points (as second language)
        if (frenchNCLC >= 5) {
            const frPoints = Math.min((frenchNCLC - 4) * 2, 6);
            points += frPoints * 4;
        }
        
        return points;
    },
    
    getFrenchBonus: function(englishCLB, frenchNCLC) {
        if (frenchNCLC >= 7 && englishCLB >= 5) return 50;
        if (frenchNCLC >= 7 && englishCLB < 5) return 25;
        return 0;
    }
};

// Work Experience Module
const WorkExperienceModule = {
    calculateWorkPoints: function(canadianWork, isWithSpouse) {
        const workTable = {
            single: [0, 40, 53, 64, 72, 80],
            married: [0, 35, 46, 56, 63, 70]
        };
        const index = Math.min(canadianWork, 5);
        return isWithSpouse ? workTable.married[index] : workTable.single[index];
    },
    
    calculateSkillTransferability: function(data) {
        let points = 0;
        
        // Education + Language
        if (data.englishCLB >= 9 && ['bachelor', 'two-or-more', 'master', 'phd'].includes(data.education)) {
            points += 50;
        } else if (data.englishCLB >= 7 && ['bachelor', 'two-or-more', 'master', 'phd'].includes(data.education)) {
            points += 25;
        }
        
        // Foreign work + Language
        if (data.foreignWork >= 3 && data.englishCLB >= 9) {
            points += 50;
        } else if (data.foreignWork >= 3 && data.englishCLB >= 7) {
            points += 25;
        } else if (data.foreignWork >= 1 && data.englishCLB >= 9) {
            points += 25;
        } else if (data.foreignWork >= 1 && data.englishCLB >= 7) {
            points += 13;
        }
        
        // Cap at 100
        return Math.min(points, 100);
    }
};

// Age Module
const AgeModule = {
    calculateAge: function(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    },
    
    calculateAgePoints: function(age, isWithSpouse) {
        const ageTable = {
            single: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,105,110,110,110,110,110,110,110,110,110,110,105,99,94,88,83,77,72,66,61,55,50,39,28,17,6,0],
            married: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,95,100,100,100,100,100,100,100,100,100,100,95,90,85,80,75,70,65,60,55,50,45,35,25,15,5,0]
        };
        const index = Math.min(age, 45);
        return isWithSpouse ? ageTable.married[index] : ageTable.single[index];
    },
    
    projectAgeAtDate: function(currentAge, futureDate) {
        const today = new Date();
        const future = new Date(futureDate);
        const yearsDiff = (future - today) / (365.25 * 24 * 60 * 60 * 1000);
        return Math.floor(currentAge + yearsDiff);
    }
};

// Spouse Module
const SpouseModule = {
    calculateSpousePoints: function(spouseData) {
        let points = 0;
        
        // Education
        const eduPoints = {
            'none': 0,
            'diploma': 7,
            'bachelor': 8,
            'master': 10,
            'phd': 10
        };
        points += eduPoints[spouseData.education] || 0;
        
        // Language
        if (spouseData.englishCLB >= 9) {
            points += 20;
        } else if (spouseData.englishCLB >= 7) {
            points += 12;
        } else if (spouseData.englishCLB >= 6) {
            points += 8;
        } else if (spouseData.englishCLB >= 4) {
            points += 4;
        }
        
        // Work experience
        if (spouseData.canadianWork >= 3) {
            points += 10;
        } else if (spouseData.canadianWork === 2) {
            points += 7;
        } else if (spouseData.canadianWork === 1) {
            points += 5;
        }
        
        return points;
    }
};

// Scenario Generator Module
const ScenarioGenerator = {
    generateTimelineScenarios: function(userData) {
        const scenarios = [];
        const today = new Date();
        
        // Current state scenario
        const currentScore = this.calculateCRSForScenario({
            ...userData,
            education: userData.education.current,
            englishCLB: userData.language.english.current,
            frenchNCLC: userData.language.french.current,
            canadianWork: userData.canadianWork,
            age: userData.age
        });
        
        scenarios.push({
            name: 'Current Status',
            date: today,
            education: userData.education.current,
            englishCLB: userData.language.english.current,
            frenchNCLC: userData.language.french.current,
            canadianWork: userData.canadianWork,
            timeline: 'Today',
            score: currentScore,
            status: 'current',
            icon: '📍',
            improvements: []
        });
        
        // English improvement scenario
        if (userData.language.english.targetDate && userData.language.english.target > userData.language.english.current) {
            const futureAge = AgeModule.projectAgeAtDate(userData.age, userData.language.english.targetDate);
            const englishScore = this.calculateCRSForScenario({
                ...userData,
                education: userData.education.current,
                englishCLB: userData.language.english.target,
                frenchNCLC: userData.language.french.current,
                canadianWork: userData.canadianWork,
                age: futureAge
            });
            
            scenarios.push({
                name: `With English CLB ${userData.language.english.target}`,
                date: new Date(userData.language.english.targetDate),
                education: userData.education.current,
                englishCLB: userData.language.english.target,
                frenchNCLC: userData.language.french.current,
                canadianWork: userData.canadianWork,
                timeline: this.formatDate(userData.language.english.targetDate),
                score: englishScore,
                status: 'in-progress',
                icon: '🗣️',
                improvements: ['English proficiency']
            });
        }
        
        // Education completion scenario
        if (userData.education.future) {
            const futureAge = AgeModule.projectAgeAtDate(userData.age, userData.education.future.graduationDate);
            const gradScore = this.calculateCRSForScenario({
                ...userData,
                education: userData.education.future.degree,
                englishCLB: userData.language.english.target || userData.language.english.current,
                frenchNCLC: userData.language.french.current,
                canadianWork: userData.canadianWork,
                age: futureAge,
                canadianEducation: userData.education.future.location === 'canada' ? '3year' : userData.canadianEducation
            });
            
            scenarios.push({
                name: 'After Graduation',
                date: new Date(userData.education.future.graduationDate),
                education: userData.education.future.degree,
                englishCLB: userData.language.english.target || userData.language.english.current,
                frenchNCLC: userData.language.french.current,
                canadianWork: userData.canadianWork,
                timeline: this.formatDate(userData.education.future.graduationDate),
                score: gradScore,
                status: 'in-progress',
                icon: '🎓',
                improvements: ['Higher education', userData.education.future.location === 'canada' ? 'Canadian education' : null].filter(Boolean)
            });
        }
        
        // French achievement scenario
        if (userData.language.french.targetDate && userData.language.french.target === 7) {
            const futureAge = AgeModule.projectAgeAtDate(userData.age, userData.language.french.targetDate);
            const frenchScore = this.calculateCRSForScenario({
                ...userData,
                education: userData.education.future?.degree || userData.education.current,
                englishCLB: userData.language.english.target || userData.language.english.current,
                frenchNCLC: 7,
                canadianWork: userData.canadianWork,
                age: futureAge,
                canadianEducation: userData.education.future?.location === 'canada' ? '3year' : userData.canadianEducation
            });
            
            scenarios.push({
                name: 'With French NCLC 7',
                date: new Date(userData.language.french.targetDate),
                education: userData.education.future?.degree || userData.education.current,
                englishCLB: userData.language.english.target || userData.language.english.current,
                frenchNCLC: 7,
                canadianWork: userData.canadianWork,
                timeline: this.formatDate(userData.language.french.targetDate),
                score: frenchScore,
                status: 'planned',
                icon: '🇫🇷',
                improvements: ['French proficiency', 'Bilingual bonus']
            });
        }
        
        // Work experience scenarios
        if (userData.futureWork) {
            if (userData.futureWork.oneYear && userData.canadianWork < 1) {
                const futureAge = AgeModule.projectAgeAtDate(userData.age, userData.futureWork.oneYear);
                const workScore = this.calculateCRSForScenario({
                    ...userData,
                    education: userData.education.future?.degree || userData.education.current,
                    englishCLB: userData.language.english.target || userData.language.english.current,
                    frenchNCLC: userData.language.french.target === 7 ? 7 : userData.language.french.current,
                    canadianWork: 1,
                    age: futureAge,
                    canadianEducation: userData.education.future?.location === 'canada' ? '3year' : userData.canadianEducation
                });
                
                scenarios.push({
                    name: 'With 1 Year Canadian Experience',
                    date: new Date(userData.futureWork.oneYear),
                    canadianWork: 1,
                    timeline: this.formatDate(userData.futureWork.oneYear),
                    score: workScore,
                    status: 'planned',
                    icon: '💼',
                    improvements: ['Canadian work experience']
                });
            }
            
            if (userData.futureWork.twoYears && userData.canadianWork < 2) {
                const futureAge = AgeModule.projectAgeAtDate(userData.age, userData.futureWork.twoYears);
                const workScore2 = this.calculateCRSForScenario({
                    ...userData,
                    education: userData.education.future?.degree || userData.education.current,
                    englishCLB: userData.language.english.target || userData.language.english.current,
                    frenchNCLC: userData.language.french.target === 7 ? 7 : userData.language.french.current,
                    canadianWork: 2,
                    age: futureAge,
                    canadianEducation: userData.education.future?.location === 'canada' ? '3year' : userData.canadianEducation
                });
                
                scenarios.push({
                    name: 'With 2 Years Canadian Experience',
                    date: new Date(userData.futureWork.twoYears),
                    canadianWork: 2,
                    timeline: this.formatDate(userData.futureWork.twoYears),
                    score: workScore2,
                    status: 'planned',
                    icon: '💼',
                    improvements: ['2 years Canadian experience']
                });
            }
        }
        
        // Sort by date
        scenarios.sort((a, b) => a.date - b.date);
        
        return scenarios;
    },
    
    calculateCRSForScenario: function(data) {
        let score = 0;
        
        // Age points
        score += AgeModule.calculateAgePoints(data.age, data.married);
        
        // Education
        score += EducationModule.calculateEducationPoints(data.education, data.married);
        
        // Language
        score += LanguageModule.calculateLanguagePoints(data.englishCLB, data.frenchNCLC, data.married);
        
        // Canadian work experience
        score += WorkExperienceModule.calculateWorkPoints(data.canadianWork, data.married);
        
        // Skill transferability
        score += WorkExperienceModule.calculateSkillTransferability({
            englishCLB: data.englishCLB,
            education: data.education,
            foreignWork: data.foreignWork
        });
        
        // Additional factors
        if (data.sibling) score += 15;
        if (data.pnp) score += 600;
        
        // Canadian education bonus
        score += EducationModule.getCanadianEducationBonus(data.canadianEducation);
        
        // French bonus
        score += LanguageModule.getFrenchBonus(data.englishCLB, data.frenchNCLC);
        
        // Spouse points
        if (data.married && data.spouse) {
            score += SpouseModule.calculateSpousePoints(data.spouse);
        }
        
        return Math.min(score, 1200); // Cap at maximum possible score
    },
    
    formatDate: function(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    },
    
    validateTimelineLogic: function(scenarios) {
        for (let i = 1; i < scenarios.length; i++) {
            if (scenarios[i].date < scenarios[i-1].date) {
                return false;
            }
        }
        return true;
    },
    
    // Generate comprehensive scenarios for advanced analysis
    generateAdvancedScenarios: function(userData) {
        const scenarios = [];
        let scenarioId = 1;
        
        // Define time periods
        const today = new Date();
        const timeframes = [
            { label: 'Current', months: 0 },
            { label: '6 months', months: 6 },
            { label: '1 year', months: 12 },
            { label: '2 years', months: 24 }
        ];
        
        // Define variables to iterate
        const frenchOptions = [false, true]; // No French, CLB 7
        const workOptions = [0, 1, 2]; // 0, 1, 2 years Canadian experience
        const applicationTypes = userData.married ? ['Solo', 'Joint'] : ['Solo'];
        
        // For married applicants, also consider spouse improvements
        const spouseWorkOptions = userData.married ? [0, 1, 2] : [0];
        const spouseFrenchOptions = userData.married ? [false, true] : [false];
        
        // Generate all combinations
        timeframes.forEach(timeframe => {
            const futureDate = new Date(today);
            futureDate.setMonth(today.getMonth() + timeframe.months);
            const futureAge = AgeModule.projectAgeAtDate(userData.age, futureDate);
            
            applicationTypes.forEach(appType => {
                frenchOptions.forEach(hasFrench => {
                    workOptions.forEach(workYears => {
                        // Skip invalid combinations (can't have 2 years work in 6 months)
                        if (workYears > 0 && timeframe.months < workYears * 12) return;
                        
                        if (appType === 'Solo' || !userData.married) {
                            // Solo application scenarios
                            const breakdown = this.calculateDetailedBreakdown({
                                ...userData,
                                age: futureAge,
                                married: false, // Solo application
                                french: hasFrench ? 7 : userData.language.french.current,
                                canadianWork: Math.max(userData.canadianWork, workYears),
                                applicationType: 'Solo'
                            });
                            
                            scenarios.push({
                                id: scenarioId++,
                                date: futureDate,
                                timeframe: timeframe.label,
                                type: 'Solo',
                                yourFrench: hasFrench,
                                yourCAWork: workYears,
                                spouseFrench: false,
                                spouseCAWork: 0,
                                breakdown: breakdown,
                                total: breakdown.total
                            });
                        } else {
                            // Joint application scenarios
                            spouseFrenchOptions.forEach(spouseFrench => {
                                spouseWorkOptions.forEach(spouseWork => {
                                    // Skip invalid spouse work combinations
                                    if (spouseWork > 0 && timeframe.months < spouseWork * 12) return;
                                    
                                    const breakdown = this.calculateDetailedBreakdown({
                                        ...userData,
                                        age: futureAge,
                                        married: true,
                                        french: hasFrench ? 7 : userData.language.french.current,
                                        canadianWork: Math.max(userData.canadianWork, workYears),
                                        spouse: {
                                            ...userData.spouse,
                                            frenchNCLC: spouseFrench ? 7 : 0,
                                            canadianWork: Math.max(userData.spouse?.canadianWork || 0, spouseWork)
                                        },
                                        applicationType: 'Joint'
                                    });
                                    
                                    scenarios.push({
                                        id: scenarioId++,
                                        date: futureDate,
                                        timeframe: timeframe.label,
                                        type: 'Joint',
                                        yourFrench: hasFrench,
                                        yourCAWork: workYears,
                                        spouseFrench: spouseFrench,
                                        spouseCAWork: spouseWork,
                                        breakdown: breakdown,
                                        total: breakdown.total
                                    });
                                });
                            });
                        }
                    });
                });
            });
        });
        
        // Sort by total score descending
        scenarios.sort((a, b) => b.total - a.total);
        
        return scenarios;
    },
    
    // Calculate detailed breakdown for advanced analysis
    calculateDetailedBreakdown: function(data) {
        const breakdown = {
            // Core factors
            age: 0,
            education: 0,
            firstLangEnglish: 0,
            secondLangFrench: 0,
            canadianExp: 0,
            
            // Skill transferability
            skillTransfer: 0,
            
            // Additional points
            canadianEducation: 0,
            frenchBonus: 0,
            sibling: 0,
            
            // Spouse factors (if applicable)
            spouseEducation: 0,
            spouseLanguage: 0,
            spouseWork: 0,
            
            // Total
            total: 0
        };
        
        // Calculate each component
        const isMarried = data.married && data.applicationType === 'Joint';
        
        // Age
        breakdown.age = AgeModule.calculateAgePoints(data.age, isMarried);
        
        // Education
        breakdown.education = EducationModule.calculateEducationPoints(
            data.education.current || data.education,
            isMarried
        );
        
        // Language - separate first and second language
        const englishCLB = data.englishCLB || data.language?.english?.current || 7;
        const frenchNCLC = data.french || data.language?.french?.current || 0;
        
        // First language (English) points
        const engTable = {
            single: [0, 0, 0, 0, 6, 6, 9, 17, 23, 31, 34],
            married: [0, 0, 0, 0, 6, 6, 8, 16, 22, 29, 32]
        };
        const engIndex = Math.min(englishCLB, 10);
        breakdown.firstLangEnglish = (isMarried ? engTable.married[engIndex] : engTable.single[engIndex]) * 4;
        
        // Second language (French) points
        if (frenchNCLC >= 5) {
            const frPoints = Math.min((frenchNCLC - 4) * 2, 6);
            breakdown.secondLangFrench = frPoints * 4;
        }
        
        // Canadian work experience
        breakdown.canadianExp = WorkExperienceModule.calculateWorkPoints(
            data.canadianWork || 0,
            isMarried
        );
        
        // Skill transferability
        breakdown.skillTransfer = WorkExperienceModule.calculateSkillTransferability({
            englishCLB: englishCLB,
            education: data.education.current || data.education,
            foreignWork: data.foreignWork || 0
        });
        
        // Additional factors
        breakdown.canadianEducation = EducationModule.getCanadianEducationBonus(
            data.canadianEducation || 'none'
        );
        
        breakdown.frenchBonus = LanguageModule.getFrenchBonus(englishCLB, frenchNCLC);
        
        if (data.sibling) breakdown.sibling = 15;
        
        // Spouse points (if joint application)
        if (isMarried && data.spouse) {
            breakdown.spouseEducation = SpouseModule.calculateSpousePoints({
                education: data.spouse.education || 'none',
                englishCLB: 0,
                canadianWork: 0
            });
            
            // Separate spouse language calculation
            const spouseEnglishCLB = data.spouse.englishCLB || 0;
            if (spouseEnglishCLB >= 9) {
                breakdown.spouseLanguage = 20;
            } else if (spouseEnglishCLB >= 7) {
                breakdown.spouseLanguage = 12;
            } else if (spouseEnglishCLB >= 6) {
                breakdown.spouseLanguage = 8;
            } else if (spouseEnglishCLB >= 4) {
                breakdown.spouseLanguage = 4;
            }
            
            // Spouse work
            const spouseWork = data.spouse.canadianWork || 0;
            if (spouseWork >= 3) {
                breakdown.spouseWork = 10;
            } else if (spouseWork === 2) {
                breakdown.spouseWork = 7;
            } else if (spouseWork === 1) {
                breakdown.spouseWork = 5;
            }
        }
        
        // Calculate total
        breakdown.total = breakdown.age + breakdown.education + breakdown.firstLangEnglish + 
                         breakdown.secondLangFrench + breakdown.canadianExp + breakdown.skillTransfer +
                         breakdown.canadianEducation + breakdown.frenchBonus + breakdown.sibling +
                         breakdown.spouseEducation + breakdown.spouseLanguage + breakdown.spouseWork;
        
        return breakdown;
    }
};

// Recommendations Module
const RecommendationsModule = {
    generateRecommendations: function(scenarios, userData) {
        const recommendations = [];
        const currentScore = scenarios.find(s => s.status === 'current')?.score || 0;
        const maxScore = Math.max(...scenarios.map(s => s.score));
        
        // Score-based recommendations
        if (currentScore >= 500) {
            recommendations.push({
                type: 'success',
                title: 'Excellent Score!',
                message: 'Your current score is highly competitive. You should receive an invitation in the next Express Entry draw.',
                priority: 1
            });
        } else if (currentScore >= 470) {
            recommendations.push({
                type: 'success',
                title: 'Competitive Score',
                message: 'Your score is competitive. Monitor upcoming draws closely - you\'re likely to receive an invitation soon.',
                priority: 1
            });
        } else if (currentScore >= 440) {
            recommendations.push({
                type: 'warning',
                title: 'Moderate Score',
                message: 'Your score is moderate. Consider French language draws where the cutoff is typically much lower (350-430).',
                priority: 2
            });
        } else {
            recommendations.push({
                type: 'info',
                title: 'Score Improvement Needed',
                message: `Focus on the improvements shown above to increase your score. You can potentially reach ${maxScore} points.`,
                priority: 3
            });
        }
        
        // Language recommendations
        const hasFrench = scenarios.some(s => s.frenchNCLC >= 7);
        if (!hasFrench && userData.language.french.current < 7) {
            recommendations.push({
                type: 'info',
                title: 'Learn French for Major Boost',
                message: 'Learning French to NCLC 7 is your single best investment. It adds 50+ points and qualifies you for French-targeted draws.',
                priority: 2
            });
        }
        
        // Canadian education recommendation
        if (!userData.canadianEducation || userData.canadianEducation === 'none') {
            recommendations.push({
                type: 'info',
                title: 'Consider Canadian Education',
                message: 'Studying in Canada provides 15-30 bonus points plus valuable Canadian experience and networking.',
                priority: 3
            });
        }
        
        // Work experience recommendation
        if (userData.canadianWork === 0) {
            recommendations.push({
                type: 'info',
                title: 'Canadian Experience is Valuable',
                message: 'Even 1 year of Canadian work experience adds 40-80 points and makes you eligible for Canadian Experience Class.',
                priority: 2
            });
        }
        
        // PNP recommendation
        if (!userData.pnp && currentScore < 480) {
            recommendations.push({
                type: 'info',
                title: 'Explore Provincial Nominee Programs',
                message: 'PNP nomination adds 600 points, guaranteeing an invitation. Research programs in your field.',
                priority: 2
            });
        }
        
        return recommendations.sort((a, b) => a.priority - b.priority);
    },
    
    getImprovementSuggestions: function(currentScenario, futureScenarios) {
        const suggestions = [];
        
        futureScenarios.forEach(scenario => {
            const improvement = scenario.score - currentScenario.score;
            if (improvement > 0) {
                suggestions.push({
                    name: scenario.name,
                    points: improvement,
                    timeline: scenario.timeline,
                    effort: this.estimateEffort(scenario.improvements)
                });
            }
        });
        
        return suggestions.sort((a, b) => b.points - a.points);
    },
    
    estimateEffort: function(improvements) {
        if (improvements.includes('French proficiency')) return 'High (12-18 months)';
        if (improvements.includes('Higher education')) return 'High (1-4 years)';
        if (improvements.includes('Canadian work experience')) return 'Medium (1-2 years)';
        if (improvements.includes('English proficiency')) return 'Low (3-6 months)';
        return 'Low';
    }
};

// Export modules for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EducationModule,
        LanguageModule,
        WorkExperienceModule,
        AgeModule,
        SpouseModule,
        ScenarioGenerator,
        RecommendationsModule
    };
}