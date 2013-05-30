/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    13:42
 */

var $swiftErrors = require('swift.errors');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SwiftValidator (paramName)
{
    /**
     * Шаблоны сообщений
     *
     * @type {Object}
     * @private
     */
    this._messageTemplates = {};

    /**
     * Токены для подстановки в сообщение
     *
     * @type {Object}
     * @private
     */
    this._messageTokens = {};

    /**
     * Имя параметра
     *
     * @type {String|null}
     * @private
     */
    this._paramName = null;

    /**
     * Ошибка
     *
     * @type {SwiftError|null}
     * @private
     */
    this._error = null;

    /**
     * Сообщение
     *
     * @type {String|null}
     * @private
     */
    this._message = null;
    //
    // задание имени параметра
    //
    if (paramName) this.setParamName(paramName);
}

/**
 * Задание шаблона сообщения
 *
 * @param {String} errorCode код ошибки
 * @param {String} messageTemplate шаблон сообщения
 *
 * @returns {SwiftValidator}
 */
SwiftValidator.prototype.setMessageTemplate = function setMessageTemplate (errorCode, messageTemplate)
{
    //
    // валидация параметров
    //
    if (typeof errorCode !== 'string')
        throw new $swiftErrors.TypeError('Недопустимый тип кода ошибки (ожидается: "string", принято: "' + typeof errorCode + '").');
    if (!(errorCode in this._messageTemplates))
        throw new $swiftErrors.ValueError('Недопустимое значение кода ошибки (ожидается: "' + Object.keys(this._messageTemplates).join('"|"') + '", принято: "' + errorCode + '").');
    if (typeof messageTemplate !== 'string')
        throw new $swiftErrors.TypeError('Недопустимый тип шаблона сообщения (ожидается: "string", принято: "' + typeof messageTemplate + '").');
    //
    // задание шаблона сообщения
    //
    this._messageTemplates[errorCode] = messageTemplate;

    return this;
};

/**
 * Получение шаблона сообщения
 *
 * @param {String} errorCode код ошибки
 *
 * @returns {String|null}
 */
SwiftValidator.prototype.getMessageTemplate = function getMessageTemplate (errorCode)
{
    return (this._messageTemplates[errorCode] || null);
};

/**
 * Задание токена
 *
 * @param {String} tokenCode код токена
 * @param {String} token токен
 *
 * @returns {SwiftValidator}
 */
SwiftValidator.prototype.setMessageToken = function setMessageToken (tokenCode, token)
{
    //
    // проверка параметров
    //
    if (typeof tokenCode !== 'string')
        throw new $swiftErrors.TypeError('Недопустимый тип кода токена (ожидается: "string", принято: "' + typeof tokenCode + '").');
    if (!(tokenCode in this._messageTokens))
        throw new $swiftErrors.ValueError('Недопустимое значение кода токена (ожидается: "' + Object.keys(this._messageTokens).join('"|"') + '", принято: "' + tokenCode + '").');
    if (typeof token !== 'string')
        throw new $swiftErrors.TypeError('Недопустимый тип токена (ожидается: "string", принято: "' + typeof token + '").');
    if (!token.length)
        throw new $swiftErrors.ValueError('Недопустимое значение токена.');
    //
    // задание токена
    //
    this._messageTokens[tokenCode] = token;

    return this;
};

/**
 * Получение токена
 *
 * @param {String} tokenCode код токена
 *
 * @returns {String|null}
 */
SwiftValidator.prototype.getMessageToken = function getMessageToken (tokenCode)
{
    return (this._messageTokens[tokenCode] || null);
};

/**
 * Задание имени параметра
 *
 * @param {String} paramName имя параметра
 *
 * @returns {SwiftValidator}
 */
SwiftValidator.prototype.setParamName = function setParamName (paramName)
{
    //
    // проверка параметров
    //
    if (typeof paramName !== 'string')
        throw new $swiftErrors.TypeError('Недопустимый тип имени параметра (ожидается: "string", принято: "' + typeof paramName + '").');
    if (!paramName.length)
        throw new $swiftErrors.ValueError('Недопустимое значение имени параметра.');
    //
    // задание имени параметра
    //
    this._paramName = paramName;

    return this;
};

/**
 * Получение имени параметра
 *
 * @returns {String|null}
 */
SwiftValidator.prototype.getParamName = function getParamName ()
{
    return this._paramName;
};

/**
 * Валидация данных
 *
 * @param {*} data данные
 *
 * @returns {SwiftValidator}
 */
SwiftValidator.prototype.validate = function validate (data)
{
    return this;
};

/**
 * Проверка валидности данных
 *
 * @returns {Boolean}
 */
SwiftValidator.prototype.isValid = function isValid ()
{
    return !this._error;
};

/**
 * Получение ошибки
 *
 * @returns {SwiftError|null}
 */
SwiftValidator.prototype.getError = function getError ()
{
    return this._error;
};

/**
 * Получение сообщения
 *
 * @returns {String|null}
 */
SwiftValidator.prototype.getMessage = function getMessage ()
{
    return this._message;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.SwiftValidator = SwiftValidator;