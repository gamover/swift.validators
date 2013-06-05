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

    //
    // задание токенов
    //
    this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.REFERENCE_VALUE] = '$_referenceValue_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[EqualValidator.ERROR_CODES.NOT_EQUAL] = 'Значение параметра "' +
        this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" не эквивалентно значению "' +
        this._messageTokens[EqualValidator.MESSAGE_TOKEN_CODES.REFERENCE_VALUE] + '"';
}
$util.inherits(EqualValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {*} value переданное значение
 * @param {*} referenceValue эталонное значение
 *
 * @returns {EqualValidator}
 */
EqualValidator.prototype.validate = function validate (value, referenceValue)
{
    if (value !== referenceValue)
    {
        this._message = this.getMessageTemplate(EqualValidator.ERROR_CODES.NOT_EQUAL)
            .replace(
                this.getMessageToken(EqualValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(EqualValidator.MESSAGE_TOKEN_CODES.REFERENCE_VALUE),
                referenceValue
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
    REFERENCE_VALUE: 'REFERENCE_VALUE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.EqualValidator = EqualValidator;