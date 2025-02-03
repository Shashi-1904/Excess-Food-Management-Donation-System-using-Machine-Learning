const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        // Handle Zod validation errors
        if (err.errors) {
            const errorDetails = err.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message,
            }));

            // Return error in JSON format with status 422
            return res.status(422).json({
                status: 422,
                message: "Validation error",
                errors: errorDetails
            });
        }

        // Pass other types of errors to the next error handler
        next(err);
    }
}

module.exports = validate;
