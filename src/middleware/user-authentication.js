const db = require("./db");

module.exports = {
    type: 'credentials',
    users: function (username) {
        return new Promise(async function (resolve) {
            const userExists = await db.verifyUsername(username);

            if (userExists) {
                const user = { username, permissions: '*' };
                resolve(user);
            } else {
                resolve(null);
            }
        });
    },
    authenticate: function (username, password) {
        return new Promise(async function (resolve) {
            const valid = await db.verifyUser(username, password);
            if (valid) {
                const user = { username, permissions: '*' };
                resolve(user);
            } else {
                resolve(null);
            }
        });
    },
    default: function() {
        return new Promise(function(resolve) {
            resolve({anonymous: true, permissions:""});
        });
    }
}