const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const func = require('../lib/random');
const constants = require('../lib/constants');



// root API only return status 200 and message direction need to add endpoint
router.get('/', (req, res, next) => {
  res.status(200).send('Please add endpoint to call API');
});

// API health check
router.get('/health', (req, res, next) => {
  res.status(200).send('OK');
});

/**
 * make random when client call
 */
router.post('/random', (req, res, next) => {
  try {
    const _body = req.body;
    const _min = _body.min || 0;
    const _max = _body.max || 10000;
    const _len = _body.len || 12;
    const _lenAlphaNumber = _body.lenAlphaNumber || 2;
    const _int = func.randomNumber(_min, _max);
    const _real = func.randomNumber(_min, _max, true);
    const _str = func.randomString(_len);
    const _strNumber = func.randomAlphaNumber(_lenAlphaNumber);
    let printObject = `${_int}, ${_real}, ${_str}, ${_strNumber}`;
    const fileName = 'printable.txt';
    const fileExist = fs.existsSync(path.resolve(__dirname, '..', 'public', 'random', fileName));
    printObject = fileExist ? `, ${printObject}` : printObject.trim();
    func.writeFile(printObject, fileName);
    func.keepTotalObject();
    res.json({
      status: constants.httpStatus.done,
      msg: 'Random printable objects successfully',
      data: {
        filePath: `http://localhost:${constants.Server.port}/api/download/${fileName}`,
        integer: _int,
        real: _real,
        string: _str,
        strNumber: _strNumber
      }
    })
  } catch(error){
    console.log(error);
    res.json({
      status: constants.httpStatus.error,
      msg: 'Error random printable objects'
    })
  }
});

/**
 * route for init Frontend and check file exists
 */
router.get('/init', (req, res, next) => {
  try {
    const fileName = 'printable.txt';
    const fileExist = fs.existsSync(path.resolve(__dirname, '..', 'public', 'random', fileName));
    let resObject = {
      filePath: '',
      integer: 0,
      real: 0,
      string: '',
      strNumber: ''
    };
    if(fileExist) {
      resObject.filePath = `http://localhost:${constants.Server.port}/api/download/${fileName}`
    }
    res.json({
      status: constants.httpStatus.done,
      msg: 'Printable objects already created',
      data: resObject
    });
  } catch(error){
    res.json({
      status: constants.httpStatus.error,
      msg: 'Error check printable objects'
    })
  }
});

/**
 * make func for client download file
 */
router.get('/download/:fileName', (req, res, next) => {
  const fileName = path.resolve(__dirname, '..', 'public', 'random', req.params.fileName);
  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-type', 'text/plain');
  res.download(fileName);
});

/**
 * 
 */
router.get('/report', (req, res, next) => {
  
});

module.exports = router;
