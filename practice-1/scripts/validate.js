//передаваемый объект настроек всех нужных классов и селекторов элементов 
const validationConfig = { 
  formSelector: '.form', 
  inputSelector: '.form__item', 
  submitButtonSelector: '.form__button', 
  inactiveButtonClass: 'form__button_disabled', 
  inputErrorClass: 'form__item_state_invalid', 
};

const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__submit');

//показать ошибку 
const showError = (errorElement, inputElement) => {
  if(inputElement.title) {
    errorElement.textContent = inputElement.title;
  } else {
    errorElement.textContent = inputElement.validationMessage; //присвоили стандратный текст ошибки 
  }
} 

//скрыть ошибку 
const hideError = (errorElement) => { 
  errorElement.textContent = ''; //удалили стандратный текст ошибки
}; 

//функция проверки валидности поля ввода формы 
const checkInputValidity = (inputElement) => { 
  const isInputNotValid = !inputElement.validity.valid; //переменная с невалидным полем 
  const errorElement = form.querySelector(`.${inputElement.id}-error`)//находим элемент с ошибкой в момент ввода в поле 
//определяем показывать или скрывать ошибку в зависимости от валидности 
  if (isInputNotValid) { 
    showError(errorElement, inputElement); 
  } else { 
    hideError(errorElement); 
  } 
} 

//проверка валидности воля ввода 
const hasInvalidInput = (inputList) => { 
  //перебор каждого элемента массива на валидность 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; //возвращает true, если поле невалидно 
  }); 
}; 

//включение и отключение кнопки в зависимости от валидности формы 
const toggleButtonState = (inputList) => { 
  // Если есть хотя бы одно поле ввода невалидно 
  if (hasInvalidInput(inputList)) { 
    submitButton.disabled = 'disabled'; 
  } else { 
    submitButton.disabled = false; 
  } 
}; 

//устанавливаем обработчик полям ввода формы
const setEventListener = () => { 
  const inputList = Array.from(form.querySelectorAll('.form__input')); //находм все поля вводы формы в передаваемой форме и создаем массив 
  toggleButtonState(inputList); 

  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => { 
      checkInputValidity(inputElement); 
      toggleButtonState(inputList); // Вызовем toggleButtonState и передадим ей массив полей и кнопку 
    });
  }); 

  //отменяем действия по умолчанию 
  form.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
  });
}; 

setEventListener()