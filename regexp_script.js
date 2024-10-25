// Функция для запуска тестов регулярных выражений на основе пользовательского ввода
function runRegexTests() {
    const exampleText = document.getElementById('regexInput').value;

    if (!exampleText) {
        alert("Введите текст для проверки регулярных выражений.");
        return;
    }

    let output = "<h3>Результаты проверки регулярных выражений:</h3>";

    // a) Простое регулярное выражение для поиска слова "Привет" с флагом "g" (глобальный поиск)
    const regexGlobal = /Привет/g;
    const globalMatches = exampleText.match(regexGlobal);
    output += `<p>Использование флага 'g' (глобальный поиск): ${globalMatches ? globalMatches.join(", ") : "Совпадений не найдено"}</p>`;

    // b) Регулярное выражение с флагом "i" (регистр не имеет значения)
    const regexCaseInsensitive = /привет/i;
    const caseInsensitiveTest = regexCaseInsensitive.test(exampleText);
    output += `<p>Использование флага 'i' (регистр не имеет значения): ${caseInsensitiveTest ? "Совпадение найдено" : "Совпадений не найдено"}</p>`;

    // c) Регулярное выражение с флагом "m" (многострочный режим)
    const multilineText = exampleText;
    const regexMultiline = /^Привет/m;
    const multilineTest = regexMultiline.test(multilineText);
    output += `<p>Использование флага 'm' (многострочный режим): ${multilineTest ? "Совпадение найдено" : "Совпадений не найдено"}</p>`;

    // 2. Применение метода test() объекта RegExp
    const regexTest = /JavaScript/;
    const testResult = regexTest.test(exampleText);
    output += `<p>Использование метода test(): ${testResult ? "Совпадение найдено" : "Совпадений не найдено"}</p>`;

    // 3. Применение метода exec() объекта RegExp
    const regexExec = /Привет/;
    const execResult = regexExec.exec(exampleText);
    output += `<p>Использование метода exec(): ${execResult ? execResult[0] : "Совпадений не найдено"}</p>`;

    // 4. Методы объекта String

    // a) split(): Разделение строки по пробелам
    const words = exampleText.split(" ");
    output += `<p>Использование метода split(): ${words.join(", ")}</p>`;

    // b) match(): Поиск всех совпадений слова "Привет" с флагом "g"
    const matchExample = exampleText.match(/Привет/g);
    output += `<p>Использование метода match(): ${matchExample ? matchExample.join(", ") : "Совпадений не найдено"}</p>`;

    // c) search(): Поиск индекса первого совпадения
    const searchExample = exampleText.search(/JavaScript/);
    output += `<p>Использование метода search(): ${searchExample !== -1 ? `Найдено на позиции ${searchExample}` : "Совпадений не найдено"}</p>`;

    // d) replace(): Замена всех вхождений "Привет" на "Здравствуйте"
    const replaceExample = exampleText.replace(/Привет/g, "Здравствуйте");
    output += `<p>Использование метода replace(): ${replaceExample}</p>`;

    // e) replace() с использованием регулярного выражения и флага "i" (чтобы игнорировать регистр)
    const replaceCaseInsensitive = exampleText.replace(/привет/i, "Здравствуйте");
    output += `<p>Замена с использованием флага 'i': ${replaceCaseInsensitive}</p>`;

    document.getElementById('regexOutput').innerHTML = output;
}
