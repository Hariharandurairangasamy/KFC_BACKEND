import { Router } from 'express';
import CartControllers from './CartController';
import uploadDiskStorage from '../../Config/diskStorageMulter';

class CartRoute {
  router: Router;
  public CartControllers: CartControllers = new CartControllers();
  constructor() {
    this.router = Router();
    this.init();
  }
  init(): void {
    this.router.post(
      '/addcart',
      uploadDiskStorage.single('cloudineryId'),
      this.CartControllers.postCartData
    );
    this.router.get('/getCartData', this.CartControllers.getAllCartDatas);
    this.router.delete('/deleteDatas/:id', this.CartControllers.deleteData);
  }
}
const cartRoute = new CartRoute();
export default cartRoute.router;
