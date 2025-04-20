let passwordHideShowBtn = document.querySelectorAll('.password-hide-show-icon')[0];
passwordHideShowBtn.addEventListener('click', function (e) {
    let passwordField = document.querySelector('#password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        e.target.classList.remove('fa-eye-slash');
        e.target.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        e.target.classList.remove('fa-eye');
        e.target.classList.add('fa-eye-slash');
    }
})