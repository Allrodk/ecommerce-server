import { diskStorage } from 'multer';
import { extname } from 'path';

export const Storage = {
  storage: diskStorage({
    destination: './Uploads',
    filename: (req, file, cb) => {
      const filename: string = file.originalname;
      const extension: string = extname(file.originalname);
      const allowedMimes = ['.csv', '.xls', '.xlsx'];
      if (allowedMimes.includes(extension)) {
        cb(null, `${filename}`);
      } else {
        cb(new Error('Tipo de arquivo inválido'), `${filename}`);
      }
    },
  }),
};
