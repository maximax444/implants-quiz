document.addEventListener("DOMContentLoaded", function () {
    var d = document;


    // подсказки
    d.querySelectorAll(".quiz__info").forEach((btn, btnIndex) => {
        btn.addEventListener("click", event => {
            event.preventDefault();
        });
    });
    // Quiz
    var quizForm = d.querySelector(".quiz"),
        quizFieldset = quizForm.querySelectorAll("fieldset"),
        btnPrev = d.querySelectorAll(".quiz__btn-prev"),
        btnNext = d.querySelectorAll(".quiz__btn-next"),
        quizQuestNumber = d.querySelector("#question-number"),
        quizQuestNumberCount = d.querySelector("#question-number-count"),
        quizBoxQuestion = d.querySelector(".quiz-box__question"),
        quizLine = d.querySelector('.quiz-box__motion-line'),
        quizCountQuest = 0;

    // Кнопка назад
    btnPrev.forEach((btn, btnIndex) => {
        btn.addEventListener("click", event => {
            event.preventDefault();

            quizQuestNumber.innerHTML = btnIndex + 1;
            quizFieldset[btnIndex + 1].classList.remove('active');
            quizFieldset[btnIndex].classList.add('active');
            lineProcenter();
        });
    });
    // Кнопка вперёд
    btnNext.forEach((btn, btnIndex) => {
        btn.addEventListener("click", event => {
            event.preventDefault();

            quizQuestNumber.innerHTML = btnIndex + 2;
            quizFieldset[btnIndex].classList.remove('active');
            quizFieldset[btnIndex + 1].classList.add('active');
            lineProcenter();
        });
    });

    //Переключение шага при выборе ответа
    quizFieldset.forEach((fieldset, fieldsetIndex) => {
        let fieldsetLabels = fieldset.querySelectorAll('label');
        quizCountQuest++;
        fieldsetLabels.forEach((label) => {
            if (label.querySelector('input[type=radio]')) {
                label.addEventListener("click", event => {

                    quizFieldset[fieldsetIndex].classList.remove('active');

                    quizFieldset[fieldsetIndex + 1].classList.add('active');
                    quizQuestNumber.innerHTML = fieldsetIndex + 2;
                    lineProcenter();
                });
            }

        });
    });

    // Функция обновления номера вопроса
    function quizData() {
        quizQuestNumberCount.innerHTML = quizCountQuest;
    }

    // Функция обновления процентной полосы
    function lineProcenter() {
        var quizQuestNumberForLine = d.querySelector("#question-number").innerHTML,
            lineProcent = quizQuestNumberForLine * (100 / quizCountQuest);

        quizLine.style.width = lineProcent + '%';
    }

    quizData()
    lineProcenter();

})