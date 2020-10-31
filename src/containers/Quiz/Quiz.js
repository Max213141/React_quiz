import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
    state = {
        activeQuestion:0,
        quiz: [
            {
                rigthAnswerId: 1,
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
                rigthAnswerId: 4,
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

    onAnswerClickHandler = (answerId) => {
        console.log('AnsId', answerId)

        this.setState({
            activeQuestion: this.state.activeQuestion + 1
        })
    }

    render() {
        return(
            <div className = {classes['Quiz']}>
                <div className = {classes['QuizWrapper']}>
                    <h1>Answer on all questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                    />
                </div>
            </div>
        )
    }
}
export default Quiz
