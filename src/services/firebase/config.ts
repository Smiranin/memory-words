const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FB_API_KEY,
  authDomain: `${env.VITE_FB_PROJECT_ID}.firebaseapp.com`,
  projectId: env.VITE_FB_PROJECT_ID,
  databaseURL: `https://${env.VITE_FB_PROJECT_ID}-default-rtdb.firebaseio.com`,
  storageBucket: `${env.VITE_FB_PROJECT_ID}.appspot.com`,
  messagingSenderId: env.VITE_FB_MSG_SENDER_ID,
  appId: env.VITE_FB_API_ID
};

export { firebaseConfig };
