import React from 'react'
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import "./Posts.css";

import { GET_POSTS, GET_USER } from "../../graphql";
import { Loading  } from "../index";

const Posts = ({ match }) => {
    let query = match.params.userId ? GET_USER : GET_POSTS;
  return (
    <Query
        query={ query }
        variables={ match.params.userId ? { id: match.params.userId } : {} }
    >
        { ({ loading, error, data }) => {
            let d = match.params.userId ? data.user : data;
            let addPost = <Link to={ `/posts/${ match.params.userId }/create` }>Add Post</Link>;
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;
      
            return (
                <div id="Posts">
                    <div className="header">
                        <h1>{  match.params.userId ? d.name+"'s Posts" : "Posts" }</h1>
                        { match.params.userId ? addPost : "" }
                    </div>
                    <ul>
                        { 
                            d.posts.map(({ id, title, comments }) => (
                                <li key={ id }>
                                    <div className="posts">{ title }</div>
                                    <div className="comments">{ `${ comments.length } comment(s)` }</div>
                                    <div className="icons">
                                        <Link to={ "/editpost/"+id }><i className="material-icons edit" title="Edit this post">edit</i></Link>
                                        <i className="material-icons delete" title="Delete this post">delete</i>
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

export default Posts;
