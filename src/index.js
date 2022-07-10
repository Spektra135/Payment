import '@/styles/index.scss'
import binking from "binking";
import IMask from 'imask';
import { el, setChildren, text } from 'redom';
import mastercard from './assets/images/mastercard.svg'
import visa from './assets/images/visa.svg'
import maestro from './assets/images/maestro.svg'


const hint = el('.hint');
const container = el('.binking');
setChildren(document.body, [hint, container]);

const p1 = el('p', {
  textContent: 'Форма работает в тестовом режиме и не отправляет данные на сервер, при нажатии на кнопку «Оплатить» будет выведено сообщение, якобы платёж был отклонён вашим банком.',
});
const p2 = el('p', {
  textContent: 'Укажите в коде безопасности 777, чтобы увидеть сообщение об успешной оплате.',
});
const p3 = el('p', {
  textContent: 'Можете ввести свой номер карты, можете вставить один из заготовленных: 4023330000000006, 5536910000000002 или 6777210000000003.',
});
setChildren(hint, [p1, p2, p3]);

const form = el('form', { class: "binking__form"});
const success = el('.binking__success binking__hide');
setChildren(container, [form, success]);

const title = el('h2', { class: 'binking__title', textContent: 'Введите данные карты для оплаты'});
const panels = el('.binking__panels');
const labelEmail = el('label', '.binking__email-card-label');
const formBottom = el('.binking__form-bottom');
setChildren(form, [title, panels, labelEmail, formBottom]);

const inputEmail = el('input', {
  class: 'binking__field binking__email-card binking__email-field',
  type: 'text',
  placeholder: 'Введите email для отправки онлайн-чека',
  /* autocomplete: 'cc-csc',
   inputmode: 'numeric',
   pattern: '[0-9]*',
   name: 'email'*/
});
setChildren(labelEmail, inputEmail);

const errorText = el('p', { class: 'binking__error binking__hide' });
const button = el('button', {
  class: 'binking__submit-button binking__button button',
  type: 'submit',
  textContent: 'Оплатить',
  disabled: true,
});
setChildren(formBottom, [errorText, button])



const frontPanel = el('.binking__panel binking__front-panel');
const backPanel = el('.binking__panel binking__back-panel');
setChildren(panels, [frontPanel, backPanel]);

/*const imgBankLogo = el('img', {
  class: '.binking__panel .binking__front-panel',
  src: ''
});*/
const imgBrandLogo = el('img', {
  class: 'binking__form-brand-logo binking__hide',
  src: mastercard
});
/*const logo = el('.binking__form-bank-logo .binking__hide');
const brand = el('.binking__form-brand-logo .binking__hide');*/
const fields = el('.binking__front-fields');
setChildren(frontPanel, [/*imgBankLogo*/, imgBrandLogo/*, logo, brand*/, fields, ]);

const inputCardNumber = el('input', {
  class: 'binking__field binking__number-field',
  type: 'text',
  placeholder: '0000 0000 0000 0000',
  /*autocomplete: 'cc-number',
  inputmode: 'numeric',
  pattern: '[0-9 ]*',
  name: 'cardnumber'*/
});
const labelDate = el('label', {
  class: 'binking__label binking__date-label',
  textContent: 'Valid thru',
});
const inputTermCardMonth = el('input', {
  class: 'binking__field binking__month-field binking__date-field',
  type: 'text',
  placeholder: 'MM',
 /* autocomplete: 'cc-exp-month',
  inputmode: 'numeric',
  pattern: '[0-9]*',
  name: 'ccmonth'*/
});
const inputTermCardYear = el('input', {
  class: 'binking__field binking__year-field binking__date-field',
  type: 'text',
  placeholder: 'YY',
 /* autocomplete: 'cc-exp-year',
  inputmode: 'numeric',
  pattern: '[0-9]*',
  name: 'ccyear'*/
});
setChildren(fields, [inputCardNumber, labelDate, inputTermCardMonth, inputTermCardYear]);

const inputCvcCard = el('input', {
  class: 'binking__field binking__code-field',
  type: 'password',
  placeholder: 'CVV',
  /* autocomplete: 'cc-csc',
   inputmode: 'numeric',
   pattern: '[0-9]*',
   name: 'cvc'*/
});
const labelCode = el('label', {
  class: 'binking__label binking__code-label',
  textContent: 'Safety code',
});
setChildren(backPanel, [inputCvcCard, labelCode]);

const titleSuccess = el('h2', { class: 'binking__title', textContent: 'Оплата произведена успешно'});
const buttonSuccess = el('button', {
  class: 'binking__reset-button binking__button',
  type: 'submit',
  textContent: 'Вернуться к форме оплаты',
});
setChildren(success, [titleSuccess, buttonSuccess]);


(function () {
  const EmailTipMessage = 'Indicate your e-mail';

  function initBinking () {
    binking.setDefaultOptions({
      strategy: 'api',
      apiKey: 'cbc67c2bdcead308498918a694bb8d77'
    })
  }

  function initValidationTips () {
    tippy.setDefaultProps({
      trigger: 'manual',
      hideOnClick: false,
      theme: 'custom',
      distance: 8
    })
    cardNumberTip = tippy($cardNumberField)
    monthTip = tippy($monthField)
    yearTip = tippy($yearField)
    codeTip = tippy($codeField)
    emailTip = tippy($emailField)
  }

  function initMasks () {
    cardNumberMask = IMask($cardNumberField, {
      mask: binking.defaultResult.cardNumberMask
    })
    monthMask = IMask($monthField, {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
      autofix: true
    })
    yearMask = IMask($yearField, {
      mask: '00'
    })
    codeMask = IMask($codeField, {
      mask: '0000'
    })
    emailMask = IMask($emailField, {
      mask: function (value) {
        if(/^[a-z0-9_\.-]+$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@[a-z0-9-]+$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
          return true;
        if(/^[a-z0-9_\.-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
          return true;
        return false;
      }
    })
  }

  function validate () {
    let validationResult = binking.validate($cardNumberField.value, $monthField.value, $yearField.value, $codeField.value, $emailField.value)
    if (validationResult.errors.cardNumber && cardNumberTouched) {
      cardNumberTip.setContent(validationResult.errors.cardNumber.message)
      cardNumberTip.show();
    } else {
      cardNumberTip.hide()
    }
    let monthHasError = validationResult.errors.month && monthTouched
    if (monthHasError) {
      monthTip.setContent(validationResult.errors.month.message)
      monthTip.show();

    } else {
      monthTip.hide()
    }
    if (!monthHasError && validationResult.errors.year && yearTouched) {
      yearTip.setContent(validationResult.errors.year.message)
      yearTip.show();
    } else {
      yearTip.hide()
    }
    if (validationResult.errors.code && codeTouched) {
      codeTip.setContent(validationResult.errors.code.message)
      codeTip.show();
    } else {
      codeTip.hide()
    }

    const emailError = !/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test($emailField.value);
    if (emailError && emailTouched) {
      emailTip.setContent(EmailTipMessage)
      emailTip.show();
    } else {
      emailTip.hide()
    }

    const commonError = validationResult.hasErrors || emailError;
    if (commonError) {
      $submitButton.setAttribute('disabled', 'disabled');
    } else {
      $submitButton.removeAttribute('disabled');
    }
    return validationResult
  }

  function resetForm () {
    $error.classList.add('binking__hide')
    cardNumberTouched = false
    monthTouched = false
    yearTouched = false
    codeTouched = false
    emailTouched = false
    cardNumberMask.unmaskedValue = ''
    monthMask.unmaskedValue = ''
    yearMask.unmaskedValue = ''
    codeMask.unmaskedValue = ''
    emailMask.unmaskedValue = ''
    $form.classList.remove('binking__hide')
    $success.classList.add('binking__hide')
    $submitButton.setAttribute('disabled', 'disabled');
  }

  function cardNumberChangeHandler () {
    binking($cardNumberField.value, function (result) {
      newCardInfo = result
      cardNumberMask.updateOptions({
        mask: result.cardNumberMask
      })
      $frontPanel.style.background = result.formBackgroundColor
      $frontPanel.style.color = result.formTextColor
      $frontFields.forEach(function (field) {
        field.style.borderColor = result.formBorderColor
      })
      $codeField.placeholder = result.codeName || ''
      console.log($cardNumberField.value[0]);
      if ($cardNumberField.value[0] === '4') {
        $brandLogo.src = mastercard;
        $brandLogo.classList.remove('binking__hide')
        console.log($brandLogo.src);
      } else if  ($cardNumberField.value[0] === '5') {
        $brandLogo.src = visa
        $$brandLogo.classList.remove('binking__hide')
      } else if ($cardNumberField.value[0] === '6') {
        $brandLogo.src = maestro
        $brandLogo.classList.remove('binking__hide')
      } else {
          $brandLogo.classList.add('binking__hide')
        }
     /* if (result.formBankLogoBigSvg) {
        $bankLogo.src = result.formBankLogoBigSvg
        $bankLogo.classList.remove('binking__hide')
      } else {
        $bankLogo.classList.add('binking__hide')
      }
      $emailField.placeholder = result.emailName || ''
      if (result.formBankLogoBigSvg) {
        $bankLogo.src = result.formBankLogoBigSvg
        $bankLogo.classList.remove('binking__hide')
      } else {
        $bankLogo.classList.add('binking__hide')
      }
      if (result.formBrandLogoSvg) {
        $brandLogo.src = result.formBrandLogoSvg
        $brandLogo.classList.remove('binking__hide')
      } else {
        $brandLogo.classList.add('binking__hide')
      }*/
      let validationResult = validate()
      let isFulfilled = result.cardNumberNormalized.length >= result.cardNumberMinLength
      let isChanged = prevNumberValue !== $cardNumberField.value
      if (isChanged && isFulfilled) {
        if (validationResult.errors.cardNumber) {
          cardNumberTouched = true
          validate()
        } else {
          $monthField.focus()
        }
      }
      prevNumberValue = $cardNumberField.value
    })
  }

  function cardNumberBlurHandler () {
    cardNumberTouched = true
    validate()
  }

  function monthChangeHandler () {
    let validationResult = validate()
    if (prevMonthValue !== $monthField.value && $monthField.value.length >= 2) {
      if (validationResult.errors.month) {
        monthTouched = true
        validate()
      } else {
        $yearField.focus()
      }
    }
    prevMonthValue = $monthField.value
  }

  function monthBlurHandler () {
    if ($monthField.value.length === 1) {
      monthMask.unmaskedValue = '0' + $monthField.value
    }
    monthTouched = true
    validate()
  }

  function yearChangeHandler () {
    let validationResult = validate()
    if (prevYearValue !== $yearField.value && $yearField.value.length >= 2) {
      if (validationResult.errors.year) {
        yearTouched = true
        validate()
      } else {
        $codeField.focus()
      }
    }
    prevYearValue = $yearField.value
  }

  function yearBlurHandler () {
    yearTouched = true
    validate()
  }

  function codeChangeHandler () {
    let validationResult = validate()
    if (prevCodeValue !== $codeField.value && $codeField.value.length >= 3) {
      if (validationResult.errors.code) {
        codeTouched = true
        validate()
      } else {
        $emailField.focus()
      }
    }
    prevCodeValue = $codeField.value
  }

  function codeBlurHandler () {
    codeTouched = true
    validate()
  }

  function emailChangeHandler () {
    validate()
  }

  function emailBlurHandler () {
    emailTouched = true
    validate()
  }

  function formSubmitHandler (e) {
    e.preventDefault()
    if (sending) return
    let formData
    if (selectedCardIndex !== null) {
      formData = savedCards[selectedCardIndex]
      console.log('Pay with saved credit card', formData)
    } else {
      cardNumberTouched = true
      monthTouched = true
      yearTouched = true
      codeTouched = true
      emailTouched = true
      let validationResult = validate()
      if (validationResult.hasErrors) {
        $error.classList.remove('binking__hide')
        $error.innerHTML = 'Check card form fields'
        return
      }
      formData = {
        cardNumber: cardNumberMask.unmaskedValue,
        month: $monthField.value,
        year: $yearField.value,
        code: $codeField.value,
        email: $emailField.value,
      }
      console.log('Pay with new credit card', formData)
    }
    $error.classList.add('binking__hide')
    sending = true
    $submitButton.classList.add('binking__loading')
    $submitButton.disabled = true
    $cardNumberField.disabled = true
    $monthField.disabled = true
    $yearField.disabled = true
    $codeField.disabled = true
    $emailField.disabled = true
    setTimeout(function () {
      sending = false
      $submitButton.classList.remove('binking__loading')
      $submitButton.disabled = false
      $cardNumberField.disabled = false
      $monthField.disabled = false
      $yearField.disabled = false
      $codeField.disabled = false
      $emailField.disabled = false
      if (selectedCardIndex === null && $codeField.value === '777') {
        $form.classList.add('binking__hide')
        $success.classList.remove('binking__hide')
        $submitButton.classList.remove('binking__loading')
      } else {
        let bankInfo = selectedCardIndex !== null ? savedCardsBanks[selectedCardIndex] : newCardInfo || null
        $error.innerHTML = bankInfo && bankInfo.bankPhone
          ? 'Ваш банк отклонил операцию по указанной карте. Позвоните в ' + bankInfo.bankLocalName + ' по номеру ' + bankInfo.bankPhone + ', чтобы устранить причину.'
          : 'Ваш банк отклонил операцию по указанной карте.'
        $error.classList.remove('binking__hide')
      }
    }, 1000)
  }

  function resetButtonClickHandler () {
    resetForm();
  }

  let $form = document.querySelector('.binking__form')
  let $success = document.querySelector('.binking__success')
  let $submitButton = document.querySelector('.binking__submit-button')
  let $resetButton = document.querySelector('.binking__reset-button')
  let $frontPanel = document.querySelector('.binking__front-panel')
  let $bankLogo = document.querySelector('.binking__form-bank-logo')
  let $brandLogo = document.querySelector('.binking__form-brand-logo')
  let $cardNumberField = document.querySelector('.binking__number-field')
  let $codeField = document.querySelector('.binking__code-field')
  let $monthField = document.querySelector('.binking__month-field')
  let $yearField = document.querySelector('.binking__year-field')
  let $emailField = document.querySelector('.binking__email-field')
  let $frontFields = document.querySelectorAll('.binking__front-fields .binking__field')
  let $error = document.querySelector('.binking__error')
  let prevNumberValue = $cardNumberField.value
  let prevMonthValue = $monthField.value
  let prevYearValue = $yearField.value
  let prevCodeValue = $codeField.value
  let selectedCardIndex = null
  let cardNumberTouched = false
  let monthTouched = false
  let yearTouched = false
  let codeTouched = false
  let emailTouched = false
  let sending = false
  let savedCardsBanks
  let newCardInfo
  let cardNumberTip
  let monthTip
  let yearTip
  let codeTip
  let emailTip
  let cardNumberMask
  let monthMask
  let yearMask
  let codeMask
  let emailMask
  initBinking()
  initMasks()
  initValidationTips()
  $cardNumberField.addEventListener('input', cardNumberChangeHandler)
  $cardNumberField.addEventListener('blur', cardNumberBlurHandler)
  $monthField.addEventListener('input', monthChangeHandler)
  $monthField.addEventListener('blur', monthBlurHandler)
  $yearField.addEventListener('input', yearChangeHandler)
  $yearField.addEventListener('blur', yearBlurHandler)
  $codeField.addEventListener('input', codeChangeHandler)
  $codeField.addEventListener('blur', codeBlurHandler)
  $emailField.addEventListener('input', emailChangeHandler)
  $emailField.addEventListener('blur', emailBlurHandler)
  $form.addEventListener('submit', formSubmitHandler)
  $resetButton.addEventListener('click', resetButtonClickHandler)
})();
