import { app, storageRef } from './firebaseconfig.js';
import { child, getDatabase, ref, push, set, update, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
console.log("I am profile.js");

import { getStorage, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
const storage = getStorage(app);

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${JSON.parse(localStorage.getItem("loggedinUser")).uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        let profilepic = document.querySelector('#profilepic');
        profilepic.src = `${snapshot.val().photo}`;
        
        let username = document.querySelector('#username');
        username.innerHTML = `${snapshot.val().userName}`;

        let numberPost = document.querySelector('#numberPost');
        numberPost.innerHTML = `${snapshot.val().posts.length-1}`;

        let showsPosts = document.querySelector(".showsPosts");
        console.log(snapshot.val().posts.length)
        for (let i = snapshot.val().posts.length -1; i >=1; i--) {

            showsPosts.innerHTML = showsPosts.innerHTML + `<div>
        <img src=${snapshot.val().posts[i]}
            alt="image 1" class="w-100 rounded-3">
    </div>`
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

let addPost = document.querySelector("#addPost");
addPost.addEventListener("change", (event) => {
    console.log(event.target.files[0]);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${JSON.parse(localStorage.getItem("loggedinUser")).uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());

            const postRef = storageRef(storage, `newPosts/${JSON.parse(localStorage.getItem("loggedinUser")).uid} +"/post" + ${snapshot.val().posts.length}`);

            uploadBytes(postRef, event.target.files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            const uploadTask = uploadBytesResumable(postRef, event.target.files[0]);


            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    if (progress == "100") {
                        alert("Uploaded");
                    }
                },
                (error) => {
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        addPosttoDataBase(downloadURL);
                    });
                }
            );

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


});


function addPosttoDataBase(url) {
    // function writeNewPost(uid, username, picture, title, body) {
    const db = getDatabase();

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${JSON.parse(localStorage.getItem("loggedinUser")).uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());

            var oldPosts = snapshot.val().posts;
            console.log(oldPosts);
            oldPosts.push(url);
            const newPosts = oldPosts;
            console.log("new :- ", newPosts);
            const currentUid = JSON.parse(localStorage.getItem("loggedinUser")).uid;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            const updates = {};
            updates['/users/' + currentUid + '/posts/'] = newPosts;
            // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

            return update(ref(db), updates);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });



    //   }
}

// Upload profile photo
let profilePhoto = document.querySelector('#profilePhoto');
profilePhoto.addEventListener("change", (e) => {
    console.log(e.target.files[0]);

    const storage = getStorage();
    const profileRef = storageRef(storage, `${JSON.parse(localStorage.getItem("loggedinUser")).uid}` + '/profilePhoto' );

    // 'file' comes from the Blob or File API
    uploadBytes(profileRef, e.target.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');

    });

    const uploadTask = uploadBytesResumable(profileRef,e.target.files[0] );

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
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
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

                let profilepic = document.querySelector('#profilepic');
                profilepic.src = `${downloadURL}`
                const db = getDatabase();
                                    
                    // Get a key for a new Post.
                    const UsersUid = `${JSON.parse(localStorage.getItem("loggedinUser")).uid}`;
                  
                    // Write the new post's data simultaneously in the posts list and the user's post list.
                    const updates = {};
                    updates['/users/' + UsersUid + '/photo'] = downloadURL;
                    // updates['/user-posts/' + uid + '/' + UsersImg] = postData;
                  
                    return update(ref(db), updates);
            });
        }
    );


});


let addAbout = document.querySelector('.addAbout');
addAbout.addEventListener("click",(e)=>{
    let doneButton = document.querySelector('.doneButton');
    let aboutArea = document.querySelector('.aboutArea');
    let detailBio = document.querySelector('.detailBio');
    
    console.log(e.target);
    e.target.style.color = 'none';
    // detailBio.style.display = 'none';
    // doneButton.style.display = 'block';
    // aboutArea.style.display = 'inline';


});

let doneButton = document.querySelector('.doneButton');

doneButton.addEventListener("click",(e)=>{
    let addAbout = document.querySelector('.addAbout');
    let detailBio = document.querySelector('.detailBio');

    addAbout.style.display = 'flex';
    // detailBio.style.display = 'inline';
    e.target.style.display = "none";
    
});

