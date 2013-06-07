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

function InArrayValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'inArrayValidator' + countValidators;

    /**
     * Массив значений
     *
     * @type {Array|null}
     * @private
     */
    this._array = null;
    //
    // задание токенов
    //
    this._messageTokens[InArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[InArrayValidator.ERROR_CODES.NOT_IN_ARRAY] = 'Параметр "' +
        this._messageTokens[InArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + ' имеет недопустимое значение';
}
$util.inherits(InArrayValidator, SwiftValidator);

/**
 * Задание массива значений
 *
 * @param {Array} array массив значений
 *
 * @returns {InArrayValidator}
 */
InArrayValidator.prototype.setArray = function setArray (array)
{
    //
    // проверка параметров
    //
    if (!$swiftUtils.type.isArray(array))
        throw new $swiftErrors.TypeError('не удалось задать массив значений параметра в "' + this._validatorName + '". Недопустимый тип значения (ожидается: "array", принято: "' + typeof array + '")');
    //
    // задание значения
    //
    this._array = array;

    return this;
};

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {InArrayValidator}
 */
InArrayValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (this._array === null)
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задан массив значений параметра');

    if (!~this._array.indexOf(value))
    {
        this._message = this.getMessageTemplate(InArrayValidator.ERROR_CODES.NOT_IN_ARRAY)
            .replace(
                this.getMessageToken(InArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
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
InArrayValidator.ERROR_CODES = {
    NOT_IN_ARRAY: 'NOT_IN_ARRAY'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
InArrayValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.InArrayValidator = InArrayValidator;