//🔥🎉
//Profile menu
const modal = document.querySelector('.modal-profile');
const modalClose = document.querySelector('.modal-profile__close');
const registerMenuOpen = document.querySelector('.registerOpenButton');
const logInMenuOpen = document.querySelector('.profile-list-item:nth-child(2)');

// Закрытие основного меню профиля
if (modalClose) {
    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}

//🔥🎉
//Register Menu
const registerClose = document.querySelector('.register-close-button');
const registerModal = document.querySelector('.modal-register');

// НОВАЯ КНОПКА: Sign up (get-a-card-sign-up)
const signUpCardButton = document.querySelector('.get-a-card-sign-up');
if (signUpCardButton && registerModal) {
    signUpCardButton.addEventListener('click', function (e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
}

if (registerMenuOpen) {
    registerMenuOpen.addEventListener('click', function () {
        registerModal.style.display = 'block';
    });
}
if (registerClose) {
    registerClose.addEventListener('click', function () {
        registerModal.style.display = 'none';
    });
}

//🔥🎉
//Log In Menu
const loginClose = document.querySelector('.modal-login__close');
const modalLogin = document.querySelector('.modal-login');

if (logInMenuOpen) {
    logInMenuOpen.addEventListener('click', function () {
        modalLogin.style.display = 'block';
    });
}
if (loginClose) {
    loginClose.addEventListener('click', function () {
        modalLogin.style.display = 'none';
    });
}

//🔥🎉
// Регистрация пользователя
const registerForm = document.querySelector('.register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.querySelector('.register-form-name').value.trim();
        const lastName = document.querySelector('.register-form-surname').value.trim();
        const email = document.querySelector('.register-form-email').value.trim();
        const password = document.querySelector('.register-form-password').value.trim();

        if (!firstName || !lastName || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };

        localStorage.setItem('user', JSON.stringify(userData));
        alert('You have successfully registered!');

        // Обновляем иконку и скрываем форму
        updateProfileIcon();
        registerModal.style.display = 'none';
    });
}


//🔥🎉
// Вход (Log In)
const loginForm = document.querySelector('.login-form');
const profileCabinetModal = document.querySelector('.modal-profile-cabinet');
const cabinetCloseButton = document.querySelector('.profile-cabinet-close');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.querySelector('.login-form-email').value.trim();
        const password = document.querySelector('.login-form-password').value;
        const savedUserJSON = localStorage.getItem('user');

        if (!savedUserJSON) {
            alert('No account found. Please register first.');
            return;
        }

        const user = JSON.parse(savedUserJSON);
        if (user.email === email && user.password === password) {
            user.visits = (user.visits || 0) + 1;
            if (!user.cardNumber) {
                user.cardNumber = 'F' + String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
            }
            localStorage.setItem('user', JSON.stringify(user));

            modalLogin.style.display = 'none';
            fillAndShowCabinet(user);
        } else {
            alert('Incorrect email or password.');
        }
    });
}

//🔥
// Открытие модального окна входа по кнопке "Log in"
const logInCardButton = document.querySelector('.get-a-card-log-in');
if (logInCardButton && modalLogin) {
    logInCardButton.addEventListener('click', function (event) {
        event.preventDefault();
        modalLogin.style.display = 'block';
    })
}

//🔥 Закрытие кабинета
if (cabinetCloseButton) {
    cabinetCloseButton.addEventListener('click', function () {
        profileCabinetModal.style.display = 'none';
    });
}

//🔥🎉
// Функция: открыть и заполнить кабинет
function fillAndShowCabinet(user) {
    document.querySelector('.cabinet-initials-text').textContent =
        (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();

    document.querySelector('.cabinet-initials-full').textContent =
        user.firstName + ' ' + user.lastName;

    const statsNumbers = document.querySelectorAll('.stats-content-number');
    if (statsNumbers[0]) {
        statsNumbers[0].textContent = user.visits || 0;
    }

    document.querySelector('.card-number-id').textContent = user.cardNumber || '—';
    profileCabinetModal.style.display = 'block';
}

//🔥🎉
// Смена иконки + универсальный клик по профилю
function updateProfileIcon() {
    const profileTrigger = document.querySelector('.profile-trigger');
    if (!profileTrigger) return;

    const savedUser = localStorage.getItem('user');

    if (savedUser) {
        const user = JSON.parse(savedUser);
        const initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
        profileTrigger.innerHTML = `<div class="profile-initials">${initials}</div>`;
    } else {
        profileTrigger.innerHTML = `
      <svg class='icon-profile' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM18.6667 7.77778C18.6667 10.3551 16.5774 12.4444 14.0001 12.4444C11.4227 12.4444 9.33339 10.3551 9.33339 7.77778C9.33339 5.20045 11.4227 3.11111 14.0001 3.11111C16.5774 3.11111 18.6667 5.20045 18.6667 7.77778ZM19.4998 16.2781C20.9584 17.7367 21.7778 19.715 21.7778 21.7778H14L6.22225 21.7778C6.22225 19.715 7.0417 17.7367 8.50031 16.2781C9.95893 14.8194 11.9372 14 14 14C16.0628 14 18.0411 14.8194 19.4998 16.2781Z"
          fill="white" />
      </svg>
    `;
    }

    // 🔥 ВЕШАЕМ ОБРАБОТЧИК НА САМ КОНТЕЙНЕР — он никогда не удаляется
    profileTrigger.onclick = function () {
        const userJSON = localStorage.getItem('user');
        if (userJSON) {
            fillAndShowCabinet(JSON.parse(userJSON));
        } else {
            if (modal) modal.style.display = 'block';
        }
    };
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', function () {
    updateProfileIcon();
});

// Остальной код (бургер, слайдер, сезоны) — без изменений
// 🔥🎉 Burger menu
const menuToggle = document.getElementById('menuToggle');
const lines = document.querySelectorAll('.menu-toggle__line');
const mainNav = document.getElementById('mainNav');

function toggleBurger() {
    const isActive = menuToggle.classList.toggle('active');
    if (isActive) {
        lines[0].style.transform = 'rotate(45deg) translate(6px, 10px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        toggleBurger();
    });
}

// 🔥🎉 Slider
const slides = document.querySelectorAll('.slide');
const previousSlideButton = document.getElementById('prevSlide');
const nextSlideButton = document.getElementById('nextSlide');
let currentIndex1 = 0;
const paginationButtons = document.querySelectorAll('.pagination-button');

console.log(paginationButtons)

// Функция для показа слайда по его номеру (индексу)
function showSlide(index) {
    console.log('Показываем слайд', index);

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    slides.forEach(slide => {
        slide.classList.add('visually-hidden');
    });


    slides[index].classList.remove('visually-hidden');
    slides[index].classList.add('active');
    currentIndex1 = index;

    updatePagination(index);
}

//Функция с кликом по пагинации
//Функция для обновления вида пагинации, смена класса 
function updatePagination(activeIndex) {
    paginationButtons.forEach((button) => {
        button.classList.remove('current');
    });
    paginationButtons[activeIndex].classList.add('current');
}

//Функция для изменения картинки по клику на пагинацию
function goToSlideOnPaginationClick(index) {
    showSlide(index);
}

//Функция с кликом по стрелкам
// Функция для показа следующей картинки
function nextSlide() {
    let newIndex = currentIndex1 + 1;

    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

// Функция для показа предыдущей картинки
function prevSlide() {
    let newIndex = currentIndex1 - 1;
    if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    showSlide(newIndex)
}

previousSlideButton.addEventListener('click', prevSlide);
nextSlideButton.addEventListener('click', nextSlide);

paginationButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        goToSlideOnPaginationClick(index);
    });
});


//🔥🎉
//Функция переключения анимации по сезонам: затухание и появление и клик по инпуту
document.addEventListener('DOMContentLoaded', function () {
    const winterBooks = document.querySelector('.winter-books-list');
    const springBooks = document.querySelector('.spring-books-list');
    const summerBooks = document.querySelector('.summer-books-list');
    const autumnBooks = document.querySelector('.autumn-books-list');
    const radios = document.querySelectorAll('.seasons-input');

    // Если не все элементы найдены — выходим
    if (!winterBooks || !springBooks || !summerBooks || !autumnBooks || radios.length === 0) {
        return;
    }

    const seasons = [
        { element: winterBooks, value: 'winter' },
        { element: springBooks, value: 'spring' },
        { element: summerBooks, value: 'summer' },
        { element: autumnBooks, value: 'autumn' }
    ];

    let currentIndex = 0;
    let autoSwitchActive = true;

    // ✅ Исправленная функция: сбрасывает opacity
    function showSeason(index) {
        seasons.forEach((s, i) => {
            if (i === index) {
                s.element.classList.add('active-season');
                // 🔥 Сбрасываем инлайн-стиль, чтобы CSS снова работал
                s.element.style.opacity = '';
            } else {
                s.element.classList.remove('active-season');
            }
        });
        currentIndex = index;
    }

    function autoSwitchSeason() {
        if (!autoSwitchActive) return;
        const nextIndex = (currentIndex + 1) % seasons.length;
        autoSwitchActive = false;

        // Затухание текущего
        seasons[currentIndex].element.style.opacity = '0';

        setTimeout(() => {
            showSeason(nextIndex);
            autoSwitchActive = true;
            setTimeout(autoSwitchSeason, 3000);
        }, 500);
    }

    setTimeout(() => {
        if (autoSwitchActive) autoSwitchSeason();
    }, 3000);

    // Обработка ручного выбора
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            autoSwitchActive = false;
            const index = seasons.findIndex(s => s.value === radio.value);
            if (index !== -1) {
                seasons[currentIndex].element.style.opacity = '0';
                setTimeout(() => {
                    showSeason(index);
                }, 200);
            }
        });
    });
});


// Для отладки
localStorage.clear()