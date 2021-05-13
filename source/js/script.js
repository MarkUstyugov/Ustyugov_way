const menuButton = document.querySelector(".header__toggle");
const menu = document.querySelector(".header__navigation");
const logo = document.querySelector(".header__logo");
const header = document.querySelector(".header");
const modalCloseButton = document.querySelectorAll(".modal__close-button");
const inputForms = document.querySelectorAll('input');
const inputPhoneModal = document.querySelector('.modal-buy__phone');

const buyButton = document.querySelectorAll(".buy-button");
const modalBuy = document.querySelector(".modal-buy");
const whiteMask = document.querySelector(".white-mask");

const countriesNavigation = document.querySelector('.countries__navigation-wrapper');
const countriesButton = document.querySelectorAll('.countries__navigation-button');
const countriesItem = document.querySelectorAll('.countries__item');
const placesList = document.querySelector('.places__list');
const placesLinks = document.querySelectorAll('.places__link');

const forms = document.querySelectorAll('form');
const modalSuccess = document.querySelector('.modal-success');
const errorMessage = document.querySelector('.feedback__error-message');
const errorPhone = document.querySelector('.error-message--phone');
const MAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;

menuButton.classList.remove("header__toggle--active");
menu.classList.remove("header__navigation--active");
logo.classList.remove("header__logo--hide");
header.classList.remove("header--active-no-js");


menuButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  menuButton.classList.toggle("header__toggle--active");
  menu.classList.toggle("header__navigation--active");
  logo.classList.toggle("header__logo--hide");
  header.classList.toggle("header--active");
});

for (let i = 0; i < buyButton.length; i++) {
  buyButton[i].addEventListener("click", function (evt) {
    evt.preventDefault();

    whiteMask.classList.add("white-mask--active");
    modalBuy.classList.add("modal-buy--active");
    inputPhoneModal.focus();
  });
}

for (let i = 0; i < modalCloseButton.length; i++) {
  modalCloseButton[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    whiteMask.classList.remove("white-mask--active");
    modalSuccess.classList.remove("modal-success--active");
    modalBuy.classList.remove("modal-buy--active");
  });
}

document.addEventListener("click", function (evt) {
  let target = evt.target;
  if (!target.closest(".buy-button")) {
    if (!target.closest(".modal-buy, .modal-success")) {
      modalBuy.classList.remove("modal-buy--active");
      modalSuccess.classList.remove("modal-success--active");
      whiteMask.classList.remove("white-mask--active");
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modalBuy.classList.contains("modal-buy--active") || modalSuccess.classList.contains("modal-success--active")) {
      evt.preventDefault();
      modalBuy.classList.remove("modal-buy--active");
      modalSuccess.classList.remove("modal-success--active");
      whiteMask.classList.remove("white-mask--active");
    }
  }
});

countriesNavigation.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.classList.contains('countries__navigation-button')) {
    let array = Array.from(countriesButton);
    let target = evt.target;
    let index = array.indexOf(target);


    array.forEach((item, i) => {
      if (i === index) {
        if (item.dataset.countriesNavigation === countriesItem[i].id) {
          item.classList.add('countries__navigation-button--active');
          countriesItem[i].classList.add('countries__item--active');
        }
      } else {
        item.classList.remove('countries__navigation-button--active');
        countriesItem[i].classList.remove('countries__item--active');
      }
    });
  }
});

placesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.places__link')) {
    let array = Array.from(placesLinks);
    let target = evt.target.closest('.places__link');
    let index = array.indexOf(target);

    array.forEach((item, i) => {
      if (i === index) {
        if (item.dataset.places === countriesItem[i].id) {
          countriesButton[i].classList.add('countries__navigation-button--active');
          countriesItem[i].classList.add('countries__item--active');
        }
      } else {
        countriesButton[i].classList.remove('countries__navigation-button--active');
        countriesItem[i].classList.remove('countries__item--active');
      }
    });
  }
});

const showModalSuccess = () => {
  whiteMask.classList.add("white-mask--active");
  modalSuccess.classList.add("modal-success--active");
}

const dataSend = async (formData) => {
  const fetchResp = fetch('https://echo.htmlacademy.ru', {
    method: 'POST',
    body: formData
  });
};

forms.forEach(form => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const formData = new FormData(this);

    dataSend(formData)
      .then((response) => {
        showModalSuccess();
        addLocalStorage();
        console.log(response);
        form.reset();
      })
      .catch((err) => {
        console.error(err);
      })
  });
});


const mailErrorChecker = (input) => {
  return !MAILREGEX.test(input.value);
}


const inputValidityChecker = (input) => {
  let inputValue = input.value;
  const errorMessage = mailErrorChecker(input);

  if (input.classList.contains('feedback__email') || input.classList.contains('modal-buy__email')) {
    if (inputValue === '') {
      input.setCustomValidity('');
      input.classList.remove('form__input--error');
    } else if (errorMessage) {
      input.classList.add('form__input--error');
    } else {
      input.classList.remove('form__input--error');
      input.setCustomValidity('');
    }
  }

  if (input.classList.contains('feedback__phone') || input.classList.contains('modal-buy__phone')) {
    if (inputValue === '') {
      input.setCustomValidity('');
      input.classList.remove('form__input--error');
    } else if (isNaN(inputValue)) {
      input.classList.add('form__input--error');
    } else if (inputValue.length < 10) {
      input.classList.remove('form__input--error');
    } else {
      input.classList.remove('form__input--error');
      input.setCustomValidity('');
    }
  }

  input.reportValidity();
}


for (let i = 0; i < inputForms.length; i++) {
  inputForms[i].addEventListener('input', () => {
    inputValidityChecker(inputForms[i]);
  })
}
