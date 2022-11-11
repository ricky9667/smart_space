import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDMU_4Uc7r3hckqxZxGQC9lIQ3G1TrPbVg',
  authDomain: 'smartspace-84906.firebaseapp.com',
  databaseURL: 'https://smartspace-84906-default-rtdb.firebaseio.com',
  projectId: 'smartspace-84906',
  storageBucket: 'smartspace-84906.appspot.com',
  messagingSenderId: '1099445602127',
  appId: '1:1099445602127:web:4782024e874dc1090a273a',
  measurementId: 'G-CLK8ELLPWV',
}

export const firebaseApp = initializeApp(firebaseConfig)
