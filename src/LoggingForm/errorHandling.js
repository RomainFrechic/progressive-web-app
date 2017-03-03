const errorHandling = (error)=>{
	if(error.status === 403){
		return "Votre identifiant ou mot de passe n'est pas valide."
	}else if (error.status === 500) {
		
	}
}
export default errorHandling;