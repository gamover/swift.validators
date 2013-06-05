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

function RegExpValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'regExpValidator' + countValidators;

    /**
     * Необходимое значение
     *
     * @type {RegExp|null}
     * @private
     */
    this._regexp = null;
    //
    // задание токенов
    //
    this._messageTokens[RegExpValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[RegExpValidator.ERROR_CODES.NOT_VALID] = 'Значение параметра "' +
        this._messageTokens[RegExpValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" не соответствует регулярному выражению';
}
$util.inherits(RegExpValidator, SwiftValidator);

/**
 * Задание регулярного выражения
 *
 * @param {RegExp} regexp регулярное выражение
 *
 * @returns {MaxLengthValidator}
 */
RegExpValidator.prototype.setRegexp = function setRegexp (regexp)
{
    //
    // проверка параметров
    //
    if (!$swiftUtils.type.isRegExp(regexp))
        throw new $swiftErrors.TypeError('не удалось задать регулярное выражение в "' + this._validatorName + '". Недопустимый тип регулярного выражения (ожидается: "RegExp", принято: "' + typeof regexp + '")');
    //
    // задание значения
    //
    this._regexp = regexp;

    return this;
};

/**
 * Валидация
 *
 * @param {String} value значение
 *
 * @returns {RegExpValidator}
 */
RegExpValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (typeof this._regexp === 'undefined')
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано регулярное выражение');

    if (typeof value !== 'string') return this;

    if (!value.match(this._regexp))
    {
        this._message = this.getMessageTemplate(RegExpValidator.ERROR_CODES.NOT_VALID)
            .replace(
                this.getMessageToken(RegExpValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
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
RegExpValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
RegExpValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.RegExpValidator = RegExpValidator;