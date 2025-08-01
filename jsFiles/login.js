let userMap;
if(!localStorage.getItem("userMap")){
    userMap = [["admin", {pass:"admin123",email:"admin@example.com"}], ["user", {pass:"userpass",email:"user@example.com"}]];
    localStorage.setItem("userMap", JSON.stringify(userMap));
}
userMap = new Map(JSON.parse(localStorage.getItem("userMap")));
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");
    const err = document.getElementById("error-message");
    if(usernameEl.value === "" || passwordEl.value === ""){
        err.textContent = "Please fill in all fields!";
        usernameEl.placeholder = "required";
        passwordEl.placeholder = "required";
        usernameEl.classList.add("warn");
        passwordEl.classList.add("warn");
        return;
    }
    else{
        usernameEl.placeholder = "username";
        passwordEl.placeholder = "password";
        usernameEl.classList.remove("warn");
        passwordEl.classList.remove("warn");
        if(userMap.has(usernameEl.value)){
            if(userMap.get(usernameEl.value).pass === passwordEl.value){
                localStorage.setItem("loggedInUser", usernameEl.value);
                window.location.href = "home.html"; // to redirect to main page
            } else {
                err.textContent = "Incorrect password! Please try again.";  
            }
        } else {
            err.textContent = "this user doesn't exist! Please try again.";
        }
    }
    usernameEl.value = "";
    passwordEl.value = "";
});