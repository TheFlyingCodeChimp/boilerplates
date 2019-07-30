const fieldQuestions = (fieldType, amount) => {

    const questions = index => {
        return [
            {
                type: 'input',
                name: ``,
                message: 'Which Sitecore field types will this component have?',
                choices: FieldTypes,
            }
        ]
    };
    return [
        {
            type: 'checkbox',
            name: 'fieldTypes',
            message: 'Which Sitecore field types will this component have?',
            choices: FieldTypes,
        },
        {
            type: 'confirm',
            name: 'mockData',
            message: 'Do you want to scaffold offline data?',
        },
    ];
};