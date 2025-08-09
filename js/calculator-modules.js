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
    calculateSkillTransferability: (education, foreignWork, langCLB, canadianWork = 0) => {
        let points = 0;
        
        // Education + Language transferability
        // According to IRCC, bachelor's alone gets lower points than multiple credentials or higher degrees
        if (education === 'diploma1' || education === 'diploma2' || education === 'bachelor') {
            // Single post-secondary credential (including bachelor's)
            if (langCLB >= 9) points += 25;  // Max 25 points for single credential
            else if (langCLB >= 7) points += 13;
        } else if (education === 'two-or-more' || education === 'master' || education === 'phd') {
            // Multiple credentials OR Master's/PhD
            if (langCLB >= 9) points += 50;  // Max 50 points for multiple or advanced degrees
            else if (langCLB >= 7) points += 25;
        }
        
        // Education + Canadian Work Experience transferability
        if (canadianWork >= 2) {
            if (education === 'diploma1' || education === 'diploma2' || education === 'bachelor') {
                points += 25;  // Single credential + 2+ years Canadian work
            } else if (education === 'two-or-more' || education === 'master' || education === 'phd') {
                points += 50;  // Multiple/advanced + 2+ years Canadian work
            }
        } else if (canadianWork >= 1) {
            if (education === 'diploma1' || education === 'diploma2' || education === 'bachelor') {
                points += 13;  // Single credential + 1 year Canadian work
            } else if (education === 'two-or-more' || education === 'master' || education === 'phd') {
                points += 25;  // Multiple/advanced + 1 year Canadian work
            }
        }

        // Foreign Work Experience + Language transferability
        if (foreignWork >= 3) {
            if (langCLB >= 9) points += 50;
            else if (langCLB >= 7) points += 25;
        } else if (foreignWork >= 1) {
            if (langCLB >= 9) points += 25;
            else if (langCLB >= 7) points += 13;
        }
        
        // Foreign Work + Canadian Work transferability
        if (foreignWork >= 3 && canadianWork >= 1) {
            points += 50;
        } else if (foreignWork >= 1 && canadianWork >= 1) {
            points += 25;
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
        score += WorkExperienceModule.calculateSkillTransferability(data.education, data.foreignWork, data.englishCLB, data.canadianWork);
        score += EducationModule.getCanadianEducationBonus(data.canadianEducation);
        score += LanguageModule.getFrenchBonus(data.englishCLB, data.frenchNCLC);
        if (data.sibling) score += 15;
        if (data.pnp) score += 600;
        return score;
    },

    generateTimelineScenarios: function(userData) {
        const scenarios = [];
        const today = new Date();
        let latestDate = today;

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
        
        scenarios.push({
            name: 'Current Status',
            date: today,
            score: this.calculateCRSForScenario({ ...baseData, age: AgeModule.calculateAge(baseData.dob) }),
            timeline: 'Today', status: 'current', icon: '📍', improvements: []
        });

        const hasFutureEducation = userData.education.future;
        const hasFutureFrench = userData.language.french.targetDate && userData.language.french.target > baseData.frenchNCLC;

        if (hasFutureEducation) {
            const gradDate = userData.education.future.graduationDate;
            const gradAge = AgeModule.getAgeOnDate(baseData.dob, gradDate);
            scenarios.push({
                name: 'After Graduation', date: new Date(gradDate),
                score: this.calculateCRSForScenario({ ...baseData, age: gradAge, education: userData.education.future.degree, canadianEducation: '3year' }),
                timeline: this.formatDate(gradDate), status: 'in-progress', icon: '🎓', improvements: ['Higher education']
            });
            latestDate = new Date(Math.max(latestDate, new Date(gradDate)));
        }

        if (hasFutureFrench) {
            const frenchDate = userData.language.french.targetDate;
            const frenchAge = AgeModule.getAgeOnDate(baseData.dob, frenchDate);
            scenarios.push({
                name: 'With French NCLC 7', date: new Date(frenchDate),
                score: this.calculateCRSForScenario({ ...baseData, age: frenchAge, frenchNCLC: userData.language.french.target }),
                timeline: this.formatDate(frenchDate), status: 'planned', icon: '🇫🇷', improvements: ['French proficiency']
            });
            latestDate = new Date(Math.max(latestDate, new Date(frenchDate)));
        }

        if (hasFutureEducation && hasFutureFrench) {
            const gradDate = new Date(userData.education.future.graduationDate);
            const frenchDate = new Date(userData.language.french.targetDate);
            const bestCaseDate = new Date(Math.max(gradDate, frenchDate));
            const bestCaseAge = AgeModule.getAgeOnDate(baseData.dob, bestCaseDate);
            scenarios.push({
                name: 'Graduation + French', date: bestCaseDate,
                score: this.calculateCRSForScenario({ ...baseData, age: bestCaseAge, education: userData.education.future.degree, frenchNCLC: userData.language.french.target, canadianEducation: '3year' }),
                timeline: this.formatDate(bestCaseDate.toISOString().slice(0,10)), status: 'planned', icon: '🚀', improvements: ['French proficiency', 'Higher education']
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

// Make AgeModule globally available
if (typeof window !== 'undefined') {
    window.AgeModule = AgeModule;
}

const RecommendationsModule = {
    generateRecommendations: function(scenarios, userData) {
        const recommendations = [];
        const currentScore = scenarios.find(s => s.status === 'current')?.score || 0;
        const maxScore = Math.max(...scenarios.map(s => s.score));
        const isStudyingInCanada = userData.education.future && userData.education.future.location === 'canada';
        const isAbroad = !isStudyingInCanada && userData.canadianWork === 0;

        const frenchScenario = scenarios.find(s => s.improvements.includes('French proficiency'));
        const hasFrenchGoal = !!frenchScenario;

        if (currentScore > 490) {
            recommendations.push({
                type: 'success', title: 'Excellent Score!',
                message: 'Your score is highly competitive for general Express Entry draws. You are in a strong position.',
                priority: 1
            });
        }

        if (hasFrenchGoal && frenchScenario.score > 440) {
            recommendations.push({
                type: 'info', title: 'Your Golden Ticket: The French Pathway',
                message: `Achieving French NCLC 7 is your most powerful strategy. It makes you eligible for French-category draws, which have significantly lower CRS cutoffs. This is your most direct path to an invitation.`,
                priority: 2
            });
        } else if (!hasFrenchGoal && currentScore < 490) {
            recommendations.push({
                type: 'info', title: 'The Most Powerful Upgrade: Learn French',
                message: 'Learning French is the single most effective way to boost your score. It adds significant bonus points and opens the door to French-category draws with much lower score requirements.',
                priority: 2
            });
        }

        if (isAbroad) {
            recommendations.push({
                type: 'info', title: 'Strategic Tip: Consider Your Study Timing',
                message: "Here's something many don't realize: if you can achieve French NCLC 7 relatively soon, consider getting PR first before studying in Canada. Why? The tuition difference is HUGE - we're talking about saving $20,000-40,000 per year! International students pay 3-4x more than PR holders. That said, if French isn't feasible for you, studying in Canada remains an excellent pathway - you'll gain Canadian credentials, build a professional network, and experience the culture firsthand. It's still a worthwhile investment, just a more expensive one. (Speaking from experience as a current international student who wishes someone had told me about the French option earlier!)",
                priority: 3
            });
        }

        if (!isAbroad && userData.canadianWork < 1) {
             recommendations.push({
                type: 'info', title: 'The Steady Path: Gain Canadian Experience',
                message: 'After graduation, getting one year of skilled work experience in Canada is a very reliable path to PR. This will make you eligible for the Canadian Experience Class (CEC).',
                priority: 4
            });
        }

        if (!userData.pnp && maxScore < 480) {
            recommendations.push({
                type: 'info', title: 'Explore Provincial Nominee Programs (PNP)',
                message: 'If your score remains below the federal draw cutoffs, securing a provincial nomination is a powerful alternative. A nomination adds 600 points to your score, guaranteeing an invitation.',
                priority: 5
            });
        }

        if (maxScore > currentScore && currentScore < 470) {
             recommendations.push({
                type: 'success', title: 'You Have a Clear Path Forward',
                message: `Your current score may seem low, but you have a clear plan to increase it to a highly competitive level (${maxScore}). Focus on your goals--they are achievable and will make a huge difference.`,
                priority: 6
            });
        }

        return recommendations.sort((a, b) => a.priority - b.priority);
    }
};