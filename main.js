function writer(_text, _writingSpeed, _pauseFull, _pauseEmpty, _blinkingSpeed) {
    const text = _text;
    const writingSpeed = _writingSpeed;
    const pauseFull = _pauseFull;
    const pauseEmpty = _pauseEmpty;
    const blinkingSpeed = _blinkingSpeed
    const tag = document.querySelector('.title__writer');
    const line = document.querySelector('.title_line');
    let counterWrite = 0;
    let state = 'write';
    let isBlinking = false;
    function loop() {
        if (state == "write") {
            tag.textContent += text[counterWrite];
            counterWrite++;
            if (counterWrite < text.length) {
                isBlinking = false;
                setTimeout(loop, writingSpeed * 1000);
            } else {
                state = "back";
                isBlinking = true;
                setTimeout(loop, pauseFull * 1000);
            }
        } else {
            tag.textContent = tag.textContent.slice(0, -1);
            counterWrite--;
            if (counterWrite > 0) {
                isBlinking = false;
                setTimeout(loop, writingSpeed * 1000);
            } else {
                state = "write";
                isBlinking = true;
                setTimeout(loop, pauseEmpty * 1000);
            }
        }
    }
    loop();
    let isVisible = true;
    setInterval(() => {
        if (isBlinking) {
            if (isVisible) {
                isVisible = false;
                line.style.visibility = 'hidden';
            } else {
                isVisible = true;
                line.style.visibility = 'visible';
            }
        } else {
            line.style.visibility = 'visible';
        }
    }, blinkingSpeed * 1000);
}
writer("patryk szewczyk", 0.2, 1.5, 1.5, 0.4);

function slider() {
    const items = document.querySelectorAll('.slider__item');
    const button = document.querySelector('.cards__button');
    setPositionInline();
    let i = 0;
    const changeDelay = 0.25;
    button.addEventListener('click', () => {
        if (i % 2) {
            slideRight(items[i], changeDelay);
        } else {
            slideLeft(items[i], changeDelay);
        }
        changeZindex(items[i], changeDelay);
        i++;
        if (i == items.length) {
            i = 0;
        }
    });
    function setPositionInline() {
        items.forEach((item, i) => {
            if (i % 2) {
                item.style.right = '15%';
            } else {
                item.style.left = '15%';
            }
        });
        let i = items.length;
        items.forEach(item => {
            item.style.zIndex = i--;
        });
    }
    function slideLeft(target, delay) {
        target.style.top = '10%';
        target.style.left = '120%';
        target.style.transitionDuration = changeDelay + 's';
        setTimeout(() => {
            target.style.top = '-2%';
            target.style.left = '0%';
            target.style.transitionDuration = changeDelay + 's';
            setTimeout(() => {
                target.style.top = '0%';
                target.style.left = '15%';
                target.style.transitionDuration = changeDelay + 's';
            }, delay * 1000);
        }, delay * 1000);
    }
    function slideRight(target, delay) {
        target.style.top = '10%';
        target.style.right = '120%';
        target.style.transitionDuration = changeDelay + 's';
        setTimeout(() => {
            target.style.top = '-2%';
            target.style.right = '0%';
            target.style.transitionDuration = changeDelay + 's';
            setTimeout(() => {
                target.style.top = '0%';
                target.style.right = '15%';
                target.style.transitionDuration = changeDelay + 's';
            }, delay * 1000);
        }, delay * 1000);
    }
    function changeZindex(target, delay) {
        setTimeout(() => {
            target.style.zIndex = 0;
            items.forEach(item => {
                if (!(item == target)) {
                    item.style.zIndex = Number(item.style.zIndex) + 1;
                }
            });
        }, delay * 1000);
    }
}
slider();

function rate(maxStars = 5) {
    const rates = document.querySelectorAll('.skill-item__rate');
    rates.forEach(rate => {
        for (let i = 0; i < rate.dataset.rate; i++) {
            const star = document.createElement('i');
            star.setAttribute('class', 'skill-item__star bi bi-star-fill');
            rate.appendChild(star);
        }
        if (rate.dataset.rate == maxStars) {
            return;
        }
        for (let i = rate.dataset.rate; i < maxStars; i++) {
            const star = document.createElement('i');
            star.setAttribute('class', 'skill-item__star bi bi-star');
            rate.appendChild(star);
        }
    });
}
rate();