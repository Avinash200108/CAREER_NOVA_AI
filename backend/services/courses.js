function recommendCourses(career, skills = []) {
    const s = skills.map(x => x.toLowerCase());
    
    // Determine lacking areas based on career
    let recommendations = [];
    
    // AI & Data Pathways
    if (career.includes("AI") || career.includes("Data")) {
        if (!s.includes("machine learning")) {
            recommendations.push(
                { platform: "Coursera", title: "Machine Learning Specialization by Andrew Ng", link: "https://www.coursera.org/specializations/machine-learning-introduction", type: "Certificate", free: "Audit Free" }
            );
        }
        if (!s.includes("python")) {
            recommendations.push(
                { platform: "NPTEL", title: "Joy of Computing using Python", link: "https://onlinecourses.nptel.ac.in/", type: "Course", free: "100% Free" }
            );
        }
        if (!s.includes("deep learning")) {
            recommendations.push(
                { platform: "Coursera", title: "Deep Learning Specialization", link: "https://www.coursera.org/specializations/deep-learning", type: "Certificate", free: "Audit Free" }
            );
        }
    } 
    // Design Pathways
    else if (career.includes("Design") || career.includes("UI")) {
        if (!s.includes("figma") && !s.includes("ui")) {
            recommendations.push(
                { platform: "Coursera", title: "Google UX Design Professional", link: "https://www.coursera.org/professional-certificates/google-ux-design", type: "Certificate", free: "Audit Free" },
                { platform: "Coursera", title: "UI / UX Design Specialization", link: "https://www.coursera.org/specializations/ui-ux-design", type: "Certificate", free: "Audit Free" }
            );
        }
    } 
    // Engineering Pathways
    else if (career.includes("Engineer")) {
        recommendations.push(
            { platform: "NPTEL", title: "Core Engineering Mechanics & Design", link: "https://onlinecourses.nptel.ac.in/", type: "Course", free: "100% Free" }
        );
    }
    
    // Generic fallback/supplemental if they already have the hard skills
    if (recommendations.length < 2) {
        recommendations.push(
            { platform: "Indeed", title: `Mastering Interviews for ${career}`, link: "https://www.indeed.com/career-advice", type: "Article/Guide", free: "100% Free" },
            { platform: "Coursera", title: `Advanced Topics in ${career}`, link: "https://www.coursera.org/", type: "Certificate", free: "Audit Free" }
        );
    }

    return { courses: recommendations };
}

module.exports = { recommendCourses };
