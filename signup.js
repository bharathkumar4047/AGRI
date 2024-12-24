
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
//   import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
//     authDomain: "agridrop-5ffa8.firebaseapp.com",
//     projectId: "agridrop-5ffa8",
//     storageBucket: "agridrop-5ffa8.firebasestorage.app",
//     messagingSenderId: "447104623367",
//     appId: "1:447104623367:web:4938333541fee115559ba2",
//     measurementId: "G-Z66S9DVKZX"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
  
//   const db=getDatabase(app);
//   document.getElementById("submit").addEventListener('click',function(e){
//     e.preventDefault();
//     set(ref(db,'user/' + document.getElementById("name").value),
// {
//     name:document.getElementById("name").value,
//     email:document.getElementById("email").value,
//     password:document.getElementById("password").value,
//     confirmPassword:document.getElementById("confirmPassword").value,
// });
// alert("Signup Successfully")
//   })
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyBLCWmhmY1qc_szY7PkLHHooPPZSbTeXj4",
      authDomain: "agridrop-5ffa8.firebaseapp.com",
       projectId: "agridrop-5ffa8",
       storageBucket: "agridrop-5ffa8.firebasestorage.app",
       messagingSenderId: "447104623367",
       appId: "1:447104623367:web:4938333541fee115559ba2",
       measurementId: "G-Z66S9DVKZX"
    };

// Initialize Firebase, Firestore, and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

document.querySelector('#myform').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = new URLSearchParams(window.location.search).get("type");

    // Validate inputs with regex
    const usernameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (!usernameRegex.test(username)) {
        alert('Invalid username format');
        return;
    }
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be 6-20 characters long, include at least 1 digit, 1 uppercase, and 1 lowercase');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        // Check if the username or email already exists in Firestore
        const usersRef = collection(database, 'users');
        const usernameQuery = query(usersRef, where('username', '==', username));
        const emailQuery = query(usersRef, where('email', '==', email));

        const usernameSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!usernameSnapshot.empty) {
            alert('Username already exists. Please choose a different one.');
            return;
        }
        if (!emailSnapshot.empty) {
            alert('Email already exists. Please use a different email.');
            return;
        }

        // Use Firebase Authentication to create a user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Store data in Firestore
        await setDoc(doc(database, 'users', user.uid), {
            username,
            email,
            password,
            type: userType
        });

        alert('Registration successful! Please check your email for verification.');
        window.location.href = 'login.html'; // Redirect to login page
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred while registering. Please try again later.');
    }
});
