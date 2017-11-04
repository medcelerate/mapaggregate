const Horseman = require('node-horseman');

function accessHarvard(aamcid, password) {
    let horseman = new Horseman();
    let userid = aamcid;
    let pass = password;
    let state = null;

    return horseman
    .userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0')
    .open('https://admissions.hms.harvard.edu/security/Login.aspx?ReturnUrl=%2fdefault.aspx')
    .type('input[name="Login1$UserName"]', userid)
    .type('input[name="Login1$Password"]', pass)
    .click('input[name="Login1$LoginButton"]')
    .waitForNextPage()
    .open('https://admissions.hms.harvard.edu/Applicant/Status/Status_com.aspx')
    .html('#unread_count','')
    .then((message_count) => {
        if (message_count != 0) {
            return true
        } else {
            return false
        }
        horseman.click('a[id="ctl00_Header_HyperLink1"]').waitForNextPage().close()
    })
    .catch((err) => {
        console.log(err)
    })

}

module.exports = {
    accessHarvard: accessHarvard
}