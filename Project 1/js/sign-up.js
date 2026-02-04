let findEdit = JSON.parse(localStorage.getItem("findEdit"));
console.log(findEdit);

let users = JSON.parse(localStorage.getItem("users")) || []
let formLoginUp = document.getElementById("sign-up-form");

formLoginUp.addEventListener("submit", function (e) {
    e.preventDefault();
    let emailInput = document.getElementById('email');
    let userName = document.getElementById('username');
    let passwordInput = document.getElementById('password');

    let emailError = document.getElementById("email-error");
    let userNameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexUserName = /^[a-zA-Z0-9._-]{3,30}$/;
    const regexPassword1 = /^.{8,}$/
    const regexPassword2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*_+-=]{8,}$/
    const regexPassword3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*._-]{8,}$/

    emailError.innerText = '';
    userNameError.innerText = '';
    passwordError.innerText = '';

    let isValid = true;

    if (emailInput.value === "") {
        emailError.innerText = 'Không được để trống';
        isValid = false;
    } else if (!regexEmail.test(emailInput.value)) {
        emailError.innerText = 'Email không đúng định dạng';
        isValid = false;
    }

    if (userName.value === "") {
        userNameError.innerText = 'Không được để trống';
        isValid = false;
    } else if (!regexUserName.test(userName.value)) {
        userNameError.innerText = 'Username không đúng định dạng';
        isValid = false;
    }

    if (passwordInput.value === "") {
        passwordError.innerText = 'Không được để trống';
        isValid = false;
    } else if (!regexPassword1.test(passwordInput.value)) {
        passwordError.innerText = 'Password tối thiểu 8 ký tự'
        isValid = false;
    } else if (!regexPassword2.test(passwordInput.value)) {
        passwordError.innerText = 'Password phải bao gồm cả chữ và số';
        isValid = false;
    } else if (!regexPassword3.test(passwordInput.value)) {
        passwordError.innerText = 'Password phải có cả chữ thường và chữ hoa';
        isValid = false;
    }

    if (isValid) {
        let newUser = {
            id: `U${users.length + 1}`,
            username: userName.value,
            email: emailInput.value,
            password: passwordInput.value,
            role:"user",
            birthday : "",
            status: "Deactive",
            description: "National again month truth. Actually civil table put nearly base."
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        Swal.fire({
            title: "Register successfully!",
            icon: "success",
            draggable: true,
        }).then(()=>formLoginUp.submit())
          .then(() =>window.location.href = "./pages/sign-in.html")
    }
})

