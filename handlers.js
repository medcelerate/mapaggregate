const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')

function pulldown(req, res, next) {
    let state = {}
    let rawdata = fs.readFileSync('./state.json');  
    let data = JSON.parse(rawdata);
    let datau = {};
    stanford.accessStanford(req.body.aamcid, req.body.pass, (response) => {
        datau.sd = response;
        if (datau.sd != data.sd) {
        data.sd = datau.sd
        state.sd = true
        }
        else {
            state.sd = false
        }
    });
    casew.accessCase(req.body.email, req.body.pass, (response) => {
        data.cw = response;
        if (datau.case != data.case) {
            data.case = datau.case
            state.case = true
        }
        else {
            state.case = false
        }

    });
    harvard.accessHarvard(req.body.aamcid, req.body.pass, (response) => {

    });
    mayo.accessMayo(req.body.aamcid, req.body.pass, (response) => {

    });



    if (datau.case != data.case) {
        data.case = datau.case
        state.case = true
    }
    else {
        state.case = false
    }

    if (datau.hd != data.hd) {
        data.hd = datau.hd
        state.hd = true
    }
    else {
        state.hd = false
    }

    if (datau.mo != data.mo) {
        data.mo = datau.mo
        state.mo = true
    }
    else {
        state.mo = false
    }

    let payload = {
        status:'success',
        data: state
    }
    res.send(200, payload)
}

module.exports = {
    pulldown:pulldown
};