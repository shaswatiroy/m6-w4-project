import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
const QUOTE_API = "+OiyO57BRGCLn0pD+uXe0g==UOCCpQbV6cATbefJ";


const Header = () => {
    const [q, setQuote] = useState({ quote: '...', author: '...' });
    const fetchquote = async () => {
        try {
            const response = await fetch('https://api.api-ninjas.com/v1/quotes?', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': QUOTE_API
                }
            });
            const out = await response.json();
            setQuote(out[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchquote();
    }, [])

    return (
        <div className="bg-gradient bg-dark text-white mb-4">
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 text-center">
                        <i className="fa-solid fa-quote-right mb-3 fs-1 text-primary"></i>
                        <h2 className="fw-light mb-3">{q.quote}</h2>
                        <p className="mb-0 text-muted">&#8213; {q.author}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
