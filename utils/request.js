const baseUrl = 'https://m.maoyan.com'

const request = (url, params, method) => {
	return uni.request({
		url: baseUrl + url,
		data: params,
		header: {},
		method:method || 'GET',
	})
}

export default request
