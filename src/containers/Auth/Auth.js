import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'

export default class Auth extends Component{

    state={
        isFormValid: false,

        formControls: {
            email:{
               value:'',
                type:'email',
                label:'Email',
                errorMessage:'Enter correct Email',
                valid: false,
                touched: false,
                validation:{
                   required:true,
                   email:true
                }
            },
            password:{
                value:'',
                type:'password',
                label:'Password',
                errorMessage:'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = async ()=>{
        const authData = {
            email:this.state.formControls.email.value,
            password:this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-Xi7YDlBeqroPFJU0Fc8eKadX1jDXr2c', authData)
            console.log(response.data)
        } catch(e){
            console.log(e)
        }
    }

    registerHandler= async ()=>{
        const authData = {
            email:this.state.formControls.email.value,
            password:this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-Xi7YDlBeqroPFJU0Fc8eKadX1jDXr2c',authData)
            console.log(response.data)
        } catch(e){
            console.log(e)
        }
    }

    submitHandler=event=>{
        event.preventDefault()
    }

    validateControl(value, validation) { // 77 Lesson of course
        let isValid = true
        if(!validation){
            return true
        }
        if (validation.required){
            isValid=value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid = is.email(value) && isValid
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler=(event, controlName)=>{

        const formControls={...this.state.formControls}
        const control={...formControls[controlName]}

        control.value = event.target.value
        control.touched=true
        control.valid=this.validateControl(control.value, control.validation)

        formControls[controlName]=control

        let isFormValid = true

        Object.keys(formControls).forEach(name =>{ //78 lesson of course
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs(){
         return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
             return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event=>this.onChangeHandler(event, controlName)}
                />
            )
        })
        // console.log(inputs)
    }

    render(){
        return(
            <div className={classes['Auth']}>
                <div>
                    <h1>Auth</h1>

                    <form onSubmit={this.submitHandler} className={classes['AuthForm']}>

                        {this.renderInputs()}

                        <Button type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                        >Login</Button>

                        <Button type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                        >Sing in</Button>
                    </form>
                </div>
            </div>
        )
    }
}
