import { ReturnStatus } from '../Utils/responceCode';
import Product from '../Model/Products/schema';
import { Products } from '../Interface/UserInterface';
import logger from '../Middleware/logger';
import { ObjectId } from 'mongodb';

export class ProductService {
  public async postProductFile(uploadFile: Products) {
    try {
      const getExcelToJsonConvertedData = await Product.insertMany(uploadFile);
      if (getExcelToJsonConvertedData) {
        return {
          status: ReturnStatus.SUCCESS_CODE,
          data: getExcelToJsonConvertedData,
        };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
    }
  }
  public async getProducts() {
    try {
      const getDatas = await Product.find();
      if (getDatas) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getDatas };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async getUniqueProducts(getParamsId: ObjectId) {
    try {
      const getUniqueProductsData = await Product.findById(getParamsId);
      if (getUniqueProductsData) {
        return {
          status: ReturnStatus.SUCCESS_CODE,
          data: getUniqueProductsData,
        };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteProducts(getParamsId: ObjectId) {
    try {
      const deleteProduct = await Product.findByIdAndDelete(getParamsId);
      if (deleteProduct) {
        return { status: ReturnStatus.SUCCESS_CODE, data: deleteProduct };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
