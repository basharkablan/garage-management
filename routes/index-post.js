var express = require('express');
var router = express.Router();

var messages = require('../messages');
var models = require('../db/models');

router.post('/get-maintenance-list', (req, res) => {

    models.carRecord.find()
    .sort({date: 'desc'})
    .populate('brandName')
    .populate('errorCodes')
    .exec((err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }

        var data = messages.success;
        data["result"] = result;
        res.send(JSON.stringify(data));
    });
    
});

router.post('/get-car-record', (req, res) => {

    if(req.body.carID == undefined) {
        res.send(JSON.stringify(messages.missing_field));
        return;
    }

    models.carRecord.findOne({_id: req.body.carID})
    .populate('brandName')
    .populate('errorCodes')
    .exec((err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }

        var data = messages.success;
        data["result"] = result;
        res.send(JSON.stringify(data));
    });
    
});

router.post('/update', (req, res) => {
    if(req.body.carRecord == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    res.send(JSON.stringify(messages.success));
});

module.exports = router;