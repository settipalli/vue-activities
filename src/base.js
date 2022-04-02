import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Client } from '@notionhq/client';

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// set auth persistence to browser local (closing the window does not clear authentication status)
setPersistence(auth, browserLocalPersistence)
  .then(function () {
    console.log('Browser local persistence set successfully');
  })
  .catch(function (error) {
    console.log(`Failed to set browser local persistence: ${error.message}`);
  });

const notion = new Client({ auth: process.env.VUE_APP_NOTION_KEY });
const ocdDb = process.env.VUE_APP_NOTION_DB_OCD_ID;

export { firebaseApp, auth, db, notion, ocdDb };
