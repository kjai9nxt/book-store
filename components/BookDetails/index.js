import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const BookDetails = (props) => {
  // Convert state to useState hooks
  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);
  
  // Get id from URL params using useParams hook
  const { id } = useParams();

  // Replace componentDidMount with useEffect
  useEffect(() => {
    getBookDetails();
  }, []);

  // Convert class method to regular function
  const getBookDetails = async () => {
    try {
      // Using the sample data
      const sampleData = {
        "total": "48",
        "page": "1",
        "books": [
            {
                "title": "Practical MongoDB",
                "subtitle": "Architecting, Developing, and Administering MongoDB",
                "isbn13": "9781484206485",
                "price": "$32.04",
                "image": "https://itbook.store/img/books/9781484206485.png",
                "url": "https://itbook.store/books/9781484206485"
            },
            {
                "title": "The Definitive Guide to MongoDB, 3rd Edition",
                "subtitle": "A complete guide to dealing with Big Data using MongoDB",
                "isbn13": "9781484211830",
                "price": "$47.11",
                "image": "https://itbook.store/img/books/9781484211830.png",
                "url": "https://itbook.store/books/9781484211830"
            },
            {
                "title": "MongoDB in Action, 2nd Edition",
                "subtitle": "Covers MongoDB version 3.0",
                "isbn13": "9781617291609",
                "price": "$32.10",
                "image": "https://itbook.store/img/books/9781617291609.png",
                "url": "https://itbook.store/books/9781617291609"
            },
        ]
      };
      
      const book = sampleData.books.find(book => book.isbn13 === id);
      
      if (book) {
        // Add additional details for the book view
        const bookDetailsData = {
          ...book,
          authors: "Various Authors",
          publisher: "Manning",
          language: "English",
          pages: "300",
          year: "2020",
          rating: "4",
          desc: "This book covers MongoDB concepts and techniques with practical examples."
        };
        
        setBookDetails(bookDetailsData);
        setIsLoading(false);
      } else {
        setError("Book not found");
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => 
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const addToCart = () => {
    // In a real app, implement cart functionality
    console.log(`Added to cart: ${bookDetails.title}, Quantity: ${quantity}`);
    
    // Set isAdded to true instead of showing an alert
    setIsAdded(true);
    
    // Optional: Reset to "Add to Cart" after a few seconds
    // setTimeout(() => {
    //   setIsAdded(false);
    // }, 3000);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="book-details-container">
          <div className="loader-container">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="book-details-container">
          <div className="error-container">
            <p>Error loading book details: {error}</p>
            <Link to="/books" className="back-link">
              Back to Books
            </Link>
          </div>
        </div>
      </>
    );
  }

  const {
    title,
    subtitle,
    authors,
    publisher,
    language,
    isbn13,
    pages,
    year,
    rating,
    desc,
    price,
    image
  } = bookDetails;

  return (
    <>
      <Header />
      <div className="book-details-container">
        <Link to="/books" className="back-link">
          ← Back to Books
        </Link>
        
        <div className="book-details-content">
          <div className="book-image-container">
            <img src={image} alt={title} className="book-detail-image" />
          </div>
          
          <div className="book-info-container">
            <h1 className="book-title">{title}</h1>
            <p className="book-subtitle">{subtitle}</p>
            
            <div className="book-meta">
              <p className="book-author"><span>Authors:</span> {authors}</p>
              <p className="book-publisher"><span>Publisher:</span> {publisher} ({year})</p>
              <p className="book-language"><span>Language:</span> {language}</p>
              <p className="book-pages"><span>Pages:</span> {pages}</p>
              <p className="book-isbn"><span>ISBN-13:</span> {isbn13}</p>
            </div>
            
            <div className="book-price-container">
              <h3 className="book-price">{price}</h3>
              
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              
              <button 
                className={`add-to-cart-btn ${isAdded ? 'added' : ''}`} 
                onClick={addToCart}
                disabled={isAdded}
              >
                {isAdded ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="book-description-container">
          <h2 className="section-title">Description</h2>
          <p className="book-description">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetails;