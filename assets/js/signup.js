let otp;

function moveToNext(current, nextId, prevId) {
    if (current.value.length > 0) {
        document.getElementById(nextId).focus();
    }
    else if (current.value.length == 0) {
        document.getElementById(prevId).focus();
    }
}

function showOtpSection(e){
    e.preventDefault();
    
    
    let terms = document.querySelector('#terms-of-conditions').checked;
    if(!terms){
        document.querySelector('#terms-error').style.display = 'block';
        return false;
    }
    else{
        document.querySelector('#terms-error').style.display = 'none';
    }

    document.querySelector('.otp-container').style.display = 'block';
    document.querySelector('.form-container').style.display = 'none';

    let email = document.querySelector('#email').value;

    document.querySelector('#signup-email').innerHTML = `${email} <i class="fa-solid fa-pen" style="cursor: pointer;margin-left: 5px;
    font-size: 12px;" onclick="showSignupSection()"></i>`;

    otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP - '+otp);
}

function showSignupSection(){
    document.querySelector('.otp-container').style.display = 'none';
    document.querySelector('.form-container').style.display = 'block';
}

function checkOtp(){
    let otpsId = ['otp-input1', 'otp-input2', 'otp-input3', 'otp-input4', 'otp-input5', 'otp-input6'];
    let otpsValue = ''
    for (let i = 0; i < otpsId.length; i++) {
        let singleOtp = document.querySelector(`#${otpsId[i]}`).value;
        otpsValue += singleOtp;
        if(singleOtp.length == 0){
            document.querySelector(`.error-message`).style.display = 'block';
            return false;
        }
    }

    if(otpsValue != otp){
        alert('Invalid OTP!');
        return ;
    }

    document.querySelector('.otp-container').style.display = 'none';
    document.querySelector('.loader-container').style.display = 'flex';

    setTimeout(() => {
        saveUserData();

        let email = document.querySelector('#email').value;
        console.log('email - '+email);
        document.querySelector('.loader-container').style.display = 'none';
        document.querySelector('.success-container').style.display = 'block';
        document.querySelector('.success-deception').innerHTML = `
            The address ${email} is now a confirmed account. Thanks for helping us keep your Vivid Seats secure
        `;
    }, 2000);
}

function saveUserData(){
    let userList = JSON.parse(localStorage.getItem('UserList')) || [];
    let userid = userList.length + 1;

    localStorage.setItem('LoginUserData', JSON.stringify({
        Email: document.querySelector('#email').value,
        Password: document.querySelector('#password').value,
        FullName: document.querySelector('#fullname').value,
        ID: userid
    }));

    userList.push({
        Email: document.querySelector('#email').value,
        Password: document.querySelector('#password').value,
        FullName: document.querySelector('#fullname').value,
        ID: userid
    });

    localStorage.setItem('UserList', JSON.stringify(userList));
}

function signup(){
    

    window.location.href = 'index.html';
}
