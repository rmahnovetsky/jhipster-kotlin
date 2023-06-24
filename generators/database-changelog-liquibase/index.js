const DatabaseChangelogLiquibaseGenerator = require('generator-jhipster/generators/database-changelog-liquibase');

module.exports = class extends DatabaseChangelogLiquibaseGenerator {
    constructor(args, options, features) {
        super(args,options,features)
    }

    get initializing() {
        return super._initializing();
    }

    get loading() {
        return super._loading();
    }

    get preparingFields() {
        return super._preparingFields();
    }

    get preparingRelationships() {
        return super._preparingRelationships();
    }

    get preparing() {
        return super._preparing();
    }

    get prompting() {
        return super._prompting();
    }

    get configuring() {
        return super._configuring();
    }

    get composing() {
        return super._composing();
    }

    get default() {
        return super._default();
    }

    get writing() {
        return super._writing();
    }

    get install() {
        return super._install();
    }

    get postWriting() {
        return super._postWriting()
    }

    get end() {
        return super._end();
    }
};
