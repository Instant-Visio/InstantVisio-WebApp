
if (!Promise.allSettled) {
	Promise.allSettled = promises =>
		Promise.all(
			promises.map((promise) =>
				promise
					.then(value => ({
						status: 'fulfilled',
						value,
					}))
					.catch(reason => ({
						status: 'rejected',
						reason,
					}))
			)
		)
}