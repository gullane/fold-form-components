import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from './Input'
import _ from 'lodash'
import styled from 'styled-components'
import { MEDIUM, cloakFormCaption } from './FormHelper'

export default class LabelInput extends Component {

    static propTypes = {
        className: PropTypes.string,
        size: PropTypes.object,
        onEscape: PropTypes.func,
        onGo: PropTypes.func,
        caption: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        inputWidth: PropTypes.string,
        style: PropTypes.object,
        labelStyle: PropTypes.object,
        inputStyle: PropTypes.object,
        getRef: PropTypes.func,
        errors: PropTypes.object,
        touched: PropTypes.object,
        options: PropTypes.object,
        placeholder: PropTypes.object
    }

    static defaultProps = {
        theme: "secondary",
        label: "Button Text",
        errors: {},
        size: MEDIUM
    }

    render() {
        const { placeholder, name, options = {}, touched, errors, className, size, caption, value, onChange, onGo, onEscape, inputWidth = '', labelStyle = {}, inputStyle = {}, getRef } = this.props
        const cloakedCaption = cloakFormCaption(caption)
        const { showErrorAsBorder, hideErrorText } = options
        const _inputStyle =  _.assign({}, inputStyle, { width: inputWidth || "100%" })
        const errorShowable = (errors && errors[name] && touched[name])
        if (showErrorAsBorder && errorShowable) {
            _inputStyle.borderColor = "red"
        }
        return (
            <Comp className={className}>
                <HeaderLabel style={_.assign({}, labelStyle, LabelStyle)}>{<span dangerouslySetInnerHTML={{__html: cloakedCaption }} />}</HeaderLabel>
                <Input
                    size={size}
                    style={_inputStyle}
                    onChange={e => onChange && onChange(name, e.target.value)}
                    placeholder={placeholder}
                    type="text"
                    ref={elem => (getRef ? getRef(elem) : null)}
                    onKeyDown={e => {
                        if (e.keyCode === 13 && onGo) onGo()
                        else if (e.keyCode === 27 && onEscape) onEscape() }}
                        value={value} />
                {(!hideErrorText && errorShowable) && <Error className="errors">{errors[name]}</Error>}
            </Comp>
        )
    }
}

// >

const LabelStyle = {
    display: "block",
    color: "#888",
    marginBottom: "0px"
}

export const HeaderLabel = styled.div`
    display: block;
    color: #888888;
    margin-bottom: 0px;
`
const Comp = styled.div`
`
const Error = styled.div`
    color: red;
    font-size: 0.8em;
`

// >
