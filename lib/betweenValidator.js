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

function BetweenValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'betweenValidator' + countValidators;

    /**
     * Минимальное значение параметра
     *
     * @type {Number|null}
     * @private
     */
    this._minValue = null;

    /**
     * Максимальное значение параметра
     *
     * @type {Number|null}
     * @private
     */
    this._maxValue = null;
    //
    // задание токенов
    //
    this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.MIN_VALUE]  = '$_minValue_$';
    this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.MAX_VALUE]  = '$_maxValue_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[BetweenValidator.ERROR_CODES.NOT_VALID] = 'Значение параметра "' +
        this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" должно лежать в диапазоне [' +
        this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.MIN_VALUE] + '-' +
        this._messageTokens[BetweenValidator.MESSAGE_TOKEN_CODES.MAX_VALUE] + ']';
}
$util.inherits(BetweenValidator, SwiftValidator);

/**
 * Задание минимального значения параметра
 *
 * @param {Boolean} minValue минимальное значение
 *
 * @returns {BetweenValidator}
 */
BetweenValidator.prototype.setMinValue = function setMinValue (minValue)
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
 * Задание максимального значения параметра
 *
 * @param {Boolean} maxValue максимальное значение
 *
 * @returns {MaxValidator}
 */
BetweenValidator.prototype.setMaxValue = function setMaxValue (maxValue)
{
    //
    // проверка параметров
    //
    if (typeof maxValue !== 'number')
        throw new $swiftErrors.TypeError('не удалось задать максимальное значение параметра в "' + this._validatorName + '". Недопустимый тип значения (ожидается: "number", принято: "' + typeof maxValue + '")');
    //
    // задание значения
    //
    this._maxValue = maxValue;

    return this;
};

/**
 * Валидация
 *
 * @param {Number} value значение
 *
 * @returns {BetweenValidator}
 */
BetweenValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._minValue === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано минимальное значение параметра');
    if (this._maxValue === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано максимальное значение параметра');

    if (typeof value !== 'number') return this;

    if (value < this._minValue || value > this._maxValue)
    {
        this._message = this.getMessageTemplate(BetweenValidator.ERROR_CODES.NOT_VALID)
            .replace(
                this.getMessageToken(BetweenValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(BetweenValidator.MESSAGE_TOKEN_CODES.MIN_VALUE),
                this._minValue
            )
            .replace(
                this.getMessageToken(BetweenValidator.MESSAGE_TOKEN_CODES.MAX_VALUE),
                this._maxValue
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
BetweenValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
BetweenValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    MIN_VALUE: 'MIN_VALUE',
    MAX_VALUE: 'MAX_VALUE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.BetweenValidator = BetweenValidator;