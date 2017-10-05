/*
This is the parser for the stanford applicaiton, there needs to be a user agent in the user agent field.
This specific package depends on horsemanjs and phantom js. Phantom can be installed using npm with -g.
*/

const Horseman = require('node-horseman');

function accessStanford(aamcid, password) {
    let horseman = new Horseman();
    let userid = aamcid;
    let pass = password;
    let state = null;

    horseman
    .userAgent('')
    .open('https://med.stanford.edu/aes')
    .post('https://med.stanford.edu/aes/login.do','aamcId=&password=')
    .wait(500)
    .open('https://med.stanford.edu/aes/applicationStatus.do')
    .html('table[class="application-table"]')
    .then((text) => {
        state = text;
    })
    .close()
    .then(() => {
        return state;
    })
}
module.exports = accessStanford;
