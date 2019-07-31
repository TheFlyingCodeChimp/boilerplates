const indexTemplate = name => {
    return `import ${name} from './${name}';
    
export default ${name};`;
};

module.exports = indexTemplate;