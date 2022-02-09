import { NextFunction, Request, Response } from 'express';
import verifiedLogin from './../dal/login.dal';


const login = async (req: Request, res: Response, next: NextFunction) => {
    const login = await verifiedLogin(req).then((result: any) => { return result })
    console.log("res",login)
    res.send({ login })
};

export default { login };
