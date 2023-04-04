import axios from 'axios'

const baseUrl = "https://fsopen-notes-backend.onrender.com/api/notes";

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
