let userData = JSON.parse(localStorage.getItem('LoginUserData'));
// const quizQuestionsSets  = [
//     {
//       question: "What does HTML stand for?",
//       options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Markup Language"],
//       correct: "Hyper Text Markup Language"
//     },
//     {
//       question: "Which HTML tag is used to define an internal style sheet?",
//       options: ["&lt;style&gt;", "&lt;script&gt;", "&lt;css&gt;", "&lt;link&gt;"],
//       correct: "&lt;style&gt;"
//     },
//     {
//       question: "What is the correct syntax for referring to an external script called 'app.js'?",
//       options: ["&lt;script src='app.js'&gt;", "&lt;script href='app.js'&gt;", "&lt;script ref='app.js'&gt;", "&lt;script name='app.js'&gt;"],
//       correct: "&lt;script src='app.js'&gt;"
//     },
//     {
//       question: "Which property is used to change the background color in CSS?",
//       options: ["color", "bgcolor", "background-color", "background"],
//       correct: "background-color"
//     },
//     {
//       question: "How do you write 'Hello World' in an alert box in JavaScript?",
//       options: ["alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');"],
//       correct: "alert('Hello World');"
//     },
//     {
//       question: "Which HTML element is used to specify a footer for a document or section?",
//       options: ["&lt;bottom&gt;", "&lt;footer&gt;", "&lt;section&gt;", "&lt;aside&gt;"],
//       correct: "&lt;footer&gt;"
//     },
//     {
//       question: "How do you center an element using CSS?",
//       options: ["margin: auto;", "text-align: center;", "both A and B", "align: center;"],
//       correct: "both 1 and 2"
//     },
//     {
//       question: "How do you create a function in JavaScript?",
//       options: ["function = myFunc()", "function:myFunc()", "function myFunc()", "create myFunc()"],
//       correct: "function myFunc()"
//     },
//     {
//       question: "Which tag is used to create a hyperlink in HTML?",
//       options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;hyperlink&gt;"],
//       correct: "&lt;a&gt;"
//     },
//     {
//       question: "Which CSS property controls the text size?",
//       options: ["text-size", "font-style", "font-size", "text-style"],
//       correct: "font-size"
//     },
//     {
//       question: "How do you add a comment in JavaScript?",
//       options: ["&lt;!-- This is a comment --&gt;", "// This is a comment", "/* This is a comment */", "Both B and C"],
//       correct: "Both 2 and 3"
//     },
//     {
//       question: "Which HTML attribute is used to define inline styles?",
//       options: ["class", "style", "font", "styles"],
//       correct: "style"
//     },
//     {
//       question: "What does CSS stand for?",
//       options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
//       correct: "Cascading Style Sheets"
//     },
//     {
//       question: "How do you select an element with id 'demo' in CSS?",
//       options: ["#demo", ".demo", "*demo", "demo"],
//       correct: "#demo"
//     },
//     {
//       question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n&lt;p id='demo'&gt;This is a demo&lt;/p&gt;",
//       options: [
//         "document.getElementByName('demo').innerHTML = 'Hello';",
//         "document.getElement('demo').innerHTML = 'Hello';",
//         "document.getElementById('demo').innerHTML = 'Hello';",
//         "#demo.innerHTML = 'Hello';"
//       ],
//       correct: "document.getElementById('demo').innerHTML = 'Hello';"
//     },
//     {
//       question: "Which tag is used to display a picture in a web page?",
//       options: ["&lt;image&gt;", "&lt;pic&gt;", "&lt;img&gt;", "&lt;src&gt;"],
//       correct: "&lt;img&gt;"
//     },
//     {
//       question: "What does '===' mean in JavaScript?",
//       options: ["Assign value", "Compare value and type", "Compare only type", "Compare only value"],
//       correct: "Compare value and type"
//     },
//     {
//       question: "How can you make a numbered list in HTML?",
//       options: ["&lt;ul&gt;", "&lt;ol&gt;", "&lt;li&gt;", "&lt;list&gt;"],
//       correct: "&lt;ol&gt;"
//     },
//     {
//       question: "Which CSS property is used to change the text color?",
//       options: ["fgcolor", "text-color", "color", "font-color"],
//       correct: "color"
//     },
//     {
//       question: "How do you declare a JavaScript variable?",
//       options: ["v carName;", "variable carName;", "var carName;", "declare carName;"],
//       correct: "var carName;"
//     }
//   ];

const quizQuestionsSets  = JSON.parse(localStorage.getItem('QuizQuestions')) || [];
let quizQuestions = [];
let currentQuestionIndex;
let quizStartDateTime;
  
if(!userData){
    window.location.href = 'login.html';
}
document.querySelector('#fullname').value = userData.FullName;
document.querySelector('#email').value = userData.Email;

if(userData.ContactNo)
    document.querySelector('#contact-no').value = userData.ContactNo;

function give10ramdomQuestions(){
    let randomQuestions = [];
    while(randomQuestions.length < 10){
        let randomIndex = Math.floor(Math.random() * quizQuestionsSets.length);
        let question = quizQuestionsSets[randomIndex];
        if(!randomQuestions.includes(question)){
            randomQuestions.push(question);
        }
    }
    return randomQuestions;
}

document.getElementById("start-quiz-form").addEventListener("submit", function (e) {
    e.preventDefault(); // ✅ Stop form from submitting and showing values in URL
    quizStartDateTime = new Date();
    let formsInputsID = ['fullname','email','contact-no'];
    if(!isFormValid(formsInputsID))
        return
    let users = JSON.parse(localStorage.getItem('UserList'));

    users.forEach(element => {
        if(element.ID == userData.ID){
            element.ContactNo = document.querySelector('#contact-no').value;
            localStorage.setItem('LoginUserData', JSON.stringify(element));
            userData = element;
        }
    });
    localStorage.setItem('UserList', JSON.stringify(users));
    quizQuestions = give10ramdomQuestions();
    document.querySelector('.quiz-start-container').style.display = 'none';
    document.querySelector('.quiz-question-container').style.display = 'block';
  

    loadQuestion('Next')
})

function loadQuestion(forWhat){
    if(forWhat == 'Next'){
        if(currentQuestionIndex != undefined){
          const selected = document.querySelector('input[name="option"]:checked');
          if (selected) {
              quizQuestions[currentQuestionIndex].UserAnswer = selected.value;
          } else {
            alert("Please select an option.");
            return;
          }
          currentQuestionIndex++;
        }
      }
    else if(forWhat == 'Previous'){
      if(currentQuestionIndex == 0)
        return;
      currentQuestionIndex--;
      setTimeout(() => {
        question.options.forEach((element,i) => {
          if(element == question.UserAnswer){
              document.querySelector(`#option-${++i}`).checked = true;
              console.log(`User Answer: ${++i} ${question.UserAnswer}`);
          }
        });
      }, 500);
    }

    if(currentQuestionIndex == undefined)
      currentQuestionIndex = 0;

    let question = quizQuestions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;

    document.querySelector('.progress-bar').style.width = `${(currentQuestionIndex)}0%`;

    if(currentQuestionIndex == 10){
      document.querySelector('.quiz-question-container').style.display = 'none';
      document.querySelector('.quiz-resulte-container').style.display = 'block';
      calcunateResult();
      return;
    }

    if(currentQuestionIndex == 8)
        document.querySelector('.question-number').innerHTML = `Last 2 Question Left`;    
    else if(currentQuestionIndex == 9)
        document.querySelector('.question-number').innerHTML = `Hey this is the Last Question`;
    else
        document.querySelector('.question-number').innerHTML = `Question ${questionNumber} of 10`;

    let options = '';
    document.querySelector('.question').innerHTML = `${questionNumber}. ${question.question}`;
    question.options.forEach((element,i) => {
        options += `
            <div class="option-group">
                <span>${++i}. </span>
                <input type="radio" name="option" id="option-${i}" value="${element}">
                <label for="option-${i}">${element}</label>
            </div>
        `; 
    });

    document.querySelector('.quesetion-options').innerHTML = options;
}

function calcunateResult(){
    let correctAnswers = 0;
    quizQuestions.forEach(element => {
        if(element.UserAnswer == element.correct){
          correctAnswers = correctAnswers + 10;
        }
    });
    
    let users = JSON.parse(localStorage.getItem('UserList'));

    users.forEach(element => {
        if(element.ID == userData.ID){
            element.LastQuizScore = correctAnswers;
            if(!element.UserQuizs)
              element.UserQuizs = [];

            element.UserQuizs.push({
              QuestionAndAnswer:quizQuestions,
              StartDateTime : quizStartDateTime,
              EndDateTime : new Date(),
              Score:correctAnswers
            })
            localStorage.setItem('LoginUserData', JSON.stringify(element));
            userData = element;
        }
    });

    localStorage.setItem('UserList', JSON.stringify(users));

    if(users.length == 1){
       document.getElementsByClassName('rank-2')[0].style.display = 'none';
       document.getElementsByClassName('rank-3')[0].style.display = 'none';

       document.getElementById('rank-1-name').innerText = userData.FullName;
       document.getElementById('rank-1-score').innerText = userData.LastQuizScore;

        document.querySelector('.resulte-title').innerText = 'Wow You Rank 1st';
    }
    else if(users.length == 2){
        document.getElementsByClassName('rank-3')[0].style.display = 'none';

        let user1 = users[0];
        let user2 = users[1];

        if(user1.LastQuizScore > user2.LastQuizScore){
            document.getElementById('rank-1-name').innerText = user1.FullName;
            document.getElementById('rank-1-score').innerText = user1.LastQuizScore;

            document.getElementById('rank-2-name').innerText = user2.FullName;
            document.getElementById('rank-2-score').innerText = user2.LastQuizScore;


        }else{
            document.getElementById('rank-1-name').innerText = user2.FullName;
            document.getElementById('rank-1-score').innerText = user2.LastQuizScore;

            document.getElementById('rank-2-name').innerText = user1.FullName;
            document.getElementById('rank-2-score').innerText = user1.LastQuizScore;
        }
        rankOftheUser(users);
    }
    else if(users.length > 2){
        let sortedUsers = users.sort((a, b) => b.LastQuizScore - a.LastQuizScore);
        document.getElementById('rank-1-name').innerText = sortedUsers[0].FullName;
        document.getElementById('rank-1-score').innerText = sortedUsers[0].LastQuizScore;

        document.getElementById('rank-2-name').innerText = sortedUsers[1].FullName;
        document.getElementById('rank-2-score').innerText = sortedUsers[1].LastQuizScore;

        document.getElementById('rank-3-name').innerText = sortedUsers[2].FullName;
        document.getElementById('rank-3-score').innerText = sortedUsers[2].LastQuizScore;

        loadTable(sortedUsers);
        rankOftheUser(users);
    }
}

function rankOftheUser(users){
  let sortedUsers = users.sort((a, b) => b.LastQuizScore - a.LastQuizScore);
  sortedUsers.forEach((element, i) => {
    if(element.ID == userData.ID){
      document.querySelector('.resulte-title').innerText = `Wow You Rank ${++i}nd`;
    }
  })
}

function loadTable(users){
    let tableBody = document.querySelector('.other-ranks');
    let rows = '';
    users.forEach((element, i) => {
      if(i > 2){
        rows += `
          <div class="card">
              <div class="rank-body">
                  <div class="rank">
                      <h2>#${i+1}</h2>
                      <label for="">${element.FullName}</label>
                  </div>
                  <h2 class="rank-score">${element.LastQuizScore}</h2>
              </div>
          </div>
        `;
      }
    });
    tableBody.innerHTML = rows;
}
