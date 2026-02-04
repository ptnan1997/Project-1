let findEdit = JSON.parse(localStorage.findEdit) || {};
console.log(findEdit)
// Truy vấn các thẻ và gán lại dữ liệu từ localStorage
let dob = document.getElementById("dob");
let active = document.getElementById("status-active");
let deactive = document.getElementById("status-deactive");

let role = document.getElementById("role")
let description = document.getElementById("description");
// console.log(description);
let password = document.getElementById("password");
// console.log(password);
let email = document.getElementById("email");
// console.log(email);
let id = document.getElementById("user-code");
// console.log(id);
let username = document.getElementById("username");



document.getElementById("dob").value = findEdit.birthday;
document.getElementById("username").value = findEdit.username;
document.getElementById("password").value = findEdit.password;
document.getElementById("description").value = findEdit.description;
document.getElementById("user-code").value = Number(findEdit.id);
document.getElementById("email").value = findEdit.email;
// (document.getElementById("status-active").value).checked === true ? document.getElementById("status-active").value:document.getElementById("status-deactive")= findEdit.status;
if (findEdit.status === 'Active'){
    active.checked = true;
    deactive.checked = false;
}else {
    deactive.checked = true;
    active.checked =false;
}
let btnEdit = document.getElementById("save-btn");

btnEdit.addEventListener("click", function (e) {
    e.preventDefault();
    // Truy vấn các thông tin input mới
    let newDescript = document.getElementById("description").value;
    let newPassword = document.getElementById("password").value;
    let newEmail = document.getElementById("email").value;  
    let newId = document.getElementById("user-code").value;
    let newUserName = document.getElementById("username").value;
    let newDob = document.getElementById("dob").value;
    let newrole = document.getElementById("role").value;
    let newStatusActive = document.getElementById("status-active");
    
    let newStatusDeactive = document.getElementById("status-deactive");
    
    // Validate 
    let emailError = document.getElementById("email-error");
    let userNameError = document.getElementById("username-error");
    let passwordError = document.getElementById("password-error");
    let dobError = document.getElementById("dob-error");
    // regex validate
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexUserName = /^[a-zA-Z0-9._-]{3,30}$/;
    const regexPassword1 = /^.{8,}$/
    const regexPassword2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*_+-=]{8,}$/
    const regexPassword3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*._-]{8,}$/

    emailError.innerText = "";
    userNameError.innerText = "";
    passwordError.innerText = "";
    dobError.innerText = "";

    let isValid = true;
    if (newEmail === "") {
        emailError.innerText = 'Vui lòng nhập thông tin !!!';
        isValid = false;
    } else if (!regexEmail.test(newEmail)) {
        emailError.innerText = 'Email không đúng định dạng';
        isValid = false;
    }
    if (newDob === "") {
        dobError.innerText = "Vui lòng nhập thông tin !!!";
        isValid = false;
    }
    if (newUserName === "") {
        userNameError.innerText = 'Vui lòng nhập thông tin !!!';
        isValid = false;
    } else if (!regexUserName.test(newUserName)) {
        userNameError.innerText = 'Username không đúng định dạng';
        isValid = false;
    }
    if (newPassword === "") {
        passwordError.innerText = 'Vui lòng nhập thông tin !!!';
        isValid = false;
    } else if (!regexPassword1.test(newPassword)) {
        passwordError.innerText = 'Password tối thiểu 8 ký tự'
        isValid = false;
    } else if (!regexPassword2.test(newPassword)) {
        passwordError.innerText = 'Password phải bao gồm cả chữ và số';
        isValid = false;
    } else if (!regexPassword3.test(newPassword)) {
        passwordError.innerText = 'Password phải có cả chữ thường và chữ hoa';
        isValid = false;
    }
    if (isValid) {
        // Gán lại giá trị mới cho findEdit
        findEdit.username = newUserName;
        findEdit.password = newPassword;
        findEdit.description = newDescript;
        findEdit.id = Number(newId);
        findEdit.email = newEmail;
        findEdit.birthday = newDob;
        findEdit.role = newrole;
        if(newStatusActive.checked === true){
            findEdit.status = "Active";
            
        }else if (newStatusDeactive.checked === true){
            findEdit.status = "Deactive";
        }
        console.log(findEdit);
        localStorage.setItem("findEdit",JSON.stringify(findEdit));
        // Lấy dữ liệu của users từ localStorage về 
        let users = JSON.parse(localStorage.users);

        // Sau dó duyệt quả mảng users tìm một đối tượng 
        // có thuộc tính id giống với thuộc tính của đối tượng findEdit
        // thì gán lại giá trị của thuộc tính đó tương ứng với nhau
        let findUser = users.find((user) => user.id == findEdit.id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Save it!"
        }).then((result) => {
            if (result.isConfirmed) {
                findUser.username = findEdit.username;
                findUser.password = findEdit.password;
                findUser.description = findEdit.description;
                findUser.id = findEdit.id;
                findUser.email = findEdit.email;
                findUser.birthday = findEdit.birthday;
                findUser.role = findEdit.role;
                findUser.status = findEdit.status;
                
                console.log(users);
                // Sau đó đẩy dữ liệu của users lên lại localStorage
                localStorage.setItem("users", JSON.stringify(users));
                

                Swal.fire({
                    title: "Saved!",
                    text: "Your file has been saved!.",
                    icon: "success"
                }).then(()=>{
                    window.location.href = "./pages/dashboard.html";
                })
            }
        });
    }
});
let btnBack = document.getElementById("back-btn");
    
        btnBack.addEventListener("click", function () {
           
            window.location.href = "./pages/dashboard.html";
        })