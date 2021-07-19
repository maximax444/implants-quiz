document.addEventListener("DOMContentLoaded", function () {
    var d = document;

    // Снятие radio при выборе checkbox
    d.querySelectorAll("input[type=checkbox]").forEach((btn, btnIndex) => {
        btn.addEventListener("click", event => {
            d.querySelector("input[type=radio]").checked = false;
        });
    });

    // подсказки
    d.querySelectorAll(".quiz__info").forEach((btn, btnIndex) => {
        btn.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
        });
    });
    if (window.innerWidth >= 992) {
        d.querySelectorAll(".quiz__btn-prev").forEach((btn, btnIndex) => {
            btn.innerHTML = 'Назад';
        });
    }
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
            if (btnIndex == 5) {
                d.querySelector(".quiz-top").classList.add('hide');
            }
            quizQuestNumber.innerHTML = btnIndex + 2;
            quizFieldset[btnIndex].classList.remove('active');
            quizFieldset[btnIndex + 1].classList.add('active');
            lineProcenter();
        });
    });

    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            console.log(template);
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }
    maskPhone('input[type=tel]');
    //Переключение шага при выборе ответа
    quizFieldset.forEach((fieldset, fieldsetIndex) => {
        let fieldsetLabels = fieldset.querySelectorAll('label');
        quizCountQuest++;

        fieldsetLabels.forEach((label) => {
            if ((label.querySelector('input[type=radio]')) && (fieldsetIndex != 6)) {
                console.log(fieldsetIndex);
                label.addEventListener("click", event => {
                    if (fieldsetIndex == 5) {
                        d.querySelector(".quiz-top").classList.add('hide');
                    }
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