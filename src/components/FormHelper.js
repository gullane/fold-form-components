import _ from 'lodash'
import Joi from '@hapi/joi'
import React from "react";

export const copyObject = ob => JSON.parse(JSON.stringify(ob || {}))

export const TINY = { id: "TINY", fontSize: "10px", height: "24px", valMarginTop: "4px", arrowTop: "3px" }
export const SMALL = { id: "SMALL", fontSize: "11px", height: "28px", valMarginTop: "7px", arrowTop: "5px" }
export const MEDIUM = { id: "MEDIUM", fontSize: "12px", height: "36px", valMarginTop: "9px", arrowTop: "9px" }
export const LARGE = { id: "LARGE", fontSize: "11px", height: "40px", valMarginTop: "12px", arrowTop: "11px" }
export const MASSIVE = { id: "MASSIVE", fontSize: "40px", height: "45px", valMarginTop: "12px", arrowTop: "13px" }

export const MODEL_INTEGRITY = "MODEL_INTEGRITY"

export const getErrors = (model, validations) => {
    const errors = {}
    const getErrorsInner = (branch, parentKey) => {
        Object.entries(branch).forEach(field => {
            const path = parentKey ? parentKey + '.' : ''
            if (validations.hasOwnProperty(path + field[0])) {
                errors[path + field[0]] = validations[path + field[0]](model)
            }
            if (branch[field[0]] && typeof branch[field[0]] === 'object') {
                getErrorsInner(branch[field[0]], field[0])
            }
        })
        if (validations.hasOwnProperty(MODEL_INTEGRITY)) {
            errors[MODEL_INTEGRITY] = validations[MODEL_INTEGRITY](model)
        }
    }

    getErrorsInner(model)
    return errors
}

export const haveError = errors => !!_.size(_.filter(errors, _.some))

export const haveChanges = changes => !!_.size(_.filter(changes, _.some))

// Return result.
export const validate = (obj, schema) => {
    const result = Joi.validate(obj, schema);
    return result.error === null
}


export const getChanges = (initialValues, values) => {
    initialValues = copyObject(initialValues || {})
    values = copyObject(values || {})
    delete initialValues.relatives
    delete values.relatives

    const diff = difference(values, initialValues)
    _.each(diff, (item, key) => {
        if (typeof item === "object") {
            diff[key] = values[key]
        }
     })
    return diff
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
    function changes(object_, base_) {
        return _.transform(object_, function(result, value, key) {
            if (!_.isEqual(value, base_[key])) {
                result[key] = (_.isObject(value) && _.isObject(base_[key])) ? changes(value, base_[key]) : value;
            }
        });
    }
    return changes(object, base);
}


export const renderError = (errors, error) => {
    let e = error
    if (!error && _.size(errors)) {

        try {
            e = Object.values(_.pickBy(Object.values(errors), value => value && value.length > 0))[0]
        } catch (ee) {
            e = [Object.values(errors)[0]]
        }

    }
    if (e && _.get(e, '[0]') !== "CLEAR_ERROR") {
        return <div className="form-error">{e}</div>
    } else {
        return null
    }
}


// Prevent browsers putting autofill elements onto the form
// They do this when they see words like "zip", "name"
// Amongst other things they look at the "name" tag in the input and the value in the label element
// Setting autocomplete=["false"|""off"] doesn't work

// put characters in separate span elements
export const cloakFormCaption_ = caption => (<span>{_.map(caption, letter => <span>{letter}</span>)}</span>)

// use an invisible character
// "zero-width non-joiner" https://en.wikipedia.org/wiki/Zero-width_non-joiner
export const cloakFormCaption = caption => _.map(caption, letter => letter + '&zwnj;').join('')

export const DISABLED_STYLE = `
    pointer-events: none;
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .65;
`