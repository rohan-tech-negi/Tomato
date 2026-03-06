import Jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Please login  - token missing",
                success: false,
            });
            return;
        }
        const decodeValue = Jwt.verify(token, process.env.JWT_SECRET);
        if (!decodeValue || !decodeValue.user) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }
        req.user = decodeValue.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Please Login - Jwt error"
        });
    }
};
