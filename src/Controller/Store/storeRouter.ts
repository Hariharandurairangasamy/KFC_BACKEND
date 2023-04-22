import { Router } from 'express';
import storeController from './storeController';
import upload from '../../Config/multer';

class storeRouter {
  router: Router;
  storeController: storeController = new storeController();
  constructor() {
    this.router = Router();
    this.init();
  }
  init(): void {
    this.router.post(
      '/postStoreUpload',
      upload.fields([{ name: 'file', maxCount: 1 }]),
      this.storeController.postStores
    );
    this.router.get('/getStores', this.storeController.findAllStore);
    this.router.get('/getOneStore/:id', this.storeController.getOneStore);
    this.router.patch('/updateStore/:id', this.storeController.updateStores);
    this.router.delete(
      '/deleteStore/:id',
      this.storeController.deleteStoreData
    );
  }
}
const storesRouter = new storeRouter();
export default storesRouter.router;
