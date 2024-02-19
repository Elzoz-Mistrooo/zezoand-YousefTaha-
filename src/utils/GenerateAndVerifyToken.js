import jwt from 'jsonwebtoken'


export const generateToken = ({ payload = {}, signature = "ThisGenerateTokenForEasyClinc", expiresIn = 60 * 60 } = {}) => {
    const token = jwt.sign(payload, signature, { expiresIn: parseInt(expiresIn) });
    return token
}

export const verifyToken = ({ token, signature = "ThisGenerateTokenForEasyClinc" } = {}) => {
    const decoded = jwt.verify(token, signature);
    return decoded
}