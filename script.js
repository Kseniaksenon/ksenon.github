// Функция для работы с cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Функция для валидации email с использованием регулярного выражения
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Обработчик формы
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем отправку формы

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Проверка на пустые поля
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields");
        return;
    }

    // Проверка правильности email
    if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Вывод на страницу
    document.getElementById('output').innerHTML = `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Message:</strong> ${message}`;

    // Запись в cookie
    setCookie("name", name, 7);
    setCookie("email", email, 7);
    setCookie("message", message, 7);

    // Вывод данных из cookie
    const savedName = getCookie("name");
    const savedEmail = getCookie("email");
    const savedMessage = getCookie("message");
    console.log("Saved from cookies: ", savedName, savedEmail, savedMessage);

    // Вывод данных из cookie на экран
    document.getElementById('output').innerHTML += `<br><br><strong>Saved from cookies:</strong><br>Name: ${savedName}<br>Email: ${savedEmail}<br>Message: ${savedMessage}`;

    // Очистка cookie
    setTimeout(() => {
        eraseCookie("name");
        eraseCookie("email");
        eraseCookie("message");
        console.log("Cookies cleared.");
        document.getElementById('output').innerHTML += "<br><br><strong>Cookies have been cleared.</strong>";
    }, 5000);

    // Сохранение данных в формате JSON
    const formData = {
        name: name,
        email: email,
        message: message
    };

    const jsonData = JSON.stringify(formData);
    console.log("JSON Data:", jsonData);
});
