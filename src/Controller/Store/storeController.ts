import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { map } from 'lodash';
import logger from '../../Middleware/logger';
import StoreService from '../../Service/StoreService';
import { ReturnStatus, StatusResponce } from '../../Utils/responceCode';

export default class storeController {
  public async postStores(req: Request, res: Response) {
    try {
      const StoreServices: StoreService = new StoreService();
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
      const postStoresData = await StoreServices.postStore(conSheet);
      if (postStoresData.status === ReturnStatus.SUCCESS_CODE) {
        res.status(StatusResponce.SUCCESS).json({
          message: 'Store data added SuccessFully',
          data: postStoresData,
        });
      } else {
        res.status(StatusResponce.BAD_REQUEST);
      }
    } catch (err) {
      console.log(err);
      logger.error(err);
    }
  }
  public async findAllStore(req: Request, res: Response) {
    try {
      const StoreServices: StoreService = new StoreService();
      const findAllStores = await StoreServices.getStoresData();
      if (findAllStores.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data fetch successFully', data: findAllStores });
      } else {
        res.status(StatusResponce.BAD_REQUEST);
      }
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  }
  public async getOneStore(req: Request, res: Response) {
    try {
      const StoreServices: StoreService = new StoreService();
      const getId: any = req.params.id;
      const getStoresData = await StoreServices.findOneStores(getId);
      if (getStoresData.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Store fetched SuccessFully', data: getStoresData });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Store not fetched' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async updateStores(req: Request, res: Response) {
    try {
      const StoreServices: StoreService = new StoreService();
      const getStoreId: any = req.params.id;
      const getStoreData: any = req.body;
      const updateStore = await StoreServices.updateStores(
        getStoreId,
        getStoreData
      );
      if (updateStore.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Store updated successFully', data: updateStore });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Store not updated' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteStoreData(req: Request, res: Response) {
    try {
      const StoreServices: StoreService = new StoreService();
      const getStoreid: any = req.params.id;
      const getStoresData = await StoreServices.deleteStore(getStoreid);
      if (getStoresData.status === ReturnStatus.SUCCESS_CODE) {
        res
          .status(StatusResponce.SUCCESS)
          .json({ message: 'Data deleted successfully', data: getStoresData });
      } else {
        res
          .status(StatusResponce.BAD_REQUEST)
          .json({ message: 'Data not deleted' });
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
