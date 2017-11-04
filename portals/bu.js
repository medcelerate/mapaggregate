const Horseman = require('node-horseman');


function accessBU (email, password) {
    let horseman = new Horseman();
    let userid = String(email);
    let pass = String(password);
    
    
    return horseman
    .userAgent('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:55.0) Gecko/20100101 Firefox/55.0')
    .open('https://myapplication.bumc.bu.edu/2018/login.aspx?ReturnUrl=%2f2018')
    .click('input[name="ctl00$MainContent$ButtonLogin"]')
    .wait(6000)
    .type('input[name="j_username"]', email)
    .type('input[name="j_password"]', pass)
    .click('button[name="_eventId_proceed"]')
    .wait(7000)
    .open('https://myapplication.bumc.bu.edu/2018/Main/ApplicationStatus.aspx')
    .waitForNextPage()
    .count('table.tableMain > tbody table tr')
    .then((message_count) => {
        message_count = message_count -1;
        if (message_count != 0) {
            return message_count;
        } else {
            return false;
        }
        horseman.open('https://myapplication.bumc.bu.edu/2018/logout.aspx')
        .wait(6000)
        .click('input[name="ctl00$MainContent$btnLogout"]').waitForNextPage().close()    
    })
    .catch((err) => {
        console.log(err)
    })
}