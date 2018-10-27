import React from "react";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';

/*
Form for adding a new client 
*/

class Form extends React.Component{
    //stores temporary values being typed
    state = { 
        name : "",
        dob:"2018-12-31",
        email:"",
        number:""
    };
    
    //updates the state every time the inputs change
    handleChange = (e) =>{

        const field = e.target.placeholder;
        const newText = e.target.value;


        switch(field){
            
            case 'Name': {
               

                return this.setState({...this.state, name: newText})         
            }
            case 'Date':{
              
                return this.setState({...this.state, dob: newText})
            }
            case 'Email':{
                return this.setState({...this.state, email: newText})       
            }
            case 'Number':{
                return this.setState({...this.state, number: newText})           
            }
            default: return this.state;
        }

    };
    
    //renders a simple form with various types of inputs and a button to add a client
    render(){ 

        const styles = {
            margin: '1em 1em 1em 1em'
        }

        return(
            <div id="formWrapper">
            <Input required label="Name" placeholder= "Name" onChange={this.handleChange} margin="dense" style={styles}/>
            <Input required placeholder= "Date" defaultValue="2018-12-31" label="Date of Birth" type="date" onChange={this.handleChange} margin="dense" style={styles}/>
            <Input required label="Number" placeholder= "Number" onChange={this.handleChange} margin="dense" style={styles}/>
            <Input required label="Email" placeholder= "Email" onChange={this.handleChange} margin="dense" style={styles}/>
                <div style={{width: '100%',display:"flex", justifyContent:'flex-end'}}>
                <Button onClick = {()=>this.props.createClient({name:this.state.name , number:this.state.number, email:this.state.email, dob:this.state.dob})} >
                    <AddIcon />
                </Button>
                </div>
            </div>
        )
    }
}
/*

*/

export default Form;