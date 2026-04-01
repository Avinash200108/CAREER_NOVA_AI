function calculateFitScore(skills = [], careerName = "") {
    let score = 50; // base score
    let explainability = [];
    
    // Convert to lower
    const s = skills.map(x => x.toLowerCase());

    // Basic scoring
    const hasTech = s.includes('python') || s.includes('java') || s.includes('c++') || s.includes('node') || s.includes('react');
    const hasData = s.includes('data') || s.includes('machine learning');
    const hasDesign = s.includes('design') || s.includes('ui') || s.includes('ux');
    const hasEng = s.includes('civil') || s.includes('mechanical') || s.includes('electrical') || s.includes('robotics');
    const hasBiz = s.includes('marketing') || s.includes('finance');

    let interestValue = 50;
    let academicsValue = 60;
    let marketValue = 50;

    if (careerName.includes("AI") || careerName.includes("Data")) {
        marketValue = 95;
        if (hasData || hasTech) { score += 35; interestValue = 85; explainability.push("+ Matches AI/Data skillset"); }
        if (!hasData) explainability.push("- Lacking specific ML context");
    } else if (careerName.includes("Design") || careerName.includes("Frontend")) {
        marketValue = 85;
        if (hasDesign || hasTech) { score += 32; interestValue = 90; explainability.push("+ Strong creative portfolio indicators"); }
    } else if (careerName.includes("Engineer")) {
        marketValue = 75;
        if (hasEng || hasTech) { score += 30; interestValue = 80; explainability.push("+ Matches engineering curriculum"); }
        if (hasTech) { score += 5; explainability.push("+ Has programming knowledge which boosts modern engineering"); }
    } else if (careerName.includes("Manager") || careerName.includes("Analyst")) {
        marketValue = 80;
        if (hasBiz) { score += 30; interestValue = 88; explainability.push("+ Aligned with business/finance metrics"); }
    } else {
        marketValue = 60;
        score += 15;
        explainability.push("~ General skills match");
    }

    // Add length bonus
    if (skills.length > 5) {
        score += 10;
        academicsValue += 20;
        explainability.push("+ Diverse skillset indicates strong adaptability");
    } else if (skills.length <= 1) {
        score -= 5;
        academicsValue -= 10;
        explainability.push("- Limited keywords extracted from document");
    }

    // Cap score
    score = Math.min(Math.max(score, 10), 98);

    let label = score >= 80 ? "🟢" : (score >= 60 ? "🟡" : "🔴");

    return {
        career: careerName,
        score: score,
        label: label,
        radar: {
             skills: Math.min(score + 5, 100),
             interest: interestValue,
             academics: academicsValue,
             market: marketValue
        },
        explainability: explainability,
        disclaimer: "This score is algorithmically derived directly from your uploaded document's contents."
    };
}

module.exports = { calculateFitScore };
