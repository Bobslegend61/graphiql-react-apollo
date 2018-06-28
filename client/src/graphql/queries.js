import gql from "graphql-tag";

const GET_USERS = gql`
    {
        users {
            id
            name
        }
    }
`
const GET_POSTS = gql`
    {
        posts {
            id
            title
            comments
        }
    }
`
const GET_TODOS = gql`
    {
        todos {
            id
            title
            userId
            completed
        }
    }
`

const GET_COMMENTS = gql`
    {
        comments {
            id
            postId
            body
            email
        }
    }
`
const CHECK_TODO = gql`
    mutation checkTodo($id: ID!, $userId: ID!, $title: String, $completed: Boolean) {
        edittodo(id: $id, title: $title, userId: $userId, completed: $completed) {
            id
            userId
            title
            completed
        }
    }
`

const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            name
            username
            email
            phone
            website
            address {
                street
                suite
                city 
                zipcode
                geo {
                    lat
                    lng
                }
            }
            company {
                name
                catchPhrase
                bs
            }
            posts {
                id
                userId
                title
                comments {
                    id 
                    body
                    postId
                    email
                }
            }
            todos {
                id
                title
                userId
                completed
            }
        }
    }
`

export {
    GET_USERS,
    GET_POSTS,
    GET_TODOS,
    GET_COMMENTS,
    CHECK_TODO,
    GET_USER
}
