const popup = document.querySelector(".popup");
const popupOpened = document.querySelector(".popup_opened");
const popupOpenBtn = document.querySelector(".info__button");
const popupCloseBtn = document.querySelector(".form__cancel");

//объявление функции открытия попапа
function openPopup() {
  popup.classList.add("popup_opened"); //присваиваем класс модификатора popup_opened
  window.addEventListener("keydown", closePopupByEsc); //присваиваем обработчик закрытия
  popup.addEventListener("mousedown", closePopupByOverlayClick); //присваиваем обработчик закрытия попапа по оверлею
}

//функция закрытия попапа по кнопке esc
function closePopupByEsc(evt) {
  //если событие esc, то попап закрывается
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

//функция закрытия попапа при нажатии на оверлей
function closePopupByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupOpened);
  }
}

//объявление функции закрытия попапа
function closePopup() {
  popup.classList.remove("popup_opened"); //удаляем класс модификатора popup_opened
  window.removeEventListener("keydown", closePopupByEsc); //удаляем обработчик закрытия
  popup.removeEventListener("mousedown", closePopupByOverlayClick); //удаляем обработчик закрытия попапа по оверлею
}

popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopupByOverlayClick);
