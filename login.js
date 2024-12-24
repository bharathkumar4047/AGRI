import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, reload } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

// Initialize Firebase and Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector('#lform').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        // Sign in the user using Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Refresh the user data to get the latest email verification status
        await reload(user);

        // Check if email is verified
        if (!user.emailVerified) {
            alert('Please verify your email before logging in.');
            return;
        }
        // Redirect to the dashboard or home page
        alert('Login successful!');
        window.location.href = 'index.html'; // Update the path as per your application structure
    } catch (error) {
        console.error('Error during login:', error);
        switch (error.code) {
            case 'auth/user-not-found':
                alert('No user found with this email.');
                break;
            case 'auth/wrong-password':
                alert('Incorrect password. Please try again.');
                break;
            case 'auth/invalid-email':
                alert('Invalid email format.');
                break;
            default:
                alert('An error occurred. Please try again later.');
        }
    }
});
;
