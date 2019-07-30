const fieldTypes = require('../fieldTypes');

const fieldKeys = countObject => {
    let fieldKeyPrompt = [];
    countObject.map(field => {
        for (let i = 1; i <= field.count; i++){
            fieldKeyPrompt.push({
                type: 'input',
                name: `${field.key}-${i}-key`,
                message: `What is the key of ${field.string} field ${i}?`
            })
        }
    });
    return fieldKeyPrompt;
};

module.exports = fieldKeys;