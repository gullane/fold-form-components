import React from 'react'
import ModelForm0 from './forms/ModelForm0';
import styled from 'styled-components'
import './App.css'

function App() {
    return (
        <AppBox>
            <FormContainer>
                <ModelForm0 />
            </FormContainer>
        </AppBox>
    );
}

export default App;

// >

const AppBox = styled.div`
    background-color: #333;
    min-height: 100vh;
    display: flex;           /* establish flex container */
    flex-direction: column;  /* make main axis vertical */
    justify-content: center; /* center items vertically, in this case */
    align-items: center;     /* center items horizontally, in this case */
    height: 300px;
`
const FormContainer = styled.div`
    width: 400px;
    border: 1px solid #999;
    border-radius: 10px;
    background-color: #EEE;
`