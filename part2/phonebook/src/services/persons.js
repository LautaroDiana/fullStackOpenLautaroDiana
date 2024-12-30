import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteUser = (id) => {
    const confirm = window.confirm(`do you want to delete ${id} from phonebook?`)
    if (confirm) {
        const request = axios.delete(`${baseUrl}/${id}`)
        return request.then(response => response.data)
    }
}
export default { getAll, create, update, deleteUser }