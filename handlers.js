const stanford = require('./portals/stanford')
const casew = require('./portals/case')
const mayo = require('./portals/mayo')

function pulldown(req, res, next) {
    let data = {}
    data.sd = stanford.accessStanford(req.body.aamcid, req.body.pass)
    data.case = casew.accessCase(req.body.email, req.body.pass)
    data.hd = harvard.accessHarvard(req.body.aamcid, req.body.pass)
    data.mo = mayo.accessMayo(req.body.aamcid, req.body.pass)

    let payload = {
        status:'success',
        data: data
    }
    res.send(200, payload)
}
module.exports = {
    pulldown:pulldown
};