import React from 'react';
import './DetectingOnline.css';
import Snackbar from 'material-ui/Snackbar';

//open is false
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
      //open is false
       if(navigator.onLine){
       	 me.setState({open:false});
        console.log("Vous êtes connecté");
      }else{
        //open is true
       me.setState({open:true});	
       me.setState({message:"Vous n'êtes pas connecté"});
       <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          
        />
        console.log("Vous n'êtes pas connecté");
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
