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

function NotNullValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'notNullValidator' + countValidators;

    //
    // задание токенов
    //
    this._messageTokens[NotNullValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[NotNullValidator.ERROR_CODES.SET_NULL] = 'Параметр "' +
        this._messageTokens[NotNullValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" имеет значение null';
}
$util.inherits(NotNullValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {NotNullValidator}
 */
NotNullValidator.prototype.validate = function validate (value)
{
    if (value === null)
    {
        this._message = this.getMessageTemplate(NotNullValidator.ERROR_CODES.SET_NULL).replace(
            this.getMessageToken(NotNullValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
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
NotNullValidator.ERROR_CODES = {
    SET_NULL: 'SET_NULL'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
NotNullValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.NotNullValidator = NotNullValidator;