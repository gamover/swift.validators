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
 * @param {String|Number|Boolean|undefined|null|Array|Object} value значение
 *
 * @returns {NotEmptyValidator}
 */
NotEmptyValidator.prototype.validate = function validate (value)
{
    if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' &&
        typeof value !== 'undefined' && value !== null &&
        !$swiftUtils.type.isArray(value) && !$swiftUtils.type.isObject(value)) return this;

    var valid = true;
    //
    // String, Array
    //
    if (typeof value === 'string' || $swiftUtils.type.isArray(value))
        if (!value.length) valid = false;
    //
    // Object
    //
    if ($swiftUtils.type.isObject(value))
        if (!Object.keys(value).length) valid = false;
    //
    // Number
    //
    if (typeof value === 'number')
        if (!(value + '').length) valid = false;
    //
    // Boolean, undefined, null
    //
    if (typeof value === 'boolean' || typeof value === 'undefined' || value === null)
        if (!value) valid = false;

    if (!valid)
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