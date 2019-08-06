import React, { Component } from 'react'
import LabelInput from '../components/LabelInput'
import { DISABLED_STYLE, MEDIUM, getErrors, haveError, MODEL_INTEGRITY as MODEL, renderError } from '../components/FormHelper'
import styled from 'styled-components'
import { DefaultButton } from '../components/Buttons'
import _ from 'lodash'

export default class ModelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            model: {
                firstname: "",
                nickname: "",
                place: {
                    zip: ''
                },
                password: '',
                passwordConfirm: '',
            },
            touched: {}
        }
    }

    render() {
        const { model, errors, touched, saving } = this.state
        const { firstname, nickname, password, passwordConfirm, place } = model
        const props = { errors, touched, onChange: this.onChange, size: MEDIUM }

        return (
            <FormBox disabled={saving}>

                <FormElementBox>
                    <span>Error shown as border, not shown as text</span>
                    <LabelInput {...props} options={ { showErrorAsBorder: true, hideErrorText: true } } value={firstname} name="firstname" caption="First name"  />
                </FormElementBox>

                <FormElementBox>
                    <span>Error shown as text</span>
                    <LabelInput {...props} value={nickname} name="nickname" caption="Nickname" />
                </FormElementBox>

                <FormElementBox>
                    <LabelInput {...props} value={_.get(place, 'zip')} name="place.zip" caption="Zip code" />
                </FormElementBox>

                <FormElementBox>
                    <LabelInput {...props} value={password} name="password" caption="Password code" />
                </FormElementBox>

                <FormElementBox>
                    <LabelInput {...props} value={passwordConfirm} name="passwordConfirm" caption="Confirm password" />
                </FormElementBox>

                <SaveBtn onClick={this.onSubmit}>Submit</SaveBtn>
                <Errors>{renderError(errors)}</Errors>
            </FormBox>
        )
    }

    onChange = (id, value) => {
        const model = _.assign({}, this.state.model)
        _.set(model, id, value)
        const touched = this.state.touched
        _.set(touched, id, true)
        this.setState({ touched, model, errors: getErrors(model, validations) })
    }

    onSubmit = () => {
        const { model } = this.state
        const errors = getErrors(model, validations)
        if (haveError(errors)) {
            this.setState({ errors })
        } else {
            console.log('saving:' + JSON.stringify(model))
            this.setState({ saving: true })
            setTimeout(() => {
                this.setState({ saving: false })
            }, 3000)
        }
    }

}

// >

const FormBox = styled.div`
    ${props => props.disabled ? DISABLED_STYLE : ''}
`
const FormElementBox = styled.div`
    background-color: #DCDCDC;
    &:nth-child(odd) {
        background-color: #bfbfbf;
    }
    padding: 30px;
`
const SaveBtn = styled(DefaultButton)`
    margin-top: 18px;
    margin-bottom: 18px;
    clear: both;
    margin-bottom: 10px;
`
const Errors = styled.div`
    color: red;
`

// >

export const validations = {
    firstname: model => {
        const firstname = _.get(model, 'firstname')
        const nickname = _.get(model, 'nickname')
        if (nickname.length === 0) {
            if (firstname.length < 2) {
                return "First name name should be at least 2 characters"
            }
            if (firstname.length > 5) {
                return "First name name cannot be > 5 characters"
            }
        }
    },
    nickname: model => {
        const nickname = _.get(model, 'nickname')
        const firstname = _.get(model, 'firstname')
        if (firstname.length === 0) {
            if (nickname.length < 2) {
                return "Nickname name should be at least 2 characters"
            }
        }
    },
    place: model => {
        const zip = _.get(model, 'place.zip')
        if (!zip) {
            return 'Please type a zip code'
        }
    },
    password: model => {
        //const passwordConfirm = _.get(model, 'passwordConfirm')
    },
    passwordConfirm: model => {
        const passwordConfirm = _.get(model, 'passwordConfirm')
        const password = _.get(model, 'password')
        if (password !== passwordConfirm) {
            return 'Passwords must match'
        }
    },
    [MODEL]: model => {
        if (model.firstname.length > 0 && model.nickname.length > 0) {
            return "Don't specify both first and last names"
        }
    }
}