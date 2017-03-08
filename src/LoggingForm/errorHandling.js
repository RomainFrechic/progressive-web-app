/* here add other error handling in necessary
	axios doc : https://github.com/mzabriskie/axios#handling-errors
*/
const errorHandling = (error)=>{
	if(error.response.status === 403){
		return "Votre identifiant ou mot de passe n'est pas valide."
	}else if (error.response.status === 500) {
		return "Le serveur d'authentification a subi une erreur"
	}else if (error.message) {
		return `${error.message}, merci de verifier votre connexion.`	
	}
}
export default errorHandling;