const testTemplate = (name) => {
    return `import React from 'react';
import TestRenderer from 'react-test-renderer';
import ${name} from '../${name}';


describe('${name}', () => {
	it('renders the component correctly', () => {
		const testRenderer = TestRenderer
			.create(<${name} fields={<!--INSERT FIELDS-->}/>);
		const testInstance = testRenderer.root;
		testRenderer.toJSON();
		expect(testInstance.findByProps({className: '<!--INSERT CLASS-->'}));
		expect(testRenderer).toMatchSnapshot();
	});
});`;
} ;
