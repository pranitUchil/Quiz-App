let questions;
let isQuestionEditing = false;
let selectedQuestionIndex = '';
let formsInputsIDs = ['question','option-1','option-2','option-3','option-4','correct-option'];

checkAdminLogin();

function getQuestions(){
    questions = JSON.parse(localStorage.getItem('QuizQuestions')) || [];
}
getQuestions();


function loadQuestionTable(){
    if(questions.length == 0){
        document.querySelector('#question-table-card').innerHTML =  '<h2>No Question Found</h2>'
        return
    }

    let questionTable = '';
    questions.forEach((element,i) => {
        questionTable += `
                    <tr>
                        <td><i class="fa-solid fa-eye" onclick="showQuizAnswer(${i})"></i></td>
                        <td><i class="fa-solid fa-trash" onclick="showDeleteQuestionModal(${i})"></i></td>
                        <td>${++i}</td>
                        <td>${element.question}</td>
                    </tr>
                `;

                document.getElementById('questions-table-row').innerHTML = questionTable;
    });
}

loadQuestionTable();

function openModalForAddQuestion(){
    emptyCreateQuestionModal();
    showModal('addQuestoinModal');
}

function saveQuestion(){
    if(!isFormValid(formsInputsIDs))
        return

    let options = ['option-1','option-2','option-3','option-4'];
    let optionsValue = [];
    options.forEach(element => {
        optionsValue.push(document.querySelector(`#${element}`).value.replace('<','&lt;').replace('>','&gt;'))
    });
    let obj = {
        "question": document.querySelector('#question').value,
        "options": optionsValue,
        "correct": document.querySelector(`#${document.querySelector('#correct-option').value}`).value
    }
    if(isQuestionEditing){
        questions[selectedQuestionIndex] = obj;
    }
    else{
        questions.push(obj)
    }

    localStorage.setItem('QuizQuestions',JSON.stringify(questions));
    isQuestionEditing = false
    getQuestions();
    loadQuestionTable();
    closeModal('addQuestoinModal');
    emptyCreateQuestionModal();
    showNotification('Record has been save successfully');
}

function showQuizAnswer(i){
    let data = questions[i];
    selectedQuestionIndex = i;
    console.log(data)
    isQuestionEditing = true;
    document.querySelector('#question').value = data.question;
    data.options.forEach((element,i) => {
        element = element.replace('&lt;','<').replace('&gt;','>')
        document.querySelector(`#option-${i+1}`).value = element;
        if(element == data.correct)
            document.querySelector('#correct-option').value = `option-${i+1}`;
    });
    showModal('addQuestoinModal');
}

function showDeleteQuestionModal(id){
    selectedQuestionIndex = id;
    showModal('questionDeleteConfirmModal');
}

function deleteQuestion(){
    questions.splice(selectedQuestionIndex, 1);
    localStorage.setItem('QuizQuestions',JSON.stringify(questions));
    getQuestions();
    loadQuestionTable();
    closeModal('questionDeleteConfirmModal');
    showNotification('Record has been delete successfully');
}

function emptyCreateQuestionModal(){
    formsInputsIDs.forEach(element => {
        document.querySelector(`#${element}`).value = '';
    });
}