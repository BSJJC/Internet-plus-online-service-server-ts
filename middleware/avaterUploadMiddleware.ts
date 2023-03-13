import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
require("dotenv").config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI as string,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const filename = `${Date.now()}-${file.originalname}`;
    return { filename, bucketName: "administratorAvaters" };
  },
});

const uploadAvater = multer({ storage: storage });

export default uploadAvater;
