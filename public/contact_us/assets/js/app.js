window.scroll = function(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
        document.getElementById('navbar').classList.add('scrolled');
    }
    else{
        document.getElementById('navbar').classList.remove('scrolled');
    }
}
//AOS
AOS.init({
    duration: 800,
});

//form Name, Age, Gender, date_of_crime, address, District, motive
let formBtn = document.querySelector(".submit-btn");

formBtn.addEventListener("click", () => {
    let Name = document.querySelector("#Name");
    let Age = document.querySelector("#Age");
    let Gender = document.querySelector("#Gender");
    let date_of_crime = document.querySelector("#date_of_crime");
    let address = document.querySelector("#address");
    let District = document.querySelector("#District");
    let motive = document.querySelector("#motive");

    //form validation
    if(Name.value.length < 3){
        showFormError("name must be 3 letters long");
    }else if(!Age.value.length){
        showFormError("Enter the age of victim");
    }else if(!Gender.value.length){
        showFormError("Enter the gender of victim");
    }else if(!date_of_crime.value.length){
        showFormError("Enter the date of murder");
    }else if(!address.value.length){
        showFormError("Enter the location of victim where he/she died");
    }else if(!District.value.length){
        showFormError("Enter the district of victim where he/she died");
    }else if(!motive.value.length){
        showFormError("Enter the motive of death");
    }else{
        alert("Registered Successfully!");
        sendData("/update_crime", {
            Name: Name.value,
            Age: Age.value,
            Gender: Gender.value,
            date_of_crime: date_of_crime.value,
            address: address.value,
            District: District.value,
            motive: motive.value
        })
    }
})
