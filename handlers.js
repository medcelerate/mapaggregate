const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')

var request = {}

var performScrape = new Promise(
function scrape(resolve, reject) {
    let state = {}
    let rawdata = fs.readFileSync('./state.json');  
    let data = JSON.parse(rawdata);
    let datau = {};
    let counter = 0
    stanford.accessStanford(request.body.aamcid, request.body.pass, (response) => {
        datau.sd = response;
        if (datau.sd != data.sd) {
        data.sd = datau.sd
        state.sd = true
        counter++
        }
        else {
            state.sd = false
            counter++
        }
    });
    casew.accessCase(request.body.email, request.body.pass, (response) => {
        data.cw = response;
        if (datau.case != data.case) {
            data.case = datau.case
            state.case = true
            counter++
        }
        else {
            state.case = false
            counter++
        }

    });
    harvard.accessHarvard(request.body.aamcid, request.body.pass, (response) => {
        data.hd = response;
        if (datau.hd != data.hd) {
            data.hd = datau.hd
            state.hd = true
            counter++
        }
        else {
            state.hd = false
            counter++
        }
    });
    mayo.accessMayo(request.body.aamcid, request.body.pass, (response) => {
        data.mo = response;
        if (datau.mo != data.mo) {
            data.mo = datau.mo
            state.mo = true
            counter++
        }
        else {
            state.mo = false
            counter++
        }
    while (true){
        return;
        if (counter == 4) {
            resolve(state)
            break;
        }
        else {
            reject("Nope")
            break;
        }
    }
    });
}
)

function pulldown(req, res, next) {
    request = req
    performScrape
    .then((result) => {
        let payload = {
        status:'success',
        data: result
    }
    res.send(200, payload)
    })
}

module.exports = {
    pulldown:pulldown
};