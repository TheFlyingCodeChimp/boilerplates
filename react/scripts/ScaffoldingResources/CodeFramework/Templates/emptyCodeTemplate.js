const emptyTemplate = name => {
    return `import React from 'react';
import { jsx } from '@emotion/core';
import { Text, isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-react';
import styles from './${name}.styles';

const ${name} = ({fields}) => {
	return (
        <React.Fragment>
            <Text fields={fields.title} css={styles.button}/>
        </React.Fragment>
	);
};

export default ${name};
`;
};


module.exports = emptyTemplate;