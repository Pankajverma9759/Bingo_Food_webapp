# This is Vingo Food Web App

# Pre Install Packages
  1. npm i react-router-dom
  2. npm i react-icons
  3. npm i axios


# install Tailwind css 
1. cmd = npm install tailwindcss @tailwindcss/vite

2. vite.config.js

   import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'
    
    export default defineConfig({
      plugins: [
        tailwindcss(),
      ],
    })

3. index.css
      @import "tailwindcss";
    


# Firebase Authentication 

  1. Go to firebase authentication website
  2. Go to console
  3. create a project
  4. Click on project 
       go to setting and show all details and give the bottom

       Also install package in frontend = npm i firebase
       
  5. go to Authentication link in sidebar
  6. go to sign-in method
  7. select google and enable google setting
  
  8. make a file with firebase.js
     paste the code here 
        Note : firebase.js frontend folder ke inside ho
        like = frontend/firebase.js
     firebase.js
         
       // Import the functions you need from the SDKs you need
       import { initializeApp } from "firebase/app";
       import { getAnalytics } from "firebase/analytics";
       // TODO: Add SDKs for Firebase products that you want to use
       // https://firebase.google.com/docs/web/setup#available-libraries
       
       // Your web app's Firebase configuration
       // For Firebase JS SDK v7.20.0 and later, measurementId is optional
       const firebaseConfig = {
         apiKey: "AIzaSyDYGJjKQlz0cYWm1HYTYdnEcHGwdueooSk",
         authDomain: "app-a2602.firebaseapp.com",
         databaseURL: "https://app-a2602-default-rtdb.firebaseio.com",
         projectId: "app-a2602",
         storageBucket: "app-a2602.firebasestorage.app",
         messagingSenderId: "886346301354",
         appId: "1:886346301354:web:cd0a2709df0788a1e2f5d3",
         measurementId: "G-TVNQB379ER"
       };
             
       // Initialize Firebase
        const app = initializeApp(firebaseConfig);
       
       // Firebase Auth
       const auth = getAuth(app);
       
       // Analytics (safe initialization)
       let analytics;
       isSupported().then((yes) => {
         if (yes) {
           analytics = getAnalytics(app);
         }
       });
       
       export { app, auth }; 
  
  9. make .env file in src folder
     like =  src/.env file 

     .env
        VITE_FIREBASE_APIKEY = "your api key"

  10. pages 
        signUp.jsx
        signIn.jsx
        ForgetPassword.jsx
        Home.jsx

   11. Now we implement authentication in signUP.jsx

   signUP.jsx
     import in top of code 2 line

     import { FcGoogle } from "react-icons/fc";
     import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
     import { useNavigate } from "react-router-dom";
     import { auth } from "../firebase";
     import { GoogleAuthProvider,FacebookAuthProvider,
                GithubAuthProvider, signInWithPopup } from "firebase/auth";

 

     make a function 
      signUp.jsx

         const handleGoogleAuth = async () =>{
         const provider =new  GoogleAuthProvider();
         const result = await signInWithPopup(auth , provider)
         console.log(result);
        }

        // =================== Facebook Auth ============
            const handleFacebookAuth = async() =>{
              const provider = new FacebookAuthProvider();
              const result = await signInWithPopup(auth,provider);
              console.log(result);
            }
            
            // =================== Github Auth ============
            const handleGithubAuth = async() =>{
              const provider = new FacebookAuthProvider();
              const result = await signInWithPopup(auth,provider);
              console.log(result);
            }
          
            // =================== Facebook Auth ============
            const handleLinkedInAuth = async() =>{
              const provider = new FacebookAuthProvider();
              const result = await signInWithPopup(auth,provider);
              console.log(result);
            }
    

    Implement on UI 
      <button onClick={handleGoogleAuth}>Sign Up with google</button>

    Implement UI with Google , Facebook , GithHub , LinkedIn

    {/* SOCIAL SIGNUP */}

          <div className="w-full mt-4 flex justify-center gap-4">

            {/* Google */}
            <button
              onClick={handleGoogleAuth}
              className="p-3 border rounded-full hover:bg-gray-100 transition"
            >
              <FcGoogle size={22} />
            </button>



            {/* Facebook */}
            <button
              onClick={handleFacebookAuth}
              className="p-3 border rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <FaFacebookF size={18} />
            </button>

            {/* LinkedIn */}
            <button
              onClick={handleLinkedInAuth}
              className="p-3 border rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              <FaLinkedinIn size={18} />
            </button>

            {/* GitHub */}
            <button
              onClick={handleGithubAuth}
              className="p-3 border rounded-full bg-gray-900 text-white hover:bg-black transition"
            >
              <FaGithub size={20} />
            </button>
            
          </div>