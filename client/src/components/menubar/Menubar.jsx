import React, { useState } from 'react'
import "./menubar.css"
import axios from 'axios'

const Menubar = () => {
    const [url1, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        const urls = [url1, url2]

        try {
            setLoading(true)
            const res = await axios.post("https://news-resarch-tool.onrender.com/api/process_url", { urls: urls })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
            setIsSubmitted(true)
        }


    }

    return (
        <div>
            <form class="menu-form" onSubmit={handleSubmit}>
                <label for="input1">Input 1:</label>
                <input
                    onChange={(e) => setUrl1(e.target.value)}
                    type="text"
                    id="input1"
                    name="input1"
                    placeholder="Enter value" />

                <label for="input2">Input 2:</label>
                <input
                    onChange={(e) => setUrl2(e.target.value)}
                    type="text"
                    id="input2"
                    name="input2"
                    placeholder="Enter value" />

                <button type="submit">Submit</button>
            </form>
            <div className="loading-container">
                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Processing your request...</p>
                    </div>
                )}
                {!loading && isSubmitted && <div className="message">You can search now!</div>}
            </div>
        </div>
    )
}

export default Menubar
