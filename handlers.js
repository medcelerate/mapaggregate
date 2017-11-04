const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')

function computeDeltas(datau) {
    if (fs.existsSync('./state.json')) {
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
        fs.writeFileSync('./state.json', data)
    }
    else {
        let state = {}
        for (var key in datau) {
            if (datau.hasOwnProperty(key)) {
                state[key] = {data: datau, update: false};
            }
            else {
                continue;
            }
        }
        fs.writeFileSync('./state.json', state)
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