const openSignupBtn = document.getElementById("openSignupBtn");
const openLoginBtn = document.getElementById("openLoginBtn");
const authModal = document.getElementById("authModal");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const switchToLoginBtn = document.getElementById("switch-to-login");
const switchToSignupBtn = document.getElementById("switch-to-signup");
const backToHomeBtns = document.querySelectorAll("#back-to-home");
const socialLogin = document.getElementById("social-login");
const accountOptions = document.getElementById("account-options");
const userMenu = document.getElementById("user-menu");

// Biến giả định kiểm tra trạng thái đăng nhập
let isLoggedIn = false; // hoặc true nếu người dùng đã đăng nhập

// Hiển thị hoặc ẩn các tùy chọn tài khoản dựa trên trạng thái đăng nhập
if (!isLoggedIn) {
    accountOptions.style.display = "block"; // Hiển thị các nút đăng ký/đăng nhập
    userMenu.style.display = "none"; // Ẩn thông tin người dùng
} else {
    accountOptions.style.display = "none"; // Ẩn các nút đăng ký/đăng nhập
    userMenu.style.display = "block"; // Hiển thị thông tin người dùng
}

// Hiển thị form đăng ký và modal khi nhấp vào nút "Đăng ký"
openSignupBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    socialLogin.style.display = "none";
});

// Hiển thị form đăng nhập và modal khi nhấp vào nút "Đăng nhập"
openLoginBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    socialLogin.style.display = "none";
});

// Chuyển đổi giữa form đăng nhập và đăng ký
switchToLoginBtn.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

switchToSignupBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

// Ẩn modal khi nhấn vào nút "Trở lại"
backToHomeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        authModal.style.display = "none";
    });
});


