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

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogSave = userDialog.querySelector('.setup-submit');
  var userDialogNameInput = userDialog.querySelector('.setup-user-name');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var onUserDialogSaveClick = function () {
    if (userDialogNameInput.valid) {
      document.querySelector('.setup-wizard-form').submit();
    }
  };

  var onUserDialogSavePress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onUserDialogSaveClick();
    };
  };

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) || ((evt.keyCode === ENTER_KEYCODE) && (document.activeElement === userDialogClose))) {
      closePopup();
    };
  };

  var onUserDialogNameInputInvalid = function () {
    if (userDialogNameInput.validity.tooShort) {
      userDialogNameInput.setCustomValidity('Имя должно состоять минимум из 2 символов');
    } else if (userDialogNameInput.validity.tooLong) {
      userDialogNameInput.setCustomValidity('Имя не должно превышать 25 символов');
    } else if (userDialogNameInput.validity.valueMissing) {
      userDialogNameInput.setCustomValidity('Обязательное поле');
    } else {
      userDialogNameInput.setCustomValidity('');
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');

    var wizards = createWizards();
    renderAllWizards(wizards);
    document.querySelector('.setup-similar').classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    userDialogSave.addEventListener('click', onUserDialogSaveClick);
    userDialogSave.addEventListener('keydown', onUserDialogSavePress);

    userDialogNameInput.addEventListener('invalid', onUserDialogNameInputInvalid);

    // Изменение цвета coat
    var userDialogCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
    var onUserDialogCoatClick = function () {
      userDialogCoat.setAttribute('style', 'fill: ' + COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)]);
    };
    userDialogCoat.addEventListener('click', onUserDialogCoatClick);

    // Изменение цвета eyes
    var userDialogEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
    var onUserDialogEyesClick = function () {
      userDialogEyes.setAttribute('style', 'fill: ' + EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)]);
    };
    userDialogEyes.addEventListener('click', onUserDialogEyesClick);

    // Изменение цвета fireball
    var userDialogFireball = userDialog.querySelector('.setup-fireball-wrap');
    var onUserDialogFireballClick = function () {
      userDialogFireball.setAttribute('style', 'background-color: ' + FIREBALL_COLORS[Math.floor(Math.random() * FIREBALL_COLORS.length)]);
    };
    userDialogFireball.addEventListener('click', onUserDialogFireballClick);
  };

  var closePopup = function () {
    if (!(document.activeElement.tagName === 'INPUT')) {
      userDialog.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    };
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
})();
