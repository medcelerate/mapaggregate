const Horseman = require('node-horseman');

function accessMayo(aamcid, password) {
    let horseman = new Horseman();
    let userid = aamcid;
    let pass = password;
    let state = null;

    return horseman
    .userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0')
    .open('https://medschoolapplyminnesota.mayo.edu/Security/Login.aspx?ReturnUrl=%2f')
    .click('a[data-toggle="collapse"]')
    .type('input[name="ctl00$ContentMain$Login1$UserName"]', userid)
    .type('input[name="ctl00$ContentMain$Login1$Password"]', pass)
    .click('input[name="ctl00$ContentMain$Login1$LoginButton"]')
    .waitForNextPage({timeout: 9000})
    .open('https://medschoolapplyminnesota.mayo.edu/Applicant/Status/Status_com.aspx')
    .count('#ctl00_content_main_gvCommunication >tbody >tr')
    .then((message_count) => {
        message_count = message_count -1;
        if (message_count != 0) {
            return message_count
        } else {
            return 0;
        }
    })
    .click('a[id="ctl00_AmpHeader1_logout"]')
    .waitForNextPage()
    .close()
}

module.exports = {
    accessMayo: accessMayo
}