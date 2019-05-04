var express = require('express');
var router = express.Router();

var messages = require('../messages');
var models = require('../db/models');

router.post('/get-maintenance-list', (req, res) => {

    var sort_by = {date: 'desc'};
    var sort_id = req.body.sort_id;

    if(sort_id) {
        switch(sort_id) {
            case "carNumber-asc": sort_by = {carNumber: 'asc'}; break;
            case "carNumber-desc": sort_by = {carNumber: 'desc'}; break;
            case "date-asc": sort_by = {date: 'asc'}; break;
            case "date-desc": sort_by = {date: 'desc'}; break;
            case "year-asc": sort_by = {year: 'asc'}; break;
            case "year-desc": sort_by = {year: 'desc'}; break;
            case "cost-asc": sort_by = {cost: 'asc'}; break;
            case "cost-desc": sort_by = {cost: 'desc'}; break;
            default: sort_by = {date: 'desc'}; break;
        }
    }

    var size = 10;
    var pageNo = req.body.pageNo;

    if(pageNo == undefined || pageNo <= 0) {
        pageNo = 1;
    }

    query = {};
    query.skip = size * (pageNo - 1);
    query.limit = 10;

    models.carRecord.countDocuments({}, (err, count) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }

        models.carRecord.find({}, {}, query)
        .sort(sort_by)
        .populate('brandName')
        .populate('errorCodes')
        .exec((err, result) => {
            if(err) {
                console.log(err);
                res.send(JSON.stringify(messages.server_internal_error));
                return;
            }

            var data;
            data.status = messages.success.status;
            data.message = messages.success.message;
            data["result"] = result;
            data["count"] = count;
            res.send(JSON.stringify(data));
        });
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

        var data;
        data.status = messages.success.status;
        data.message = messages.success.message;
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

        var data;
        data.status = messages.success.status;
        data.message = messages.success.message;
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

        var data;
        data.status = messages.success.status;
        data.message = messages.success.message;
        data["result"] = result;
        res.send(JSON.stringify(data));
    });
    
});

router.post('/update', (req, res) => {
    if(req.body.carRecord == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    let carRecord = req.body.carRecord;

    if(carRecord.carNumber == undefined || carRecord.date == undefined ||
            carRecord.brandName == undefined || carRecord.model == undefined ||
            carRecord.year == undefined || carRecord.errorCodes == undefined ||
            carRecord.complaint == undefined || carRecord.cost == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    models.carRecord.updateOne({_id: carRecord._id}, carRecord, (err, result) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }
        if(result == undefined) {
            res.send(JSON.stringify(messages.invalid_input));
            return;
        }

        var data;
        data.status = messages.success.status;
        data.message = messages.success.message;
        res.send(JSON.stringify(data));
    });
});

router.post('/add', (req, res) => {
    if(req.body.carRecord == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    let requestRecord = req.body.carRecord;

    if(requestRecord.carNumber == undefined || requestRecord.date == undefined ||
            requestRecord.brandName == undefined || requestRecord.model == undefined ||
            requestRecord.year == undefined || requestRecord.errorCodes == undefined ||
            requestRecord.complaint == undefined || requestRecord.cost == undefined) {
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

router.post('/delete', (req, res) => {
    if(req.body.carRecord == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    let carRecord = req.body.carRecord;

    if(carRecord._id == undefined) {
        res.send(JSON.stringify(messages.invalid_input));
        return;
    }

    models.carRecord.deleteOne({_id: carRecord._id}, (err) => {
        if(err) {
            console.log(err);
            res.send(JSON.stringify(messages.server_internal_error));
            return;
        }

        var data;
        data.status = messages.success.status;
        data.message = messages.success.message;
        res.send(JSON.stringify(data));
      });

    
});

module.exports = router;