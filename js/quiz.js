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
    function counter(ms, className) {
        let m = 0;

        let intervalID = setInterval(function () {
            if (m == 99) {
                clearInterval(intervalID);
            }
            m = m + 1;
            if (document.querySelector(".quiz-last__done-progres .inner b")) {
                document.querySelector(".quiz-last__done-progres .inner b").innerHTML = m;
            }



        }, 40);
    }
    // Кнопка вперёд
    btnNext.forEach((btn, btnIndex) => {

        btn.addEventListener("click", event => {
            event.preventDefault();
            setTimeout(function () {
                if (btnIndex == 5) {
                    d.querySelector(".quiz-top").classList.add('hide');
                    d.querySelector(".quiz-last__prize-wrap").innerHTML = d.querySelector(".quiz-main6 input:checked").nextElementSibling.querySelector('picture').innerHTML;
                    d.querySelector(".quiz-last__prize-text span").innerHTML = d.querySelector(".quiz-main6 input:checked").nextElementSibling.nextElementSibling.querySelector('.quiz-wrap3__name').innerHTML;
                    d.querySelector(".quiz-last__done-progres").classList.add('active');
                    counter(49, '.quiz-last__done-progres .inner b');
                    setTimeout(function () {
                        d.querySelector(".quiz-last__done-progres .inner").innerHTML = '<img src="img/progres-ready.png" alt="">';
                        d.querySelector(".quiz-last__done span").classList.add('active');
                    }, 5000);
                    setTimeout(function () {
                        d.querySelector(".quiz-last__img").classList.add('active');
                    }, 1500);

                }

                quizFieldset[btnIndex].classList.add('tryHide');
                if (quizFieldset[btnIndex + 2]) {
                    quizFieldset[btnIndex + 2].classList.add('tryHide');
                }

                setTimeout(function () {
                    quizFieldset[btnIndex].classList.remove('tryHide');
                    setTimeout(function () {
                        if (quizFieldset[btnIndex + 2]) {
                            quizFieldset[btnIndex + 2].classList.remove('tryHide');
                        }

                    }, 800);
                    quizFieldset[btnIndex].classList.remove('active');

                    quizFieldset[btnIndex + 1].classList.add('active');
                    quizQuestNumber.innerHTML = btnIndex + 2;
                    lineProcenter();
                }, 500);

            }, 500);
        });
    });


    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");

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

                label.addEventListener("click", event => {
                    setTimeout(function () {
                        if (fieldsetIndex == 5) {
                            d.querySelector(".quiz-top").classList.add('hide');

                            d.querySelector(".quiz-last__prize-wrap").innerHTML = d.querySelector(".quiz-main6 input:checked").nextElementSibling.querySelector('picture').innerHTML;
                            d.querySelector(".quiz-last__prize-text span").innerHTML = d.querySelector(".quiz-main6 input:checked").nextElementSibling.nextElementSibling.querySelector('.quiz-wrap3__name').innerHTML;
                            d.querySelector(".quiz-last__done-progres").classList.add('active');
                            counter(49, '.quiz-last__done-progres .inner b');
                            setTimeout(function () {
                                d.querySelector(".quiz-last__done-progres .inner").innerHTML = '<img src="img/progres-ready.png" alt="">';
                                d.querySelector(".quiz-last__done span").classList.add('active');
                            }, 5000);
                            setTimeout(function () {
                                d.querySelector(".quiz-last__img").classList.add('active');
                            }, 1500);
                        }
                        quizFieldset[fieldsetIndex].classList.add('tryHide');
                        if (quizFieldset[fieldsetIndex + 2]) {
                            quizFieldset[fieldsetIndex + 2].classList.add('tryHide');
                        }

                        setTimeout(function () {
                            quizFieldset[fieldsetIndex].classList.remove('tryHide');
                            setTimeout(function () {
                                if (quizFieldset[fieldsetIndex + 2]) {
                                    quizFieldset[fieldsetIndex + 2].classList.remove('tryHide');
                                }

                            }, 800);
                            quizFieldset[fieldsetIndex].classList.remove('active');

                            quizFieldset[fieldsetIndex + 1].classList.add('active');
                            quizQuestNumber.innerHTML = fieldsetIndex + 2;
                            lineProcenter();
                        }, 500);
                    }, 500);

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