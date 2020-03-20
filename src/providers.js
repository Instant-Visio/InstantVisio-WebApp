import axios from 'axios'

/**
 * 
 * @param {string} personName 
 * @param {string} generatedLink 
 * @returns {string}
 */
const generateContent = (personName, generatedLink) => {
    return `Bonjour, c'est ${personName}, je voudrais que tu me rejoignes en visio en cliquant sur ce lien ${generatedLink}`;
}

/**
 * 
 * @returns {Promise}
 */
function sendMail({personName, mail, generatedLink}){

    const name = 'Demande URGENTE de visiophonie de votre proche';

    const userInfo = {
      name,
      mail,
      html: generateContent(personName, generatedLink)
    }

    return new Promise((resolve, reject) => {
        axios.post(
            process.env.REACT_APP_SENDING_EMAIL,
            userInfo,
            {
                headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json'
                }
            }
        )
        .then((response) => resolve(response))
        .catch(error => reject(error))
    })
}

/**
 * 
 * @param {personName} values 
 * @param {mail} values 
 * @returns Promise
 */
function sendSms({personName, phone}){
    
    //todo
    return new Promise((resolve, reject) => {
        resolve()
    })

}

export {
    sendMail,
    sendSms
}