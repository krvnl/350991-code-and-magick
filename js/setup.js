// stat.js
'use strict';

(function () {
  var createWizards = function () {
    var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
    var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Валь', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
    var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
    var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
    var wizArr = [
      {
        name: '',
        coatColor: '',
        eyesColor: ''
      },
      {
        name: '',
        coatColor: '',
        eyesColor: ''
      },
      {
        name: '',
        coatColor: '',
        eyesColor: ''
      },
      {
        name: '',
        coatColor: '',
        eyesColor: ''
      }
    ];

    for (var i = 0; i < 4; i++) {
      wizArr[i].name = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
      wizArr[i].coatColor = COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)];
      wizArr[i].eyesColor = EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)];
    }
    return wizArr;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // вставляеем имена
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var renderAllWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    var wizard;
    for (var i = 0; i < wizards.length; i++) {
      wizard = wizards[i];
      fragment.appendChild(renderWizard(wizard));
    }
    similarListElement.appendChild(fragment);
  };

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizards = createWizards();
  renderAllWizards(wizards);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();

