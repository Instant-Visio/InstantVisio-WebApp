import {string, object, number} from 'yup'

export default object({
	otherPersonName: string().trim().required('Le nom de votre proche est obligatoire'),
	mail: string().trim().email('Adresse email invalide'),
	phone: number().typeError('Numéro de téléphone invalide'),
	personName: string().trim().required('Votre nom est obligatoire'), 
})