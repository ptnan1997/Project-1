// Lấy thông tin của users từ localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
// Gọi hàm in thông tin users tại table-body
renderUser();
// Sau đó tiến hành tương tác với các chức năng XÓA và SỬA 
// Gọi thẻ tbody ra
let tbody = document.getElementById('table-body');
//Gắn sự kiện cho tbody
tbody.addEventListener('click', function (e) {
  // Chuyển hướng đến các phần tử có tên miền là btn-delete
  // THỰC HIỆN TÍNH NĂNG DELETE
  if (e.target.classList.contains("btn-delete")) {

    let deleteID = Number(e.target.id);
    // console.log(deleteID);
    let findDelete = users.findIndex((user) => user.id === deleteID);
    // console.log(findDelete);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          users.splice(findDelete, 1);
          console.log(users); 
          localStorage.setItem("users", JSON.stringify(users));
          renderUser(); 
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  // TÍNH NĂNG EDIT(KHI ẤN SẼ LẤY THÔNG TIN CỦA ĐỐI TƯỢNG ĐÓ LƯU VÀO BIẾN FINDEDIT VÀ ĐẨY LÊN LOCALSTORAGE)
  if (e.target.classList.contains("btn-edit")) {
    //HIỂN THỊ THÔNG BÁO XÁC NHẬN CỦA NGƯỜI DÙNG-->SAU KHI COMFIRMED XONG THÌ SẼ THỰC HIỆN 
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I wannan edit it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // THÔNG BÁO CHUYỂN HƯỚNG 
        Swal.fire({
          icon: "info",
          title: "Redirecting...",
          text: "Taking you to the edit page",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false
        }).then(()=>{
          //SAU ĐÓ THỰC HIỆN LƯU THÔNG
          let editID = Number(e.target.id);

          let findEdit = users.find((user) => user.id === editID);
          console.log(findEdit);
          localStorage.setItem("findEdit",JSON.stringify(findEdit))
          renderUser();
          localStorage.setItem("users", JSON.stringify(users));
          window.location.href = "./pages/edit-user.html"
        })
      }
    });
  }
})


let filterName = document.getElementById("search-box");
console.log(filterName)// []?
let searchIcon = document.getElementById("search-icon");
searchIcon.addEventListener("click",function(){
  renderFilter();
})


function renderUser() {
  //  Truy xuất thẻ tbody sang JS
  let tbody = document.getElementById("table-body");
  // B1 Cần 2 thông số : 1. Trang hiện tại (current page) 2. Số lượng hiển thị người dùng trên một trang (user per pâge)
  // B2 Tìm vị trí bắt đầu hiển thị (tạm gọi là start) start = (currentpage - 1)*user per page
// B3 TÌm vị trí kết thúc hiển thị (tạm gọi là end) end = start + user per page
//  B4 số tổng trang = tổng số phần tử chia cho userperpage (lấy làm tròn lên)
//  back = trang hiẹn tại có lớn 1 hay ko
// forward = sẽ chạy đến tổng số trang totalPage;


  let currentPage = 1;
  let userPerPage = 5;
  let start = (currentPage - 1)*userPerPage;
  let end = start + userPerPage;
  let pagination = document.getElementById("pagination");
  let totalPage = Math.ceil(users.length/userPerPage);
  pagination.addEventListener("click",function(e){
    if(e.target.classList.contains("arrow-left")){
      if (currentPage>1){
        currentPage = currentPage -1;
        console.log(currentPage);
        let numberPage = document.getElementById("pagination-list");
        numberPage.innerHTML = `<a>Trang ${currentPage}</a>` ;
        let start = (currentPage - 1)*userPerPage;
        let end = start + userPerPage;
        tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${users[i].id}</td>
                <td>${users[i].username}</td>
                <td>${users[i].email}</td>
                <td>${users[i].role}</td>
                <td>${users[i].birthday}</td>
                <td>
                <div class = "status-cell ${users[i].status  ==="Active" ? "active" : "deactive"}">
                <div class="dot">${users[i].status}</div>
                </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${users[i].id} class="btn-edit">Sửa</button>
                        <button id = ${users[i].id} class="btn-delete">Xóa</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
      }
    }
    if(e.target.classList.contains("arrow-right")){
      if (currentPage<totalPage){
        currentPage = currentPage +1;
        console.log(currentPage);
        let numberPage = document.getElementById("pagination-list");
        numberPage.innerHTML = `<a>Trang ${currentPage}</a>` ;
        let start = (currentPage - 1)*userPerPage;
        let end = start + userPerPage;
        tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${users[i].id}</td>
                <td>${users[i].username}</td>
                <td>${users[i].email}</td>
                <td>${users[i].role}</td>
                <td>${users[i].birthday}</td>
                <td>
                <div class = "status-cell ${users[i].status ==="Active" ? "active" : "deactive"}">
                <div class="dot">${users[i].status}</div>
                </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${users[i].id} class="btn-edit">Sửa</button>
                        <button id = ${users[i].id} class="btn-delete">Xóa</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
      }
    }
  })
  tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${users[i].id}</td>
                <td>${users[i].username}</td>
                <td>${users[i].email}</td>
                <td>${users[i].role}</td>
                <td>${users[i].birthday}</td>
                <td>
                <div class = "status-cell ${users[i].status ==="Active" ? "active" : "deactive"}">
                <div class="dot">${users[i].status}</div>
                </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${users[i].id} class="btn-edit">Edit</button>
                        <button id = ${users[i].id} class="btn-delete">Delete</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
  
    //  Tạo thẻ tr
    
  
}
function renderFilter() {
//   //  Truy xuất thẻ tbody sang JS
  let tbody = document.getElementById("table-body");
//   // B1 Cần 2 thông số : 1. Trang hiện tại (current page) 2. Số lượng hiển thị người dùng trên một trang (user per pâge)
//   // B2 Tìm vị trí bắt đầu hiển thị (tạm gọi là start) start = (currentpage - 1)*user per page
// // B3 TÌm vị trí kết thúc hiển thị (tạm gọi là end) end = start + user per page
// //  B4 số tổng trang = tổng số phần tử chia cho userperpage (lấy làm tròn lên)
// //  back = trang hiẹn tại có lớn 1 hay ko
// // forward = sẽ chạy đến tổng số trang totalPage;

let findFilter = users.filter((user)=>user.status === filterName.value)
console.log(findFilter);
  let currentPage = 1;
  let userPerPage = 5;
  let start = (currentPage - 1)*userPerPage;
  let end = start + userPerPage;
  let pagination = document.getElementById("pagination");
  let totalPage = Math.ceil(findFilter.length/userPerPage);
  pagination.addEventListener("click",function(e){
    if(e.target.classList.contains("arrow-left")){
      if (currentPage>=1){
        currentPage = currentPage -1;
        console.log(currentPage);
        let numberPage = document.getElementById("pagination-list");
        numberPage.innerHTML = `<a>${currentPage}</a>` ;
        let start = (currentPage - 1)*userPerPage;
        let end = start + userPerPage;
        tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${findFilter[i].id}</td>
                <td>${findFilter[i].username}</td>
                <td>${findFilter[i].email}</td>
                <td>${findFilter[i].role}</td>
                <td>${findFilter[i].birthday}</td>
                <td>
                <div class = "status-cell ${findFilter[i].status  ==="Active" ? "active" : "deactive"}">
                <div class="dot">${findFilter[i].status}</div>
                </div>
                
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${findFilter[i].id} class="btn-edit">Sửa</button>
                        <button id = ${findFilter[i].id} class="btn-delete">Xóa</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
      }
    }
    if(e.target.classList.contains("arrow-right")){
      if (currentPage<totalPage){
        currentPage = currentPage +1;
        console.log(currentPage);
        let numberPage = document.getElementById("pagination-list");
        numberPage.innerHTML = `<a>${currentPage}</a>` ;
        let start = (currentPage - 1)*userPerPage;
        let end = start + userPerPage;
        tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${findFilter[i].id}</td>
                <td>${findFilter[i].username}</td>
                <td>${findFilter[i].email}</td>
                <td>${findFilter[i].role}</td>
                <td>${findFilter[i].birthday}</td>
                <td>
                <div class = "status-cell  ${findFilter[i].status ==="Active" ? "active" : "deactive"}">
                
                <div class="dot">${findFilter[i].status}</div>
                </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${findFilter[i].id} class="btn-edit">Sửa</button>
                        <button id = ${findFilter[i].id} class="btn-delete">Xóa</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
      }
    }
  })
  tbody.innerHTML = '';
  //   in dữ liệu
  for (let i =start; i<end; i++){
    let tr = document.createElement('tr')
    //  Thêm dữ liệu cho thẻ tr
    tr.innerHTML = `
                <td>${findFilter[i].id}</td>
                <td>${findFilter[i].username}</td>
                <td>${findFilter[i].email}</td>
                <td>${findFilter[i].role}</td>
                <td>${findFilter[i].birthday}</td>
                <td>
                <div class = "status-cell ${findFilter[i].status ==="Active" ? "active" : "deactive"}">
                <div class="dot">${findFilter[i].status}</div>
                </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button id = ${findFilter[i].id} class="btn-edit">Sửa</button>
                        <button id = ${findFilter[i].id} class="btn-delete">Xóa</button>
                    </div>
                </td>`
    // Thêm thẻ tr vào trong thẻ tbody
    tbody.appendChild(tr);
  }
  
    //  Tạo thẻ tr
    
  
}

// B1 Cần 2 thông số : 1. Trang hiện tại (current page) 2. Số lượng hiển thị người dùng trên một trang (user per pâge)
// B2 Tìm vị trí bắt đầu hiển thị (tạm gọi là start) start = (currentpage - 1)*user per page
// B3 TÌm vị trí kết thúc hiển thị (tạm gọi là end) end = start + user per page
//  B4 số tổng trang = tổng số phần tử chia cho userperpage (lấy làm tròn lên)
//  back = trang hiẹn tại có lớn 1 hay ko

 
