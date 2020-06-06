const { commission } = require('./commission');

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const TEN_DAYS_MILLISECONDS = MILLISECONDS_IN_DAY * 10;
const FIVE_DAYS_MILLISECONDS = MILLISECONDS_IN_DAY * 5;
const SECOND = 1000;
function test(text, milliseconds, res) {
    let flyDate = Date.now() + milliseconds;
    if (commission(flyDate) === res) {
        console.log(text, 'Успех');
    } else {
        console.log(text, 'Ошибка');
    }
}

test('Граница 10 дней', TEN_DAYS_MILLISECONDS, 0);
test('Пограничное значение для 10 (+1)', TEN_DAYS_MILLISECONDS + SECOND, 0);
test('Пограничное значение для 10 (-1)', TEN_DAYS_MILLISECONDS - SECOND, 20);

test('Граница 5 дней', FIVE_DAYS_MILLISECONDS, 20);
test('Пограничное значение для 5 (+1)', FIVE_DAYS_MILLISECONDS + SECOND, 20);
test('Пограничное значение для 5 (-1)', FIVE_DAYS_MILLISECONDS - SECOND, 50);

test('Граница 1 день', MILLISECONDS_IN_DAY, 50);
test('Пограничное значение для 5 (+1)', MILLISECONDS_IN_DAY + SECOND, 75);
test('Пограничное значение для 5 (-1)', MILLISECONDS_IN_DAY - SECOND, 50);

test('Граница 0', 0, 75);
test('Пограничное значение для 1 (+1)', -SECOND, 100);
test('Пограничное значение для 1 (-1)', SECOND, 75);


// Из-за специфики языка, ошибки при строковых значениях -1/1 не будет
test('Строковое значение -1', '-1', 100);
test('Строковое значение 1', '1', 100);

// В функции нет "защиты от дурака",
// поэтому нет возвращаемого значения в случае неверного типа аргумента
// Результатом первых двух функций будет 0, а последней - 100, но это неверное поведение
test('Строковое значение one', 'one', 'error');
test('Объект {one:true}', {one:true}, 'error');
test('Значение false', false, 'error');
