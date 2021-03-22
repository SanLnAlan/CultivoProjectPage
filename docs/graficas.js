let firebaseConfig = {
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

let db = firebase.database();

// -----------------Obteniendo datos de database-----------------

let dbRef = firebase.database().ref().child('estado');
let i;
function actualizar(){
  i = 0;
  dbRef.on('value', snap => {
    i++;
    console.log(i);
    data = snap.val();
    let datos = datos_rango(data.general.temperatura,data.general.g_humedad,data.general.fecha);
    let datos_h = datos_rango(data.planta1.humedad,data.planta2.humedad,data.planta1.fecha);
    f_con = fecha_conv(datos[2]);
    f_con_h = fecha_conv(datos_h[2]);
    graficar(f_con,datos[0],datos[1], f_con_h,datos_h[0],datos_h[1]);
  });
}
actualizar();

function datos_rango(temperatura,humedad,fecha){
  let lista_fechas = [];
  let lista_temp = [];
  let lista_hum = [];
  let indexi;
  let indexf = 0;
  // obteniendo todas los datos
  for(let i in temperatura){
    lista_temp.push(temperatura[i]);
  }
  for(let i in humedad){
    lista_hum.push(humedad[i]);
  }
  for(let i in fecha){
    lista_fechas.push(fecha[i]);
  }
  // marcando los index limite
  let rangos = get_rango();
  if (rangos){
    for(let j in lista_fechas){
      if (lista_fechas[j] >= rangos[0]){
        indexi = j;
        break;
      }
    }
    for(let j in lista_fechas){
      if (lista_fechas[j] >= rangos[1]){
        indexf = j;
        break;
      }
    }
    if (indexf == 0) indexf = lista_fechas.length - 1;
    let fechas = lista_fechas.slice(indexi,indexf);
    // console.log(fechas.length);
    let temperaturas = lista_temp.slice(indexi,indexf);
    let humedades = lista_hum.slice(indexi,indexf);
    return [temperaturas,humedades,fechas];
  }
  return [lista_temp,lista_hum,lista_fechas];
}

function get_rango(){
  let time_inicio = document.getElementById("time_inicio");
  let time_fin = document.getElementById("time_fin");
  let timei_unix = new Date(time_inicio.value);
  let timef_unix = new Date(time_fin.value);
  // console.log(timef_unix.getTime());

  // Validando entrada
  if (timei_unix.getTime() > 0){
    if (timef_unix.getTime() > 0){
      return [timei_unix.getTime(),timef_unix.getTime()]
    }else{
      let timeNow = new Date();
      return [timei_unix.getTime(),timeNow.getTime()]
    }
  }
}

function fecha_conv(stamp){
  let dateArray = [];
  for(let i in stamp){
    let date = new Date(stamp[i]);
    let dateH = date.getHours().toString();//.padStart(2,0);
    let dateM = date.getMinutes().toString();//.padStart(2,0);
    let dateS = date.getSeconds().toString();//.padStart(2,0);
    dateArray.push(dateH + ":" + dateM + ":" + dateS);
  }
  return dateArray;
  // console.log(dateArray);
}


// -----------------Graficando-----------------------------
function graficar(date,t,h,date1,h1,h2){
  let tem = {
    borderColor: 'red',
    backgroundColor: 'transparent',
    label:'Temperatura',
    data: t,
  }

  let hum = {
    borderColor: 'blue',
    backgroundColor: 'transparent',
    label:'Humedad',
    data: h,
  }

  let hum1 = {
    borderColor: 'green',
    backgroundColor: 'transparent',
    label:'Planta 1',
    data: h1,
  }

  let hum2 = {
    borderColor: 'blue',
    backgroundColor: 'transparent',
    label:'Planta 2',
    data: h2,
  }

  let ctx = document.getElementById("chart").getContext("2d");
  let chart = new Chart(ctx,{
    type:"line",
    data:{
      labels:date,
      datasets: [tem, hum]
    },
    options:{
      scales:{
        yAxes:[{
          ticks:{
            beginAtZero: true
          }
        }]
      }
    }
  });

  let ctx1 = document.getElementById("chart1").getContext("2d");
  let chart1 = new Chart(ctx1,{
    type:"line",
    data:{
      labels:date1,
      datasets: [hum1, hum2]
    },
    options:{
      scales:{
        yAxes:[{
          ticks:{
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function imprimir(n){
  if (n==1){
    console.log(1);
  }
}