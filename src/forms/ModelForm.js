import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import FormHeader from 'FormHeader'
import styled from 'styled-components'
import LabelInput, { HeaderLabel } from 'LabelInput'
import LabelTextarea from 'LabelTextarea'
import { SMALL, renderError, getErrors, haveError, getChanges, haveChanges, MODEL_INTEGRITY } from 'FormHelper'
import DatePicker from 'react-datepicker';
import moment from 'moment'
import { DefaultButton } from 'Buttons'
import { cloneDataObj, getFullnameNew, getDoctorFullname } from 'dataHelper'
import SelectorExNew from 'SelectorExNew'
import LabelSelectorExNew from 'LabelSelectorExNew'
import FormOverlay from 'FormOverlay'
import Form from 'Form'
import { NBSP } from 'Constants'

export default class ModelForm extends Component {

    static propTypes = {
        task: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            task: props.task,
            pristineTask: cloneDataObj(props.task),
            errors: ""
        }
    }

    render() {
        let { onClose } = this.props
        const { task, pristineTask, errors } = this.state
        const { name, description, place, due } = task

        const dueDateM = due ? moment(due) : null
        const changes = getChanges(pristineTask, task)

        let title = ''
        if (!task.id || task.id === -1) {
            title = task.description || 'Nouvelle tâche'
        }

        return (
            <Fragment>
                <FormOverlay parent={$(document.body)[0]} zIndex={100} />
                <Form parent={$(document.body)[0]} zIndex={101}>
                    <FormInnerBox className="task-edit">
                        <FormHeader caption={title || NBSP} onClose={onClose} />

                        <FormBody>

                            {/*<LabelSelectorExNew
                                style={ { width: "49%", float: "left" } }
                                size={SMALL}
                                caption="CABINET"
                                className="practice"
                                clearable={false}
                                onChange={this.onChangePractice}
                                options={this.getPracticeOptions()}
                                value={practiceId}
                                name="practice"
                            />

                            <div>
                                <HeaderLabel>DATE DUE</HeaderLabel>
                                <DatePicker
                                    size={SMALL}
                                    className="due-date"
                                    selected={dueDateM}
                                    locale="fr"
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    onChange={this.onChangeDate}
                                />
                            </div>
                            <LabelTextarea size={SMALL}
                                caption="DESCRIPTION" name="description" value={description} onChange={this.onChange} />
                            */}

                            <LabelInput size={SMALL} caption="Name" name="name" value={name} onChange={this.onChange} />

                            <Errors>{renderError(errors)}</Errors>
                            <SaveBtn className="pull-right" onClick={this.onSave} disabled={/*updating || haveError(errors) || */!haveChanges(changes)}>
                                ENREGISTRER
                            </SaveBtn>
                        </FormBody>

                    </FormInnerBox>
                </Form>
            </Fragment>
        )
    }

    onChange = (id, value) => {
        const { task } = this.state
        task[id] = value
        this.setState({ task, errors: null })
    }

    onChangeStatus = selected => {
        const { task } = this.state
        task.status = selected.value
        this.setState({ task, errors: null })
    }

    onChangeNotes = notes => {
        const { task } = this.state
        task.notes = notes
        this.setState({ task, errors: null })
    }

    onChangeDate = dueDate => {
        const { task } = this.props
        task.dueDate = moment(dueDate).format('YYYY-MM-DD')
        this.setState({ task, errors: null })
    }

    onChangePractice = selected => {
        const { task } = this.props
        task.practiceId = selected.value
        this.setState({ task, errors: null })
    }

    onSave = () => {
        const errors = getErrors(this.state.task, validations)
        if (haveError(errors)) {
            this.setState({ errors })
        } else {
            this.props.onSave(this.state.task)
        }
    }

}

const SearchLabelInput = styled(LabelInput)`
    float: left;
`
const FormBody = styled.div`
    padding: 20px;
`
const SaveBtn = styled(DefaultButton)`
    margin-top: 18px;
    margin-bottom: 18px;
    clear: both;
    margin-bottom: 10px;
`
const Errors = styled.div`
    color: red;
    position: absolute;
    bottom: 26px;
    left: 24px;
`
const FormInnerBox = styled.div`
    position: absolute;
    width: 700px;
    left: 50%;
    margin-left: -350px;
    top: 100px;
    z-index: 10;
    background-color: white;
    border-radius: 7px;
    .react-datepicker-wrapper {
        width: 100%;
        .react-datepicker__input-container {
            width: 100%;
            input {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #d8dadb;
                padding: 4px 10px;
                font-size: 13px;
            }
        }
    }

`

export const validations = {
    name: model => {
        return ""
    },
    place: model => {
        const place = model.place
        if (!place.street1 && !place.street2) {
            return 'Need a street'
        }
    },
    [MODEL_INTEGRITY]: model => {
        if (!model.hasOwnProperty('status')) {
            return "Veuillez spécifier le statut"
        }
        if (!model.hasOwnProperty('practiceId')) {
            return "Veuillez spécifier le cabinet"
        }

    }
}


export const showModelForm = () => {
    const $container = $('<div class="person-file-container" style="position:absolute;top:0;left: 300px; width; 300px;height:300px;" ></div>');
    $(document.body).append($container);
    const initialTask = {
        name: "First Thing To Do",
        description: null,
        due: null,
        place: {
            city: "Paris",
            country: "France"
        }
    }

    ReactDOM.render(<ModelForm task={initialTask}/>, $container[0])
}
