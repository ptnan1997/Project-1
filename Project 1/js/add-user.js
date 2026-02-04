// lấy dữ liệu của users từ localStorage về
let users = JSON.parse(localStorage.users) || [];
let form = document.getElementById("add-new-user-form")
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let emailInput = document.getElementById('email');
    let userName = document.getElementById('username');
    let passwordInput = document.getElementById('password');
    let role = document.getElementById("role");
    let birthday = document.getElementById("dob");
    let active = document.getElementById("status-active");
    let deactive = document.getElementById("status-deactive");
    let description = document.getElementById("description");

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
    // Validate không để trống
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
    // Validate Email  


    if (isValid) {
        // 
        // let addBtn = document.getElementById("add-btn");
        // addBtn.addEventListener('click', function () {
            let newUser = {
                id: `U${users.length + 1}`,
                username: userName.value,
                email: emailInput.value,
                password: passwordInput.value,
                birthday: birthday.value,
                role: role.value,
                status: active.checked === true ? active.value : deactive.value,
                description: description.value,
            }
            console.log(newUser);
            users.push(newUser);
            
            Swal.fire({
                title: "Register successfully!",
                icon: "success",
                draggable: true,
            }).then(()=>{
                localStorage.setItem("users", JSON.stringify(users));
            }).then(()=>{window.location.href = "./dashboard.html"})
            
        // })


        let backBtn = document.getElementById("back-btn");
        backBtn.addEventListener('click',function(){
            emailInput = "";
            userName = "";
            passwordInput = "";
            role = "";
            birthday = "";
            active = "";
            deactive = "";
            description = "";
            window.location.href = "./dashboard.html"
        })
    }
})
