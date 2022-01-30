const startbtn = document.querySelector(".glow-on-hover")
const infobox = document.querySelector(".infobox")
const exitbtn = infobox.querySelector(".buttons .quit")
const continuebtn = infobox.querySelector(".buttons .restart")
const quizbox = document.querySelector(".quizbox")
const resultbox = document.querySelector(".resultbox")
const optlist = document.querySelector(".optlist")
// const timeline = document.querySelector("header .timeline")
const timeleft = document.querySelector(".timer .timeleft")
const timecount = document.querySelector(".timer .timersec")


startbtn.onclick = () => {
    infobox.classList.add("activeInfo");
}

exitbtn.onclick = () => {
    infobox.classList.remove("activeInfo");
}

continuebtn.onclick = () => {
  //  infobox.classList.remove("activeInfo"); 
    quizbox.classList.add("activeQuiz");
    showQuestions(0);
    quesCounter(1);
    startTimer(15);
    startTimeLine(0);
}

let timeValue = 15;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;


const restartQuiz = resultbox.querySelector(".buttons .restart");
const quitQuiz = resultbox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    quizbox.classList.add("activeQuiz");
    resultbox.classList.remove("activeResult");
    timeValue = 15;
    queCount = 0;
    queNumb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    quesCounter(queNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimeLine(widthValue);
    timeleft.textContent = "Time Left";
    nextbtn.classList.remove("show");
}

quitQuiz.onclick = () => {
    window.location.reload();
}

const nextbtn = document.querySelector("footer .nxtbtn");
const botQuescounter = document.querySelector("footer .totques");

nextbtn.onclick = () => {
    if( queCount < questions.length - 1)
    {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        quesCounter(queNumb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeleft.textContent = "Time Left";
        nextbtn.classList.remove("show");
    }
    else
    {
        clearInterval(counter);
        clearInterval(counterLine);    
        showResult();
    }
}

function showQuestions (index) {
    const questxt = document.querySelector(".questxt");

    let questag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let opttag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' + 
    '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
    '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
    '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    questxt.innerHTML = questag;
    optlist.innerHTML = opttag;

    const Option = optlist.querySelectorAll(".option");

    for(i=0; i < Option.length; i++)
    {
        Option[i].setAttribute ("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag= '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected (answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    const allOptions = optlist.children.length;

    if(userAns == correctAns)
    {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("correct Answer");
        console.log("Your correct Answers = " + userScore);
    }
    else
    {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("wrong Answer");

        for(i=0; i < allOptions; i++)
        {
            if(optlist.children[i].textContent == correctAns)
            {
                optlist.children[i].setAttribute("class", "option correct");
                optlist.children[i].insertAdjacentHTML("beforeend", tickIconTag);

                console.log("Auto selected Correct Answer");
            }
        }
    }
    for(i=0; i < allOptions; i++)
    {
        optlist.children[i].classList.add("disabled");
    }
    nextbtn.classList.add("show");
}

function showResult () {
   // infobox.classList.remove("activeInfo");
    quizbox.classList.remove("activeQuiz");
    resultbox.classList.add("activeResult");

    const scoreText = resultbox.querySelector(".scoretxt");
    if(userScore > 10) 
    {
        let scoreTag = '<span>and ✨ Congrats ✨...!😎🎉🥳, You got <p>' + '&nbsp;' + userScore + '&nbsp;' +'</p> out of <p>' + '&nbsp;' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 5)
    {
        let scoreTag = '<span>and ✨ Nice ✨...!🥳, You got <p>' + '&nbsp;' + userScore + '&nbsp;' +'</p> out of <p>' + '&nbsp;' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else
    {
        let scoreTag = '<span>and ✨ Sorry ✨...!😕, You got only <p>' + '&nbsp;' + userScore + '&nbsp;' +'</p> out of <p>' + '&nbsp;' + questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer (time) {
    counter = setInterval (timer, 1000);
    function timer() {
        timecount.textContent = time;
        time--;
        if (time < 9)
        {
            let addzero = timecount.textContent;
            timecount.textContent = "0" + addzero;
        }
        if (time < 0)
        {
            clearInterval(counter);
            timecount.textContent = "00";
            timeleft.textContent = "Time Off";
            nextbtn.classList.add("show");

            const allOptions = optlist.children.length;
            let correctAns = questions[queCount].answer;
            for(i=0; i < allOptions; i++)
            {
                if (optlist.children[i].textContent == correctAns)
                {
                    optlist.children[i].setAttribute("class", "option correct");
                    optlist.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                  //  console.log("Time Off : Auto Selected Correct Answer");
                }
            }
            for(i=0; i < allOptions; i++)
            {
                optlist.children[i].classList.add("disabled");
            } 

        }

        else
        {
            timeleft.textContent = "Time Left";
            nextbtn.classList.add("show");
        }
    }
}

/* function startTimeLine (time) {
    counterLine = setInterval(timer, 27);
    function timer () {
        time += 1;
        timeline.style.width = time + "px";
        if (time > 595)
        {
            clearInterval(counterLine);
        }
    }
} */



function quesCounter (index) {
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    botQuescounter.innerHTML = totalQueCountTag;
} 