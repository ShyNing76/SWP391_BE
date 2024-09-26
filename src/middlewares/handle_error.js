import createError from "http-errors";

export const notFound = (req, res) => {
    const error = createError.NotFound(`The requested URL ${req.url} was not found on this server`);
    return res.status(error.status).json({err: error.status, message: error.message});
}

export const badRequest = (res, message) => {
    const error = createError.BadRequest(message);
    return res.status(error.status).json({err: error.status, message: error.message.toString().replaceAll("\"", "")});
}

export const notAuthorized = (message, res, isExpired) => {
    const error = isExpired ? createError.Unauthorized("Access token expired") : createError.Unauthorized(message);
    return res.status(error.status).json({err: error.status, message: error.message});
}

export const internalServerError = (res, message) => {
    const error = createError.InternalServerError(message);
    return res.status(error.status).json({err: error.status, message: error.message});
}

export const forbidden = (res, message) => {
    const error = createError.Forbidden(message);
    return res.status(error.status).json({err: error.status, message: error.message});
}
