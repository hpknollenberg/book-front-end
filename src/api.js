import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"

export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}/token/`, {
        username: username,
        password: password
    }).then(response => {
        auth.setAccessToken(response.data.access)
    }).catch(error => {
        console.log('ERROR: ', error)
        auth.setAccessToken(undefined)
    })
}

export const fetchUser = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('PROFILE: ', response)
        return response
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}


export const fetchBookshelf = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/bookshelf/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('BOOKSHELF: ', response)
        return response
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}

export const fetchBooks = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/books/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('BOOKS: ', response)
        return response
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}

export const fetchLibrary = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/library/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log('BOOKS: ', response)
        return response
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}

export const createUser = ({ username, password, firstName, lastName }) => {
    axios({
      method: 'post',
      url: `${baseUrl}/create-user/`, 
      data: {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
    }).then(response => {
      console.log('CREATE USER: ', response)
    })
    .catch(error => {
      console.log('ERROR: ', error)
    })
}

  
export const createBook = ({ auth, author, genre, title }) => {
    axios({
        method: 'post',
        url: `${baseUrl}/create-book/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            author: author,
            genre: genre,
            title: title
        }
    }).then(response => {
        console.log('CREATE BOOK: ', response)
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}


export const addBook = ({ auth, author, title }) => {
    axios({
        method: 'put',
        url: `${baseUrl}/add-book/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            author: author,
            title: title
        }
    }).then(response => {
        console.log('CREATE BOOK: ', response)
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}



export const removeBook = ({ auth, author, title }) => {
    axios({
        method: 'put',
        url: `${baseUrl}/remove-book/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            author: author,
            title: title
        }
    }).then(response => {
        console.log('CREATE BOOK: ', response)
    }).catch(error => {
        console.log('ERROR: ', error)
    })
}
