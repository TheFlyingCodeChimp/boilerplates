/*
  README: JSS Component Scaffolding Script
  This is a script that enables scaffolding a new component.

  Several activities will take place after prompting you for information:

  1. Create component files in the following location and structure
  (with "Header" as the input):

    src/ <-- Existing
        components/ <-- Existing
            Header/
                __tests__/
                        Header.test.js
                Partials <-- Empty folder
                index.js
                Header.js
                Header.styles.js


    2. Pre-populate the respective js files by supplementing the default structures found
    in `./ScriptResources` with the information entered

    3. Create a component definition file using field information entered.
        e.g 'sitecore/definitions/components/Header.sitecore.js'

    4. Generate a global content file that can easily be referenced on page routes


*/

/* eslint-disable no-throw-literal,no-console */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const inquirer = require('inquirer');
const camelMessages = require('./ScaffoldingResources/camelMessages');
const schemas = require('./ScaffoldingResources/ScriptSchemas');
const generateCodeScaffold = require('./ScaffoldingResources/CodeFramework/generateCodeScaffold');
const fieldTypes = require('./ScaffoldingResources/fieldTypes');

const paths = {
    definition: 'sitecore/definitions/components',
    content: 'sitecore/data/content',
    code: 'src/components',
};


const componentName = process.argv[2];
const componentPath = path.join(paths.code, componentName);
//Make sure the given name is suitable
validateComponentName(componentName);

(async () => {
    try {
        let response = `The ${componentName} code has been created!`;
        const quickScaffold = await inquirer.prompt([{
            type: 'confirm',
            name: 'result',
            message: 'Do you want to do a full scaffold? (Set fields/keys etc.)',
        }]);
        if(quickScaffold.result){
            const initialFields = await inquirer.prompt(schemas.initial);
            const fieldCounts = await inquirer.prompt(schemas.fieldCount(initialFields));
            const fieldKeys = await inquirer.prompt(schemas.fieldKeys(initialFields.fieldTypes.map(field => {
                return {
                    ...fieldTypes[field],
                    count: fieldCounts[`${field}-count`],
                    key: field
                }
            })));
            const mappedAnswers = generateAnswerObject(initialFields, fieldCounts, fieldKeys);

            generateCodeScaffold(componentName, componentPath, mappedAnswers);
            if(initialFields.mockData){
                response = `${response} Now lets get the sitecore data sorted!`;
            }
        } else {
            generateCodeScaffold(componentName, componentPath);
        }

        camelMessages.success(response);

    } catch (e) {
        camelMessages.error(e);
        //Clean up failed component directory if it was created
        rimraf.sync(componentPath);
        process.exit();
    }
})();

function generateAnswerObject(initialFields, fieldCounts, fieldKeys){
    const finalObject = {};

    initialFields.fieldTypes.map(field => {
        let items = [];

        for (let i = 1; i <= fieldCounts[`${field}-count`]; i++) {
            items.push({
                key: fieldKeys[`${field}-${i}-key`]
            })
        }
        finalObject[field] = {
            ...fieldTypes[field],
            items: items
        }
    });

    return finalObject;
}



function validateComponentName(name) {
    if (!name) {
        camelMessages.error('Component name was not passed.');
        process.exit();
    }

    if (!/^[A-Z][A-Za-z0-9-]+$/.test(name)) {
        camelMessages.error('Component name should start with an uppercase letter and contain only letters and numbers.');
        process.exit();
    }

    if (fs.existsSync(componentPath)) {
        camelMessages.error(`Component already exists, at '${componentPath}'.`);
        process.exit();
    }
}


