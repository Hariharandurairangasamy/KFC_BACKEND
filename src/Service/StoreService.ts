import { ReturnStatus } from '../Utils/responceCode';
import Stores from '../Model/Store/schema';
import { StoresInterface } from '../Interface/UserInterface';
import logger from '../Middleware/logger';
import { ObjectId } from 'mongodb';

export default class StoreService {
  public async postStore(getSotreData: StoresInterface) {
    try {
      const postStoresData = await Stores.insertMany(getSotreData);
      if (postStoresData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: postStoresData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async getStoresData() {
    try {
      const getStoresData = await Stores.find();
      if (getStoresData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getStoresData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async findOneStores(getStoresId: ObjectId) {
    try {
      const getStoresData = await Stores.findById(getStoresId);
      if (getStoresData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getStoresData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      logger.error(err);
      console.error(err);
    }
  }
  public async updateStores(getStoreId: ObjectId, getStoreData: any) {
    try {
      const updateStore = await Stores.findByIdAndUpdate(
        getStoreId,
        {
          $set: getStoreData,
        },
        { new: true }
      );
      if (updateStore) {
        return { status: ReturnStatus.SUCCESS_CODE, data: updateStore };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
  public async deleteStore(getStoreId: ObjectId) {
    try {
      const getStoreData = await Stores.findByIdAndDelete(getStoreId);
      if (getStoreData) {
        return { status: ReturnStatus.SUCCESS_CODE, data: getStoreData };
      } else {
        return { status: ReturnStatus.FAIL_CODE };
      }
    } catch (err) {
      console.error(err);
      logger.error(err);
    }
  }
}
