// 1.	Парність числа
// Як перевірити, що число парне?
function parne(n: number) {
    return n % 2 === 0;
}

console.log(parne(2));
console.log(parne(3));

// 2.	Реверс рядка
// Напиши алгоритм, який перевертає рядок "hello" → "olleh".
const str = 'olleh';
console.log(str.split('').reverse().join(''));

// 3.	Паліндром
// Як перевірити, чи є слово паліндромом? (наприклад, "level" → так, "hello" → ні).
const palindrom = 'revel';
const pal = palindrom.split('').reverse().join('');
if (palindrom === pal) {
    console.log('Так');
} else {
    console.log('Ні');
}
