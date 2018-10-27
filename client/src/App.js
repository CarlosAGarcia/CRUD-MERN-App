import React, { Component } from 'react';
import './App.css';
import gql from "graphql-tag";
import { graphql,compose } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Form from "./Form";
import TableRow from "./TableRow";
import { auto } from 'async';
import Divider from '@material-ui/core/Divider';

//graph QL queries are set to constant 
const ClientQuery = gql`
{
  clients {
    name
    number
    dob
    email
    id
  }
}
`;
const editMutation = gql`
mutation($id:ID!, $name: String!, $number: String!, $email : String!, $dob : String!){
  editText(id:$id,name:$name, number:$number, email:$email, dob:$dob)
}
`;


const RemoveMutation = gql`
mutation($id:ID!){
	removeClient(id:$id)
}
`;

const CreateMutation  = gql`
mutation($name: String!, $number: String!, $email : String!, $dob : String!){
  createClient(name:$name, number:$number, email:$email, dob:$dob){
    name,
    number,
    email,
    dob,
    id
  }
}
`;


class App extends Component {

  /*
  various async functions which call their respective props passed into App by the compose function
  variables are what is passed to the server while refetchQueries is what updates the clients by re-querying clients
  */
  createClient = async ({name, number, email, dob}) =>{
    await this.props.createClient({
      variables:{
        name,
        number,
        email,
        dob
      }, refetchQueries: [{
        query: ClientQuery
      }]
    });
  };
  

  editText = async ({client,name2, number2, email2, dob2}) => {
    await this.props.editText({
      variables:{
        id : client.id,
        name: name2,    
        number: number2,
        email: email2,
        dob: dob2
      }, refetchQueries: [{
        query: ClientQuery
      }]
    });
  };

  removeClient = async client =>{  
      await this.props.removeClient({
        variables:{
          id : client.id      
        }, refetchQueries: [{
          query: ClientQuery
        }]
      });
  };

  render() {
  
    //only renders the clients if the server data has loaded
    const {data:{loading, clients}} = this.props; 
    if (loading){
      return null;
    } 

    return (
      
      /*renders the header, paper, list and form at the end to add clients
      all clients on server are passed to App through the props by the Apollo Provider
      each client is rendered as a list item 
      */
      <div style={{display:'flex'}}> 
        <div style={{margin:"auto", width: auto}}>
        
            <h1 style={{ display: 'flex', justifyContent: 'center',margin: '1em 0 0 0' }}>Clients </h1> 
            <Paper style={{margin: '3em 0 0 0'}}>
            <List>
            {this.props.data.clients.map(client => (
                <div key={client.id} >
                <ListItem role={undefined} style={{margin: '1em 1em 1em 1em'}} dense>                  
                    <TableRow row = {this.props.row} client = {client} removeClient={this.removeClient} editText={this.editText}></TableRow>
                </ListItem> 
                <Divider/>
                </div>           
              ))}
            </List> 
            <p style={{margin: '1em 1em 1em 1em'}}>Add New Client</p>

            <Form clients = {clients} createClient={this.createClient} ></Form>             
            </Paper>
        </div>
      </div>
    
    )
  }
}


//compose function is given by Apollo to wrap the graphQL queries so they can be used by the functions in component
//passes in the functions editText, CreateClient, removeClient as props to App

export default compose(
graphql(editMutation, {name:"editText"}),
graphql(CreateMutation, {name:"createClient"}),
graphql(RemoveMutation, {name:"removeClient"}),
graphql(ClientQuery))(App);
