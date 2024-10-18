import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import multer from "multer";
import { firebaseApp } from "../config/firebase.config";

const firebaseStorage = getStorage(firebaseApp);

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

export const uploadImage = (req, res, next) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        if (!req.file) {
            return next();
        }
        try {
            const dateTime = Date.now();
            const storageRef = ref(
                firebaseStorage,
                `images/${req.file.originalname + "_" + dateTime}`
            );
            const snapshot = await uploadBytes(storageRef, req.file.buffer);
            req.file.firebaseUrl = snapshot.metadata.fullPath;
            req.file.firebaseUrl = await getDownloadURL(snapshot.ref);
            next();
        } catch (error) {
            next(error);
        }
    });
};

export const uploadImages = (req, res, next) => {
    upload.array("images", 10)(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        const images = [];
        for (const image of req.files) {
            const dateTime = Date.now();
            const storageRef = ref(
                firebaseStorage,
                `images/${image.originalname + "_" + dateTime}`
            );
            const snapshot = await uploadBytes(storageRef, image.buffer);
            image.firebaseUrl = snapshot.metadata.fullPath;
            image.firebaseUrl = await getDownloadURL(snapshot.ref);
            images.push(image);
        }
        req.images = images;
        next();
    });
};