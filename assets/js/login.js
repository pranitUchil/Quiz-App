
function login(e){
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length == 0){
        document.querySelector('.error-message').style.display = 'block';
        return
    }
    let user = users.find(user => user.email === email && user.password === password);
    if(user){
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
}