// let firebaseConfig = {
//   apiKey: "AIzaSyDF9NmPiGjdPQFHpKf9K1NP96leJpYFrqA",
//   authDomain: "cultivocontrol-117b5.firebaseapp.com",
//   databaseURL: "https://cultivocontrol-117b5-default-rtdb.firebaseio.com",
//   projectId: "cultivocontrol-117b5",
//   storageBucket: "cultivocontrol-117b5.appspot.com",
//   messagingSenderId: "203836636984",
//   appId: "1:203836636984:web:6babcfa8503aba1dfb8bcd"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// let db = firebase.database();

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
