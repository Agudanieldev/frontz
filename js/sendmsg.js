

const firebaseConfig = {
  apiKey: "AIzaSyAVYnmzJvPlFWOjXiJDFChXZ8zAzQp1Ufw",
  authDomain: "oceandwell-01.firebaseapp.com",
  databaseURL: "https://oceandwell-01-default-rtdb.firebaseio.com",
  projectId: "oceandwell-01",
  storageBucket: "oceandwell-01.appspot.com",
  messagingSenderId: "288421578797",
  appId: "1:288421578797:web:5c1a7abf0b7e133b5190a4",
  measurementId: "G-LFHVNGR715"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var phone = getElementVal("phone");
  var subject = getElementVal("subject");

  saveMessages(name, emailid, phone, subject, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, phone, subject, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    phone: phone,
    subject: subject,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
