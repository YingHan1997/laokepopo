import axios from 'axios'
import Notification from './Notification'

class API {

    constructor(method, url, data) {
        switch (method) {
            case 'get':
            case 'delete': {
                this.instance = axios[method]('/weapp/' + url, { params: data })
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 0) {
                            return res.data
                        }
                        console.error(res)
                        throw new Error('500 Internal Server Error')
                    })
                break
            }
            case 'post':
            case 'put': {
                const params = new URLSearchParams()
                for (let key in data) {
                    params.append(key, data[key])
                }
                this.instance = axios[method]('/weapp/' + url, params)
                    .then(res => res.data)
                    .then(res => {
                        if (res.code === 0) {
                            return res.data
                        }
                        console.error(res)
                        throw new Error('500 Internal Server Error')
                    })
                break
            }
            default: throw new Error('method error')
        }
    }

    then(callback) {
        this.instance = this.instance.then(callback)
        return this
    }

    action() {
        this.instance.catch(res => Notification(res))
    }

}

export default API