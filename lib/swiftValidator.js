/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    13:42
 */

var $swiftErrors = require('swift.errors'),

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SwiftValidator (paramName)
{
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'swiftValidator' + countValidators;

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
 * Задание имени валидатора
 *
 * @param {String} validatorName имя валидатора
 *
 * @returns {SwiftValidator}
 */
SwiftValidator.prototype.setName = function setName (validatorName)
{
    //
    // проверка параметров
    //
    if (typeof validatorName !== 'string')
        throw new $swiftErrors.TypeError('не удалось изменить имя валидатору "' + this._validatorName + '". Недопустимый тип имени валидатора (ожидается: "string", принято: "' + typeof validatorName + '")');
    if (!validatorName.length)
        throw new $swiftErrors.ValueError('не удалось изменить имя валидатору "' + this._validatorName + '". Пустое значение имени валидатора');
    //
    // задание имени валидатора
    //
    this._validatorName = validatorName;

    return this;
};

/**
 * Получение имени валидатора
 *
 * @returns {String}
 */
SwiftValidator.prototype.getName = function getName ()
{
    return this._validatorName;
};

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
        throw new $swiftErrors.TypeError('не удалось задать шаблон сообщения в валидаторе "' + this._validatorName + '". Недопустимый тип кода ошибки (ожидается: "string", принято: "' + typeof errorCode + '")');
    if (!(errorCode in this._messageTemplates))
        throw new $swiftErrors.ValueError('не удалось задать шаблон сообщения в валидаторе "' + this._validatorName + '". Недопустимое значение кода ошибки (ожидается: "' + Object.keys(this._messageTemplates).join('"|"') + '", принято: "' + errorCode + '")');
    if (typeof messageTemplate !== 'string')
        throw new $swiftErrors.TypeError('не удалось задать шаблон сообщения в валидаторе "' + this._validatorName + '". Недопустимый тип шаблона сообщения (ожидается: "string", принято: "' + typeof messageTemplate + '")');
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
        throw new $swiftErrors.TypeError('не удалось задать токен в валидаторе "' + this._validatorName + '". Недопустимый тип кода токена (ожидается: "string", принято: "' + typeof tokenCode + '")');
    if (!(tokenCode in this._messageTokens))
        throw new $swiftErrors.ValueError('не удалось задать токен в валидаторе "' + this._validatorName + '". Недопустимое значение кода токена (ожидается: "' + Object.keys(this._messageTokens).join('"|"') + '", принято: "' + tokenCode + '")');
    if (typeof token !== 'string')
        throw new $swiftErrors.TypeError('не удалось задать токен в валидаторе "' + this._validatorName + '". Недопустимый тип токена (ожидается: "string", принято: "' + typeof token + '")');
    if (!token.length)
        throw new $swiftErrors.ValueError('не удалось задать токен в валидаторе "' + this._validatorName + '". Пустое значение токена');
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
        throw new $swiftErrors.TypeError('не удалось задать имя параметра в валидаторе "' + this._validatorName + '". Недопустимый тип имени параметра (ожидается: "string", принято: "' + typeof paramName + '")');
    if (!paramName.length)
        throw new $swiftErrors.ValueError('не удалось задать имя параметра в валидаторе "' + this._validatorName + '". Пустое значение имени параметра');
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