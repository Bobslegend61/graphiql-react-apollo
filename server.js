const express = require("express");
const cors = require("cors");
const expressHTTP = require("express-graphql");

const schema = require("./schema/schema");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/graphql", expressHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));