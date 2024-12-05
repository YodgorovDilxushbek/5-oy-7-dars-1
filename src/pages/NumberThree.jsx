import axios from 'axios'
import React, { useState } from 'react'

function NumberThree() {
  const [bookname, setBookname] = useState('')
  const [data, setData] = useState([])
  const [notFoundBook, setNotFoundBook] = useState(false)
  function handleSearch(event) {
    const value = event.target.value
    setBookname(value)
    if (value) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
        .then(response => {
          if (response.status === 200 && response.data.items) {
            setData(response.data.items)
            setNotFoundBook(false)
          } else {
            setData([])
            setNotFoundBook(true)
          }
        })
        .catch(error => {
          console.log(error)
          setData([])
          setNotFoundBook(true)
        })
    } else {
      setData([])
      setNotFoundBook(false)
    }
  }

  return (
    <div className="max-w-[2000px] w-full mx-auto py-12 flex flex-col justify-center items-center gap-8">
      <h1 className="text-[30px] font-bold text-blue-600">Kutubhona</h1>
      <form className="flex gap-4 bg-blue-500 max-w-[350px] w-full rounded-md shadow-lg">
        <input
          className="w-full px-4 py-2 border-[2px] border-blue-300 rounded-md focus:outline-none focus:border-blue-600"
          onChange={handleSearch}
          value={bookname}
          type="text"
          placeholder="Enter your book name.."
        />
      </form>
      <p className="text-[18px] mt-4 text-red-500 font-medium">
        {notFoundBook && 'Bunday kitob mavjud emas !!'}
      </p>
      <div className="flex flex-wrap gap-8 justify-center">
        {data.map((value, index) => (
          <div
            key={index}
            className="border border-gray-300 max-w-[500px] w-full flex gap-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <img
              src={value.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200'}
              className="w-[150px] h-[200px] object-cover rounded-l-md"
              alt="Book Thumbnail"
            />
            <div className="flex flex-col gap-2 p-4">
              <h3 className="font-bold text-lg text-gray-800">{value.volumeInfo.title || 'Title not available'}</h3>
              <p className="text-sm text-gray-600">{value.volumeInfo.authors?.join(', ') || 'Author not available'}</p>
              <p className="text-sm text-gray-500">{value.volumeInfo.publishedDate || 'Date not available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default NumberThree
