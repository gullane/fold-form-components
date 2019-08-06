import styled from 'styled-components'
import { buttonColor, buttonBorderColor, redText } from './colors'

const PADDING = {
    tiny: '3px 7px 1px 7px',
    small: '5px 10px',
    normal:  '6px 12px',
    large: '10px 16px'
}

const FONT_SIZE = {
    tiny: '11px',
    small: '12px',
    normal: '14px',
    large: '18px'
}

const LINE_HEIGHT = {
    tiny: 1.4,
    small: 1.5,
    normal: 1.42857143,
    large: 1.3333333
}

export const DefaultButton = styled.button.attrs(({ bgColor, tiny, small, large, danger, disabled }) => ({
    fontSize: small ? '12px' : '14px',
    size: tiny ? "tiny" : (small ? "small" : large ? "large" : "normal"),
    type: danger ? "danger" : "normal"
}))`
    padding: ${props => PADDING[props.size]};
    font-size: ${props => FONT_SIZE[props.size]};
    border-radius: ${props => props.size === "small" ? '3px' : props.size === "large" ? '6px' : '4px'};
    line-height: ${props => LINE_HEIGHT[props.size]};

    ${props => props.right ? 'float: right;' : ''}
    ${props => props.left ? 'float: left;' : ''}

    ${props => props.disabled ? `
        pointer-events: none;
        cursor: not-allowed;
        filter: alpha(opacity=45);
        -webkit-box-shadow: none;
        box-shadow: none;
        opacity: .45;
    `:``}

    color: #fff;
    background-color: ${props => props.bgColor ? props.bgColor : (props.type === "danger" ? 'red' : buttonColor)};
    border-color: ${props => props.type === "danger" ? redText : buttonBorderColor };

    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    text-transform: uppercase;
    outline: 0;
    box-shadow: none!important;
`