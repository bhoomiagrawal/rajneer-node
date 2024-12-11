exports.sendResponse = ({res, data, msg="successfull", status=200,} ) => {
    let dt = {
        msg,
        status,
        data

    }
    return res.status(status).json({
       data: dt
    })

}

exports.sendErrorResponse = ({res, err, status=500, msg="Some error occurred"}  ) => {
    let error = {
        msg,
        status,
        err,

    }
    return res.status(status).json({
       error
    })

}

exports.create = () => {

}