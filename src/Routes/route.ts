import { Application } from 'express';
import userRouter from '../Controller/Users/userRouter';
import productRouter from '../Controller/Products/productRouter';
import storeRouter from '../Controller/Store/storeRouter';
import CartRoute from '../Controller/Cart/CartRoute';

export class AppRoutes {
  public userRoutes(app: Application): void {
    app.use('/api/kfc', userRouter);
  }
  public productRoutes(app: Application): void {
    app.use('/api/kfc', productRouter);
  }
  public storeRoutes(app: Application): void {
    app.use('/api/kfc', storeRouter);
  }
  public cartRoutes(app: Application): void {
    app.use('/api/kfc', CartRoute);
  }
}
