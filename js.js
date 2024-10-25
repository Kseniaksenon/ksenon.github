


document.addEventListener("DOMContentLoaded", ready);
 
function ready(event) {
    alert("DOMContentLoaded");
    alert(`Изображение: ${image.offsetWidth}x${image.offsetHeight}`);
}

setTimeout(function() {
    alert("Прошло 5 секунд после загрузки страницы.");
}, 5000);

const image = document.querySelector("img");
image.addEventListener("click", function() {
    image.remove();
});


document.addEventListener("DOMContentLoaded", function() {
    const paragraph = document.querySelector("p");

    paragraph.addEventListener("click", function() {
        paragraph.style.color = "red";
        paragraph.style.backgroundColor = "gray";
        paragraph.style.fontWeight = "bold";
        paragraph.style.fontFamily = "Verdana, sans-serif";
        paragraph.style.fontSize = "20px";
        paragraph.style.border = "1px solid green";
    });
});


const computerName = window.location.hostname;
alert(`Имя компьютера: ${computerName}`
,4000);





document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".container-2");
    const loginInput = document.querySelector(".inp-1[name='login']");
    const passwordInput = document.querySelector(".inp-1[name='password']");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Отменяем отправку формы

        // Проверка на обязательное заполнение полей
        if (!loginInput.value.trim() || !passwordInput.value.trim()) {
            alert("Заполните оба поля!");
            return;
        }

        // Проверка на длину пароля (пример: минимальная длина 6 символов)
        const minLength = 6;
        const maxLength = 10;

        if (passwordInput.value.length < minLength) {
            alert(`Пароль должен содержать не менее ${minLength} символов.`);
            return;
        }
        if (passwordInput.value.length > maxLength) {
            alert(`Пароль должен содержать не более ${maxLength} символов.`);
            return;
        }

        // Дополнительные проверки формата данных можно добавить здесь

        // Если все проверки пройдены, можно отправить форму
        loginForm.submit();
    });
    
});

document.querySelector(".inp-1[name='login']").addEventListener('input', function() {
    // Удаляем все символы, кроме кириллицы, пробелов и дефисов
    this.value = this.value.replace(/[^А-Яа-яЁё -]/g, '');

    // Убираем пробелы и дефисы в начале и конце значения
    this.value = this.value.trim();

    // Приводим первую букву к верхнему регистру, остальные к нижнему
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
});




function isDOMLoaded(){
    return document.readyState == 'complete';
   }