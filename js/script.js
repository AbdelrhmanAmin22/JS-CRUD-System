//show password 
let showPassword = document.getElementById('showPassword');
let passwordInput = document.getElementById('passwordInput');

showPassword.addEventListener(`click`, function(){
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        showPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
    else{
        passwordInput.type = 'password';
        showPassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
});
// ***********************************************************************
// handel login 

let errorAlert = document.getElementsByClassName('error-alert')[0];
errorAlert.style.display ='none';

window.localStorage.setItem('username', 'abdo_20');
window.localStorage.setItem('password', '123456');


let formData = {
    username: '',
    password: ''
};

// Function to update form data
function updateFormData() {
    formData.username = document.getElementsByName('username')[0].value;
    formData.password = document.getElementsByName('password')[0].value;
}

let loginForm = document.getElementById('loginForm');
let wrongTrails = 0;

// Event listener for the form submission
loginForm.addEventListener('submit', function (event) {
    updateFormData();
    if(formData.username == window.localStorage.getItem('username') && formData.password ==window.localStorage.getItem('password') ) {
        loginForm.action = 'home.html';
    }
    else {
        event.preventDefault();
        errorAlert.style.display ='block';
        wrongTrails++
        console.log("number of wrong trials " + wrongTrails)
    }
});

