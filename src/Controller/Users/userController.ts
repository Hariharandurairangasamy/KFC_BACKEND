import { Request, Response } from 'express';
import * as bycript from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { userService } from '../../Service/UserService';
import userModel from '../../Model/Users/schema';
import logger from '../../Middleware/logger';
import { ReturnStatus, StatusResponce } from '../../Utils/responceCode';

dotenv.config();

export default class UserController {
  public async addUsers(req: Request, res: Response) {
    try {
      const userServiceData = new userService();
      // HASH THE PASSWORD
      const genSaltPassword = await bycript.hash(req.body.password, 10);
      const userDataObj = {
        userName: req.body.userName,
        password: genSaltPassword,
        email: req.body.email,
        role: req.body.role,
        permission: req.body.permission,
      };
      const postUserData = await userServiceData.addUsersData(userDataObj);
      if (postUserData.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data is Created', data: postUserData });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data is not Created' });
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async getAllUsersData(req: Request, res: Response) {
    try {
      const { size, pageNo }: any = req.query;
      const userServices = new userService();
      const getUserData = await userServices.getUserData(size, pageNo);

      if (getUserData.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data Feched SuccessFully', data: getUserData });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data not Feched SuccessFully' });
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async updateUserDatas(req: Request, res: Response) {
    try {
      const userServices = new userService();
      const getUsersData = req.body;
      const paramsIds: any = req.params.id;
      const getUpdateUsedData = await userServices.updateUser(
        getUsersData,
        paramsIds
      );
      if (getUpdateUsedData.status === ReturnStatus.SUCCESS_CODE) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Data Updated Successfully',
          data: getUpdateUsedData,
        });
      } else {
        res.status(StatusResponce.BAD_REQUEST);
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async deleteUsersDetails(req: Request, res: Response) {
    try {
      const userServices = new userService();
      const deletdData: String | any = req.params.id;
      const deletUserDetails = await userServices.deleteUser(deletdData);
      if (deletUserDetails.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data is deleted successFully' });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data is not deleted successFully' });
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async jwtLogin(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      if (!(userName && password))
        res
          .status(ReturnStatus.FAIL_CODE)
          .json({ message: 'All inputs are required' });

      const getUserName: any = await userModel.findOne({ userName });

      if (
        getUserName &&
        (await bycript.compare(password, getUserName.password))
      ) {
        const getToken = jwt.sign({ userName }, process.env.JWT_TOKEN_SECRET, {
          expiresIn: '2h',
        });

        res.status(StatusResponce.SUCCESS).json({
          message: 'loggin SuccessFully',
          data: {
            userName: userName,

            token: getToken,
          },
        });
      } else {
        return res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'loggin error' });
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
}
