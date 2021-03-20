let dbRef1 = db.ref().child("/config");
dbRef1.on('value', snap => {
  let data = snap.val();
  let temp_lim = data.temp_lim;
  let hum_lim = data.hum_lim;
  actualizar(temp_lim, hum_lim);
});


t_lim = document.getElementById("temp_lim");
h_lim = document.getElementById("hum_lim");

function actualizar(t,h){
  t_lim.value = t;
  h_lim.value = h;
}

function modificar(){
  db.ref("/config").set({
    temp_lim: parseFloat(t_lim.value),
    hum_lim: parseFloat(h_lim.value)
  });
}

