import React from 'react'
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import "./Users.css";

import { GET_USERS } from "../../graphql";
import { Loading  } from "../index";

const Users = (props) => {
  return (
    <Query
        query={ GET_USERS }
    >
        { ({ loading, error, data: { users } }) => {
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;
      
            return (
                <div id="Users">
                    <div className="header">
                        <h1>Users</h1>
                        <Link to="/users/create">Add User</Link>
                    </div>
                    <ul>
                        { 
                            users.map(({ id, name }) => (
                                <li key={ id }>
                                    <div className="names"><Link to={ "/users/"+id }>{ name }</Link></div>
                                    <div className="icons">
                                        <Link to={ "/edituser/"+id }><i className="material-icons edit" title="Edit this user">edit</i></Link>
                                        <i className="material-icons delete" title="Delete this user">delete</i>
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

export default Users;
