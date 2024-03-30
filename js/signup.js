

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
            import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"; 
            import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        
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
        
         
            // const app = initializeApp(firebaseConfig);
            // const db = getFirestore(app);
            // const auth = getAuth(app);
        
            // let EmailInp = document.getElementById('emailInp');
            // let PassInp = document.getElementById('passwordInp');
            // let ConfirmPassInp = document.getElementById('confirmPasswordInp');
            // let FnameInp = document.getElementById('fnameInp');
            // let LnameInp = document.getElementById('lnameInp');
            // let MainForm = document.getElementById('MainForm');
        
            // let RegisterUser = evt => {
            //     evt.preventDefault();
        
            //     console.log("Registration started...");
        
              
            //     if (PassInp.value !== ConfirmPassInp.value) {
            //         alert("Passwords do not match.");
            //         console.error("Passwords do not match.");
            //         return;
            //     }
        
            //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        
            //     if (!passwordRegex.test(PassInp.value)) {
            //         alert("Password must contain at least 6 characters, including at least one alphabet, one number, and one special character.");
            //         console.error("Invalid password format.");
            //         return;
            //     }
        
            //     createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
            //         .then(async(userCredential) => {
            //             console.log("User created successfully:", userCredential.user);
        
            //             var userRef = doc(db, 'UserAuthList', userCredential.user.uid);
            //             await setDoc(userRef, {
            //                 firstname: FnameInp.value,
            //                 lastname: LnameInp.value,
            //                 email: EmailInp.value,
            //                 active_deposit: 0,
            //                 profit: 0,
            //                 total_balance: 0
            //             });
        
            //             alert("Account Created! You can now login");
            //         })
            //         .catch((error) => {
            //             alert(error.message);
            //             console.error("Error during user creation:", error.message);
            //             console.error("Error code:", error.code);
            //         });
            // };
        
            // MainForm.addEventListener('submit', RegisterUser);

            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const auth = getAuth(app);
    
            let EmailInp = document.getElementById('emailInp');
        let PassInp = document.getElementById('passwordInp');
        let ConfirmPassInp = document.getElementById('confirmPasswordInp');
        let FnameInp = document.getElementById('fnameInp');
        let LnameInp = document.getElementById('lnameInp');
        let MainForm = document.getElementById('MainForm');
        // let SignupBtn = document.getElementById('signupBtn');
        let Preloader = document.getElementById('preloader');

        let RegisterUser = evt => {
            evt.preventDefault();

            console.log("Registration started...");
            // Show preloader
            Preloader.style.display = 'block';

            // Check if passwords match
            if (PassInp.value !== ConfirmPassInp.value) {
                alert("Passwords do not match.");
                console.error("Passwords do not match.");
                // Hide preloader
                Preloader.style.display = 'none';
                return;
            }

            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

            if (!passwordRegex.test(PassInp.value)) {
                alert("Password must contain at least 6 characters, including at least one alphabet, one number, and one special character.");
                console.error("Invalid password format.");
                // Hide preloader
                Preloader.style.display = 'none';
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

                    // Hide preloader
                    Preloader.style.display = 'none';
                    alert("Account Successfully Created! Proceed to Login Page");
                    // Redirect to login page after successful signup
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert(error.message);
                    console.error("Error during user creation:", error.message);
                    console.error("Error code:", error.code);
                    // Hide preloader
                    Preloader.style.display = 'none';
                });
        };

        MainForm.addEventListener('submit', RegisterUser);