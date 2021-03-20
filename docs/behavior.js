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

//--------------index-----------------

let switchLed1 = document.getElementById("SwitchLed1");
let switchLed2 = document.getElementById("SwitchLed2");


let dbRef = db.ref().child("/estado");
dbRef.on('value', snap => {
  let data = snap.val();
  let led1 = data.led1;
  let fecha = data.planta1.fecha;
  let humedad = data.planta1.humedad;

  // graficar(fecha,humedad);
});


function toggleSwitch(n) {
  if (n==1){
    db.ref("/bomba1").set({
      activada: switchLed1.checked,
    });
  }
  if (n==2){
    db.ref("/bomba2").set({
      activada: switchLed2.checked,
    });
  }
}


// Mostrando datos
let d_temp = document.getElementById("temperatura");
let d_temp1 = document.getElementById("temperatura1");
let d_hum = document.getElementById("humedad");
let d_hum1 = document.getElementById("humedad1");

function mostrar_datos(t1,t2,h1,h2){
dbRef = db.ref().child("/estado");
dbRef.on('value', snap => {
  let data = snap.val();
  let led1 = data.led1;
  let fecha = data.planta1.fecha;
  let humedad = data.planta1.humedad;
  
  // graficar(fecha,humedad);
});
}


// // ------------Gráficas------------------

// // function graficar(f,h){
//   let tem = {
//     borderColor: 'red',
//     backgroundColor: 'transparent',
//     label:'Temperatura',
//     data: [5,2,3],
//   }

//   let hum = {
//     borderColor: 'blue',
//     backgroundColor: 'transparent',
//     label:'Humedad',
//     data: [1,3,4],
//   }

//   let ctx = document.getElementById("chart").getContext("2d");
//   let chart = new Chart(ctx,{
//     type:"line",
//     data:{
//       labels:["1","1","1"],
//       datasets: [tem, hum]
//       // datasets: [{
//       //   data : [hum]
//       // }]
//     }
//   });
// // }



// ------------USUARIO----------------------
function registrar(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.code)
    alert(error.message)
    // ..
  });
}

function ingresarcrack(){
  // let email2 = document.getElementById("email2").value;
  // let password2 = document.getElementById("password2").value;

  // if (email2 == "admin@mail.com" & password2 == "admin"){
  //   alert("aceesado")
  // }
  // else{
  //   alert("no")
  // }
  console.log("noo");
}

function ingresar(){
  let email2 = document.getElementById("email2").value;
  let password2 = document.getElementById("password2").value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .then((user) => {
    // Signed in
    // ...
    alert("ingresado")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.code)
    alert(error.message)
  });
}

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Existe usuario activo");
      location.href ="configuracion.html";
    } else {
      // No user is signed in.
      console.log("No existe usuario activo");
    }
  });
}

// observador();
