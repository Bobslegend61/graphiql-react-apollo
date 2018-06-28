import React from 'react';
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import "./Comments.css";
import { GET_COMMENTS } from "../../graphql";
import { Loading } from "../index";

const Comments = () => {
  return (
    <Query
        query={ GET_COMMENTS }
    >
        { ({ loading, error, data: { comments } }) => {
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;


            return(
                <div id="Comments">
                    <h1>Comments</h1>
                    <ul>
                        { 
                            comments.map(({ id, body, email, userId }) => (
                                <li key={ id }>
                                    <div className="comments"><Link to={ "/commwnts/"+id }>{ body }</Link></div>
                                    <div className="user"><Link to={ `/users/${ userId }` }>{ email }</Link></div>
                                    <div className="icons">
                                        <Link to={ "/editcomments/"+id }><i className="material-icons edit" title="Edit this comment">edit</i></Link>
                                        <i className="material-icons delete" title="Delete this comment">delete</i>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        } }
    </Query>
  )
}

export default  Comments;
