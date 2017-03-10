import React from 'react';
import './DetectingOnline.css';
import Snackbar from 'material-ui/Snackbar';


export default class DetectingOnline extends React.Component{
	constructor(props){
		super(props);
		this.state={
			open: false,
     		message:''
			
		};
		
	}

	componentWillMount(){
		
		 const detectingOnline=() =>{
      const me =this;
     setInterval(()=>{
       if(navigator.onLine){
        console.log("Vous êtes connecter");
      }else{
       me.setState({open:true});	
       me.setState({message:"Vous n'êtes pas connecter"});
       <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          
        />
        console.log("Vous n'êtes pas connecter");
      }
    },15000);
   }

     detectingOnline();
	}

	render() {
   	return (
   		 <Snackbar
   		  id="snackBarOnline"
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
           />
      )
   }
 }
