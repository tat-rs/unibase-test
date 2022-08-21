setTimeout - callback-функция, она выполняется не сразу, а помещается в стек и выполяется уже после того, как цикл будет выполнен.
Переменная i объвлена через var, имеет глобальную область видимости и при каждой итерации она перезаписывается, не сохраняя промежуточное значение.
Т.к. в результате цикла i=4, в консоль будет выведено 4 раза: "Bad: undefined";

Решение:
1) ОбЪявить i через let, тогда для каждой итерации будет создана своя переменная с текущим значением i

for (let i = 0; i < arr.length; i++) {
  console.log(i)
  setTimeout(function() {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
  }, 3000)
}

2) Использовать метод перебора массива forEach

