
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : undefined;

  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    console.warn("Firebase Admin SDK service account is not defined. Skipping initialization.");
    // Create a dummy app object or handle this case as needed
    // For now, we'll avoid initializing and db will throw an error if used.
  }
} else {
    app = getApps()[0];
}

const db = app ? getFirestore(app) : getFirestore();


export { db };
