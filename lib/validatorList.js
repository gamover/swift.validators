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
    SwiftValidator = require('./swiftValidator').SwiftValidator,

    countValidators = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ValidatorList (paramName)
{MultipleValidator.call(this, paramName);
    countValidators++;

    /**
     * Имя валидатора
     *
     * @type {String}
     * @private
     */
    this._validatorName = 'validatorList' + countValidators;

    /**
     * Список валидаторов
     *
     * @type {[SwiftValidator]|Array}
     * @private
     */
    this._validatorList = [];

    /**
     * Флаг остановки процесса валидации в случае провала валидации в одном из валидаторов из набора
     *
     * @type {Boolean}
     * @private
     */
    this._stopIfError = true;
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
        throw new $swiftErrors.TypeError('не удалось задать список валидаторов в "' + this._validatorName + '". Недопустимый тип списка валидаторов (ожидается: "array", принято: "' + typeof validatorList + '")');
    for (var i = 0, n = validatorList.length; i < n; i++)
        if (!(validatorList[i] instanceof SwiftValidator))
            throw new $swiftErrors.TypeError('не удалось задать список валидаторов в "' + this._validatorName + '". Недопустимый тип валидатора validatorList[' + i + '] (ожидается: "SwiftValidator", принято: "' + typeof validatorList[i] + '")');
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
        throw new $swiftErrors.TypeError('не удалось добавить валидатор в "' + this._validatorName + '". Недопустимый тип валидатора (ожидается: "SwiftValidator", принято: "' + typeof validator + '")');
    //
    // задание имени параметра валидатору
    //
    if (validator.getParamName() === null && this.getParamName() !== null) validator.setParamName(this.getParamName());
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
 * Задание флага остановки валидации
 *
 * @param {Boolean} flag флаг
 *
 * @returns {ValidatorList}
 */
ValidatorList.prototype.stopIfError = function stopIfError (flag)
{
    //
    // проверка параметров
    //
    if (typeof flag !== 'boolean')
        throw new $swiftErrors.TypeError('не удалось задать флаг остановки валидации в "' + this._validatorName + '". Недопустимый тип флага (ожидается: "boolean", принято: "' + typeof flag + '")');
    //
    // задание флага
    //
    this._stopIfError = flag;

    return this;
};

/**
 * Валидация
 *
 * @param {*} value значение
 *
 * @returns {ValidatorList}
 */
ValidatorList.prototype.validate = function validate (value)
{
    var self = this;
    //
    // валидация параметра всеми валидаторами
    //
    for (var i = 0, n = this._validatorList.length; i < n; i++)
    {
        var validator = this._validatorList[i];

        if (!validator.validate(value).isValid())
        {
            if (validator instanceof MultipleValidator)
            {
                this._errorList   = this._errorList.concat(validator.getErrorList());
                this._messageList = this._messageList.concat(validator.getMessageList());
            }
            else
            {
                this._errorList.push(validator.getError());
                this._messageList.push(validator.getMessage());
            }

            if (this._stopIfError) break;
        }
    }
    //
    ////
    //
    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.ValidatorList = ValidatorList;