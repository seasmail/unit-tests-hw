const { commission } = require('./commission');

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const TEN_DAYS_MILLISECONDS = MILLISECONDS_IN_DAY * 10;
const FIVE_DAYS_MILLISECONDS = MILLISECONDS_IN_DAY * 5;
const SECOND = 1000;


describe('Группа тестов для границы 10 дней', () => {
    test('Граница 10 дней', () => {
        expect(commission(Date.now() + TEN_DAYS_MILLISECONDS)).toBe(0);
    });
    test('Пограничное значение для 10 (-1)', () => {
        expect(commission(Date.now() + (TEN_DAYS_MILLISECONDS) - SECOND)).toBe(20);
    });
    test('Пограничное значение для 10 (+1)', () => {
        expect(commission(Date.now() + (TEN_DAYS_MILLISECONDS) + SECOND)).toBe(0);
    });
});

describe('Группа тестов для границы 5 дней', () => {
    test('Граница 5 дней', () => {
        expect(commission(Date.now() + FIVE_DAYS_MILLISECONDS)).toBe(20);
    });
    test('Пограничное значение для 5 (-1)', () => {
        expect(commission(Date.now() + (FIVE_DAYS_MILLISECONDS) - SECOND)).toBe(50);
    });
    test('Пограничное значение для 5 (+1)', () => {
        expect(commission(Date.now() + (FIVE_DAYS_MILLISECONDS) + SECOND)).toBe(20);
    });
});

describe('Группа тестов для границы в один день', () => {
    test('Граница 1 день', () => {
        expect(commission(Date.now() + MILLISECONDS_IN_DAY)).toBe(50);
    });
    test('Пограничное значение для 1 (-1)', () => {
        expect(commission(Date.now() + (MILLISECONDS_IN_DAY) - SECOND)).toBe(75);
    });
    test('Пограничное значение для 1 (+1)', () => {
        expect(commission(Date.now() + (MILLISECONDS_IN_DAY) + SECOND)).toBe(50);
    });
});
describe('Группа тестов для границы 0', () => {
    test('Граница 0', () => {
        expect(commission(Date.now())).toBe(75);
    });
    test('Пограничное значение для 0 (-1)', () => {
        expect(commission(Date.now() - SECOND)).toBe(100);
    });
    test('Пограничное значение для 0 (+1)', () => {
        expect(commission(Date.now() + SECOND)).toBe(75);
    });
});

describe('Группа тестов для нечисловых значений', () => {
    test('Строковое значение -1', () => {
        expect(commission('-1')).toBe(100);
    });
    test('Строковое значение 1', () => {
        expect(commission( '1')).toBe(100);
    });
    test('Строковое значение one', () => {
        expect(commission(Date.now() + 'one')).toBe('error');
    });
    test('Строковое значение {one:true}', () => {
        expect(commission(Date.now() + {one:true})).toBe('error');
    });
    test('Строковое значение false', () => {
        expect(commission(Date.now() + false)).toBe('error');
    });
});

// Из-за специфики языка, ошибки при строковых значениях -1/1 не будет
/*commissionTest('Строковое значение -1', '-1', 100);
commissionTest('Строковое значение 1', '1', 100);*/

// В функции нет "защиты от дурака",
// поэтому нет возвращаемого значения в случае неверного типа аргумента
// Результатом первых двух функций будет 0, а последней - 100, но это неверное поведение
/*commissionTest('Строковое значение one', 'one', 'error');
commissionTest('Объект {one:true}', {one:true}, 'error');
commissionTest('Значение false', false, 'error');*/
