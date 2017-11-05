const fs = require('fs')


const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')
const harvard = require('./portals/harvard')
const cc = require('./portals/cc.js')
const bosU = require('./portals/bu.js')

function computeDeltas(dataUpdated) {
    return new Promise(function(resolve,reject){
    if (fs.existsSync('./db.json')) {
        let state = []
        let rawdata
        let data
        try {
            rawdata = fs.readFileSync('./db.json');
        } catch (e) {
            reject(e)
        }
        try {
             data = JSON.parse(rawdata);
        } catch (e) {
            reject(e)
        }

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof dataUpdated[key] == 'undefined') {
                    state.push({school: key, update: 'failed'})
                }
                else if (data[key].data != dataUpdated[key]) {
                    data[key].data = dataUpdated[key]
                    state.push({school: key, update: true})
                }
                else {
                    state.push({school: key, update: false})
                }
            }
        }
        data = JSON.stringify(data)
        fs.writeFile('./db.json', data, 'utf8', () => {
            resolve(state)
            //console.log('Yay')
        })
    }
    else {
        let state = []
        let data = {}
        for (var key in dataUpdated) {
            if (dataUpdated.hasOwnProperty(key)) {
                data[key] = {data: dataUpdated[key], update: true};
                state.push({school: key, update: false})
            }
            else {
                continue;
            }
        }
        data = JSON.stringify(data)
        fs.writeFile('./db.json', data, 'utf8', () => {
            resolve(state)
        })
    }
    })
}


 async function pulldata(req) {
    // I plan to make this asynchronous soon using Promise.all, I needed to get it functioning properly first
    let dataUpdate = {}
    let [sd, hd, mo, ce, cn, bu] = await Promise.all([
        stanford.accessStanford(req.body.aamcid, req.body.pass),
        harvard.accessHarvard(req.body.aamcid, req.body.pass),
        mayo.accessMayo(req.body.aamcid, req.body.pass),
        casew.accessCase(req.body.email, req.body.pass),
        cc.accessCC(req.body.email, req.body.pass),
        bosU.accessBU(req.body.email, req.body.pass)
    ]);
    dataUpdate = {
        'Stanford':sd,
        'Harvard':hd,
        'Mayo Clinic':mo,
        'Case Western':ce,
        'Cleveland Clinic':cn,
        'Boston University':bu
    }
    /*
    dataUpdate.sd = await stanford.accessStanford(req.body.aamcid, req.body.pass);
    dataUpdate.hd = await harvard.accessHarvard(req.body.aamcid, req.body.pass);
    dataUpdate.mo = await mayo.accessMayo(req.body.aamcid, req.body.pass);
    dataUpdate.ce = await casew.accessCase(req.body.email, req.body.pass);
    dataUpdate.cc = await cc.accessCC(req.body.email, req.body.pass);*/
    console.log(dataUpdate)
    return dataUpdate
}

function pulldown(req, res, next) {
    console.log(req.body)
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
        .catch((err) => {
            return next(err)
        })
    })
}

module.exports = {
    pulldown:pulldown
};