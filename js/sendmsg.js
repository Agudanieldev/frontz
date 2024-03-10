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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Reference your collection in Firestore
const messagesCollection = db.collection("Messages");

document.getElementById("message").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var subject = getElementVal("subject");
  var msgContent = getElementVal("msgContent");
  var phone = getElementVal("phone");

  saveMessages(name, emailid, subject, msgContent, phone);

  // Enable alert
  document.querySelector(".alert").style.display = "block";

  // Remove the alert after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
    document.querySelector(".alert").style.transition = ".3s";
  }, 4000);

  // Reset the form
  document.getElementById("message").reset();
}

const saveMessages = (name, emailid, subject, msgContent, phone) => {
  // Add a new document to the "Messages" collection
  messagesCollection.add({
    name: name,
    emailid: emailid,
    subject: subject,
    msgContent: msgContent,
    phone: phone,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
