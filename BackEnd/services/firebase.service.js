import axios from "axios";
import Config from "../config.js";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

class FirebaseFilesManager {
    constructor() {
        const firebaseConfig = {
            apiKey: Config.FIREBASE_API_KEY,
            authDomain: Config.FIREBASE_AUTH_DOMAIN,
            projectId: Config.FIREBASE_PROJECT_ID,
            storageBucket: Config.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
            appId: Config.FIREBASE_APP_ID
        };
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app)
        this.storage = getStorage();
    }

    async uploadFile(file) {
        await signInWithEmailAndPassword(this.auth, Config.FIREBASE_USER, Config.FIREBASE_AUTH);
        const dateTime = Date.now();
        const fileName = `files/${dateTime}`;
        const storageRef = ref(this.storage, fileName);
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);
        return dateTime;
    }

    async downloadFile(fileName) {
        const downloadUrl = await this.#getFileDownloadUrl(fileName);
        const file = await axios.get(downloadUrl, { responseType: 'arraybuffer' })
        const fileContents = Buffer.from(file.data, "base64");
        return fileContents;
    }

    // Function to get download URL
    async #getFileDownloadUrl(fileName) {
        const fileRef = ref(this.storage, `files/${fileName}`);
        const downloadUrl = await getDownloadURL(fileRef);
        return downloadUrl;
}
}

const firebaseFilesManager = new FirebaseFilesManager();
export default firebaseFilesManager;