import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-Xi7YDlBeqroPFJU0Fc8eKadX1jDXr2c'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-Xi7YDlBeqroPFJU0Fc8eKadX1jDXr2c'
        }
        const response = await axios.post(url,authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('User ID', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout())
        },time * 1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('User ID')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){

}

export function authSuccess(token) {
    return {
       type: AUTH_SUCCESS,
       token
    }
}