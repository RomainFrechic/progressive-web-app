const errorHandling = (error)=>{
	if(error.status === 403){
		return "Votre identifiant ou mot de passe n'est pas valide."
	}else if (error.status === 500) {
		return "Le serveur d'authentification a subi une erreur"
	}else if (error.message) {
		return `${error.message}, merci de verifier votre connexion.`	
	}
}
export default errorHandling;