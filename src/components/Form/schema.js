import {string, object, number} from 'yup'

export default object({
    mail: string().trim().email('L\'adresse e-mail de votre proche n\'est pas valide') || string().trim().required('L\'adresse e-mail de votre proche est obligatoire'),
    phone: number().typeError('Le numéro de votre proche n\'est pas valide') || number().trim().required('Le numéro de votre proche est obligatoire'),
    personName: string().trim().required('Veuillez saisir votre nom'), 
})
