
checkAdminLogin();

let users = JSON.parse(localStorage.getItem('UserList')) || [];
let quizQuestions = JSON.parse(localStorage.getItem('QuizQuestions')) || [];
let totalQuizs = 0;

users.forEach(element => {
    if(element.UserQuizs)
        totalQuizs = element.UserQuizs.length + totalQuizs
});

document.getElementById('total-users').innerHTML = `Total Users - ${users.length}`;
document.getElementById('total-quiz').innerHTML = `Total Quiz - ${totalQuizs}`;
document.getElementById('question').innerHTML = `Questions - ${quizQuestions.length}`;