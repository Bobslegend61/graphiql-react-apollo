import React from 'react';
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import "./UserDetails.css";
import { GET_USER } from "../../graphql";
import { Loading } from "../index";


const UserDetails = ({ match: { params: { id } } }) => {
  return (
    <Query
        query={ GET_USER }
        variables={ { id } }
    >
        { ({ loading, error, data: { user } }) => {
            if(loading) return <Loading />;
            if(error) return `Something wnt wrong ${ error }`;
            return (
                <div className="UserDetails">
                    <div className="header">
                        <h1>{ user.username }<sub><Link to={ `/posts/${ user.id }` }>{ user.posts.length } Posts</Link></sub></h1>
                        <span><Link to={ `/todos/${ user.id }` }>{ user.todos.length } Todos:</Link> <small>{ user.todos.filter(todo => todo.completed === true).length } Completed</small></span>
                    </div>
                    <ul>
                        <li>
                            <h3>Personal info</h3>
                            <p>Name: { user.name }</p>
                            <p>Email: { user.email }</p>
                            <p>Phone: { user.phone }</p>
                            <p>Website: <a href={ "https://www."+user.website }>{ user.website }</a></p>
                        </li>
                        <li>
                            <h3>Address</h3>
                            <p>Street: { user.address.street }</p>
                            <p>Suite: { user.address.suite }</p>
                            <p>City: { user.address.city }</p>
                            <p>Zipcode: { user.address.zipcode }</p>
                            <p>Geolocation: { user.address.geo.lat }, { user.address.geo.lng }</p>
                        </li>
                        <li>
                            <h3>Company</h3>
                            <p>{ user.company.name }<sub>({ user.company.catchPhrase })</sub></p>
                            <p><strong>What we do:</strong> { user.company.bs }</p>
                        </li>
                    </ul>
                    <Link to={ `/users/${ user.id }/edit` } className="edit" title="Edit User"><i className="material-icons">edit</i></Link>
                </div>
            )
        } }
    </Query>
  )
}

export default UserDetails;