/*
This is the parser for the stanford applicaiton, there needs to be a user agent in the user agent field.
This specific package depends on horsemanjs and phantom js. Phantom can be installed using npm with -g.
*/

const Horseman = require('node-horseman');

function accessStanford(aamcid, password) {
    let horseman = new Horseman();
    let pass = ""
    let n = password.length
    if (n > 10) {
        pass = String(password.substring(0, 10));
    }
    else {
        pass = String(password);
    }
    let userid = String(aamcid);
    let poststring = 'aamcId=' + userid + '&password=' + pass
 
    return horseman
    .userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0')
    .open('https://med.stanford.edu/aes')
    .post('https://med.stanford.edu/aes/login.do', poststring)
    .wait(500)
    .open('https://med.stanford.edu/aes/applicationStatus.do')
    .html('table[class="application-table"]')
    .then((text) => {
        return text
        horseman.open('https://med.stanford.edu/aeslogout.do/').close()
    })
    .catch((err) => {
        console.log(err);
    })
}
module.exports = {
    accessStanford: accessStanford
};
