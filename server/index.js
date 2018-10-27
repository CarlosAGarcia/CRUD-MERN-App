
const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const Client = mongoose.model("Client", {
    name: String,
    number: String,
    dob : String,
    email: String
});


const typeDefs = `
  type Query {
    hello(name: String): String!
    clients: [Client]
  }
  type Client{
      name : String!
      number : String!
      dob : String!
      email : String!
      id: ID!
  }
  type Mutation{
      createClient(name : String!, number : String!, dob : String!, email : String! ): Client
      removeClient(id: ID!): Boolean
      editText(id:ID!, name: String!, number: String!, dob: String!, email: String!): Boolean
  }
`;
//creates the response/resolver given back by server
//Query returns either hello world or name passed to it
//mutation mutates the db and creates a Client, saves it to the db and returns it
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    clients: () => Client.find()
  },
  Mutation:{
      createClient: async (parent, {name, number, dob, email}) => {
          const client = new Client({name, number, dob, email});
          await client.save();
          return client;
      },

      editText: async (parent, {id, name, number, dob, email}) =>{
        await Client.findByIdAndUpdate(id, {name, number, dob, email});     
        return true; 
      },
      removeClient: async (parent, { id }) =>{
        await Client.findByIdAndDelete(id);     
        return true;
      }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function(){
    server.start(() => console.log('Server is running on localhost:4000'))
})
