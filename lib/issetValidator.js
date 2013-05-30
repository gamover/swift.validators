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

    SwiftValidator = require('./swiftValidator').SwiftValidator;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function IssetValidator (paramName)
{SwiftValidator.call(this, paramName);
    //
    // задание токенов
    //
    this._messageTokens[IssetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[IssetValidator.ERROR_CODES.NOT_SET] = 'Не задано значение параметра "' +
        this._messageTokens[IssetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '"';
}
$util.inherits(IssetValidator, SwiftValidator);

/**
 * Валидация
 *
 * @param {*} data данные
 *
 * @returns {IssetValidator}
 */
IssetValidator.prototype.validate = function validate (data)
{
    if (typeof data === 'undefined')
    {
        this._message = this.getMessageTemplate(IssetValidator.ERROR_CODES.NOT_SET).replace(
            this.getMessageToken(IssetValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
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
IssetValidator.ERROR_CODES = {
    NOT_SET: 'NOT_SET'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
IssetValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.IssetValidator = IssetValidator;