
const httpStatus = {
    error: 'ERROR',
    done: 'SUCCESS'
}

const Server = {
    port: process.env.PORT || 3001
};


module.exports = {
    httpStatus,
    Server
}