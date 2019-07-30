const fs = require('fs');
const path = require('path');


function generateContent(name, definitionBase, contentBase, answers){
    const definitionPath = path.join(definitionBase, `${name}.sitecore.js`);
    const contentPath = path.join(contentBase, '${name}.')
    let code = emptyCodeTemplate(name);

    fs.mkdirSync(compPath);
    fs.mkdirSync(testFolder);

    if(!!answers){
        code = codeTemplate(name, answers);
    }

    fs.writeFileSync(jsPath, code, 'utf8');
    fs.writeFileSync(indexPath, index(name), 'utf8');
    fs.writeFileSync(stylePath, styles, 'utf8');
    fs.writeFileSync(testPath, testTemplate, 'utf8');
}

module.exports = generateCodeScaffold;