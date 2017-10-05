const stanford = require('./portals/stanford')

function pulldown(req, res, next) {
    let data = {}
    data.sd = stanford.accessStanford(req.body.aamcid, req.body.pass)

    let payload = {
        status:'success',
        data: data
    }
    res.send(200, payload)
}
module.exports = {
    pulldown:pulldown
};