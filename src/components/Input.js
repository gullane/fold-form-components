import styled from 'styled-components'

export default styled.input`
    font-size: ${props => props.size.fontSize} !important;
    height: ${props => props.size.height};
    background: ${props => props.theme.bgColor || "white"};
    color: ${props => props.theme.color || "black"};
    border: 1px solid #d8dadb;
    padding: 6px 12px 6px 12px;
    border-radius: ${props => props.theme.borderRadius || "5px"};
    box-shadow: none;
    outline: 0;
    box-sizing: border-box;
`

export const InputUnstyled = styled.input`
    font-size: ${props => props.size ? props.size.fontSize : undefined} !important;
    height: ${props => props.size.height};
    background: white;
    color: black;
    border: 1px solid #d8dadb;
    padding: 6px 12px 6px 12px;
    border-radius: 5px;
    box-shadow: none;
    outline: 0;
    background-image: url('') !important;
`
