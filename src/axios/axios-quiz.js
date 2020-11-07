import axios from 'axios'

export default axios.create({
    baseURL:'https://reactquiz-ac213.firebaseio.com/'
})