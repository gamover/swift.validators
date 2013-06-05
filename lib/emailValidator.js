/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    18:53
 */

var $util = require('util'),

    $swiftErrors = require('swift.errors'),

    SwiftValidator = require('./swiftValidator').SwiftValidator,

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function EmailValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'emailValidator' + countValidators;

    //
    // задание токенов
    //
    this._messageTokens[EmailValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[EmailValidator.ERROR_CODES.NOT_EMAIL] = 'Параметр "' +
        this._messageTokens[EmailValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" не является корректным email-адресом';
}
$util.inherits(EmailValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {*} value переданное значение
 *
 * @returns {EmailValidator}
 */
EmailValidator.prototype.validate = function validate (value)
{
    if (!value.match(/^[a-zA-Z_\-\.]+@[a-zA-Z_\-]+\.[a-z]{2,4}$/))
    {
        this._message = this.getMessageTemplate(EmailValidator.ERROR_CODES.NOT_EMAIL)
            .replace(
                this.getMessageToken(EmailValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
        ;
        this._error = new $swiftErrors.ValueError(this._message);
    }

    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// static
//

/**
 * Коды ошибок
 *
 * @type {Object}
 */
EmailValidator.ERROR_CODES = {
    NOT_EMAIL: 'NOT_EMAIL'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
EmailValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.EmailValidator = EmailValidator;