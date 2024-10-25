// Функция для вывода информации о заголовке документа
function showTitle() {
    const title = document.title;
    console.log("Заголовок документа: " + title);
    alert("Заголовок документа: " + title);
}

// Запуск функции showTitle через 2 секунды после загрузки страницы
window.onload = function() {
    setTimeout(showTitle, 2000);
    showUserInfo();
    addEventListeners();
};

// Функция для создания и вставки нового элемента
function addBirthday() {
    const birthdayElement = document.createElement('div');
    birthdayElement.className = 'birthday';
    birthdayElement.textContent = 'Дата рождения: 29 ноября 2005 года';
    
    const nameElement = document.querySelector('.name');
    if (!document.querySelector('.birthday')) {
        nameElement.parentNode.insertBefore(birthdayElement, nameElement.nextSibling);
    }
}

// Обработчик события для щелчка по имени и кнопке
function addEventListeners() {
    const nameElement = document.querySelector('.name');
    const styleButton = document.getElementById('styleButton');
    nameElement.addEventListener('click', addBirthday);
    styleButton.addEventListener('click', applyStyles);
}

// Функция для применения стилей к элементу с именем
function applyStyles() {
    const nameElement = document.getElementById('name');
    nameElement.classList.add('styled');
}

// Функция для получения информации об ОС и браузере пользователя
function getUserInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    return `Платформа: ${platform}\nБраузер: ${userAgent}`;
}

// Функция для отображения информации в новом окне
function showUserInfo() {
    const userInfo = getUserInfo();
    const newWindow = window.open('', '', 'width=400,height=300');
    newWindow.document.write(`<pre>${userInfo}</pre>`);
    setTimeout(() => newWindow.close(), 5000);
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cnt-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const captchaInput = document.getElementById('captcha');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        // Удаляем предыдущие сообщения об ошибках
        removeErrorMessages();

        let isValid = true;

        // Проверка имени
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'Введите ваше имя');
        }

        // Проверка email
        if (!validateEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Введите корректный адрес email');
        }

        // Проверка сообщения
        if (messageInput.value.trim().length < 20 || messageInput.value.trim().length > 500) {
            isValid = false;
            showError(messageInput, 'Сообщение должно содержать от 20 до 500 символов');
        }

        // Проверка капчи
        if (captchaInput.value.trim() === '') {
            isValid = false;
            showError(captchaInput, 'Введите капчу');
        }

        if (isValid) {
            // Отправка формы (например, AJAX запрос или стандартная отправка)
            console.log('Форма отправлена');
            form.submit();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        input.parentNode.appendChild(errorMessage);
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((msg) => msg.remove());

        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach((input) => input.classList.remove('error'));
    }
});
