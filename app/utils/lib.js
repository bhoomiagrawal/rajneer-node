exports.sendResponse = (response, dt, message="successfull", status=200, ) => {
    let data = {
        message,
        status,
        data: dt

    }
    return response.status(status).json({
       data
    })

}

exports.sendErrorResponse = (response, error, message="Some error occurred", status=500, ) => {
    return response.status(status).json({
        message,
        error,
        status,
    })

}