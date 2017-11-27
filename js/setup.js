// stat.js
'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Валь', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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
    similarListElement.appendChild(fragmentElement);
  };

  var userDialogElement = document.querySelector('.setup');
  userDialogElement.classList.remove('hidden');
  var similarListElement = userDialogElement.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizards = createWizards();
  renderAllWizards(wizards);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();

