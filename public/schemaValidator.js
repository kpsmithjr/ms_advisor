//const AjvJTD = require("ajv/dist/jtd")
//const ajvjtd = new AjvJTD()
const Ajv2020 = require("ajv/dist/2020")
const ajv = new Ajv2020({ allErrors: true })
//require("ajv-errors")(ajv, { singleError: true })
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
        const validSchema = "\n" + "Schema: " + path + " is " + (isValid ? "valid" : "not valid");
        console.debug(validSchema);
        const errormsg = '\t' + ajv.errorsText(isValid.errors) + '\n';
        console.debug(errormsg);

    } catch (e) {
        console.debug('Error: ' + e.message);
    }
}

//function parseAndLog(json) {
//    const data = ajvjtd.parse(json);
//    if (data === undefined) {
//        console.debug(parse.message); // error message from the last parse call
//        console.debug(parse.position); // error position in string
//    } else {
//        console.debug(data);
//    }
//}
const data = {
    dept: "CMP SCI",
    num: 1000,
    name: "Computer Science Experiences"
}


try {
    //TODO: make schemas any file "./*.schema.json" in current dir?
    const schemas = ["./course.schema.json", "./course-catalog.schema.json", "./course-rotation.schema.json",
        "./options.schema.json", "./plannedCourse.schema.json", "./studentPlan.schema.json", "./track.schema.json", "./track-catalog.schema.json"];
    schemas.forEach(checkValidSchema);

    //const course_schema = require("./course.schema.json");
    //const validate_course = ajv.compile(course_schema);
    //const test = require("./course-test.json");
    //console.debug(validate_course(test));
    //console.log(JSON.stringify(data));
    //console.log(JSON.parse(JSON.stringify(data)));

    keepConsoleOpen();

} catch (e) {
    console.debug('Error: ' + e.message);
    keepConsoleOpen();
}