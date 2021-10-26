import logger from './logger.js'

function requestLogger(request, response, next) {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

function unknownEndpoint(request, response) {
    response.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler(error, request, response, next) {
    logger.error(error.message)
    if (error.name === 'CastError') {
        response.status(400).json({
            type: 'CastError',
            message: 'Malformatted ID'
        })
    } else if (error.name === 'ValidationError') {
        response.status(400).json({
            type: 'ValidationError',
            message: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({
            type: 'TokenError',
            message: 'invalid token'
        })
    }
    next(error)
}

function tokenExtractor(request, response, next) {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
}

export default { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }