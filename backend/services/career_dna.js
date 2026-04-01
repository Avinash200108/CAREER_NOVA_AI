const pdfParse = require('pdf-parse');

async function analyzeCareerDna(inputData, fileBuffer) {
    let skills = (inputData.skills || []).map(s => s.toLowerCase());

    if (fileBuffer) {
        let text = "";
        try {
            const pdfData = await pdfParse(fileBuffer);
            text = pdfData.text.toLowerCase();
        } catch (err) {
            // Fallback to text string for voice transcript `.txt` files
            text = fileBuffer.toString('utf8').toLowerCase();
        }
            
        // Keyword extraction from text
        const possibleSkills = ["python", "data", "machine learning", "java", "c++", "design", "ui", "ux", "react", "node", "civil", "mechanical", "electrical", "marketing", "finance", "robotics"];
        const foundSkills = possibleSkills.filter(skill => text.includes(skill));
        
        if (foundSkills.length > 0) {
            skills = foundSkills;
        } else {
            skills = ["general"];
        }
    }
    
    let identity = "Exploratory Learner";
    let careers = [];
    
    if (skills.includes('python') || skills.includes('data') || skills.includes('machine learning')) {
        identity = "Analytical Innovator";
        careers = ["Data Scientist", "AI Engineer", "Robotics Engineer"];
    } else if (skills.includes('design') || skills.includes('ui') || skills.includes('ux')) {
        identity = "Creative Visionary";
        careers = ["UX Designer", "Product Designer", "Frontend Developer"];
    } else if (skills.includes('mechanical') || skills.includes('civil') || skills.includes('electrical')) {
        identity = "Engineering Architect";
        careers = ["Mechanical Engineer", "Civil Engineer", "Aerospace Engineer"];
    } else if (skills.includes('finance') || skills.includes('marketing')) {
        identity = "Business Strategist";
        careers = ["Financial Analyst", "Marketing Manager", "Product Manager"];
    } else {
        identity = "Technical Problem Solver";
        careers = ["Software Engineer", "Systems Analyst", "Backend Developer"];
    }

    return {
        career_identity: identity,
        strengths: ["Logical thinking", "Data curiosity", "Adaptability"],
        top_careers: careers,
        extracted_skills: skills
    };
}

module.exports = { analyzeCareerDna };
