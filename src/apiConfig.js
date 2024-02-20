let apiUrl
const apiUrls = {
    // CHANGE PRODUCTION URL WHEN DEPLOYING
	production: 'https://sellout-api.fly.dev',
	development: 'https://sellout-api.fly.dev',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
