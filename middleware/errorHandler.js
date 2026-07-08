const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if(err.name === 'CastError') {
        err.message = 'Invalid ID';
        err.statusCode = 400;
    }

    message = err.message || 'Internal Server Error';
    statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message,
        status: statusCode
    });
}

module.exports = errorHandler;