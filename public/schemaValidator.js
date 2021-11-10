const Ajv2020 = require("ajv/dist/2020")
const ajv = new Ajv2020({ allErrors: true })
require("ajv-errors")(ajv, { singleError: true })
//const fs = require('fs');
//TODO: documentation

function keepConsoleOpen() {
    require('readline')
        .createInterface(process.stdin, process.stdout)
        .question("Press [Enter] to exit...", function () {
            process.exit();
        });
    return;
}

function checkValidSchema(path) {
    try {
        const schema = require(path);
        const isValid = ajv.validateSchema(schema);
        const validSchema = "\n" + "Schema: " + path + " is " + (isValid? "valid": "not valid");
        console.debug(validSchema);
        const errormsg = '\t' + ajv.errorsText(isValid.errors) + '\n';
        console.debug(errormsg);

    } catch (e) {
        console.debug('Error: ' + e.message);
    }
}

try {
    //TODO: make schemas any file "./*.schema.json" in current dir?
    const schemas = ["./course.schema.json", "./course-catalog.schema.json", "./course-rotation.schema.json",
        "./options.schema.json", "./plannedCourse.schema.json", "./studentPlan.schema.json"];
    schemas.forEach(checkValidSchema);
    keepConsoleOpen();
} catch (e) {
    console.debug('Error: ' + e.message);
}