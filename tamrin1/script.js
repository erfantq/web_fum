// انتخاب المان‌ها
const form = document.getElementById('registerForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const loginLink = document.getElementById('loginLink');

// توابع اعتبارسنجی
function validateFirstName() {
    const firstNameValue = firstName.value.trim();
    const firstNameError = document.getElementById('firstNameError');
    
    if (firstNameValue === '') {
        firstNameError.style.display = 'block';
        return false;
    } else {
        firstNameError.style.display = 'none';
        return true;
    }
}

function validateLastName() {
    const lastNameValue = lastName.value.trim();
    const lastNameError = document.getElementById('lastNameError');
    
    if (lastNameValue === '') {
        lastNameError.style.display = 'block';
        return false;
    } else {
        lastNameError.style.display = 'none';
        return true;
    }
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '' || !emailRegex.test(emailValue)) {
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.style.display = 'none';
        return true;
    }
}

function validatePhone() {
    const phoneValue = phone.value.trim();
    const phoneError = document.getElementById('phoneError');
    // فرمت: کد شهر ۳ رقمی + خط تیره + ۸ رقم شماره تلفن
    const phoneRegex = /^\d{3}-\d{8}$/;
    
    if (phoneValue === '' || !phoneRegex.test(phoneValue)) {
        phoneError.style.display = 'block';
        return false;
    } else {
        phoneError.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    const passwordValue = password.value;
    const passwordError = document.getElementById('passwordError');
    
    // رمز عبور باید حداقل ۶ کاراکتر باشد
    if (passwordValue === '' || passwordValue.length < 6) {
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.style.display = 'none';
        return true;
    }
}

function validateConfirmPassword() {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (confirmPasswordValue === '' || passwordValue !== confirmPasswordValue) {
        confirmPasswordError.style.display = 'block';
        return false;
    } else {
        confirmPasswordError.style.display = 'none';
        return true;
    }
}

// بررسی وضعیت کلی فرم
function validateForm() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // فعال کردن دکمه ثبت نام اگر همه فیلدها معتبر باشند
    if (isFirstNameValid && isLastNameValid && isEmailValid && 
        isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// اضافه کردن event listeners برای اعتبارسنجی بلادرنگ
firstName.addEventListener('input', validateForm);
lastName.addEventListener('input', validateForm);
email.addEventListener('input', validateForm);
phone.addEventListener('input', validateForm);
password.addEventListener('input', validateForm);
confirmPassword.addEventListener('input', validateForm);

// مدیریت ارسال فرم
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // اعتبارسنجی نهایی قبل از ارسال
    if (validateFirstName() && validateLastName() && validateEmail() && 
        validatePhone() && validatePassword() && validateConfirmPassword()) {
        
        // نمایش پیام موفقیت
        successMessage.style.display = 'block';
        form.reset();
        submitBtn.disabled = true;
        
        // مخفی کردن پیام موفقیت بعد از 5 ثانیه
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// مدیریت لینک ورود
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('صفحه ورود به زودی پیاده‌سازی خواهد شد');
});