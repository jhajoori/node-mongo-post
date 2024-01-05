const CreateSuccessResponse = (message, data = null) => {

    return {
        status : "success",
        success : true,
        message: message,
        data : data
    }
}

const CreateErrorResponse = (errorMessage, type) =>{

    return {
        status : "error",
        success : false,
        error : {
                type: type,
                message: errorMessage
        }
    }
}
const CreateInternalErrorResponse = () =>{

    return {
        status : "error",
        success : false,
        error : {
                type: "Internal Server Error",
                message: "Oops... Something went wrong!"
        }
    }
}

module.exports = {
    CreateErrorResponse,
    CreateSuccessResponse,
    CreateInternalErrorResponse
}