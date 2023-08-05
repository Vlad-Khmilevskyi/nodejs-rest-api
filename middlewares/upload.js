import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cd) => {
    const { originalname } = file;
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filname = `${uniquePrefix}_${originalname}`;
    cd(null, filname);
  }
});

const limits = {
  fikeSaze: 1024 * 1024 * 5,
}

const upload = multer({
  storage,
  limits,
})

export default upload;