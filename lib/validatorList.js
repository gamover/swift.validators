/**
 * Created by G@mOBEP
 *
 * Email:   rusmiran@gmail.com
 * Company: RealWeb
 * Date:    23.05.13
 * Time:    14:57
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    $swiftErrors = require('swift.errors'),

    MultipleValidator = require('./multipleValidator').MultipleValidator,
    SwiftValidator = require('./swiftValidator').SwiftValidator;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ValidatorList (paramName)
{MultipleValidator.call(this, paramName);
    /**
     * Список валидаторов
     *
     * @type {[SwiftValidator]|Array}
     * @private
     */
    this._validatorList = [];
}
$util.inherits(ValidatorList, MultipleValidator);

/**
 * Задание списка валидаторов
 *
 * @param {[SwiftValidator]} validatorList список валидаторов
 *
 * @returns {ValidatorList}
 */
ValidatorList.prototype.setValidatorList = function setValidatorList (validatorList)
{
    //
    // проверка параметров
    //
    if (!$swiftUtils.type.isArray(validatorList))
        throw new $swiftErrors.TypeError('Недопустимый тип списка валидаторов (ожидается: "array", принято: "' + typeof validatorList + '").');
    for (var i = 0, n = validatorList.length; i < n; i++)
        if (!(validatorList[i] instanceof SwiftValidator))
            throw new $swiftErrors.TypeError('Недопустимый тип валидатора validatorList[' + i + '] (ожидается: "SwiftValidator", принято: "' + typeof validatorList[i] + '").');
        else if (validatorList[i].getParamName() === null)
            validatorList[i].setParamName(this.getParamName());
    //
    // задание списка валидаторов
    //
    this._validatorList = validatorList;

    return this;
};

/**
 * Добавление валидатора в список валидаторов
 *
 * @param {SwiftValidator} validator валидатор
 *
 * @returns {ValidatorList}
 */
ValidatorList.prototype.addValidator = function addValidator (validator)
{
    //
    // проверка параметров
    //
    if (!(validator instanceof SwiftValidator))
        throw new $swiftErrors.TypeError('Недопустимый тип валидатора (ожидается: "SwiftValidator", принято: "' + typeof validator + '").');
    //
    // задание имени параметра валидатору
    //
    if (validator.getParamName() === null) validator.setParamName(this.getParamName());
    //
    // добавление валидатора
    //
    this._validatorList.push(validator);

    return this;
};

/**
 * Получение списка валидаторов
 *
 * @returns {[SwiftValidator]|Array}
 */
ValidatorList.prototype.getValidatorList = function getValidatorList ()
{
    return this._validatorList;
};

/**
 * Валидация данных
 *
 * @param {*} data данные
 *
 * @returns {ValidatorList}
 */
ValidatorList.prototype.validate = function validate (data)
{
    var self = this;
    //
    // валидация параметра всеми валидаторами
    //
    this._validatorList.forEach(function (validator)
    {
        if (!validator.validate(data).isValid())
        {
            if (validator instanceof MultipleValidator)
            {
                self._errorList   = self._errorList.concat(validator.getErrorList());
                self._messageList = self._messageList.concat(validator.getMessageList());
            }
            else
            {
                self._errorList.push(validator.getError());
                self._messageList.push(validator.getMessage());
            }
        }
    });
    //
    ////
    //
    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.ValidatorList = ValidatorList;