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

exports.sendErrorResponse = (response, err, status=500, message="Some error occurred",  ) => {
    let error = {
        message,
        status,
        err,

    }
    return response.status(status).json({
       error
    })

}