const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin only.",
        });
    }
};

module.exports = isAdmin;
