import { ObjectId } from 'mongodb';

export interface UserInterface {
  _id?: ObjectId;
  userName: String;
  password: String;
  email: String;
}

export interface Products {
  _id?: ObjectId;
  productName: String;
  price: Number;
  description: String;
  offer: Number;
  rating: Number;
  productImage: String;
  cloudineryId: String;
}

export interface StoresInterface {
  _id?: ObjectId;
  storeId: String;
  address: String;
  city: String;
  state: String;
  phone: String;
  lat: String;
  long: String;
}

export interface Cart {
  productId: String;
  productName: String;
  ProductImage: String;
  price: String;
  qty: String;
  total: String;
  cloudineryId: String;
}
