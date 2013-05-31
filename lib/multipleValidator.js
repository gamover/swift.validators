/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    17:50
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    $swiftErrors = require('swift.errors'),

    SwiftValidator = require('./swiftValidator').SwiftValidator,

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function MultipleValidator (paramName)
{SwiftValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'multipleValidator' + countValidators;

    /**
     * Список ошибок
     *
     * @type {[SwiftError]|Array}
     * @private
     */
    this._errorList = [];

    /**
     * Список сообщений
     *
     * @type {[String]|Array}
     * @private
     */
    this._messageList = [];
    //
    // задание токенов
    //
    this._messageTokens[MultipleValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] = '$_paramName_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[MultipleValidator.ERROR_CODES.NOT_VALID] = 'Валидация параметра "' +
        this._messageTokens[MultipleValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] + '" не пройдена.'
}
$util.inherits(MultipleValidator, SwiftValidator);

/**
 * Проверка валидности данных
 *
 * @returns {Boolean}
 */
MultipleValidator.prototype.isValid = function isValid ()
{
    return !this._errorList.length;
};

/**
 * Получение всех ошибок
 *
 * @returns {[SwiftError]|Array}
 */
MultipleValidator.prototype.getErrorList = function getErrorList ()
{
    return this._errorList;
};

/**
 * Получение ошибки
 *
 * @returns {SwiftError|null}
 */
MultipleValidator.prototype.getError = function getError ()
{
    if (this.isValid()) return null;

    return new $swiftErrors.MultipleError(
        this.getMessageTemplate(MultipleValidator.ERROR_CODES.NOT_VALID).replace(
            this.getMessageToken(MultipleValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
            (this._paramName ? this._paramName : '')
        )
    ).setList(this._errorList);
};

/**
 * Получение всех сообщений
 *
 * @returns {[String]|Array}
 */
MultipleValidator.prototype.getMessageList = function getMessageList ()
{
    return this._messageList;
};

/**
 * Получение первого сообщения
 *
 * @returns {String|null}
 */
MultipleValidator.prototype.getMessage = function getMessage ()
{
    if (this.isValid()) return null;

    return this._messageList.join('; ');
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
MultipleValidator.ERROR_CODES = {
    NOT_VALID: 'NOT_VALID'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
MultipleValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME: 'PARAM_NAME'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.MultipleValidator = MultipleValidator;