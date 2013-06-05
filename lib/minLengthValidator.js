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

function MinLengthValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'minLengthValidator' + countValidators;

    /**
     * Минимальная длина значения параметра
     *
     * @type {Number|null}
     * @private
     */
    this._minLength = null;
    //
    // задание токенов
    //
    this._messageTokens[MinLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[MinLengthValidator.MESSAGE_TOKEN_CODES.MIN_LENGTH]  = '$_minLength_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[MinLengthValidator.ERROR_CODES.NOT_VALID] = 'Минимальная длина значения параметра "' +
        this._messageTokens[MinLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" - ' +
        this._messageTokens[MinLengthValidator.MESSAGE_TOKEN_CODES.MIN_LENGTH];
}
$util.inherits(MinLengthValidator, SwiftValidator);

/**
 * Задание минимальной длины значения параметра
 *
 * @param {Boolean} minLength минимальная длина значения параметра
 *
 * @returns {MinLengthValidator}
 */
MinLengthValidator.prototype.setMinLength = function setMinLength (minLength)
{
    //
    // проверка параметров
    //
    if (typeof minLength !== 'number')
        throw new $swiftErrors.TypeError('не удалось задать минимальную длину значения параметра в "' + this._validatorName + '". Недопустимый тип значения (ожидается: "number", принято: "' + typeof minLength + '")');
    //
    // задание значения
    //
    this._minLength = minLength;

    return this;
};

/**
 * Валидация
 *
 * @param {Number} value значение
 *
 * @returns {MinLengthValidator}
 */
MinLengthValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._minLength === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задана минимальная длина значения параметра');

    if (typeof value !== 'string' && typeof value !== 'number' &&
        !$swiftUtils.type.isArray(value) && !$swiftUtils.type.isObject(value)) return this;

    var valid = true;
    //
    // String, Array
    //
    if (typeof value === 'string' || $swiftUtils.type.isArray(value))
        if (value.length < this._minLength) valid = false;
    //
    // Number
    //
    if (typeof value === 'number')
        if ((value + '').length < this._minLength) valid = false;
    //
    // Object
    //
    if ($swiftUtils.type.isObject(value))
        if (Object.keys(value).length < this._minLength) valid = false;

    if (!valid)
    {
        this._message = this.getMessageTemplate(MinLengthValidator.ERROR_CODES.NOT_VALID)
            .replace(
                this.getMessageToken(MinLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(MinLengthValidator.MESSAGE_TOKEN_CODES.MIN_LENGTH),
                this._minLength
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
MinLengthValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
MinLengthValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    MIN_LENGTH: 'MIN_LENGTH'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MinLengthValidator = MinLengthValidator;