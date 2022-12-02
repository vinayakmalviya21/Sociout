// function to upload photo

// function uploadImg(e) {
//     console.log(e.target.files[0]);
//     uploadimg2(e.target.files[0]);
// }

import { app } from "./firebaseconfig.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import { realtimedatabaseref } from "./profileupdate.js";
import { getDatabase, child, push, update, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
const database = getDatabase(app);

const dbRef = realtimedatabaseref(getDatabase());
get(child(dbRef, `users/${JSON.parse(localStorage.getItem("loggedinUser")).uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val().photo);
        if (snapshot.val().photo != "") {
            let userImg = document.querySelector(".user-img");
            userImg.style.background = `url(${snapshot.val().photo})`;
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

// function uploadimg2(e){
let uploadImg = document.querySelector(".user-img");
uploadImg.addEventListener('change', (e) => {
    // console.log(e.target.files[0]);
    let uploader = document.querySelector(".uploader");
    uploader.style.display = "flex";

    const storage = getStorage(app);
    const userImages = ref(storage, `images/${JSON.parse(localStorage.getItem("loggedinUser")).uid}`);

    uploadBytes(userImages, e.target.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    const uploadTask = uploadBytesResumable(userImages, e.target.files[0]);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            if (progress == '100') {
                // alert("uploaded");
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                updateUserProfile(downloadURL);
                setTimeout(() => {
                    uploader.style.display = "none";
                }, 2000);
                // alert("done");
            });
        }
    );
})
// }

function updateUserProfile(url) {
    const db = getDatabase();

    // A post entry.
    const postData = {
        biodata: "",
        email: "",
        followers: "",
        following: "",
        photo: "",
        authorPic: url,
        username: "",
    };

    // Get a key for a new Post.
    const newPostKey = JSON.parse(localStorage.getItem("loggedinUser")).uid;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[`/users/` + newPostKey + '/photo'] = url;

    let userImg = document.querySelector(".user-img");
    userImg.style.background = `url(${url})`;

    return update(realtimedatabaseref(db), updates);
    //   }
}

let all_users = document.querySelectorAll('.story');
let k = 1;

let all_suggestions = document.querySelectorAll(".head");
let l = all_suggestions.length - 1;

const setAlluserImages = realtimedatabaseref(getDatabase());
get(child(setAlluserImages, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
        for (let i in snapshot.val()) {
            // console.log(i);/
            const dbRef = realtimedatabaseref(getDatabase());
            get(child(dbRef, `users/${i}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    if (i == JSON.parse(localStorage.getItem("loggedinUser")).uid) {
                        all_users[0].children[0].children[0].src = snapshot.val().photo;
                        // all_suggestions[6].children[0].children[0].children[0].src
                    }
                    else {
                        if (k < all_users.length) {
                            // console.log(snapshot.val().userName);
                            all_users[k].children[0].children[0].src = snapshot.val().photo;
                            all_users[k].children[1].innerHTML = snapshot.val().userName;
                            k++;
                        }

                        if (l >= 0 && l != 4) {
                            console.log(snapshot.val().userName)
                            all_suggestions[l].children[0].children[0].children[0].src = snapshot.val().photo;
                            all_suggestions[l].children[0].children[1].children[0].innerHTML = snapshot.val().userName;
                            l--;
                        }
                        else{
                            l = 3;
                        }
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