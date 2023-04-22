import { ReturnStatus } from '../Utils/responceCode';
import CartModel from '../Model/Cart/schema';
import { Cart } from '../Interface/UserInterface';
import logger from '../Middleware/logger';
import { ObjectId } from 'mongodb';

export default class CartService {
  public async addCart(getCartData: Cart) {
    try {
      const postCartData = await CartModel.insertMany(getCartData);
      if (postCartData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: postCartData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async getAllCartData() {
    try {
      const getAllCartDatas = await CartModel.find();
      if (getAllCartDatas) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getAllCartDatas };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteCartData(objId: ObjectId) {
    try {
      const deleteData = await CartModel.findByIdAndDelete(objId);
      if (deleteData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: deleteData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
