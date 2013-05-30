/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    14:54
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    $swiftErrors = require('swift.errors'),

    SwiftValidator = require('./swiftValidator').SwiftValidator;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function TypeValidator (paramName, type)
{SwiftValidator.call(this, paramName);
    /**
     * Тип параметра
     *
     * @type {String|null}
     * @private
     */
    this._type = null;
    //
    // задание токенов
    //
    this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.PARAM_NAME]          = '$_paramName_$';
    this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE]          = '$_paramType_$';
    this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE] = '$_receivedParamType_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[TypeValidator.ERROR_CODES.WRONG_TYPE] = 'Значение "' +
        this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] +
        '" должно иметь тип "' + this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE] +
        '" (принято: "' + this._messageTokens[TypeValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE] + '").';
    //
    // задание типа параметра
    //
    if (type) this.setType(type);
}
$util.inherits(TypeValidator, SwiftValidator);

/**
 * Задание типа параметра
 *
 * @param {String} type
 *
 * @returns {TypeValidator}
 */
TypeValidator.prototype.setType = function setType (type)
{
    var typesMap = {
        array:          'array',
        boolean:        'boolean',
        date:           'date',
        function:       'function',
        number:         'number',
        object:         'object',
        objectInstance: 'objectInstance',
        regexp:         'regexp',
        string:         'string'
    };
    //
    // проверка параметров
    //
    if (typeof type !== 'string')
        throw new $swiftErrors.TypeError('Тип параметра должен иметь тип "string" (принято: "' + typeof type + '").');
    if (!(type in typesMap))
        throw new $swiftErrors.ValueError('Тип параметра может принимать следующие значения: ' +
            Object.keys(typesMap).join(', ') + ' (принято: "' + type + '").');
    //
    // задание типа параметра
    //
    this._type = type;
    //
    ////
    //
    return this;
};

/**
 * Получение типа параметра
 *
 * @returns {String|null}
 */
TypeValidator.prototype.getType = function getType ()
{
    return this._type;
};

/**
 * Валидация
 *
 * @param {*} data данные
 *
 * @returns {SwiftValidator}
 */
TypeValidator.prototype.validate = function validate (data)
{
    var dataType = $swiftUtils.type.getType(data);
    //
    // проверка параметров
    //
    if (this._type === null) throw new $swiftErrors.SwiftError('Не задан тип параметра.');
    //
    // валидация параметра
    //
    if (dataType !== this._type)
    {
        this._message = this.getMessageTemplate(TypeValidator.ERROR_CODES.WRONG_TYPE)
            .replace(
                this.getMessageToken(TypeValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(TypeValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE),
                this._type
            )
            .replace(
                this.getMessageToken(TypeValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE),
                dataType
            );
        this._error = new $swiftErrors.TypeError(this._message);
    }
    //
    ////
    //
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
TypeValidator.ERROR_CODES = {
    WRONG_TYPE: 'WRONG_TYPE'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
TypeValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME:          'PARAM_NAME',
    PARAM_TYPE:          'PARAM_TYPE',
    RECEIVED_PARAM_TYPE: 'RECEIVED_PARAM_TYPE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.TypeValidator = TypeValidator;