import React from 'react'
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import {Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Layout>
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/quiz-creator" component={QuizList}/>
            <Route path="/quiz/:id" component={Quiz}/>
            <Route path="/" component={QuizList}/>
        </Switch>
    </Layout>
  );
}

export default App;
