import validator from './validator.js';

const formBlocked = (state) => {state.readonly = true}

const view = (state, elements) => {
    elements.form.addEventListener('sumbit', async(e) => {
        const url = elements.input.value;
        e.preventDefault();
        validator(state)
            .validator(url)
            .then(() => formBlocked(state))
    })
} 