import { NextFunction, Request, Response } from 'express';
import logger from '../Middleware/logger';
import * as jwt from 'jsonwebtoken';
import { StatusResponce } from '../Utils/responceCode';

export interface AuthRequest extends Request {
  user: any;
}

export default class AuthMiddleware {
  public async routeAuthMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authToken = req.headers['authorization'];
      const getAuthToken = authToken && authToken.split(' ')[1];
      if (!getAuthToken)
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Auth token vot valid' });
      const decodeToken = jwt.verify(getAuthToken, process.env.JWT_SECROT_KET);
      req.user = decodeToken;
      next();
    } catch (err) {
      logger.error(err);
      res.status(StatusResponce.BAD_REQUEST).json({ message: 'Auth faild' });
    }
  }
}
