console.log("Sociout");

// =============== On clicking on follow button it convert into following ============
let follow = document.getElementsByClassName('follow');
for(let i=0;i<follow.length;i++){
// ✅ Change button text on click
follow[i].addEventListener('click', function handleClick() {
  if(follow[i].textContent == 'Follow'){
  follow[i].textContent = 'Following';
  }
  else{
    follow[i].textContent = 'Follow';
  }
});
}


// =============== Click like and red color on icon  =================

  const heart = document.querySelectorAll('.heart');
  for(let i=0; i<heart.length; i++){
    heart[i].addEventListener("click", function(){
      if(heart[i].style.color == "red"){
        heart[i].style.color = "rgb(39, 39, 39)";
      }
      else{
        heart[i].style.color = "red";
      }
    })
  }


// =============== Click bookmark and highlight it  =================
  const bookmark = document.querySelectorAll('.bookmark');
  for(let i=0; i<bookmark.length; i++){
    bookmark[i].addEventListener("click", function(){
      if(bookmark[i].style.color == "black"){
        bookmark[i].style.color = "grey";
      }
      else{
        bookmark[i].style.color = "black";
      }
    })
  }

let currentUser = JSON.parse(localStorage.getItem('loggedinUser'));
let userName = document.getElementById('userName');
userName.innerHTML = currentUser.fullName;
