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
let ventilador = document.getElementById("ventilador");

let d_temp = document.getElementById("temperatura");
let d_g_hum = document.getElementById("g_humedad");
let d_hum = document.getElementById("humedad");
let d_hum1 = document.getElementById("humedad1");

let lim_t_min = document.getElementById("lim_t_min");
let lim_t_max = document.getElementById("lim_t_max");
let lim_h_min = document.getElementById("lim_h_min");
let lim_h_max = document.getElementById("lim_h_max");


// ---------------Datos para graficar-------------------
let dbRef = db.ref().child("/estado");
dbRef.on('value', snap => {
  let data = snap.val();

  let g_fecha = data.general.fecha;
  let g_humedad = data.general.g_humedad;
  let temperatura = data.general.temperatura;
  // individual
  let fecha = data.planta1.fecha;
  let humedad = data.planta1.humedad;
  let fecha1 = data.planta2.fecha;
  let humedad1 = data.planta2.humedad;

  // graficar(fecha,humedad);
});

//----------------- Datos en tiempo real--------------------
dbRef = db.ref().child("/estado_actual");
dbRef.on('value', snap => {
  let data = snap.val();
  switchLed1.checked = data.bomba1.activada;
  switchLed2.checked = data.bomba2.activada;
  ventilador.checked = data.ventilador.activado;

  d_g_hum.innerHTML = data.g_humedad;
  d_temp.innerHTML = data.temperatura;
  d_hum.innerHTML = data.humedad;
  d_hum1.innerHTML = data.humedad1;
});

//----------------- Limites de humedad y temperatura--------------------

  dbRef = db.ref().child("/config");
  dbRef.on('value', snap => {
    let data = snap.val();
    lim_t_min.value = data.lim_t_min;
    lim_t_max.value = data.lim_t_max;
    lim_h_min.value = data.lim_h_min;
    lim_h_max.value = data.lim_h_max;
  });

  function modificar(){
    db.ref("/config").set({
      lim_h_min: parseFloat(lim_h_min.value),
      lim_t_min: parseFloat(lim_t_min.value),
      lim_h_max: parseFloat(lim_h_max.value),
      lim_t_max: parseFloat(lim_t_max.value)
    });
    alert("Cambios guardados.")
  }



function toggleSwitch(n) {
  if (n==1){
    db.ref("/estado_actual/bomba1").set({
      activada: switchLed1.checked,
    });
  }
  if (n==2){
    db.ref("/estado_actual/bomba2").set({
      activada: switchLed2.checked,
    });
  }
  if (n==3){
    db.ref("/estado_actual/ventilador").set({
      activado: ventilador.checked,
    });
  }
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
