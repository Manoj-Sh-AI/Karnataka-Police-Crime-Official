const navbar = () => {
    let login = document.querySelector (".login");
    login.innerHTML = 
    `<div data-aos="fade-up"  class="col-lg-3"><a href="./login.html" class="btn btn-brand login">Login</a></div>`
}

navbar();

let userpopupIcon = document.querySelector(".login");

let actionBtn = userpopupIcon.querySelector("a");
let user = JSON.parse(sessionStorage.user || null);

if(user != null){
    actionBtn.innerHTML = "Logout";
    actionBtn.addEventListener("click", () => logout());
}else{
    actionBtn.innerHTML = "Login";
    actionBtn.addEventListener("click", () => location.href = "/");
}

const logout = () => {
    sessionStorage.clear()
    location.reload();
}