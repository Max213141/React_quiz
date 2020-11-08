import React, {Component} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import  axios from '../../axios/axios-quiz'
import Loader from "../../components/Loader/Loader";

export default class QuizList extends Component {
    state = {
        loading:true,
        quizes:[ ]
    }
    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){ //86 lesson of course
        try {
            const response = await axios.get('/quizes.json', )
            const quizes = []
            Object.keys(response.data).forEach((key,index)=>{
                quizes.push({
                    id:key,
                    name: `Test #${index+1}`
                })
            })

            this.setState({
                quizes, loading:false
            })
        } catch(e){
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes['QuizList']}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.state.loading
                            ? <Loader/>
                            : <ul>
                                 { this.renderQuizes() }
                              </ul>
                    }
                </div>
            </div>
        )
    }
}