function calculateExpression(a, b, c, x) {
    if (a < 0 && c !== 0) {
        var result = a * Math.pow(x, 2) + b * x + c;
        return result;
    } else if (a > 0 && c === 0) {
        if (x === 0) {
            alert("Деление на 0 недопустимо!");
            return null;
        } else {
            var result = -a / x - c;
            return result;
        }
    } else {
        if (c === 0) {
            alert("Деление на 0 недопустимо!");
            return null;
        } else if (a === 0) {
            alert("Коэффициент 'a' не может быть равен 0!");
            return null;
        } else {
            var result = a * (x + c);
            return result;
        }
    }
}

function calculate() {
    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    var x = parseFloat(document.getElementById("x").value);

    var result = calculateExpression(a, b, c, x);
    if (result !== null) {
        document.getElementById("result").innerText = "Результат вычисления: " + result;
    }
}