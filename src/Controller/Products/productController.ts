import { Request, Response } from 'express';
import logger from '../../Middleware/logger';
import { map } from 'lodash';
import * as XLSX from 'xlsx';
import { ProductService } from '../../Service/ProductService';
import { ReturnStatus, StatusResponce } from '../../Utils/responceCode';

export default class productsController {
  public async postProducts(req: Request, res: Response) {
    try {
      const ProductServices = new ProductService();
      const { file }: any = req.files;
      const readFile = XLSX.read(file[0].buffer, {
        type: 'buffer',
        cellDates: true,
        cellText: false,
      });
      let conSheet: any;
      map(readFile.Sheets, async (sheet) => {
        conSheet = XLSX.utils.sheet_to_json(sheet, {
          raw: false,
        });
      });
      const jsonDatas = await ProductServices.postProductFile(conSheet);
      if (jsonDatas.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Datas uploaded Successfully', data: jsonDatas });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Datas not uploaded' });
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
    }
  }
  public async getProductsData(_, res: Response) {
    try {
      const ProductServices = new ProductService();
      const getProducts = await ProductServices.getProducts();
      if (getProducts.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Datas fetched SuccessFully', data: getProducts });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data not Fetched' });
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
    }
  }
  public async getOnepRoductsData(req: Request, res: Response) {
    try {
      const ProductServices = new ProductService();
      const getParamsId: any = req.params.id;
      const getProductsData = await ProductServices.getUniqueProducts(
        getParamsId
      );
      if (getProductsData.status === ReturnStatus.SUCCESS_CODE) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Data Fetched SuccessFully',
          data: getProductsData,
        });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data is not fetched' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteUniqueProduct(req: Request, res: Response) {
    try {
      const ProductServices = new ProductService();
      const getParamsId: any = req.params.id;
      const deleteUniqueProducts = await ProductServices.deleteProducts(
        getParamsId
      );
      if (deleteUniqueProducts.status === ReturnStatus.SUCCESS_CODE) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Product is deleted SuccessFully',
          data: deleteUniqueProducts,
        });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Products is not deleted' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
