import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import './lib/promisePollyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import providers from './lib/providers'
import generateUuid from './lib/uuid'
import Form from './components/Form'

import './App.css'

const App = () => {
	useEffect(() => {
		// when using vh and vw units in css:
		// to make sure the height taken into account
		// is the whole window size,
		// not the visible window size
		// (critical on mobile, where, on click on the contact form inputs,
		// the keyboard appears and takes half of the window size,
		// which shrinks the form size - unpleasant user experience)
		setTimeout(() => {
			const viewheight = window.innerHeight
			const viewwidth = window.innerWidth
			const viewport = document.querySelector('meta[name=viewport]')
			viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`)
		}, 300)
	}, [])

	const [submission, setSubmission] = useState({
		success: false,
		fail: false,
	})

	const [loading, setLoading] = useState(false)

	const visioURL = `${process.env.REACT_APP_VISIODOMAIN}/${Date.now()}${generateUuid()}`

	const handleSubmit = async (values) => {

		setLoading(true)

		const {personName, ...contacts} = values

		try{
			const promises = Object
				.entries(contacts)
				.filter((item) => item[1])
				.map(async (item) => {
					const [providerName, value] = item
					if (providers[providerName]){
						await providers[providerName]({personName, value, generatedLink: visioURL})
					}
				})
      
			const promisesStatus = await Promise.allSettled(promises)
			const rejectedPromised = promisesStatus.filter((item) => item.status === 'rejected')

			if (rejectedPromised.length === promises.length){
				throw new Error('all promises rejected')
			}

			setSubmission({
				...submission,
				success: true,
				fail: false
			})
		}catch(e){
			setSubmission({
				...submission,
				success: false,
				fail: true
			})
		} finally {
			window.scrollTo({
				top: document.querySelector('body').scrollHeight - document.querySelector('body').clientHeight,
				behavior: 'smooth',
			})

			setLoading(false)
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<h1>Instant Visio</h1>
				<Container>
					<p className="App-desc">{'Saisissez le numéro de téléphone mobile ou l\'email de la personne que vous souhaitez rejoindre en visiophone (vous pouvez saisir les deux).'}</p>
					<p className="App-desc">{'À la soumission du formulaire, vous serez redirigé-e vers la page d\'appel en visiophone. En parallèle, un message sera envoyé pour que votre proche puisse vous rejoindre directement en visiophone et échanger avec vous.'}</p>
				</Container>
			</header>
			<body className="App-body">
				<Container>
					<Form onSubmit={handleSubmit} isSending={loading} />
					<div className="form-submission-message">
						{submission.success && 
                <Route
                	render={() => {
                	  window.location.href = visioURL
                	  return null
                	}}
                />
						}
						{submission.fail && 
              <>
              	<p>{'Le message n\'a pas pu être envoyé. Si vous avez renseigné un numéro de téléphone, vous pouvez envoyer un message uniquement si votre appareil est équipé d\'une carte SIM.'}</p>
              	<p>Veuillez soumettre à nouveau le formulaire.</p>
              </>
						}
					</div>
				</Container>
			</body>
		</div>
	)
}

export default App
