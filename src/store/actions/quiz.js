import axios from '../../axios/axios-quiz'
import {FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json', )
            const quizes = []
            Object.keys(response.data).forEach((key,index)=>{
                quizes.push({
                    id:key,
                    name: `Test #${index+1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch(e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId){
    return async dispatch  => {
        dispatch(fetchQuizesStart())

        try{
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch(e){
            dispatch(fetchQuizesError(e))
        }
        // console.log('quiz ID = ', this.props.match.params.id)
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart(){
    return{
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e){
    return{
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {
        const state = getState().quiz
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results


        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]:'success'},
                results:results
            })

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished:true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results:results
            })
        }
    }
}
