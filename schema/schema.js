const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLInputObjectType, GraphQLFloat  } = graphql;

const GeoPoint = new GraphQLObjectType({
    name: "GeoPoint",
    fields: () => ({
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    })
})

const Address = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
        street: { type: GraphQLString },
        suite: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        geo: { type: GeoPoint }
    })
});

const Company = new GraphQLObjectType({
    name: "Company",
    fields: {
        name: { type: GraphQLString },
        catchPhrase: { type: GraphQLString },
        bs: { type: GraphQLString }
    }
})


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: Address },
        company: { type: Company },
        posts: {
            type: new GraphQLList(PostType),
            resolve({ id }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${ id }`).then(res => res.data);
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve({ id }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${ id }`).then(res => res.data);
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        userId: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: {
            type: UserType,
            resolve({ userId }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${ userId }`).then(res => res.data);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve({ id }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${ id }`).then(res => res.data);
            }
        }
    })
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        postId: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        body: { type: GraphQLString },
        post: {
            type: PostType,
            resolve({ postId }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${ postId }`).then(res => res.data);
            }
        }
    })
});

const TodoType = new GraphQLObjectType({
    name: "Todo",
    fields: () => ({
        userId: { type: new GraphQLNonNull(GraphQLID) },
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        user: {
            type: UserType,
            resolve({ userId }, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${ userId }`).then(res => res.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            description: "List of all users",
            resolve(parent, args) {
                return axios.get("https://jsonplaceholder.typicode.com/users").then(res => res.data);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all posts",
            resolve(parent, args) {
                return axios.get("https://jsonplaceholder.typicode.com/posts").then(res => res.data);
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            description: "List all todos",
            resolve(parent, args) {
                return axios.get("https://jsonplaceholder.typicode.com/todos").then(res => res.data);
            }
        },
        comments: {
            type: new GraphQLList(CommentType), 
            description: "List all comments",
            resolve(parent, args) {
                return axios.get("https://jsonplaceholder.typicode.com/comments").then(res => res.data);
            }
        },
        user: {
            type: UserType,
            description: "Get a user based on id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${ id }`).then(res => res.data);
            }
        },
        post: {
            type: PostType,
            description: "Get a single post based on it's id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${ id }`).then(res => res.data);
            }
        },
        todo: {
            type: TodoType,
            description: "Get a todo based on id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.get(`https://jsonplaceholder.typicode.com/todos/${ id }`).then(res => res.data);
            }
        },
        comment: {
            type: CommentType,
            description: "Get a comment baseed on the id",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.get(`https://jsonplaceholder.typicode.com/comments/${ id }`).then(res => res.data);
            }
        }
    }
});

const GeoPointInput = new GraphQLInputObjectType({
    name: "GeoPointInput",
    fields: () => ({
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat }
    })
})

const AddressInput = new GraphQLInputObjectType({
    name: "AddressInput",
    fields: () => ({
        street: { type: GraphQLString },
        suite: { type: GraphQLString },
        city: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        geo: { type: GeoPointInput }
    })
});

const CompanyInput = new GraphQLInputObjectType({
    name: "CompanyInput",
    fields: {
        name: { type: GraphQLString },
        catchPhrase: { type: GraphQLString },
        bs: { type: GraphQLString }
    }
})


const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        adduser: {
            type: UserType,
            description: "Adds a new user",
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: AddressInput },
                company: { type: CompanyInput }
            },
            resolve(parent, args) {
                return axios.post(`https://jsonplaceholder.typicode.com/users`, {
                    ...args
                }).then(res => res.data)
            }
        },
        edituser: {
            type: UserType,
            description: "Edits a user details",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: AddressInput },
                company: { type: CompanyInput }
            },
            resolve(parent, args) {
                return axios.put(`https://jsonplaceholder.typicode.com/users/${ args.id }`, {
                    ...args
                }).then(res => res.data)
            }
        },
        deleteuser: {
            type: UserType,
            description: "Deletes a user from database",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.delete(`https://jsonplaceholder.typicode.com/users/${ id }`).then(res => res.data)
            }
        },
        addpost: {
            type: PostType,
            description: "Adds a post",
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                body: { type: GraphQLString },
            },
            resolve(parent, args) {
                return axios.post("https://jsonplaceholder.typicode.com/posts", {
                    ...args
                }).then(res => res.data)
            }
        },
        editpost: {
            type: PostType,
            description: "Edit a post",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                body: { type: GraphQLString }
            },
            resolve(parent, { id, userId, title, body }) {
                return axios.put(`https://jsonplaceholder.typicode.com/posts/${ id }`, {
                    userId, title, body
                }).then(res => res.data)
            }
        },
        deletepost: {
            type: PostType,
            description: "Delete a post",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.delete(`https://jsonplaceholder.typicode.com/posts/${ id }`).then(res => res.data)
            }
        },
        addtodo: {
            type: TodoType,
            description: "Add a new todo",
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                completed: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                return axios.post(`https://jsonplaceholder.typicode.com/todos`, {
                    ...args
                }).then(res => res.data);
            }
        },
        edittodo: {
            type: TodoType,
            description: "Edit a todo",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                completed: { type: GraphQLBoolean }
            },
            resolve(parent, { id, title, userId, completed }) {
                return axios.put(`https://jsonplaceholder.typicode.com/todos/${ id }`, {
                    title, userId, completed
                }).then(res => res.data)
            }
        },
        deletetodo: {
            type: TodoType,
            description: "Delete a todo",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, { id }) {
                return axios.delete(`https://jsonplaceholder.typicode.com/todos/${ id }`).then(res => res.data);
            }
        },
        addcomment: {
            type: CommentType,
            description: "Add a new comment",
            args: {
                postId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                body: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.post(`https://jsonplaceholder.typicode.com/comments`, {
                    ...args
                }).then(res => res.data)
            }
        },
        editcomment: {
            type: CommentType,
            description: "Edit a comment", 
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                postId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                body: { type: GraphQLString },
            },
            resolve(parent, { id, postId, name, email, body }) {
                return axios.put(`https://jsonplaceholder.typicode.com/comments${ id }`, {
                    name, postId, email, body
                }).then(res => res.data)
            }
        },
        deletecomment: {
            type: CommentType,
            description: "Delete a comment",
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return axios.delete(`https://jsonplaceholder.typicode.com/comments${ id }`).then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})

