const filterByType = (type, ...values) => values.filter(value => typeof value === type),  // объявление функции filterByType, которая возвращает только те значения из массива values, чей тип равен переданному типу type

	hideAllResponseBlocks = () => {                                       // объявление функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем все элементы div с классом dialog__response-block и формируем из них массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // скрываем все элементы массива со страницы
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {       // объявление функции showResponseBlock
		hideAllResponseBlocks();                                            // вызов функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block';      // отображаем на странице элемент с селектором blockSelector
		if (spanSelector) {                                                 // если в функицю передана переменная spanSelector
			document.querySelector(spanSelector).textContent = msgText;       // то отобразить переданный текст в элементе с селектором spanSelector
		}
	},

// объявление трёх функций, в которых выполняется вызов функции showResponseBlock с разными параметрами для разных обстоятельств (показать ошибку, показать результат, показать отсутствие результатов)

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {                                 // объявление функции tryFilterByType
		try {                                                               // начало блока try
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");  // функция eval выполняет код JS, который записан внутри неё, а именно вызывает функцию filterByType с параметрами type и values, а затем полученный массив объединяется в строку, его элементы разделяются запятой и пробелом
			const alertMsg = (valuesArray.length) ?                           // конструируем сообщение для пользователя - если полученная строка не пустая,
				`Данные с типом ${type}: ${valuesArray}` :                      // то выводим найденные значения
				`Отсутствуют данные типа ${type}`;                              // иначе выводим сообщение о том, что данные не найдены
			showResults(alertMsg);                                            // вызываем функцию showResults, передавая в неё сконструированное сообщение
		} catch (e) {                                                       // если что-то пошло не так
			showError(`Ошибка: ${e}`);                                        // выводим на страницу сообщение об ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn');             // получаем элемент с id=filter-btn

filterButton.addEventListener('click', e => {                           // начинаем слушать клики на полученную кнопку
	const typeInput = document.querySelector('#type');                    // получаем элементы с id=type и id=data
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {                                         // если пользователь не ввёл текст в инпут
		dataInput.setCustomValidity('Поле не должно быть пустым!');         // выводим поп-ап о том, что поле не должно быть пустым
		showNoResults();                                                    // и вызываем функцию showNoResults
	} else {                                                              // иначе
		dataInput.setCustomValidity('');                                    // скрываем поп-ап
		e.preventDefault();                                                 // запрещаем стандартную обработку события
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());    // и вызываем функцию tryFilterByType, передавая в неё пользовательский ввод
	}
});

