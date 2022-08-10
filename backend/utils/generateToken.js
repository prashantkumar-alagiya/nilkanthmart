import jwt from 'jsonwebtoken';

export const  generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {expiresIn : '30d'})
}