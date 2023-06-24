const constants = require('generator-jhipster/generators/generator-constants');
const { SERVER_MAIN_SRC_DIR, SERVER_TEST_SRC_DIR } = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_SRC_KOTLIN_DIR = `${constants.MAIN_DIR}kotlin/`;
const SERVER_TEST_SRC_KOTLIN_DIR = `${constants.TEST_DIR}kotlin/`;

const getPath = pathName => {
    if (pathName === SERVER_MAIN_SRC_DIR) return SERVER_MAIN_SRC_KOTLIN_DIR;
    if (pathName === SERVER_TEST_SRC_DIR) return SERVER_TEST_SRC_KOTLIN_DIR;
    return pathName;
};

const makeKotlinServerFiles = function (files) {
    // add custom files
    const extraDTOs = [{
        file: 'package/service/dto/CreateEntityDTO.java',
            renameTo: generator => `${generator.entityAbsoluteFolder}/service/dto/Create${generator.asDto(generator.entityClass)}.java`,
    },
    {
        file: 'package/service/mapper/CreateEntityMapper.java',
            renameTo: generator => `${generator.entityAbsoluteFolder}/service/mapper/Create${generator.entityClass}Mapper.java`,
    }]
    console.log(files["dtoFiles"])
    console.log(files["dtoFiles"][0].templates)
    files["dtoFiles"][0].templates.push(...extraDTOs)
    console.log(files["dtoFiles"][0].templates)
    const keys = Object.keys(files);
    const out = {};

    keys.forEach(key => {
        out[key] = files[key].map(file => ({
            ...file,
            path: getPath(file.path),
            templates: file.templates
                .filter(template => (typeof template.file === 'string' ? template.file.indexOf('package-info') === -1 : true))
                .map(template => {
                    if (template.file) {
                        if (typeof template.file !== 'function') {
                            let templateName = template.file;
                            if (template.file.indexOf('.java') !== -1) {
                                templateName = template.file.replace('.java', '.kt');
                            }
                            return {
                                ...template,
                                file: templateName,
                                renameTo: template.renameTo ? generator => template.renameTo(generator).replace(generator.entityAbsoluteFolder, generator.entityAbsoluteFolder + "/" + generator.module).replace('.java', '.kt') : null,
                            };
                        }
                        return {
                            ...template,
                            file: generator => template.file(generator).replace('.java', '.kt'),
                            renameTo: template.renameTo ? generator => template.renameTo(generator).replace(generator.entityAbsoluteFolder, generator.entityAbsoluteFolder + "/" + generator.module).replace('.java', '.kt') : null,
                        };
                    }
                    return template;
                }),
        }));
    });
    return out;
};

module.exports = {
    makeKotlinServerFiles,
};
