

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
            import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"; 
            import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        
            const firebaseConfig = {
                apiKey: "AIzaSyAVYnmzJvPlFWOjXiJDFChXZ8zAzQp1Ufw",
                authDomain: "oceandwell-01.firebaseapp.com",
                projectId: "oceandwell-01",
                storageBucket: "oceandwell-01.appspot.com",
                messagingSenderId: "288421578797",
                appId: "1:288421578797:web:5c1a7abf0b7e133b5190a4",
                measurementId: "G-LFHVNGR715"
            };
        
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const auth = getAuth(app);
        
            let EmailInp = document.getElementById('emailInp');
            let PassInp = document.getElementById('passwordInp');
            let ConfirmPassInp = document.getElementById('confirmPasswordInp');
            let FnameInp = document.getElementById('fnameInp');
            let LnameInp = document.getElementById('lnameInp');
            let MainForm = document.getElementById('MainForm');
        
            let RegisterUser = evt => {
                evt.preventDefault();
        
                console.log("Registration started...");
        
                // Check if passwords match
                if (PassInp.value !== ConfirmPassInp.value) {
                    alert("Passwords do not match.");
                    console.error("Passwords do not match.");
                    return;
                }
        
                const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        
                if (!passwordRegex.test(PassInp.value)) {
                    alert("Password must contain at least 6 characters, including at least one alphabet, one number, and one special character.");
                    console.error("Invalid password format.");
                    return;
                }
        
                createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
                    .then(async(userCredential) => {
                        console.log("User created successfully:", userCredential.user);
        
                        var userRef = doc(db, 'UserAuthList', userCredential.user.uid);
                        await setDoc(userRef, {
                            firstname: FnameInp.value,
                            lastname: LnameInp.value,
                            email: EmailInp.value,
                            active_deposit: 0,
                            profit: 0,
                            total_balance: 0
                        });
        
                        alert("Account Created! You can now login");
                    })
                    .catch((error) => {
                        alert(error.message);
                        console.error("Error during user creation:", error.message);
                        console.error("Error code:", error.code);
                    });
            };
        
            MainForm.addEventListener('submit', RegisterUser);