const firebaseConfig = {

    apiKey: "AIzaSyDXpT6oe6SNKk0kHJLePqlMmLnd1kRSWT8",
  
    authDomain: "civicalertoriginal.firebaseapp.com",
  
    databaseURL: "https://civicalertoriginal-default-rtdb.firebaseio.com",
  
    projectId: "civicalertoriginal",
  
    storageBucket: "civicalertoriginal.appspot.com",
  
    messagingSenderId: "858192785417",
  
    appId: "1:858192785417:web:424b1bec909661ab29c8d8",

    measurementId: "G-KJ0C1TE4JS"
  
  };


  //intialize firebase
  firebase.initializeApp(firebaseConfig);

  //refrence
 const MunicipalityDB = firebase.database().ref('Municipality')
  
