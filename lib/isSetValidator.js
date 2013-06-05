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

function IsSetValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'isSetValidator' + countValidators;

    //
    // задание токенов
    //
    this._messageTokens[IsSetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[IsSetValidator.ERROR_CODES.NOT_SET] = 'Не задан параметр "' +
        this._messageTokens[IsSetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '"';
}
$util.inherits(IsSetValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {IsSetValidator}
 */
IsSetValidator.prototype.validate = function validate (value)
{
    if (typeof data === 'undefined')
    {
        this._message = this.getMessageTemplate(IsSetValidator.ERROR_CODES.NOT_SET).replace(
            this.getMessageToken(IsSetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
            (this._paramName ? this._paramName : '')
        );
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
IsSetValidator.ERROR_CODES = {
    NOT_SET: 'NOT_SET'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
IsSetValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.IsSetValidator = IsSetValidator;