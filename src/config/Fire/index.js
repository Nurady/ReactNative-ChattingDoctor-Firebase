import firebase from 'firebase';

firebase.initializeApp(
    {
        apiKey: "AIzaSyCd6PN0hY9nv-70kTV3z28nG1ROGqw-zXY",
        authDomain: "doctor-b6ab7.firebaseapp.com",
        databaseURL: 'https://doctor-b6ab7-default-rtdb.firebaseio.com/',
        projectId: "doctor-b6ab7",
        storageBucket: "doctor-b6ab7.appspot.com",
        messagingSenderId: "69702364868",
        appId: "1:69702364868:web:3c10d902869679af5ea391",
        measurementId: "G-CBG01BHV6K"
    }
);

const Fire = firebase;
export default Fire;