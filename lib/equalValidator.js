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

function EqualValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'equalValidator' + countValidators;

    /**
     * Необходимое значение
     *
     * @type {*|null}
     * @private
     */
    this._needValue;
    //
    // задание токенов
    //
    this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.NEED_VALUE] = '$_needValue_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[EqualValidator.ERROR_CODES.NOT_EQUAL] = 'Значение параметра "' +
        this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" не эквивалентно значению "' +
        this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.NEED_VALUE] + '"';
}
$util.inherits(EqualValidator, SwiftValidator);

/**
 * Задание необходимого значения параметра
 *
 * @param {*} needValue необходимое значение параметра
 *
 * @returns {MaxLengthValidator}
 */
EqualValidator.prototype.setNeedValue = function setNeedValue (needValue)
{
    //
    // задание значения
    //
    this._needValue = needValue;

    return this;
};

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {EqualValidator}
 */
EqualValidator.prototype.validate = function validate (value)
{
    //
    // проверка параметров
    //
    if (typeof this._needValue === 'undefined')
        throw new $swiftErrors.TypeError('не удалось произвести валидацию значения параметра в "' + this._validatorName + '". Не задано необходимое значение параметра');

    if (value !== this._needValue)
    {
        this._message = this.getMessageTemplate(EqualValidator.ERROR_CODES.NOT_EQUAL)
            .replace(
                this.getMessageToken(EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(EqualValidator.MESSAGE_TOKEN_CODES.NEED_VALUE),
                this._needValue
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
EqualValidator.ERROR_CODES = {
    NOT_EQUAL: 'NOT_EQUAL'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
EqualValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME',
    NEED_VALUE: 'NEED_VALUE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.EqualValidator = EqualValidator;