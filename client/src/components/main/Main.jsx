import React, { useState } from 'react'
import "./main.css"
import axios from 'axios'
import {Link, Links} from 'react-router-dom'
const Main = () => {
  const [q, setQ] = useState("")
  const [message,setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [source,setSource] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post("http://localhost:8080/api/predict", { q: q })
      setMessage(res.data.answer)
      setSource(res.data.sources)
      console.log(res.data.sources)

    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
      setIsSubmitted(true)
    }
  }
  return (
    <div>
      <form class="main-form" onSubmit={handleSubmit}>
        <label for="mainInput">Enter Something:</label>
        <input required onChange={(e) => setQ(e.target.value)} type="text" id="mainInput" name="mainInput" placeholder="Type here" />
        <button type="submit">Submit</button>
      </form>
      <div className="loading-container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Processing your request...</p>
          </div>
        )}
        {!loading && isSubmitted && <div style={{color:"black"}}>{message}</div>}
        <div>
        {!loading && isSubmitted && <div style={{color:"blue"}}>SOURCE: {source}</div>}
        </div> 

      </div>
    </div>
  )
}

export default Main
