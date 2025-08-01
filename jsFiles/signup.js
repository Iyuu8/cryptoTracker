let userMap = new Map(JSON.parse(localStorage.getItem("userMap")));
const form = document.getElementById("signup-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameEl = document.getElementById("username");
    const passwordEl = document.getElementById("password");
    const emailEl = document.getElementById("email");
    const err = document.getElementById("error-message");
    if(usernameEl.value === "" || passwordEl.value === "" || emailEl.value === ""){
        err.textContent = "Please fill in all fields!";
        usernameEl.placeholder = "required";
        passwordEl.placeholder = "required";
        emailEl.placeholder = "required";
        usernameEl.classList.add("warn");
        passwordEl.classList.add("warn");
        emailEl.classList.add("warn");
    }else{
        usernameEl.placeholder = "username";
        passwordEl.placeholder = "password";
        emailEl.placeholder = "Email: example@example.com";
        usernameEl.classList.remove("warn");
        passwordEl.classList.remove("warn");
        emailEl.classList.remove("warn");
        // this is RegEx for now use it as it is and later learn it
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){
            err.textContent = "Please enter a valid email address!";
            emailEl.value = "";
            emailEl.classList.add("warn");
            emailEl.placeholder = "Enter a valid email";
            return;
        }
        if(passwordEl.value.length < 6){
            err.textContent = "Password must be at least 6 characters long!";
            passwordEl.value = "";
            passwordEl.classList.add("warn");
            passwordEl.placeholder = "Password must be at least 6 characters";
            return;
        }
        if(userMap.has(usernameEl.value)){
            err.textContent = "This username already exists! Please choose another.";
        } else {
            userMap.set(usernameEl.value, {pass: passwordEl.value, email: emailEl.value});
            localStorage.setItem("userMap", JSON.stringify([...userMap]));
            window.location.href = "login.html"; // redirect to login page
        }
        usernameEl.value = "";
        passwordEl.value = "";  
        emailEl.value = "";
    }
    
});
