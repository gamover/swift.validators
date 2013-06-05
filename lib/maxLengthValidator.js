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

function MaxLengthValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'maxLengthValidator' + countValidators;

    /**
     * Максимальная длина значения параметра
     *
     * @type {Number|null}
     * @private
     */
    this._maxLength = null;
    //
    // задание токенов
    //
    this._messageTokens[MaxLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[MaxLengthValidator.MESSAGE_TOKEN_CODES.MAX_LENGTH]  = '$_maxLength_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[MaxLengthValidator.ERROR_CODES.BIG_LENGTH] = 'Максимальная длина значения параметра "' +
        this._messageTokens[MaxLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" - ' +
        this._messageTokens[MaxLengthValidator.MESSAGE_TOKEN_CODES.MAX_LENGTH];
}
$util.inherits(MaxLengthValidator, SwiftValidator);

/**
 * Задание максимальной длины значения параметра
 *
 * @param {Boolean} maxLength максимальная длина значения параметра
 *
 * @returns {MaxLengthValidator}
 */
MaxLengthValidator.prototype.setMaxLength = function setMaxLength (maxLength)
{
    //
    // проверка параметров
    //
    if (typeof maxLength !== 'number')
        throw new $swiftErrors.TypeError('не удалось задать максимальную длину значения параметра в "' + this._validatorName + '". Недопустимый тип значения (ожидается: "number", принято: "' + typeof maxLength + '")');
    //
    // задание значения
    //
    this._maxLength = maxLength;

    return this;
};

/**
 * Валидация
 *
 * @param {Number} value значение
 *
 * @returns {MaxLengthValidator}
 */
MaxLengthValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._maxLength === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задана максимальная длина значения параметра');

    if (typeof value !== 'string' && typeof value !== 'number' &&
        !$swiftUtils.type.isArray(value) && !$swiftUtils.type.isObject(value)) return this;

    var valid = true;
    //
    // String, Array
    //
    if (typeof value === 'string' || $swiftUtils.type.isArray(value))
        if (value.length > this._maxLength) valid = false;
    //
    // Number
    //
    if (typeof value === 'number')
        if ((value + '').length > this._maxLength) valid = false;
    //
    // Object
    //
    if ($swiftUtils.type.isObject(value))
        if (Object.keys(value).length > this._maxLength) valid = false;

    if (!valid)
    {
        this._message = this.getMessageTemplate(MaxLengthValidator.ERROR_CODES.BIG_LENGTH)
            .replace(
                this.getMessageToken(MaxLengthValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(MaxLengthValidator.MESSAGE_TOKEN_CODES.MAX_LENGTH),
                this._maxLength
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
MaxLengthValidator.ERROR_CODES = {
    BIG_LENGTH: 'BIG_LENGTH'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
MaxLengthValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    MAX_LENGTH: 'MAX_LENGTH'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MaxLengthValidator = MaxLengthValidator;