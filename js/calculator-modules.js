// calculator-modules.js
// Core modules for the enhanced CRS calculator - REFACTORED FOR ACCURACY

const EducationModule = {
    calculateEducationPoints: (degree, isWithSpouse) => {
        const points = {
            'none': { single: 0, married: 0 },
            'diploma1': { single: 90, married: 84 },
            'diploma2': { single: 98, married: 91 },
            'bachelor': { single: 120, married: 112 },
            'two-or-more': { single: 128, married: 119 },
            'master': { single: 135, married: 126 },
            'phd': { single: 150, married: 140 }
        };
        return points[degree] ? (isWithSpouse ? points[degree].married : points[degree].single) : 0;
    },
    getCanadianEducationBonus: (canadianEdu) => (canadianEdu === '3year' ? 30 : (canadianEdu === '1-2year' ? 15 : 0))
};

const LanguageModule = {
    calculateLanguagePoints: (englishCLB, frenchNCLC, isWithSpouse) => {
        const pointsPerAbility = (table, clb) => table[Math.min(clb, 10)] || 0;
        const engTable = isWithSpouse ? [0,0,0,0,6,6,8,16,22,29,32] : [0,0,0,0,6,6,9,17,23,31,34];
        const frTable = [0,0,0,0,1,1,3,3,5,6,6];
        
        let total = pointsPerAbility(engTable, englishCLB) * 4;
        if (frenchNCLC >= 5) {
            total += pointsPerAbility(frTable, frenchNCLC) * 4;
        }
        return total;
    },
    getFrenchBonus: (englishCLB, frenchNCLC) => {
        if (frenchNCLC >= 7 && englishCLB >= 5) return 50;
        if (frenchNCLC >= 7 && englishCLB < 5) return 25;
        return 0;
    }
};

const WorkExperienceModule = {
    calculateCanadianWorkPoints: (years, isWithSpouse) => {
        const points = isWithSpouse ? [0, 35, 46, 56, 63, 70] : [0, 40, 53, 64, 72, 80];
        return points[Math.min(years, 5)] || 0;
    },
    calculateSkillTransferability: (education, foreignWork, langCLB) => {
        let points = 0;
        const hasDegree = ['bachelor', 'two-or-more', 'master', 'phd'].includes(education);
        
        if (hasDegree) {
            if (langCLB >= 9) points += 50;
            else if (langCLB >= 7) points += 25;
        }

        if (foreignWork >= 3) {
            if (langCLB >= 9) points += 50;
            else if (langCLB >= 7) points += 25;
        } else if (foreignWork >= 1) {
            if (langCLB >= 9) points += 25;
            else if (langCLB >= 7) points += 13;
        }
        return Math.min(points, 100);
    }
};

const AgeModule = {
    calculateAge: (dob) => {
        if (!dob) return 0;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    },
    getAgeOnDate: (dob, dateStr) => {
        if (!dob || !dateStr) return AgeModule.calculateAge(dob);
        const futureDate = new Date(dateStr);
        const birthDate = new Date(dob);
        let age = futureDate.getFullYear() - birthDate.getFullYear();
        const m = futureDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && futureDate.getDate() < birthDate.getDate())) age--;
        return age;
    },
    calculateAgePoints: (age, isWithSpouse) => {
        const points = isWithSpouse ?
            {18:90, 19:95, 20:100, 21:100, 22:100, 23:100, 24:100, 25:100, 26:100, 27:100, 28:100, 29:100, 30:95, 31:90, 32:85, 33:80, 34:75, 35:70, 36:65, 37:60, 38:55, 39:50, 40:45, 41:35, 42:25, 43:15, 44:5} :
            {18:99, 19:105, 20:110, 21:110, 22:110, 23:110, 24:110, 25:110, 26:110, 27:110, 28:110, 29:110, 30:105, 31:99, 32:94, 33:88, 34:83, 35:77, 36:65, 37:60, 38:55, 39:50, 40:45, 41:35, 42:25, 43:15, 44:5};
        return points[age] || 0;
    }
};

const SpouseModule = {
    calculateSpousePoints: (spouse) => {
        if (!spouse) return 0;
        const eduPoints = {'bachelor': 8, 'master': 10, 'phd': 10};
        const langPoints = {4:4, 5:4, 6:8, 7:12, 8:12, 9:20, 10:20};
        const workPoints = {1:5, 2:7, 3:10, 4:10, 5:10};

        let total = 0;
        total += eduPoints[spouse.education] || 0;
        total += langPoints[spouse.englishCLB] || 0;
        total += workPoints[spouse.canadianWork] || 0;
        return total;
    }
};

const ScenarioGenerator = {
    calculateCRSForScenario: function(data) {
        let score = 0;
        score += AgeModule.calculateAgePoints(data.age, data.married);
        score += EducationModule.calculateEducationPoints(data.education, data.married);
        score += LanguageModule.calculateLanguagePoints(data.englishCLB, data.frenchNCLC, data.married);
        score += WorkExperienceModule.calculateCanadianWorkPoints(data.canadianWork, data.married);
        score += SpouseModule.calculateSpousePoints(data.spouse);
        score += WorkExperienceModule.calculateSkillTransferability(data.education, data.foreignWork, data.englishCLB);
        score += EducationModule.getCanadianEducationBonus(data.canadianEducation);
        score += LanguageModule.getFrenchBonus(data.englishCLB, data.frenchNCLC);
        if (data.sibling) score += 15;
        if (data.pnp) score += 600;
        return score;
    },

    generateTimelineScenarios: function(userData) {
        const scenarios = [];
        const today = new Date();
        const baseData = {
            dob: userData.dob,
            married: userData.married,
            spouse: userData.spouse,
            education: userData.education.current,
            englishCLB: userData.language.english.current,
            frenchNCLC: userData.language.french.current,
            foreignWork: userData.foreignWork,
            canadianWork: userData.canadianWork,
            canadianEducation: userData.canadianEducation,
            sibling: userData.sibling,
            pnp: userData.pnp
        };
        
        // Scenario 1: Current Status
        scenarios.push({
            name: 'Current Status',
            date: today,
            score: this.calculateCRSForScenario({ ...baseData, age: AgeModule.calculateAge(baseData.dob) }),
            timeline: 'Today', status: 'current', icon: '📍', improvements: []
        });

        const hasFutureEducation = userData.education.future;
        const hasFutureFrench = userData.language.french.targetDate && userData.language.french.target > baseData.frenchNCLC;

        // Scenario 2: After Graduation Only
        if (hasFutureEducation) {
            const gradDate = userData.education.future.graduationDate;
            const gradAge = AgeModule.getAgeOnDate(baseData.dob, gradDate);
            scenarios.push({
                name: 'After Graduation', date: new Date(gradDate),
                score: this.calculateCRSForScenario({ ...baseData, age: gradAge, education: userData.education.future.degree, canadianEducation: '3year' }),
                timeline: this.formatDate(gradDate), status: 'in-progress', icon: '🎓', improvements: ['Higher education']
            });
        }

        // Scenario 3: With French Only
        if (hasFutureFrench) {
            const frenchDate = userData.language.french.targetDate;
            const frenchAge = AgeModule.getAgeOnDate(baseData.dob, frenchDate);
            scenarios.push({
                name: 'With French NCLC 7', date: new Date(frenchDate),
                score: this.calculateCRSForScenario({ ...baseData, age: frenchAge, frenchNCLC: userData.language.french.target }),
                timeline: this.formatDate(frenchDate), status: 'planned', icon: '🇫🇷', improvements: ['French proficiency']
            });
        }

        // Scenario 4: Graduation + French
        if (hasFutureEducation && hasFutureFrench) {
            const gradDate = new Date(userData.education.future.graduationDate);
            const frenchDate = new Date(userData.language.french.targetDate);
            const latestDate = new Date(Math.max(gradDate, frenchDate));
            const bestCaseAge = AgeModule.getAgeOnDate(baseData.dob, latestDate);
            scenarios.push({
                name: 'Graduation + French', date: latestDate,
                score: this.calculateCRSForScenario({ ...baseData, age: bestCaseAge, education: userData.education.future.degree, frenchNCLC: userData.language.french.target, canadianEducation: '3year' }),
                timeline: this.formatDate(latestDate.toISOString().slice(0,10)), status: 'planned', icon: '🚀', improvements: ['French proficiency', 'Higher education']
            });
        }
        
        return scenarios.sort((a, b) => a.date - b.date);
    },
    
    formatDate: function(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
    }
};

const RecommendationsModule = {
    generateRecommendations: function(scenarios, userData) {
        const recommendations = [];
        const currentScore = scenarios.find(s => s.status === 'current')?.score || 0;
        const maxScore = Math.max(...scenarios.map(s => s.score));
        
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
        
        const hasFrench = scenarios.some(s => s.improvements.includes('French proficiency'));
        if (!hasFrench && userData.language.french.current < 7) {
            recommendations.push({
                type: 'info',
                title: 'Learn French for Major Boost',
                message: 'Learning French to NCLC 7 is your single best investment. It adds 50+ points and qualifies you for French-targeted draws.',
                priority: 2
            });
        }
        
        if (!userData.canadianEducation || userData.canadianEducation === 'none') {
            recommendations.push({
                type: 'info',
                title: 'Consider Canadian Education',
                message: 'Studying in Canada provides 15-30 bonus points plus valuable Canadian experience and networking.',
                priority: 3
            });
        }
        
        if (userData.canadianWork === 0) {
            recommendations.push({
                type: 'info',
                title: 'Canadian Experience is Valuable',
                message: 'Even 1 year of Canadian work experience adds 40-80 points and makes you eligible for Canadian Experience Class.',
                priority: 2
            });
        }
        
        if (!userData.pnp && currentScore < 480) {
            recommendations.push({
                type: 'info',
                title: 'Explore Provincial Nominee Programs',
                message: 'PNP nomination adds 600 points, guaranteeing an invitation. Research programs in your field.',
                priority: 2
            });
        }
        
        return recommendations.sort((a, b) => a.priority - b.priority);
    }
};