const fs = require("fs");
const path = require("path");
module.exports = {
    uiPort: 1880,

    flowFile: 'flows/test-flow.json',

    adminAuth: require("./middleware/user-authentication"),

    https: {
        key: fs.readFileSync(path.join(__dirname, '../key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../cert.pem'))
    },

};
