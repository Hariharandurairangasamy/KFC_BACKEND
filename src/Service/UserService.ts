import { ReturnStatus } from '../Utils/responceCode';
import userModel from '../Model/Users/schema';
import { UserInterface } from '../Interface/UserInterface';
import logger from '../Middleware/logger';
import { ObjectId } from 'mongodb';

export class userService {
  public async addUsersData(userData: UserInterface) {
    try {
      const getUserDetails = await userModel.findOne({
        userName: userData?.userName,
      });
      if (getUserDetails) {
        return {
          status: ReturnStatus.FAIL_CODE,
          data: 'UserName already exist',
        };
      }
      const postUser = await userModel.create(userData);
      if (postUser) {
        return { status: ReturnStatus.SUCCESS_CODE, data: postUser };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async getUserData(size, pageNo) {
    try {
      let pagination = size * (pageNo - 1);
      const getUsers = await userModel.find().limit(size).skip(pagination);
      if (getUsers) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getUsers };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async updateUser(getUsersData: UserInterface, paramsId: ObjectId) {
    try {
      const updateData = await userModel.findByIdAndUpdate(
        paramsId,
        {
          $set: getUsersData,
        },
        { new: true }
      );
      if (updateData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: updateData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
  public async deleteUser(getUsersData: ObjectId) {
    try {
      const deleteUserData = await userModel.findByIdAndDelete(getUsersData);
      if (deleteUserData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: deleteUserData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.log(err);
    }
  }
}
