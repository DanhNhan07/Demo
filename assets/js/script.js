const openSignupBtn = document.getElementById("openSignupBtn");
const openLoginBtn = document.getElementById("openLoginBtn");
const authModal = document.getElementById("authModal");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const switchToLoginBtn = document.getElementById("switch-to-login");
const switchToSignupBtn = document.getElementById("switch-to-signup");
const backToHomeBtns = document.querySelectorAll("#back-to-home");
const accountOptions = document.getElementById("account-options");
const userMenu = document.getElementById("user-menu");


let isLoggedIn = false; 

// Hiển thị tài khoản 
if (!isLoggedIn) {
    accountOptions.style.display = "block"; // Hiển thị nút đăng ký đăng nhập
    userMenu.style.display = "none"; 
} else {
    accountOptions.style.display = "none"; // Ẩn nút đăng ký đăng nhập
    userMenu.style.display = "block"; 
}

// form đăng ký
openSignupBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
    signupForm.style.display = "block";
    loginForm.style.display = "none";
    
});

// form đăng nhập 
openLoginBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
   
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

// call back retun
backToHomeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        authModal.style.display = "none";
    });
});

// panel
const panels = document.querySelectorAll(".panel");
panels.forEach((item)=>{
    item.addEventListener("mouseover",()=>{
        removeActive('active');
        
        item.classList.add("active")
    })


});

function removeActive(activeClass) {
    const activeItems = document.querySelectorAll(`.${activeClass}`);
    activeItems.forEach((item) => {
        item.classList.remove(activeClass);
    });
}



// pagination
const pagination = document.querySelectorAll(".pagination-item__link");
 pagination.forEach((a) => { 
    a.addEventListener("click", (e) => { 
        e.preventDefault(); removeActive("pagination-item__link--active")
     a.classList.add("pagination-item__link--active"); 
    }); }); 

// function Removepagination(){ 
    // pagination.forEach((a) => { 
        // a.classList.remove("pagination-item__link--active"); });
    // }

const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentActive = 1;

next.addEventListener("click",()=>{
    changeStep(1);
})

prev.addEventListener("click",()=>{
    changeStep(-1);
})

function changeStep(step){
    currentActive+=step;
    updateBtn();
}

function updateBtn(){
     pagination.forEach((step,id)=>{
        if(id<currentActive){
            removeActive("pagination-item__link--active")
            step.classList.add("pagination-item__link--active");
            
        }
        else{
            
            step.classList.remove("pagination-item__link--active")
            
        }

     })
}

//category
    const categoryItems = document.querySelectorAll(".category-item");

    categoryItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            removeActive("category-item--active");
            item.classList.add("category-item--active");
        });
    });

    // function removeActiveCategory() {
        // categoryItems.forEach((item) => {
            // item.classList.remove("category-item--active");
        // });
    // }
   
    
        const notifyItem = document.getElementById('has-noti');
    
        if (notifyItem) {
            notifyItem.addEventListener('click', (event) => {
                event.preventDefault();
                notifyItem.classList.toggle('header__navbar--item--has-notify');
                event.stopPropagation();
            });
    
            // Tắt thông báo khi nhấp vào bất kỳ chỗ nào khác
            document.addEventListener('click', () => {
                notifyItem.classList.remove('header__navbar--item--has-notify');
            });
        }
    
    
        const searchOptions = document.querySelectorAll(".header__search-select-item");
        searchOptions.forEach((option) => {
            option.addEventListener("click", (event) => {
                event.preventDefault();
                removeActive('header__search-select-item-active');
                option.classList.add('header__search-select-item-active');
            });
        });


        function Validator(formSelector){
            function getParen(element, selector){
                while(element.parentElement){
                    if(element.parentElement.matches(selector)){
                        return element.parentElement;
                    }
                    element = element.parentElement;
                }

            }



            var formRules ={};
            var validatorRules = {
                required: function(value){
                    return value ? undefined : '入力してください';
                },
                email: function(value){
                    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                    return regex.test(value) ? undefined : 'メールアドレスを入力してください';
                },
                min: function (min) {
                    return function (value) {
                        return value.length >= min ? undefined : `${min}文字以上を入力してください`;
                    };
                },
                
                max: function(max){
                    return function(value){
                        return value.length <= max ? undefined : `${max}文字以上を入力してください`;

                    };
                },
            }

            var formElement = document.querySelector(formSelector);

            if(formElement){

                var inputs = formElement.querySelectorAll('[name][rules]');

                for(var input of inputs){

                    var rules = input.getAttribute('rules').split('|');
                                                             

                    for (var rule of rules) {
                        let ruleInfo;
                        const isRuleHasValue = rule.includes(':');
                    
                        if (isRuleHasValue) {
                            ruleInfo = rule.split(':');
                            rule = ruleInfo[0];
                        }
                    
                        let ruleFunc = validatorRules[rule];
                        if (isRuleHasValue) {
                            ruleFunc = ruleFunc(ruleInfo[1]);
                        }
                    
                        if (Array.isArray(formRules[input.name])) {
                            formRules[input.name].push(ruleFunc);
                        } else {
                            formRules[input.name] = [ruleFunc];
                        }
                    }
                    
            
                // blur , change,...

                input.onblur = handleValidate;
                input.oninput = handleClear;
            }
            
            function handleValidate(event) {
                const rules = formRules[event.target.name];
                let errMessage;
            
                rules.find((rule) => {
                    errMessage = rule(event.target.value);
                    return errMessage;
                });
            
                const formGroup = getParen(event.target, '.auth-form__group');
                if (formGroup) {

                    const formMess = formGroup.querySelector('.form-mesage');
                    if (errMessage) {

                        formGroup.classList.add('invalid');
                        if (formMess) formMess.innerText = errMessage;
                    } else {

                        formGroup.classList.remove('invalid');
                        if (formMess) formMess.innerText = '';
                    }
                }
            
                return !errMessage; // Trả về true nếu không có lỗi
            }
            
                function handleClear(event){
                    var formGroup = getParen(event.target,'.auth-form__group');

                    if(formGroup.classList.contains('invalid')){

                        formGroup.classList.remove('invalid');
                        var formMess = formGroup.querySelector('.form-mesage');

                        if(formMess){
                            formMess.innerText = '';
                        }
                    }

                }
                               
            }

            // submit form
            formElement.onsubmit = function (event) {
                event.preventDefault();
                const inputs = formElement.querySelectorAll('[name][rules]');
                let isValid = true;
            
                for (const input of inputs) {
                    if (!handleValidate({ target: input })) {
                        isValid = false;
                    }
                }
            
                if (isValid) {
                    alert("ログインに成功しました")
                    formElement.submit();
                } else {
                    alert("もう一度お試しください")
                    
                }
            };
            


        }
        
       
        

    
