const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')

function pulldown(req, res, next) {
    let rawdata = fs.readFileSync('./state.json');  
    let data = JSON.parse(rawdata);
    let datau = {};
    datau.sd = stanford.accessStanford(req.body.aamcid, req.body.pass);
    datau.case = casew.accessCase(req.body.email, req.body.pass);
    datau.hd = harvard.accessHarvard(req.body.aamcid, req.body.pass);
    datau.mo = mayo.accessMayo(req.body.aamcid, req.body.pass);

    let payload = {
        status:'success',
        data: datau
    }
    res.send(200, payload)
}

module.exports = {
    pulldown:pulldown
};