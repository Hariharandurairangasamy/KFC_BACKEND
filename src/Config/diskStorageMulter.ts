import * as multer from 'multer';

const uploadDiskStorage = multer({
  dest: '../Images',
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default uploadDiskStorage;
