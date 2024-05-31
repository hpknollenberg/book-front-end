import { useState, useContext, useEffect } from 'react'
import './App.css'
import { AuthContext } from "./authContext"
import { fetchUser, fetchBooks, createBook, fetchLibrary, addBook, removeBook } from "./api"



const AddNewBook = ({setBooks}) => {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const { auth } = useContext(AuthContext)
  

  const submit = () => {
    addBook({ auth, author, title })
    .then(() => fetchBooks({ auth }))
    .then(response => {
      setBooks(response.data.map((book) => {
        return (
          <div key={book.id}>
            <p>{book.author} - {book.title}</p>
          </div>
        )
      }))})
  }

  return (
      <div>
        <h2>Add Book to Bookshelf</h2>
        <div>
          <div>Author:</div>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
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


const CreateNewBook = ({setLibrary}) => {
  const [author, setAuthor] = useState("")
  const [genre, setGenre] = useState("")
  const [title, setTitle] = useState("")
  const { auth } = useContext(AuthContext)
  

  const submit = () => {
      createBook({ auth, author, genre, title })
      .then(() => fetchLibrary({ auth }))
      .then((response) => {
        console.log(response)
        setLibrary(response.data.map((book) => {
          return (
            <div key={book.id}>
              <p>{book.author} - {book.title} ({book.genre})</p>
            </div>
          )
        }))
      })
      
  }

  return (
      <div>
        <h2>Create New Book</h2>
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


const RemoveBook = ({setBooks}) => {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const { auth } = useContext(AuthContext)
  

  const submit = () => {
    removeBook({ auth, author, title })
    .then(() => fetchBooks({ auth }))
    .then(response => {
      setBooks(response.data.map((book) => {
        return (
          <div key={book.id}>
            <p>{book.author} - {book.title}</p>
          </div>
        )
      }))})
  }

  return (
      <div>
        <h2>Remove Book From Bookshelf</h2>
        <div>
          <div>Author:</div>
          <input
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
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
  const [library, setLibrary] = useState([])
  
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
    }).then (console.log("current book list: ", books))
  }, [])

  useEffect(() => {
    fetchLibrary({ auth })
    .then((response) => {
      console.log(response)
      setLibrary(response.data.map((book) => {
        return (
          <div key={book.id}>
            <p>{book.author} - {book.title} ({book.genre})</p>
          </div>
        )
      }))
    })
  }, [])

 

  return (
    <div className="p-4">
      <h1>Hello, {name}!</h1>
      <hr></hr>
      <div className="d-flex justify-content-evenly p-4">
        <div>
          <h2>Books On Your Bookshelf:</h2>
          <p>{books}</p>
        </div>
        <AddNewBook setBooks={setBooks}/>
        <RemoveBook setBooks={setBooks}/>
      </div>
      <hr></hr>
      <div className="d-flex justify-content-evenly p-4">
        <div>
          <h2>All Books:</h2>
          <p>{library}</p>
        </div>
        <CreateNewBook setLibrary={setLibrary} />
      </div>
      <hr></hr>
      
      
    </div>
  )
}

export default App
