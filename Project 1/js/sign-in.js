// láy dữ liệu  từ local
let users = JSON.parse(localStorage.getItem("users")) || [];

// Truy vấn các thẻ cần thiết và gắn sự kiện
let form = document.getElementById("sign-in-form")
if (!form) return;
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    // Validate thông tin người dùng nhập vào
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*._-]{8,}$/;


    emailError.innerText = '';
    passwordError.innerText = '';
    let isValid = true;
    if (email === "") {
        emailError.innerText = 'Không được để trống';
        isValid = false;
    } else if (!regexEmail.test(email)) {
        emailError.innerText = 'Email không đúng định dạng';
        isValid = false;
    }
    if (password === "") {
        passwordError.innerText = 'Không được để trống';
        isValid = false;
    } else if (!regexPass.test(password)) {
        passwordError.innerText = 'Password không đúng định dạng';
        isValid = false;
    }
    if (isValid) {
        // So sánh dữ liệu người dùng  với dữ liệu local
        let result = users.some((user) => email === user.email && password === user.password)
        // Hàm some dùng để trả về kết quả true hoặc false nếu đúng hoặc sai điều kiện
        console.log(result);
        if (!result) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Account does not exist",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        } else {
            let currentUser = users.find((user) => email === user.email && password === user.password);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
            Swal.fire({
                title: "Success Login in",
                icon: "success",
                draggable: true
            }).then(() => window.location.href = "./pages/dashboard.html")
        }
    }
})
