import Config from "../config";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

class firebaseFilesManager {
    constructor( ) {
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

    async uploadFile() {
        await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
        const dateTime = Date.now();
        const fileName = `files/${dateTime}`;
        const storageRef = ref(this.storage, fileName);
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);
        return fileName;
    }

    downloadFile() {

    }
}