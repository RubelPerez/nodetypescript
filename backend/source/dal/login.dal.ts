
import { Request } from 'express';


const verifiedLogin = async (req: Request) => {
    if (req.body.username == "usuario" && req.body.password == "usuario") {
        return true;
    }
    else {
        return false;
    }
}

export default verifiedLogin