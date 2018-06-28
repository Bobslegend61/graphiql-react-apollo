import React from 'react'
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import "./Todos.css";

import { GET_TODOS, CHECK_TODO, GET_USER } from "../../graphql";
import { Loading, Level  } from "../index";

const Todos = ({ match }) => {
    let query = match.params.userId ? GET_USER : GET_TODOS;
  return (
    <Query
        query={ query }
        variables={ match.params.userId ? { id: match.params.userId } : {} }
    >
        { ({ loading, error, data }) => {
            let d = match.params.userId ? data.user : data;
            let addTodo = <Link to={ `/todos/${ match.params.userId }/create` }>Add Todo</Link>;
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;
      
            let total = d.todos.length;
            let complatedLenth = d.todos.filter(todo => todo.completed === true).length;
            let percentCompleted = ((complatedLenth / total) * 100) + "%";
            let notPercentCompleted = (100 - ((complatedLenth / total) * 100)) + "%";

            return (
                <div id="Todos">
                    <div className="header">
                        <h1>{  match.params.userId ? d.name+"'s Todos" : "Todos" }</h1>
                        { match.params.userId ? addTodo : "" }
                    </div>
                    <br />
                   <Level percentCompleted={ percentCompleted } notPercentCompleted={ notPercentCompleted } />
                    <ul>
                        { 
                            d.todos.map(({ id, userId, title, completed }) => (
                                <li key={ id } style={ { borderBottom: completed ? "1px solid #7481FF" : "1px solid #B28C00" } }>
                                    <div className="todos">
                                      <Mutation
                                        mutation={ CHECK_TODO }
                                      >
                                       { (edittodo) => (
                                         <input type="checkbox" checked={ completed ? "checked" : "" } onChange={ e => edittodo({ variables: { id, userId, title, completed: !completed } }) }/>
                                       ) }
                                      </Mutation>
                                      &nbsp;&nbsp;
                                      <Link to={ "/todos/"+userId }>{ title }</Link>
                                    </div>
                                    <div className="icons">
                                        <Link to={ "/edittodo/"+id }><i className="material-icons edit" title="Edit this todo">edit</i></Link>
                                        <i className="material-icons delete" title="Delete this todo">delete</i>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            );
        } }
    </Query>
  )
}

export default Todos;

