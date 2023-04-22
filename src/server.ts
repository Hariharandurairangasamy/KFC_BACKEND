import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { AppRoutes } from './Routes/route';

// Get Dot Env
dotenv.config();

class server {
  public app: express.Application;
  private AppRoutes: AppRoutes = new AppRoutes();
  constructor() {
    this.app = express();
    this.middileWare();
    this.config();
    this.portConfig();
    this.dbConfig();
    this.AppRoutes.userRoutes(this.app);
    this.AppRoutes.productRoutes(this.app);
    this.AppRoutes.storeRoutes(this.app);
    this.AppRoutes.cartRoutes(this.app);
  }

  private middileWare(): void {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }
  private config(): void {
    this.app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Expose-Headers', 'x-total-count');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
      next();
    });
  }

  private dbConfig() {
      const configure:any={
        useNewUrlParser: true,
  useUnifiedTopology: true,
      }
        mongoose.set("strictQuery", false);
        mongoose.Promise = global.Promise
    mongoose.connect(`${process.env.MONGODB_CLUSTER_URL}`,configure,()=>{
        console.log("database connected",`${process.env.MONGODB_CLUSTER_URL}`)
    })


  }

  private portConfig(): void {
    this.app.listen(process.env.PORT, () => {
      console.log('Port running on:', process.env.PORT);
    });
  }
}
export default new server().app;
