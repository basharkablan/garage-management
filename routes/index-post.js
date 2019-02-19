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

router.post('/get-brands-list', (req, res) => {

    models.brand.find()
    .sort({brandName: 'asc'})
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

router.post('/get-codes-list', (req, res) => {

    models.code.find()
    .sort({code: 'asc'})
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

router.post('/add', (req, res) => {
    if(req.body.carRecord == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    let requestRecord = req.body.carRecord;

    console.log(requestRecord);

    if(requestRecord.carNumber == undefined || requestRecord.date == undefined ||
            requestRecord.brandName == undefined || requestRecord.model == undefined ||
            requestRecord.year == undefined || requestRecord.engine == undefined ||
            requestRecord.errorCodes == undefined || requestRecord.complaint == undefined ||
            requestRecord.workDone == undefined || requestRecord.cost == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    var car = new models.carRecord({carNumber : requestRecord.carNumber,
        date : requestRecord.date, brandName: requestRecord.brandName, model: requestRecord.model,
        year: requestRecord.year, engine: requestRecord.engine, errorCodes: requestRecord.errorCodes,
        complaint: requestRecord.complaint, workDone: requestRecord.workDone, cost: requestRecord.cost});

        car.save(function (err, carRecord) {
            if(err) {
                console.log(err);
                res.send(JSON.stringify(messages.server_internal_error));
                return;
            }

            console.log("car record added: " + carRecord.carNumber);
            res.send(JSON.stringify(messages.success));
        });
});

module.exports = router;