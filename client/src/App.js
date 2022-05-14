import "./App.css";
import { useState } from "react";
import Axios from "axios";
import axios from "axios";

function App() {
  //states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [image, setImage] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [bookList, setBookList] = useState([]);
  //events
  const getBooks = () => {
    Axios.get("http://localhost:3001/books").then((response) => {
      setBookList(response.data);
    });
  };

  const addBook = () => {
    Axios.post("http://localhost:3001/create", {
      title: title,
      author: author,
      year: year,
      image: image,
    }).then(() => {
      setBookList([
        ...bookList,
        {
          title: title,
          author: author,
          year: year,
          image: image,
        },
      ]);
    });
  };

  const updateBookTitle = (id) => {
    Axios.put("http://localhost:3001/update", {
      title: newTitle,
      id:id
    }).then((response) => {
      setBookList(bookList.map((val) => {
        return val.id == id ? {
          id: val.id,
          title: newTitle,
          author: val.author,
          year: val.year,
          image: val.year
        } : val
      }))
    })

  }

  // const displayInfo = () => {
  //   // console.log(title + author + year + image);
  // };

  return (
    <div className="App">
      <div className="information">
        <label>Title</label>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Author</label>
        <input
          type="text"
          onChange={(event) => {
            setAuthor(event.target.value);
          }}
        />
        <label>Year</label>
        <input
          type="number"
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />
        <label>Image</label>
        <input
          type="text"
          onChange={(event) => {
            setImage(event.target.value);
          }}
        />
        <button onClick={addBook}>Add Book</button>
        -----------------------------------------
        <div className="books">
          <button onClick={getBooks}>Show Books</button>
        </div>
        {bookList.map((value, key) => {
          return (
            <div className="book">
              
              <h3>
                Title:<br></br>
                {value.title}                
              </h3>
              <div>
                <input type='text' onChange={(event) => {
                  setNewTitle(event.target.value);
                }}/>
                <button onClick={() => {
                  updateBookTitle(value.id)
                }}>update</button>
              </div>
              <h3>
                Author:<br></br>
                {value.author}
              </h3>
              <h3>
                Year:<br></br>
                {value.year}
              </h3>
              <h3>
                Image:<br></br>
                {value.image}
              </h3>
              </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default App;
