import axios from 'axios'

const baseUrl = "http://localhost:3001/api/notes";

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const create = (newNote) => {
    return axios.post(baseUrl, newNote).then(response => response.data);
}

const update = (id, newNote) => {
    return axios.put(`${baseUrl}/${id}`, newNote).then(response => response.data);
}

export default { getAll, create, update } 