const fieldTypes = require('../fieldTypes');

const initial = [
    {
        type: 'confirm',
        name: 'mockData',
        message: 'Do you want to create offline Sitecore data after scaffolding?',
    },
    {
        type: 'checkbox',
        name: 'fieldTypes',
        message: 'Which Sitecore field types will this component have?',
        choices: Object.keys(fieldTypes).map(key => {
            return {
                name: fieldTypes[key].string,
                value: key
            }
        }),
    }
];

module.exports = initial;