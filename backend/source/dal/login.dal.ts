import { Request } from 'express';

const verifiedLogin = async (req: Request) => {
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    if (username == 'usuario' && password == 'usuario') {
        return true;
    } else {
        return false;
    }
};

export default verifiedLogin;
