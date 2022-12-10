import { app } from './firebaseconfig.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const auth = getAuth(app);
const database = getDatabase(app);

//  function for existing users
function existingUsers(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            swal("Good job!", "You are successfully login!", "success");

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user);
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const uid = user.uid;
                    getCurrentUserInfo(email);
                    // ...
                } else {
                    // User is signed out
                    console.log("user is signed out");
                    // ...
                }
            });
            // setTimeout(() => {
            //     document.location.href = 'home.html';
            // }, 1500);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            swal("Retry!", `${errorMessage}`, "error");
        });
}

var loginUser = {
    fullName: "",
    uid: "",
}

// function for get current user information
function getCurrentUserInfo(getEmail) {
    var check1 = false;
    console.log("i am in");
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log((snapshot.val()));
            for (let i in snapshot.val()) {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${i}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        // console.log(snapshot.val().email);
                        if (snapshot.val().email == getEmail) {
                            console.log("yes user is present");
                            check1 = true;
                            loginUser.uid = i;
                            loginUser.fullName = snapshot.val().userName;
                            console.log(loginUser.fullName);
                            console.log(loginUser.uid);
                            localStorage.setItem('loggedinUser', JSON.stringify(loginUser));

                            setTimeout(() => {
                                document.location.href = 'profile.html';
                            }, 1000);
                        }
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    if (!check1) {
        console.log("User is not present");
    }
}

let login = document.getElementById("login");

login.addEventListener("click", function () {
    let getEmail = document.getElementById('email').value;
    let getPassword = document.getElementById('psw').value;
    existingUsers(getEmail, getPassword);
});


let getRegistered = document.getElementById('getRegistered');
getRegistered.addEventListener('click', () => {
    document.location.href = 'index.html';
})

console.log(loginUser.fullName);