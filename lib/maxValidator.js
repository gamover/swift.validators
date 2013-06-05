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

function MaxValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'maxValidator' + countValidators;

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
    this._messageTokens[MaxValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[MaxValidator.MESSAGE_TOKEN_CODES.MAX_VALUE]  = '$_maxValue_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[MaxValidator.ERROR_CODES.NOT_VALID] = 'Максимальное значение параметра "' +
        this._messageTokens[MaxValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" - ' +
        this._messageTokens[MaxValidator.MESSAGE_TOKEN_CODES.MAX_VALUE];
}
$util.inherits(MaxValidator, SwiftValidator);

/**
 * Задание максимального значения параметра
 *
 * @param {Boolean} maxValue максимальное значение
 *
 * @returns {MaxValidator}
 */
MaxValidator.prototype.setMaxValue = function setStrict (maxValue)
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
 * @returns {MaxValidator}
 */
MaxValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._maxValue === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано максимальное значение параметра');

    if (typeof value !== 'number') return this;

    if (value > this._maxValue)
    {
        this._message = this.getMessageTemplate(MaxValidator.ERROR_CODES.NOT_VALID)
            .replace(
                this.getMessageToken(MaxValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(MaxValidator.MESSAGE_TOKEN_CODES.MAX_VALUE),
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
MaxValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
MaxValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    MAX_VALUE: 'MAX_VALUE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MaxValidator = MaxValidator;