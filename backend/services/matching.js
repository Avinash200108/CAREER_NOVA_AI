function matchCollege(skills = []) {
    const s = skills.map(x => x.toLowerCase());
    const hasTech = s.includes('python') || s.includes('java') || s.includes('react');
    const hasDesign = s.includes('design') || s.includes('ui');
    
    let list = [];
    if (hasTech || s.includes('data')) {
        list = [
            { name: "Tech Institute of Excellence", match: "82% chance", fees: "4.5L", label: "🟢" },
            { name: "National Coders University", match: "65% chance", fees: "2.8L", label: "🟡" },
            { name: "Global Engineering College", match: "Safe", fees: "3.2L", label: "🟢" }
        ];
    } else if (hasDesign) {
        list = [
            { name: "School of Creative Arts", match: "88% chance", fees: "5.5L", label: "🟢" },
            { name: "Design & Innovation Academy", match: "70% chance", fees: "3.8L", label: "🟡" },
            { name: "State Arts College", match: "Safe", fees: "1.2L", label: "🟢" }
        ];
    } else {
        list = [
            { name: "State University", match: "85% chance", fees: "1.5L", label: "🟢" },
            { name: "City College", match: "75% chance", fees: "1.8L", label: "🟡" },
            { name: "Regional Institute", match: "Safe", fees: "1.2L", label: "🟢" }
        ];
    }

    return { colleges: list };
}

module.exports = { matchCollege };
