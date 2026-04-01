const PDFDocument = require('pdfkit');

function generatePDF(data, writeCallback, endCallback) {
    const doc = new PDFDocument({ margin: 50 });

    doc.on('data', writeCallback);
    doc.on('end', endCallback);

    // Header
    doc.fontSize(28).fillColor('#0055ff').text('CareerNova AI Report', { align: 'center' });
    doc.moveDown(2);

    // Section 1: Career DNA
    if (data.dna) {
        doc.fontSize(18).fillColor('#000000').text('1. Career Profile & DNA');
        doc.moveDown(0.5);
        doc.fontSize(14).fillColor('#333333').text(`Assigned Identity: ${data.dna.career_identity}`);
        
        doc.fontSize(12).fillColor('#666666').text(`Top Matched Careers: ${data.dna.top_careers?.join(', ')}`);
        if (data.dna.extracted_skills) {
            doc.text(`Identified Skills: ${data.dna.extracted_skills.join(', ')}`);
        }
        doc.moveDown(1.5);
    }

    // Section 2: Fit Score
    if (data.fit) {
        doc.fontSize(18).fillColor('#000000').text('2. Fit & Success Score');
        doc.moveDown(0.5);
        doc.fontSize(16).fillColor(data.fit.score >= 80 ? 'green' : (data.fit.score >= 60 ? 'orange' : 'red')).text(`Score: ${data.fit.score}% ${data.fit.label}`);
        doc.moveDown(0.5);
        
        doc.fontSize(12).fillColor('#333333').text('Algorithms Rationale:');
        data.fit.explainability?.forEach(exp => {
            doc.fontSize(11).fillColor('#555555').text(`  ${exp}`);
        });
        doc.moveDown(1.5);
    }

    // Section 3: Future Simulator
    if (data.sim) {
        doc.fontSize(18).fillColor('#000000').text(`3. Future Simulator (${data.sim.career})`);
        doc.moveDown(0.5);
        
        doc.fontSize(14).fillColor('#333333').text('Salary Progression:');
        data.sim.salary_growth?.forEach(s => {
            doc.fontSize(11).fillColor('#555555').text(`  Year ${s.year}: ${s.salary}`);
        });
        doc.moveDown(0.5);

        doc.fontSize(14).fillColor('#333333').text('Recommended Skill Roadmap:');
        doc.fontSize(11).fillColor('#555555').text(`  ${data.sim.skill_roadmap?.join(' -> ')}`);
        doc.moveDown(1.5);
    }

    // Section 4: Colleges
    if (data.colleges && data.colleges.length > 0) {
        doc.fontSize(18).fillColor('#000000').text('4. College Matches');
        doc.moveDown(0.5);
        data.colleges.forEach(col => {
            doc.fontSize(12).fillColor('#333333').text(`- ${col.name} (${col.match} probability) | Est: ${col.fees}`);
        });
        doc.moveDown(1.5);
    }

    // Section 5: Courses
    if (data.courses && data.courses.length > 0) {
        doc.fontSize(18).fillColor('#000000').text('5. Recommended Learning');
        doc.moveDown(0.5);
        data.courses.forEach(crs => {
            doc.fontSize(12).fillColor('#333333').text(`- [${crs.platform}] ${crs.title}`);
            doc.fontSize(10).fillColor('#2266aa').text(`   Link: ${crs.link}`, { link: crs.link, underline: true });
            doc.moveDown(0.5);
        });
        doc.moveDown(1);
    }

    // Footer
    doc.fontSize(10).fillColor('#aaaaaa').text('This deterministic report was algorithmically built by the CareerNova AI extraction engine.', 50, 720, { align: 'center' });
    
    doc.end();
}

module.exports = { generatePDF };
