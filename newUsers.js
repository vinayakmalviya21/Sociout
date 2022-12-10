import { app } from './firebaseconfig.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const auth = getAuth(app);
const database = getDatabase(app);

// function for new Users
function newuser(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            swal("Good job!", "You are successfully registered!", "success");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            swal("Retry!", `${errorMessage}`, "error");
            // ..
        });
}

// function to set user info
function setInfo() {
    let fullName = document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    let userEmail = document.getElementById('email').value;
    // Create a new post reference with an auto-generated id
    const db = getDatabase();
    const usersList = ref(db, 'users');
    const newUserList = push(usersList);
    set(newUserList, {
        userName: fullName,
        email: userEmail,
        photo: "",
        followers: "",
        following: "",
        bio: "",
        chats: "",
        comments: ['comment0'],
        posts: ["post0"],
    });
}


let register = document.getElementById("register");


register.addEventListener('click', (e) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('psw').value;
    newuser(email, password);
    setInfo();

    setTimeout(() => {
        document.location.href = 'login.html';
    }, 1500);
});

let SignIn = document.getElementById("SignIn");

SignIn.addEventListener('click',()=>{
    document.location.href = 'login.html';
})

