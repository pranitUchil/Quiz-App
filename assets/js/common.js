try {
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
} catch (error) {
    console.error('Error in password toggle button:', error);
}

function closeModal(id){
    document.querySelector(`#${id}`).style.display = 'none';
}

function showModal(id){
    document.querySelector(`#${id}`).style.display = 'flex';
    var modal = document.getElementById(id);

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

function isFormValid(inputs){
    let isValid = true;
    inputs.forEach(element => {
        const input = document.getElementById(element);
        if(input.value == ''){
            const parent = input.parentElement;
            parent.classList.add("is-invalid");
            isValid = false
        }
        else{
            const parent = input.parentElement;
            parent.classList.remove("is-invalid");
        }
    });
    return isValid;
}

function openCloseSideMenu(){
    const heading = document.getElementsByClassName("side-nav-bar")[0];
    heading.classList.toggle("side-nav-bar-close");
}

function showNotification(text){
    document.querySelector("#notificationModalTitle").innerHTML = text;
    showModal('notificationModal');
    setTimeout(() => {
        closeModal('notificationModal')
    }, 2000);
}

function checkAdminLogin(){
    let user = JSON.parse(localStorage.getItem('LoginUserData')) || {}
    if(user.UserRole != 'Admin')
        window.location.href = '../login.html';
}


function logout(forWhere){
    localStorage.removeItem('LoginUserData');
    if(forWhere == 'Admin')
        window.location.href = '../login.html';
    else
        window.location.href = 'login.html';

}