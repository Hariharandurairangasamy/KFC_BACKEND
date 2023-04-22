import { Router } from 'express';
import UserController from './userController';

class UserRouter {
  router: Router;
  UserController: UserController = new UserController();
  constructor() {
    this.router = Router();
    this.init();
  }
  init(): void {
    this.router.post('/adduser', this.UserController.addUsers);
    this.router.post('/userLogin', this.UserController.jwtLogin);
    this.router.get('/getUsers', this.UserController.getAllUsersData);
    this.router.patch('/updatUser/:id', this.UserController.updateUserDatas);
    this.router.delete(
      '/deletedUser/:id',
      this.UserController.deleteUsersDetails
    );
  }
}
const userRouters = new UserRouter();
userRouters.init();
export default userRouters.router;
