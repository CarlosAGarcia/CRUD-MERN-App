import React from "react";
import Input from '@material-ui/core/Input';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';


//Generates a single client entry on the table 
class TableRow extends React.Component{

    //stores temporary state of this client if being edited, defaults to read-only
    state = { 
        name : "",
        dob:"2018-12-31",
        email:"",
        number:"",
        read:true
    };
    
    //if theres a change in the fields - being edited - then the state is updated
    handleChange = (e) =>{
        //console.log("old state", this.state);
        const field = e.target.id;
        const newText = e.target.value;
        //console.log("New value", newText);


        switch(field){
            
            case 'name': {
                //console.log("name");

                this.setState({...this.state, name: newText});
                console.log("new mini state", this.state);
                break;         
            }
            case 'dob':{
                //console.log("date");
                this.setState({...this.state, dob: newText});
                break;
            }
            case 'email':{
                this.setState({...this.state, email: newText});
                break;       
            }
            case 'number':{
                this.setState({...this.state, number: newText});
                break;          
            }
            default: 
                break;
        }
        
        
     return this.state;
    };

    /*Renders the client as per props passed to it
    Secondary action either renders an edit button if the contents are set to read only
        or a check mark/confirm button to submit the data to the server 
        clicking on them toggles the icon to switch.
    A delete button is rendered which calls the remove function to remove this client from server
    */
    render(){
        
        const {client} = this.props;
        const read = this.state.read;
        
    
        const styles = {
            margin: '1em 1em 1em 1em'
        }
        const styles2 = {
            margin: '1em 8em 1em 1em',
        }
        return(
            
            <div id="formWrapper">
                  <Input id="name" required disableUnderline={read} inputProps={{ readOnly: read ? true:false}} label="Name" defaultValue= {client.name} onChange={this.handleChange} margin="dense" style={styles}/>
                  <Input id="number" required disableUnderline={read} inputProps={{ readOnly: read ? true:false}} label="Number" defaultValue= {client.number} onChange={this.handleChange} margin="dense" style={styles}/>
                  <Input id="email" required disableUnderline={read} inputProps={{ readOnly: read ? true:false}} label="Email" defaultValue= {client.email} onChange={this.handleChange} margin="dense" style={styles}/>
                  <Input id="dob" required disableUnderline={read} inputProps={{ readOnly: read ? true:false}} label="Dob" defaultValue= {client.dob} onChange={this.handleChange} margin="dense" style={styles2}/>
                  
                  <ListItemSecondaryAction>
                        {read ?
                        <IconButton >
                            <EditIcon onClick ={()=> this.setState({...this.state, read: !read})}/>
                        </IconButton>
                         :
                        <IconButton >
                            <CheckIcon onClick ={()=> {
                                this.setState({...this.state, read: !read});
                                this.props.editText({client, name2:this.state.name, number2:this.state.number, email2:this.state.email, dob2:this.state.dob})}}
                                
                                />
                        </IconButton>}

                    <IconButton >
                    <DeleteIcon onClick ={()=> this.props.removeClient(client)}/>
                    </IconButton >                 
                  </ListItemSecondaryAction>
            </div>
        )
    }
}
/*
               
*/

export default TableRow;