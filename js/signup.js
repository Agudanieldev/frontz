import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const EmailInp = document.getElementById('emailInp');
const PassInp = document.getElementById('passwordInp');
const ConfirmPassInp = document.getElementById('confirmPasswordInp');
const FnameInp = document.getElementById('fnameInp');
const LnameInp = document.getElementById('lnameInp');
const MainForm = document.getElementById('MainForm');
const Preloader = document.getElementById('preloader');

// Password Regex: At least one special char, min 6 chars
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;


// Modal Handling
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

const showModal = (message) => {
  modalMessage.textContent = message;
  modal.style.display = "flex"; // or "block" if you're not using flexbox
};

modalClose.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


// Register User Function
const RegisterUser = async (evt) => {
    evt.preventDefault();
    console.log("Registration started...");
    Preloader.style.display = 'block';

    // Input Validation
    if (!FnameInp.value || !LnameInp.value || !EmailInp.value || !PassInp.value || !ConfirmPassInp.value) {
        showModal("Please fill in all fields.");
        Preloader.style.display = 'none';
        return;
    }

    if (PassInp.value !== ConfirmPassInp.value) {
        showModal("Passwords do not match.");
        Preloader.style.display = 'none';
        return;
    }

    // if (error.code === "auth/email-already-in-use") {
    //     showModal("An account with this email already exists. Try logging in or using a different email.");
    // }

    if (!passwordRegex.test(PassInp.value)) {
        showModal("Password must be at least 6 characters, with at least one number or special character.");
        Preloader.style.display = 'none';
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value);
        console.log("User created:", userCredential.user.uid);

        const userRef = doc(db, 'UserAuthList', userCredential.user.uid);
        await setDoc(userRef, {
            firstname: FnameInp.value,
            lastname: LnameInp.value,
            email: EmailInp.value,
            active_deposit: String("0"),
            profit: String("0"),
            total_properties_owned: String("0"),
            realplan: String("0"),
            total_balance: String("0"),
        });

        showModal("Account created successfully. Redirecting to the login page...");

        // Delay for user to read modal, then redirect
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);

    } catch (error) {
    console.error("Sign-up Error:", error.code, error.message);

    let msg = "Sign-up failed.";
    switch (error.code) {
        case "auth/email-already-in-use":
            msg = "An account with this email already exists."; break;
        case "auth/invalid-email":
            msg = "Please enter a valid email address."; break;
        case "auth/weak-password":
            msg = "Password is too weak. Use at least 6 characters."; break;
        case "auth/network-request-failed":
            msg = "Network error. Please check your connection."; break;
        case "auth/too-many-requests":
            msg = "Too many attempts. Please try again later."; break;
        default:
            msg = error.message; break;
    }
        showModal(msg);

    } finally {
            Preloader.style.display = 'none';
        }
};

// Attach event listener
MainForm.addEventListener('submit', RegisterUser);
