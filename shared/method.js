const JsonResponse = (status, message, data) => {
    return {
        message,
        status,
        data,
    }
}

module.exports.JsonResponse = JsonResponse;
