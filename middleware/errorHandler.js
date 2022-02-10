export const errorHandler = (err, req, res, next) => {
    res.statusCode = err.statusCode;
    res.send({
        error: err
    })
}