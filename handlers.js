const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')

function computeDeltas(datau) {
        let state = {}
        let rawdata = fs.readFileSync('./state.json');  
        let data = JSON.parse(rawdata);
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] != datau[key]) {
                    data[key].data = datau[key]
                    data[key].update = true
                }
                else {
                    data[key].update = false
                }
            }
        }
}

 async function pulldata(req) {
    let dataUpdate = {}
    dataUpdate.sd = await stanford.accessStanford(req.body.aamcid, req.body.pass);
    dataUpdate.hd = await harvard.accessHarvard(req.body.aamcid, req.body.pass);
    dataUpdate.mo = await mayo.accessMayo(req.body.aamcid, req.body.pass);
    dataUpdate.ce = await casew.accessCase(req.body.email, req.body.pass);
    return dataUpdate
}

/*var performScrape = new Promise(
    function scrape(resolve, reject) {
        let state = {}
        let rawdata = fs.readFileSync('./state.json');  
        let data = JSON.parse(rawdata);
        let datau = {};
        stanford.accessStanford(request.body.aamcid, request.body.pass, (response) => {
            datau.sd = response;
            if (datau.sd != data.sd) {
            data.sd = datau.sd
            state.sd = true
            }
            else {
                state.sd = false
            }
        });
        casew.accessCase(request.body.email, request.body.pass, (response) => {
            data.cw = response;
            if (datau.case != data.case) {
                data.case = datau.case
                state.case = true
            }
            else {
                state.case = false
            }

        });
        harvard.accessHarvard(request.body.aamcid, request.body.pass, (response) => {
            data.hd = response;
            if (datau.hd != data.hd) {
                data.hd = datau.hd
                state.hd = true
            }
            else {
                state.hd = false
            }
        });
        mayo.accessMayo(request.body.aamcid, request.body.pass, (response) => {
            data.mo = response;
            if (datau.mo != data.mo) {
                data.mo = datau.mo
                state.mo = true
            }
            else {
                state.mo = false
            }
            //resolve(state)
        });
})*/

function pulldown(req, res, next) {
    pulldata(req)
    .then((result) => {
        computeDeltas(result)
        .then((result) => {
            let payload = {
                status:'Success',
                data: result
            }
            res.send(200, payload)
        })
    })
}

module.exports = {
    pulldown:pulldown
};