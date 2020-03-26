import {string, object, number} from 'yup'

export default object({
	otherPersonName: string().trim().required('Le nom de votre proche est obligatoire'),
	mail: string().trim().email('Une adresse e-mail valide de votre proche est obligatoire') || string().trim().required('L\'adresse e-mail de votre proche est obligatoire'),
	phone: number().typeError('Un numéro valide de votre proche est obligatoire') || number().trim().required('Le numéro de votre proche est obligatoire'),
	personName: string().trim().required('Votre nom est obligatoire'), 
})
