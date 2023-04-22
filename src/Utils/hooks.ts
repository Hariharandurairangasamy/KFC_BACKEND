import { ObjectId } from 'mongodb';

export const useObjectId = (paramsId: string) => {
  if (paramsId) {
    return new ObjectId(paramsId);
  } else {
    return false;
  }
};
