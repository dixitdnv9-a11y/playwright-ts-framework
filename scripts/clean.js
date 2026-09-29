import fs from 'fs';
['test-results','playwright-report','allure-results','.auth'].forEach(d => { if(fs.existsSync(d)) fs.rmSync(d, {recursive:true, force:true}); console.log(`Cleaned ${d}`); });
