# Bug Report: CRS Calculator Transferability Points

## Issue
The calculator incorrectly awards 50 points for Education + Language transferability when it should award 25 points in certain cases.

## Root Cause
The calculator uses a single CLB value to represent all four language abilities, but the official IRCC system requires CLB 9+ in ALL FOUR abilities to award the full 50 points.

## Current Code (INCORRECT)
```javascript
// Line 44-51 in calculator-modules.js
calculateSkillTransferability: (education, foreignWork, langCLB) => {
    let points = 0;
    const hasDegree = ['bachelor', 'two-or-more', 'master', 'phd'].includes(education);
    
    if (hasDegree) {
        if (langCLB >= 9) points += 50;  // BUG: Assumes all abilities are at this level
        else if (langCLB >= 7) points += 25;
    }
```

## Proposed Fix
```javascript
calculateSkillTransferability: (education, foreignWork, langScores) => {
    let points = 0;
    const hasDegree = ['bachelor', 'two-or-more', 'master', 'phd'].includes(education);
    
    if (hasDegree) {
        // Check if ALL four abilities are CLB 9+
        const allAbilitiesCLB9Plus = 
            langScores.speaking >= 9 && 
            langScores.listening >= 9 && 
            langScores.reading >= 9 && 
            langScores.writing >= 9;
        
        const allAbilitiesCLB7Plus = 
            langScores.speaking >= 7 && 
            langScores.listening >= 7 && 
            langScores.reading >= 7 && 
            langScores.writing >= 7;
        
        if (allAbilitiesCLB9Plus) {
            points += 50;
        } else if (allAbilitiesCLB7Plus) {
            points += 25;
        }
    }
    
    // Similar fix needed for foreign work experience section
    if (foreignWork >= 3) {
        const allAbilitiesCLB9Plus = 
            langScores.speaking >= 9 && 
            langScores.listening >= 9 && 
            langScores.reading >= 9 && 
            langScores.writing >= 9;
        
        const allAbilitiesCLB7Plus = 
            langScores.speaking >= 7 && 
            langScores.listening >= 7 && 
            langScores.reading >= 7 && 
            langScores.writing >= 7;
        
        if (allAbilitiesCLB9Plus) {
            points += 50;
        } else if (allAbilitiesCLB7Plus) {
            points += 25;
        }
    } else if (foreignWork >= 1) {
        // Similar logic for 1-2 years experience
    }
    
    return Math.min(points, 100);
}
```

## Impact
This bug causes the calculator to overestimate scores by 25 points for users who have:
- CLB 9+ in some (but not all) language abilities
- A bachelor's degree or higher
- 3+ years of foreign work experience

## Test Case
User with:
- IELTS Speaking: 7.5 (CLB 9)
- IELTS Listening: 8.5 (CLB 10)
- IELTS Reading: 8.0 (CLB 9)
- IELTS Writing: 7.5 (CLB 9)
- Bachelor's degree
- 3+ years foreign experience

**Expected**: 400 points total (25 points for education + language transferability)
**Current (Bug)**: 425 points total (50 points for education + language transferability)

## Recommendation
1. Update the UI to collect individual scores for each language ability
2. Modify the calculation logic to check all four abilities separately
3. Add validation to ensure accurate CLB conversion from IELTS/CELPIP/TEF/TCF scores
4. Add unit tests for edge cases in language scoring
