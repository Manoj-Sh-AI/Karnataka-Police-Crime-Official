window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace("/");
        }
    }
}
//form
let formBtn = document.querySelector(".submit-btn");

formBtn.addEventListener("click", () => {
    let fullname = document.querySelector("#name") || null;
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let number = document.querySelector("#number") || null;
    let tac = document.querySelector("#tc") || null;

    if (fullname != null) {
        //form validation
        if(fullname.value.length < 3){
            showFormError("name must be 3 letters long");
        }else if(!email.value.length){
            showFormError("Enter your email");
        }else if(password.value.length < 3){
            showFormError("Password must be 8 characters long");
        }else if(number.value.length < 10){
            showFormError("Invalid number, please enter valid one");
        }else if(!tac.checked){
            showFormError("You must agree for terms and condition");
        }else{
            sendData("/signup", {
                name: fullname.value,
                email: email.value,
                password: password.value,
                number: number.value,
                tac: tac.checked
            })
        }
    }else{
        if (!email.value.length || !password.value.length) {
            showFormError("Fill all the inputs")
        }else{
            sendData("/login", {
                email: email.value,
                password: password.value
            })
        }
    }
})