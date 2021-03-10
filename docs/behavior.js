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


let dbRef = db.ref().child("/estado");
dbRef.on('value', snap => {
  let data = snap.val();
  let led1 = data.led1;
  let fecha = data.planta1.fecha;
  let humedad = data.planta1.humedad;
  // graficar(fecha,humedad);
});


function toggleSwitch() {  
    db.ref("/estado").set({
      led1: switchLed1.checked,
    });
}



// ------------Gráficas------------------

// function graficar(f,h){
  let tem = {
    borderColor: 'red',
    backgroundColor: 'transparent',
    label:'Temperatura',
    data: [5,2,3],
  }

  let hum = {
    borderColor: 'blue',
    backgroundColor: 'transparent',
    label:'Humedad',
    data: [1,3,4],
  }

  let ctx = document.getElementById("chart").getContext("2d");
  let chart = new Chart(ctx,{
    type:"line",
    data:{
      labels:["1","1","1"],
      datasets: [tem, hum]
      // datasets: [{
      //   data : [hum]
      // }]
    }
  });
// }