const FieldTypes = require('../../FieldTypes');

const sitecoreImports = (answers) => {
    let imports = [];
    Object.keys(answers).map(key => {
        const {importString} = FieldTypes[key];
        if(!!importString){
            imports.push(` ${importString}`);
        }
    });

    return `import {${imports}, isExperienceEditorActive} from '@sitecore-jss/sitecore-jss-react'`;
};

const sitecoreUsages = (answers) => {
    let usages = '';
    Object.keys(answers).map(key => {
        const {importString} = FieldTypes[key];
        const {items} = answers[key];
        if(!!importString){
            items.forEach(usage => {
                usages = `${usages}
                <${importString} field={fields.${usage.key}} />`;
            });
        }
    });

    return usages;
};

const codeTemplate = (name, answers) => {

    const imports = sitecoreImports(answers);
    const usages = sitecoreUsages(answers);

    return `import React from 'react';
import { jsx } from '@emotion/core';
${imports}
import styles from './${name}.styles';

const ${name} = ({fields, sitecoreContext}) => {
    return (
        <React.Fragment>${usages}
        </React.Fragment>
    );    
};

export default ${name};`;
};

module.exports = codeTemplate;