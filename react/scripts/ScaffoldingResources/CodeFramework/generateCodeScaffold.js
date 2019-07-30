const fs = require('fs');
const path = require('path');

const emptyCodeTemplate = require('./Templates/emptyCodeTemplate');
const codeTemplate = require('./Templates/codeTemplate');
const styleTemplate = require('./Templates/styleTemplate');
const testTemplate = require('./Templates/testTemplate');
const indexTemplate = require('./Templates/indexTemplate');

function generateCodeScaffold(name, compPath, answers){
    const jsPath = path.join(compPath, `${name}.js`);
    const indexPath = path.join(compPath, `index.js`);
    const stylePath = path.join(compPath, `${name}.styles.js`);
    const testFolder = path.join(compPath, 'Test');
    const testPath = path.join(testFolder, `${name}.test.js`);

    let code = emptyCodeTemplate(name);

    fs.mkdirSync(compPath);
    fs.mkdirSync(testFolder);

    if(!!answers){
        code = codeTemplate(name, answers);
    }

    fs.writeFileSync(jsPath, code, 'utf8');
    fs.writeFileSync(indexPath, indexTemplate(name), 'utf8');
    fs.writeFileSync(stylePath, styleTemplate, 'utf8');
    fs.writeFileSync(testPath, testTemplate, 'utf8');
}

module.exports = generateCodeScaffold;