
function login(e){
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    let users = JSON.parse(localStorage.getItem('UserList')) || [];
    if(users.length == 0){
        document.querySelector('.error-message').style.display = 'block';
        return
    }
    let user = users.find(user => user.Email === email && user.Password === password);
    if(user){
        localStorage.setItem('LoginUserData', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        document.querySelector('.error-message').style.display = 'block';
    }
}

document.getElementById("login-form").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Optional: prevents default Enter behavior
        login(event); // Calls the login function
    }
  });