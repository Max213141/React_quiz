export function createControl(config, validation){
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export  function validate(value, validation=null) {
    if(!validation){
        return true
    }

    let isValid = true

    if(validation.required) { //82 lesson of course
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function validateForm(formControls) {
    let isFormValid=true

    for(let control in formControls){
        if(formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}