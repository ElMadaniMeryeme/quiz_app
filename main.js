//Select Elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");

//Set Options
let currentIndex = 0;
let rightAnswers = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let questionsCount = questionsObject.length;
            console.log(questionsObject);
            console.log(questionsCount);

            //Create Bullets + Set Questions Count
            createBullets(questionsCount);

            //Add Question Data
            addQuestionData(questionsObject[currentIndex], questionsCount);
            
            //Click on submit
            submitButton.onnclick = () => {
                //GetRight Answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;
                console.log(theRightAnswer);

                //Increase Index
                currentIndex++;

                //Check The Answer 
                checkAnswer(theRightAnswer, questionsCunt);
            }
        }
    };

    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num){
    countSpan.innerHTML = num;

    //Create spans
    for(let i = 0; i < num; i++){
        //Create the bullet
        let theBullet = document.createElement("span");

        //Check if its the first span
        if(i === 0){
            theBullet.className = "on";
        }

        //Append Bullets To Main Bullet Container
        bulletsSpanContainer.appendChild(theBullet);
    }
}

function addQuestionData(obj, count) {
    //Create H2 Question 
    let questionTitle = document.createElement("h2");

    //Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    //Append Text to H2
    questionTitle.appendChild(questionText);

    //Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    //Create The Answers
    for(let i = 0; i < 4; i++) {
        //Create Main Answer Di
        let mainDiv = document.createElement("div");

        //Add Class To Main Div
        mainDiv.className = "answer";

        //Create Radio Input
        let radioInput = document.createElement("input");

        //Add Type + Name + Id + Data-Attribute
        radioInput = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i+1}`;
        radioInput.dataset.answer = obj[`answer_${i+1}`] || {};

        //Make First Option Checked
        if(i === 0) {
            radioInput.checked = true;
        }

        //Create Label
        let theLabel = document.createElement("label");

        //Add For Attribute
        theLabel.htmlFor = `answer_${i+1}`;

        //Create Label Text
        let theLabelText = document.createTextNode(obj[`answer_${i+1}`]);

        //Add The Text To Label
        theLabel.appendChild(theLabelText);

        //Add Input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);

        //Append All Divs To Answers Area
        answersArea.appendChild(mainDiv);

    }
}

function checkAnswer(rAnswer, count) {
    console.log(rAnswer);
    console.log(count);

    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for(let i = 0; i < answers.length; i++){
        if(answers[i].checked){
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }

    console.log(`Right Answer is : ${rAnswer}`);
    console.log(`Choosen Answer is : ${theChoosenAnswer}`);

    if(rAnswer === theChoosenAnswer){
        rightAnswers++;
        console.log(`Good Answer`);
    }
}