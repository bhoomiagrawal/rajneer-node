exports.sendResponse = (response, message, status=200, ) => {
    return response.status(status).json({
        message,
        status,
    })

}

exports.sendErrorResponse = (response, message, error, status=500, ) => {
    return response.status(status).json({
        message,
        error,
        status,
    })

}