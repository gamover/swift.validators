/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    24.05.13
 * Time:    12:43
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    $swiftErrors = require('swift.errors'),

    MultipleValidator = require('./multipleValidator').MultipleValidator,
    typeValidator = new (require('./typeValidator').TypeValidator)(),

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function TypesArrayValidator (paramName, type)
{MultipleValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'typesArrayValidator' + countValidators;

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
    this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME]          = '$_paramName_$';
    this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE]          = '$_paramType_$';
    this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE] = '$_receivedParamType_$';
    //
    // задание шаблонов сообщений
    //
    this._messageTemplates[TypesArrayValidator.ERROR_CODES.WRONG_TYPE] = 'Значение "' +
        this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME] +
        '" должно иметь тип "' + this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE] +
        '" (принято: "' + this._messageTokens[TypesArrayValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE] + '").';
    //
    // задание типа параметра
    //
    if (type) this.setType(type);
}
$util.inherits(TypesArrayValidator, MultipleValidator);

/**
 * Задание типа параметра
 *
 * @param {String} type
 *
 * @returns {TypesArrayValidator}
 */
TypesArrayValidator.prototype.setType = typeValidator.setType;

/**
 * Получение типа параметра
 *
 * @returns {String|null}
 */
TypesArrayValidator.prototype.getType = typeValidator.getType;

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {SwiftValidator}
 */
TypesArrayValidator.prototype.validate = function validate (value)
{
    var message;
    //
    // проверка параметров
    //
    if (this._type === null) throw new $swiftErrors.SystemError('не удалось провалидировать данные в валидаторе "' + this._validatorName + '". Не задан тип параметра');
    //
    // валидация массива
    //
    if (!$swiftUtils.type.isArray(value))
    {
        message = this.getMessageTemplate(TypesArrayValidator.ERROR_CODES.WRONG_TYPE)
            .replace(
                this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                (this._paramName ? this._paramName : '')
            )
            .replace(
                this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE),
                'array'
            )
            .replace(
                this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE),
                $swiftUtils.type.getType(value)
            );

        this._messageList.push(message);
        this._errorList.push(new $swiftErrors.TypeError(message));

        return this;
    }
    //
    // валидация элементов массива
    //
    for (var i = 0, n = value.length; i < n; i++)
    {
        var dataType = $swiftUtils.type.getType(value[i]);

        if (dataType !== this._type)
        {
            message = this.getMessageTemplate(TypesArrayValidator.ERROR_CODES.WRONG_TYPE)
                .replace(
                    this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_NAME),
                    (this._paramName ? this._paramName + '[' + i + ']' : 'param[' + i + ']')
                )
                .replace(
                    this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.PARAM_TYPE),
                    this._type
                )
                .replace(
                    this.getMessageToken(TypesArrayValidator.MESSAGE_TOKEN_CODES.RECEIVED_PARAM_TYPE),
                    dataType
                );

            this._messageList.push(message);
            this._errorList.push(new $swiftErrors.TypeError(message));
        }
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
TypesArrayValidator.ERROR_CODES = {
    WRONG_TYPE: 'WRONG_TYPE'
};

/**
 * Коды токенов
 *
 * @type {Object}
 */
TypesArrayValidator.MESSAGE_TOKEN_CODES = {
    PARAM_NAME:          'PARAM_NAME',
    PARAM_TYPE:          'PARAM_TYPE',
    RECEIVED_PARAM_TYPE: 'RECEIVED_PARAM_TYPE'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.TypesArrayValidator = TypesArrayValidator;