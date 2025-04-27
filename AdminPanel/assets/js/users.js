let users = JSON.parse(localStorage.getItem("UserList"));
let userTable = '';
let selectedUserID;

checkAdminLogin();

users.forEach(element => {
    userTable += `
        <tr>
            <td><i class="fa-solid fa-eye" onclick="showUserQuizTable(${element.ID})"></i></td>
            <td>${element.FullName}</td>
            <td>${element.Email}</td>
            <td>${element.ContactNo?element.ContactNo:''}</td>
            <td>${element.UserQuizs?element.UserQuizs.length:"Quiz not attended"}</td>
        </tr>
    `;

});
document.getElementById('user-table-row').innerHTML = userTable;

function showUserQuizTable(id){
    selectedUserID = id;
    document.getElementById('user-quizs').style.display = 'block';
    document.getElementById('user-table').style.display = 'none';

    users.forEach(element => {
        if(element.ID == id){
            let userQuizTable = '';
            element.UserQuizs.forEach((e,i)=> {
                // const t1 = new Date(e.StartDateTime);
                // const t2 = new Date(e.EndDateTime);

                // const diffInMs = t1 - t2; // Difference in milliseconds
                // const diffInMinutes = diffInMs / 1000 / 60;

                const start = new Date(e.StartDateTime);
                const end = new Date(e.EndDateTime);

                const diffMs = end - start; // difference in milliseconds

                const totalSeconds = Math.floor(diffMs / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;

                // Pad with zero if needed
                const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                userQuizTable += `
                    <tr>
                        <td><i class="fa-solid fa-eye" onclick="showQuizAnswer(${i})"></i></td>
                        <td>${++i}</td>
                        <td>${formatted}</td>
                        <td>${e.Score}</td>
                    </tr>
                `;

                document.getElementById('user-quiz-table-row').innerHTML = userQuizTable;
            })
        }
    });
}

function showUserTable(){
    document.getElementById('user-quizs').style.display = 'none';
    document.getElementById('user-table').style.display = 'block';
}

function showQuizAnswer(id){
    document.getElementById('user-quizs').style.display = 'none';
    document.getElementById('user-quizs-answer').style.display = 'block';

    users.forEach((user,i)=>{
        if(user.ID == selectedUserID){
            user.UserQuizs.forEach((quiz,i)=>{
                if(i == id){
                    console.log(quiz)
                    let html = ''
                    quiz.QuestionAndAnswer.forEach((qus,i)=>{
                        html += `<h2 class="quiz-question"> ${++i}) ${qus.question} </h3>`
                        const actual = qus.correct;
                        const userAnswer = qus.UserAnswer
                        let questionCorrectOrWrong = true;
                        if(qus.correct != qus.UserAnswer)
                            questionCorrectOrWrong = false
                        qus.options.forEach((op,i)=>{
                            const decoded = document.createElement('textarea');
                            const encoded = op;
                            decoded.innerHTML = encoded;
                            const decodedValue = decoded.value;
                            const isEqual = decodedValue === actual;
                            if(isEqual){
                                html += `
                                    <div class="option option-correct">
                                        ${++i}) ${op}
                                    </div>
                                `
                            }else{
                                if(!questionCorrectOrWrong){
                                    const decoded = document.createElement('textarea');
                                    const encoded = op;
                                    decoded.innerHTML = encoded;
                                    const decodedValue = decoded.value;
                                    const isEqual = decodedValue === userAnswer;
                                    if(isEqual){
                                        html += `
                                            <div class="option option-wrong">
                                                ${++i}) ${op}
                                            </div>
                                        `
                                    }
                                    else{
                                        html += `
                                            <div class="option">
                                                ${++i}) ${op}
                                            </div>
                                        `
                                    }
                                }
                                else{
                                    html += `
                                        <div class="option">
                                            ${++i}) ${op}
                                        </div>
                                    `
                                }
                            }
                        })
                    });

                    document.querySelector('#question-answer-container').innerHTML = html;
                }
            })
        }
    })
}

function backToQuizeTable(){
    document.getElementById('user-quizs').style.display = 'block';
    document.getElementById('user-quizs-answer').style.display = 'none';
}