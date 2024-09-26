import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCA7aaXgARdDjMXAjCzxBGkmVKxwXKuBZA',
    authDomain: 'hrm-app-71d9a.firebaseapp.com',
    projectId: 'hrm-app-71d9a',
    storageBucket: 'hrm-app-71d9a.appspot.com',
    messagingSenderId: '836421250909',
    appId: '1:836421250909:web:b3cbd3491c5bcf0f2dc2b4',
};

initializeApp(firebaseConfig);
const storage = getStorage();

export const getPhotoUrl = async (imageFile: File) => {
    try {
        const storageRef = ref(storage, `employees/${crypto.randomUUID()}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        return getDownloadURL(snapshot.ref);
    } catch (err) {
        return Promise.reject('Error while uploading or generating URL');
    }
};
