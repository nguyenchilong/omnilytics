
const fs = require('fs');
const path = require('path');

/**
 * make func random Alphabetical String
 * @param {*} len 
 * @param {*} charSet 
 * @returns 
 */
const randomString = (len, charSet) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    len = len || 12;
    let str = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        str += charSet.substring(randomPoz,randomPoz+1);
    }
    return str;
}

/**
 * make func random Alphanumerics
 * @param {*} len 
 * @param {*} charSet 
 * @returns 
 */
 const randomAlphaNumber = (len, charSet) => {
    charSet = charSet || '0123456789';
    len = len || 2;
    let str = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        str += charSet.substring(randomPoz, randomPoz+1);
    }
    return str;
}
/**
 * make func random integers or real number
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
const randomNumber = (min, max, isReal) => {
    if (max === undefined) {
		max = min;
		min = 0;
	}
	if (typeof min !== 'number' || typeof max !== 'number') {
		max = 1000;
		min = 0;
	}
    if(isReal) {
        const _real = ((Math.random() * (max - min)) + min).toFixed(3);
        return Number.parseFloat(_real);
    } else {
	    return Math.floor((Math.random() * (max - min + 1)) + min);
    }
}
/**
 * make func write random data to file
 * @param {*} data 
 * @param {*} filename 
 * @returns 
 */
const writeFile = (data, filename) => {
    if(typeof data !== 'string')
        throw new TypeError('Data only allow string datatype');
    if(typeof filename !== 'string')
        throw new TypeError('FileName only allow string datatype');
    const pathFile = path.resolve(__dirname, '..', 'public', 'random', filename);
    return fs.writeFileSync(pathFile, data, { flag: 'a+' });
}
/**
 * detect number is integer or float/real
 * @param {*} value 
 * @returns 
 */
const numberType = (value) => {
    if(typeof value !== 'number') return null;
    return Number.isInteger(v) ? 'int' : 'real';
}
/**
 * make func detect is alphabetical or only number string
 * @param {*} value 
 * @returns 
 */
const stringType = (value) => {
    if(typeof value !== 'string')
        value = value.toString();
    const regex = /[a-zA-Z]/g;
    const found = value.match(regex);
    return (found === null) ? 'str_number' : 'alphabetical';
}
/**
 * make func to keep total objects for on json object
 */
const keepTotalObject = () => {
    const pathFile = path.resolve(__dirname, '..', 'public', 'random', 'report.json');
    let jsonReport = {
        integer: 1,
        real: 1,
        string: 1,
        strNumber: 1
    };
    if(fs.existsSync(pathFile)) {
        jsonReport = JSON.parse(fs.readFileSync(pathFile));
        jsonReport.integer = (jsonReport.integer + 1);
        jsonReport.real = (jsonReport.real + 1);
        jsonReport.string = (jsonReport.string + 1);
        jsonReport.strNumber = (jsonReport.strNumber + 1);
    }
    fs.writeFileSync(pathFile, JSON.stringify({
        integer: jsonReport.integer,
        real: jsonReport.real,
        string: jsonReport.string,
        strNumber: jsonReport.strNumber
    }));
}

module.exports = {
    writeFile,
    numberType,
    stringType,
    randomString,
    randomNumber,
    keepTotalObject,
    randomAlphaNumber
}