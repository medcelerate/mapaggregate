const Horseman = require('node-horseman');

function accessCase (email, password) {
    let horseman = new Horseman();
    let userid = String(email);
    let pass = String(password);
    let stateca = null;
    let statecc = null;

    horseman
    .userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0')
    .open('https://iapply.case.edu')
    .type('input[name="ctl00$MainContent$tcLogin$tpLogin$txtEmailLogin"]', userid)
    .type('input[name="ctl00$MainContent$tcLogin$tpLogin$txtPasswordLogin"]', pass)
    .click('input[name="ctl00$MainContent$tcLogin$tpLogin$btnLogin"]')
    .waitForNextPage()
    .count('#MainContent_dtlUP > span')
    .then((message_count) => {
        message_count = message_count -1
        if (message_count != 0) {
            stateca = message_count;
        };
    })
    .count('#MainContent_dtlCP > span')
    .then((message_count)=> {
        message_count = message_count -1
        if (message_count != 0) {
            statecc = message_count;
        };
    })
    .close()
    .then(() => {
        return {
            case: stateca,
            cc: statecc
        }
    });
} 

module.exports = {
    accessCase:accessCase
}