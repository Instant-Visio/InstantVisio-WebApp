import axios from 'axios'

/**
 * 
 * @param {string} personName 
 * @param {string} generatedLink 
 * @returns {string}
 */
const generateContent = (personName, generatedLink) => {
	return `Bonjour, c'est ${personName}, je voudrais que tu me rejoignes en visio en cliquant sur ce lien ${generatedLink}`
}

/**
 * 
 * @returns {Promise}
 */
function sendMail({personName, value, generatedLink}){

	const name = 'Demande URGENTE de visiophonie de votre proche'

	const link = `<a href="${generatedLink}">${generatedLink}</a>`
	const userInfo = {
		name,
		mail: value,
		html: generateContent(personName, link)
	}

	return axios.post(
		process.env.REACT_APP_SENDING_EMAIL,
		userInfo,
		{
			headers : {
				'Content-Type': 'application/json;charset=UTF-8',
				'Accept': 'application/json'
			}
		}
	)
}

/**
 * 
 * @param {object}
 * @returns Promise
 */
function sendSms({personName, value, generatedLink}){
    
	//todo
	return new Promise((resolve, reject) => {
		resolve()
	})

}

export default {
	mail: sendMail,
	phone: sendSms
}