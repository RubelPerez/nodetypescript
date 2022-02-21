import { Request } from 'express';

const verifiedLogin = async (req: Request) => {
    const { username, password } = req.body;
    if (username == 'usuario' && password == 'usuario') {
        return true;
    } else {
        return false;
    }
};

export default verifiedLogin;
