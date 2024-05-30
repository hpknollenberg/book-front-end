import { useState, useContext, useEffect } from 'react'
import './App.css'
import { AuthContext } from "./authContext"
import { fetchUser, fetchBooks, createBook } from "./api"



const CreateNewBook = () => {
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("")
  const [title, setTitle] = useState("")
  

  const submit = () => {
      createBook({ author, genre, title })
  }

  return (
      <div>
        <h1>Create New Book</h1>
        <div>
          <div>Author:</div>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
  
        <div>
          <div>Genre:</div>
          <input
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </div>
  
        <div>
          <div>Title:</div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
  
  
        <div style={{ marginTop: 20 }}>
          <button onClick={() => submit()}>Submit</button>
        </div>
      </div>
    )
  
}



function App() {
  const { auth } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setName(response.data.first_name)
    })
  }, [])


  useEffect(() => {
    fetchBooks({ auth })
    .then((response) => {
      setBooks(response.data.map((book) => {
        return (
          <div key={book.id}>
            <p>{book.author} - {book.title}</p>
          </div>
        )
      }))
    })
  }, [])

 

  return (
    <div className="p-5">
      <h1>Name: {name}</h1>
      <hr></hr>
      <h2>Books In My Collection:</h2>
      <p>{books}</p>
      <hr></hr>
      <CreateNewBook />
    </div>
  )
}

export default App
