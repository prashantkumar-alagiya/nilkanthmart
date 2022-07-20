export const notFound = (req,res, next) => {
    const error = new Error(`${req.originalUrl} is not fund`)
    res.status(404);
    next(error);
}

export const handleError = (err,req,res,next) => {
    const statusCode = req.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: err.stack
    })
}

