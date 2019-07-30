const fieldTypes = require('../fieldTypes');

const fieldCount = initialFields => {
    return initialFields.fieldTypes.map(field => {
        return {
            type: 'number',
            name: `${field}-count`,
            default: 1,
            message: `How many ${fieldTypes[field].string} fields does this component need?`,
            validate: (input) => {
                return input > 0 ? true : 'Field must have at least 1 instance' ;
            }
        }
    });
};

module.exports = fieldCount;