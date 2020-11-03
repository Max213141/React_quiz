import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {},
        isFinished:false,
        activeQuestion:0,
        answerState: null,
        quiz: [
            {
                rightAnswerId: 1,
                question: 'What is color of sky',
                id:1,
                answers:[
                    {text:'blue', id:1},
                    {text:'white', id:2},
                    {text:'black', id:3},
                    {text:'grey', id:4}
                ]
            },

            {
                rightAnswerId: 4,
                question: 'How old are you?',
                id:2,
                answers:[
                    {text:'<15', id:1},
                    {text:'<20', id:2},
                    {text:'<25', id:3},
                    {text:'<35', id:4}
                ]
            },
        ],
    }

    onAnswerClickHandler = answerId => {
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

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler= () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount(){
       console.log('quiz ID = ', this.props.match.params.id)
    }

    render() {
        return(
            <div className = {classes['Quiz']}>
                <div className = {classes['QuizWrapper']}>
                    <h1>Answer on all questions</h1>

                    {
                       this.state.isFinished
                           ? <FinishedQuiz
                                results = {this.state.results}
                                quiz = {this.state.quiz}
                                onRetry = {this.retryHandler}
                             />
                           : <ActiveQuiz
                               answers={this.state.quiz[this.state.activeQuestion].answers}
                               question={this.state.quiz[this.state.activeQuestion].question}
                               onAnswerClick = {this.onAnswerClickHandler}
                               quizLength={this.state.quiz.length}
                               answerNumber={this.state.activeQuestion + 1}
                               state ={this.state.answerState}
                           />
                    }
                </div>
            </div>
        )
    }
}
export default Quiz
