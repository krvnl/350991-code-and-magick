// stat.js
'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Валь', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var createWizards = function () {
    var wizards = [];
    for (var i = 0; i < 4; i++) {
      var wizard = {};

      wizard.name = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
      wizard.coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
      wizard.eyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
      wizards[i] = wizard;
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // вставляеем имена
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderAllWizards = function (wizards) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragmentElement.appendChild(renderWizard(wizards[i]));
    }
    // Если список элементов магов не пустой, то сперва его обнуляем
    while (similarListElement.hasChildNodes()) {
      similarListElement.removeChild(similarListElement.lastChild);
    }
    // А потом заново создаем
    similarListElement.appendChild(fragmentElement);
  };

  var userDialogElement = document.querySelector('.setup');
  var userDialogOpenElement = document.querySelector('.setup-open');
  var userDialogCloseElement = userDialogElement.querySelector('.setup-close');
  var userDialogSaveElement = userDialogElement.querySelector('.setup-submit');
  var userDialogNameInputElement = userDialogElement.querySelector('.setup-user-name');

  var similarListElement = userDialogElement.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var onUserDialogSaveClick = function () {
    if (userDialogNameInputElement.valid) {
      document.querySelector('.setup-wizard-form').submit();
    }
  };

  var onUserDialogSavePress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onUserDialogSaveClick();
    }
  };

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) || ((evt.keyCode === ENTER_KEYCODE) && (document.activeElement === userDialogCloseElement))) {
      closePopup();
    }
  };

  var onUserDialogNameInputInvalid = function () {
    if (userDialogNameInputElement.validity.tooShort) {
      userDialogNameInputElement.setCustomValidity('Имя должно состоять минимум из 2 символов');
    } else if (userDialogNameInputElement.validity.tooLong) {
      userDialogNameInputElement.setCustomValidity('Имя не должно превышать 25 символов');
    } else if (userDialogNameInputElement.validity.valueMissing) {
      userDialogNameInputElement.setCustomValidity('Обязательное поле');
    } else {
      userDialogNameInputElement.setCustomValidity('');
    }
  };

  var userDialogCoatElement = userDialogElement.querySelector('.setup-wizard .wizard-coat');
  var userDialogEyesElement = userDialogElement.querySelector('.setup-wizard .wizard-eyes');
  var userDialogFireballElement = userDialogElement.querySelector('.setup-fireball-wrap');

  var onUserDialogCoatClick = function () {
    userDialogCoatElement.setAttribute('style', 'fill: ' + COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)]);
  };
  var onUserDialogEyesClick = function () {
    userDialogEyesElement.setAttribute('style', 'fill: ' + EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)]);
  };
  var onUserDialogFireballClick = function () {
    userDialogFireballElement.setAttribute('style', 'background-color: ' + FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)]);
  };

  var wizards = createWizards();
  renderAllWizards(wizards);

  var openPopup = function () {
    userDialogElement.classList.remove('hidden');

    document.querySelector('.setup-similar').classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    userDialogCloseElement.addEventListener('click', onUserDialogSaveClick);
    userDialogSaveElement.addEventListener('keydown', onUserDialogSavePress);

    userDialogNameInputElement.addEventListener('invalid', onUserDialogNameInputInvalid);

    // Изменение цвета coat
    userDialogCoatElement = userDialogElement.querySelector('.setup-wizard .wizard-coat');
    userDialogCoatElement.addEventListener('click', onUserDialogCoatClick);

    // Изменение цвета eyes
    userDialogEyesElement = userDialogElement.querySelector('.setup-wizard .wizard-eyes');
    userDialogEyesElement.addEventListener('click', onUserDialogEyesClick);

    // Изменение цвета fireball
    userDialogFireballElement = userDialogElement.querySelector('.setup-fireball-wrap');
    userDialogFireballElement.addEventListener('click', onUserDialogFireballClick);
  };

  var closePopup = function () {
    if (!(document.activeElement.tagName === 'INPUT')) {
      userDialogElement.classList.add('hidden');
      // Удаляем handlers из окна настройки персонажа при его закрытии
      document.removeEventListener('keydown', onPopupEscPress);
      userDialogCloseElement.removeEventListener('click', onUserDialogSaveClick);
      userDialogSaveElement.removeEventListener('keydown', onUserDialogSavePress);
      userDialogNameInputElement.removeEventListener('invalid', onUserDialogNameInputInvalid);
      userDialogCoatElement.removeEventListener('click', onUserDialogCoatClick);
      userDialogEyesElement.removeEventListener('click', onUserDialogEyesClick);
      userDialogFireballElement.removeEventListener('click', onUserDialogFireballClick);
    }
  };

  userDialogOpenElement.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogCloseElement.addEventListener('click', function () {
    closePopup();
  });

  userDialogCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
})();
