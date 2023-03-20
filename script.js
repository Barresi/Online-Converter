
// Запись DOM обьектов в переменные

const amount = document.querySelector('#amount');

const selectFrom = document.querySelector('#select-from');
const selectTo = document.querySelector('#select-to');

const statisticsUSD = document.querySelector('.statistics__USD');
const valueUSD = document.querySelector('#valueUSD');

const statisticsEUR = document.querySelector('.statistics__EUR');
const valueEUR = document.querySelector('#valueEUR');

const resultValue = document.querySelector('.Converter__result');


// Получение API с сервера 

const currencies = {};
async function getData() {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const valutes = await response.json();

      // Запись значений в объект currencies

      for (key in valutes.Valute) {
            currencies[key] = valutes.Valute[key].Value;
      }

      // Запись значений в statistics

      valueUSD.textContent = `${(valutes.Valute.USD.Value).toFixed(2)} ₽`;
      if ((valutes.Valute.USD.Value) > (valutes.Valute.USD.Previous)) {
            statisticsUSD.classList.add('up');
      } else {
            statisticsUSD.classList.add('down');
      };

      valueEUR.textContent = `${(valutes.Valute.EUR.Value).toFixed(2)} ₽`;
      if ((valutes.Valute.EUR.Value) > (valutes.Valute.EUR.Previous)) {
            statisticsEUR.classList.add('up');
      } else {
            statisticsEUR.classList.add('down');
      };

      // Запись валют в select

      for (key in valutes.Valute) {
            let optionFrom = document.createElement('option');
            optionFrom.textContent = key;
            optionFrom.setAttribute('value', key);
            optionFrom.setAttribute('class', 'Converter__option');
            selectFrom.append(optionFrom);

            let optionTo = optionFrom.cloneNode('True')
            selectTo.append(optionTo);
      }
}

getData();

//  Перевод валюты

function convertValute() {
      if (Number.isNaN((parseFloat(amount.value) * currencies[`${selectFrom.value}`]) / (currencies[`${selectTo.value}`]))) {
            resultValue.textContent = 'Error';
      } else {
            resultValue.textContent = `= ${((parseFloat(amount.value) * currencies[`${selectFrom.value}`]) / (currencies[`${selectTo.value}`])).toFixed(2)} ${selectTo.value}`;
      }
      resultValue.classList.add('active');
}

// Кнопка reverse valutes

function reverseValutes() {
      let valueFrom = selectFrom.value;
      let valueTo = selectTo.value;

      selectFrom.value = valueTo;
      selectTo.value = valueFrom;
}









