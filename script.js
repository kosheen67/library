//Burger menu
const menuToggle = document.getElementById('menuToggle'); //Кнопка бургера
const lines = document.querySelectorAll('.menu-toggle__line'); //Линии внутри бургера
const mainNav = document.getElementById('mainNav'); //Навигация со ссылками

function toggleBurger(button) {
    // Переключаем класс active
    const isActive = menuToggle.classList.toggle('active');
    console.log(lines)
    if (isActive) {
        // В крестик
        lines[0].style.transform = 'rotate(45deg) translate(6px, 10px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        // В бургер
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }

    return isActive; // Возвращаем новое состояние
}

menuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
    toggleBurger(menuToggle)
})


//Slider При нажатии на стрелки
const slides = document.querySelectorAll('.slide');
const previousSlideButton = document.getElementById('prevSlide');
const nextSlideButton = document.getElementById('nextSlide');
let currentIndex = 0;

const paginationButtons = document.querySelectorAll('.pagination-button');
console.log(paginationButtons)

// Функция для показа слайда по его номеру (индексу)
function showSlide(index) {
    console.log('Показываем слайд', index);

    slides.forEach(slide => {
        slide.classList.remove('active')
    })

    slides.forEach(slide => {
        slide.classList.add('visually-hidden');
    });

    slides[index].classList.remove('visually-hidden');
    slides[index].classList.add('active');
    currentIndex = index;

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
    let newIndex = currentIndex + 1;

    if (newIndex >= slides.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}

// Функция для показа предыдущей картинки
function prevSlide() {
    let newIndex = currentIndex - 1;
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


//Функция смены блоков с книгами по сезонам
const seasonRadios = document.querySelectorAll('input[name="season"]'); //Найти все радио-кнопки сезонов
const winterBooks = document.querySelector('.winter-books-list');
const springBooks = document.querySelector('.spring-books-list');
const summerBooks = document.querySelector('.summer-books-list');
const autumnBooks = document.querySelector('.autumn-books-list');


const radios = document.querySelectorAll('.seasons-input')


if (winterBooks) winterBooks.classList.remove('visually-hidden');

radios.forEach((radio) => {
    radio.addEventListener('change', function () {
        if (winterBooks) winterBooks.classList.add('visually-hidden');
        if (springBooks) springBooks.classList.add('visually-hidden');
        if (summerBooks) summerBooks.classList.add('visually-hidden');
        if (autumnBooks) summerBooks.classList.add('visually-hidden');

        if (this.value === 'winter') {
            winterBooks.classList.remove('visually-hidden');
        }

        if (this.value === 'spring') {
            springBooks.classList.remove('visually-hidden');
        }

        if (this.value === 'summer') {
            summerBooks.classList.remove('visually-hidden');
        }

        if (this.value === 'autumn') {
            autumnBooks.classList.remove('visually-hidden');
        }
    })
})
