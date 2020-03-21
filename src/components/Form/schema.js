import {string, object, number} from 'yup'

export default object({
	personName: string().trim().required('Votre nom est obligatoire'),
	mail: string().trim().email('Adresse email invalide'),
	phone: number().typeError('Numéro de téléphone invalide')  
})