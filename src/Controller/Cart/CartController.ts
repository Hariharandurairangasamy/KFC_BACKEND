import { Request, Response } from 'express';
import logger from '../../Middleware/logger';
import { get } from 'lodash';
import CartModel from '../../Model/Cart/schema';
import { cloudinary } from '../../Config/cloudineryConfig';
import CartService from '../../Service/CartService';
import { ReturnStatus, StatusResponce } from '../../Utils/responceCode';

export default class CartControllers {
  public async postCartData(req: Request, res: Response) {
    try {
      const getUploadImagePath = get(req.file, 'path', '')?.replace(/\\/g, '/');
      const uploadCloudinery = await cloudinary.uploader.upload(
        getUploadImagePath
      );
      const CartServices: CartService = new CartService();
      const objCartData: any = {
        productId: req.body.productId,
        productName: req.body.productName,
        productImage: uploadCloudinery?.secure_url,
        price: req.body.price,
        qty: req.body.qty,
        total: req.body.total,
        cloudineryId: uploadCloudinery?.public_id,
      };
      const postCartData = await CartServices.addCart(objCartData);
      if (postCartData.status === ReturnStatus.SUCCESS_CODE) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Cart data added successfully',
          data: postCartData,
        });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data not added' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async getAllCartDatas(_, res: Response) {
    try {
      const CartServices: CartService = new CartService();
      const getAllDatas = await CartServices.getAllCartData();

      if (getAllDatas) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data fetched succesfully', data: getAllDatas });
      } else {
        res.status(StatusResponce.BAD_REQUEST);
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteData(req: Request, res: Response) {
    try {
      const CartServices: CartService = new CartService();

      const findCloudineryIdAndDelete = await CartModel.findById(req.params.id);
      await cloudinary.uploader.destroy(
        findCloudineryIdAndDelete?.cloudineryId
      );
      const paramsId: any = req.params.id;
      const getDeletedDatas = await CartServices.deleteCartData(paramsId);
      if (getDeletedDatas) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Data fetched succesfully',
          data: getDeletedDatas,
        });
      } else {
        res.status(StatusResponce.BAD_REQUEST);
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
