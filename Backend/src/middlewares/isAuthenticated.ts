import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //recebe token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //validação de token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        //recuperar o id do token e injetar no request
        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).end();
    }

}