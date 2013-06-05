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
    $swiftUtils = require('swift.utils'),

    SwiftValidator = require('./swiftValidator').SwiftValidator,

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function NotEmptyValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'notEmptyValidator' + countValidators;

    //
    // задание токенов
    //
    this._messageTokens[NotEmptyValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[NotEmptyValidator.ERROR_CODES.EMPTY] = 'Пустое значение параметра "' +
        this._messageTokens[NotEmptyValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '"';
}
$util.inherits(NotEmptyValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {String|Array|Object} value значение
 *
 * @returns {NotEmptyValidator}
 */
NotEmptyValidator.prototype.validate = function validate (value)
{
    var val = value;

    if (typeof value === 'object')
        val = Object.keys(value);

    if (!val.length)
    {
        this._message = this.getMessageTemplate(NotEmptyValidator.ERROR_CODES.EMPTY).replace(
            this.getMessageToken(NotEmptyValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
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
NotEmptyValidator.ERROR_CODES = {
    EMPTY: 'EMPTY'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
NotEmptyValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.NotEmptyValidator = NotEmptyValidator;