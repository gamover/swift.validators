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

function MinValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'minValidator' + countValidators;

    /**
     * Минимальное значение параметра
     *
     * @type {Number|null}
     * @private
     */
    this._minValue = null;
    //
    // задание токенов
    //
    this._messageTokens[MinValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[MinValidator.MESSAGE_TOKEN_CODES.MIN_VALUE]  = '$_minValue_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[MinValidator.ERROR_CODES.NOT_VALID] = 'Минимальное значение параметра "' +
        this._messageTokens[MinValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" - ' +
        this._messageTokens[MinValidator.MESSAGE_TOKEN_CODES.MIN_VALUE];
}
$util.inherits(MinValidator, SwiftValidator);

/**
 * Задание минимального значения параметра
 *
 * @param {Boolean} minValue минимальное значение
 *
 * @returns {MinValidator}
 */
MinValidator.prototype.setMinValue = function setMinValue (minValue)
{
    //
    // проверка параметров
    //
    if (typeof minValue !== 'number')
        throw new $swiftErrors.TypeError('не удалось задать минимальное значение параметра в "' + this._validatorName + '". Недопустимый тип значения (ожидается: "number", принято: "' + typeof minValue + '")');
    //
    // задание значения
    //
    this._minValue = minValue;

    return this;
};

/**
 * Валидация
 *
 * @param {Number} value значение
 *
 * @returns {MinValidator}
 */
MinValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._minValue === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано минимальное значение параметра');

    if (typeof value !== 'number') return this;

    if (value < this._minValue)
    {
        this._message = this.getMessageTemplate(MinValidator.ERROR_CODES.NOT_VALID)
            .replace(
                this.getMessageToken(MinValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(MinValidator.MESSAGE_TOKEN_CODES.MIN_VALUE),
                this._minValue
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
MinValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
MinValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    MIN_VALUE: 'MIN_VALUE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MinValidator = MinValidator;