import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alfa_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('password_missmatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `Il campo ${ctx.field} è richiesto`,
          min: `Il campo ${ctx.field} è troppo corto`,
          max: `Il campo ${ctx.field} è troppo lungo`,
          alpha_spaces: `Il campo ${ctx.field} può contenere sono lettere e spazi`,
          email: `Il campo ${ctx.field} deve avere una mail valida`,
          min_value: `Il campo ${ctx.field} è un numero troppo basso`,
          max_value: `Il campo ${ctx.field} è un numero troppo alto`,
          excluded: `Non sei autorizzato a utilizzare questo valore per il campo ${ctx.field}`,
          country_excluded: 'A causa di restrizioni, non accettiamo utenti da questa location',
          password_missmatch: 'Le password non corrispondono',
          tos: 'Devi accettare i termini di servizio per poter proseguire',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} non è valido`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
