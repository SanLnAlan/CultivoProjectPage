var firebaseConfig = {
  apiKey: "AIzaSyDF9NmPiGjdPQFHpKf9K1NP96leJpYFrqA",
  authDomain: "cultivocontrol-117b5.firebaseapp.com",
  databaseURL: "https://cultivocontrol-117b5-default-rtdb.firebaseio.com",
  projectId: "cultivocontrol-117b5",
  storageBucket: "cultivocontrol-117b5.appspot.com",
  messagingSenderId: "203836636984",
  appId: "1:203836636984:web:6babcfa8503aba1dfb8bcd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// let dbRef = firebase.database().ref().child('estado');

// db.ref("/pinOut").set({
//   status: 1
// });

let switchLed1 = document.getElementById("SwitchLed1");


let dbRef = db.ref().child("/estado");
dbRef.on('value', snap => {
  let data = snap.val();
  let led1 = data.led1;
  // mostrarInfo(led1);
});

// function mostrarInfo(dato){
//   let info = document.getElementById("led1");
//   info.innerHTML = dato;
//   switchLed1.checked = dato;
// }

function toggleBtn(led){
  db.ref("/estado").set({
       led1: estado,
    });
}

function toggleSwitch() {  
    db.ref("/estado").set({
      led1: switchLed1.checked,
    });
}