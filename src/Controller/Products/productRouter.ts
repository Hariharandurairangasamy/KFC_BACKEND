import { Router } from 'express';
import productsController from './productController';
import upload from '../../Config/multer';

class productsRouters {
  router: Router;
  productsController: productsController = new productsController();

  constructor() {
    this.router = Router();
    this.init();
  }
  init(): void {
    this.router.post(
      '/postFileUpload',
      upload.fields([{ name: 'file', maxCount: 1 }]),
      this.productsController.postProducts
    );
    this.router.get('/getProducts', this.productsController.getProductsData);
    this.router.get(
      '/getProduct/:id',
      this.productsController.getOnepRoductsData
    );
    this.router.delete(
      '/deleteProducts/:id',
      this.productsController.deleteUniqueProduct
    );
  }
}

const productsDataRoute = new productsRouters();
export default productsDataRoute.router;
