function generateSimulation(career, skills = []) {
    let baseSalary = 5;
    let maxSalary = 15;
    
    // Convert to lower
    const s = skills.map(x => x.toLowerCase());

    if (career.includes("AI") || career.includes("Data")) {
        baseSalary = s.includes("machine learning") ? 12 : 8;
        maxSalary = baseSalary * 3;
    } else if (career.includes("Engineer")) {
        baseSalary = 7;
        maxSalary = 20;
    } else if (career.includes("Design")) {
        baseSalary = 6;
        maxSalary = 18;
    }

    return {
        career: career,
        day_in_life: [
            { time: "9:00 AM", activity: `Review ${skills[0] || 'core'} metrics & standup` },
            { time: "11:30 AM", activity: `Deep work on ${career} tasks` },
            { time: "3:00 PM", activity: "Architecture / Design review meeting" }
        ],
        salary_growth: [
            { year: 1, salary: `₹${baseSalary}L` },
            { year: 3, salary: `₹${Math.floor((baseSalary+maxSalary)/2)}L` },
            { year: 5, salary: `₹${maxSalary}L` }
        ],
        skill_roadmap: [
            ...skills.slice(0, 2), 
            "Leadership/Management", 
            career.includes("AI") ? "Advanced Deep Learning" : "System Scaling"
        ]
    };
}

module.exports = { generateSimulation };
