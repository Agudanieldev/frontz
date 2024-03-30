// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5kLnG8N55b9HYAt16qOSlosJM39KdM1I",
  authDomain: "tradezanga-9a60e.firebaseapp.com",
  projectId: "tradezanga-9a60e",
  storageBucket: "tradezanga-9a60e.appspot.com",
  messagingSenderId: "454930065029",
  appId: "1:454930065029:web:a093586b5bc485c2d36bec",
  measurementId: "G-GEMHM4Z3H9"
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
