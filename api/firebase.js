import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCROvXpxSxsyWsfzFp_uz4nVaJCwbg-ejo',
  authDomain: 'retrogamebox-6cff8.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  // databaseURL: 'https://retrogamebox-6cff8.firebaseio.com',
  projectId: 'retrogamebox-6cff8',
  storageBucket: 'retrogamebox-6cff8.appspot.com',
  messagingSenderId: '1098186261651',
  appId: '1:1098186261651:web:9586f92888ea473e013966',
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: 'G-XZ9DCJT01Z',
};
const app = initializeApp(firebaseConfig, 'RetroGameBox');

export default app;
