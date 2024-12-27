import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import Pagination from "./components/Pagination";
import ReCAPTCHA from "react-google-recaptcha";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=40&key=AIzaSyC8uKyTF5dBKdPzzhlCp1mi2yoRSaJLWnU`
      );
      const books = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",
        authors: item.volumeInfo.authors || ["Unknown Author"],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
      }));
      setItems(books);
      setFilteredItems(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleReCAPTCHA = (value) => {
    if (value) setIsVerified(true);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const updateItems = (newOrder) => {
    const updatedItems = [...filteredItems];
    updatedItems.splice(startIndex, ITEMS_PER_PAGE, ...newOrder);
    setFilteredItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <h1
          style={{
            marginBottom: "8px",
            color: "black",
            textDecoration: "underline",
            fontSize: "40px",
            marginTop: "30px",
            fontWeight: "light",
          }}
        >
          Book Explorer
        </h1>
        {!isVerified ? (
          <ReCAPTCHA
            className="captcha"
            sitekey="6LfCQqYqAAAAAIrPFEaOkUpniZymHu_ZwOURKtLV"
            onChange={handleReCAPTCHA}
          />
        ) : (
          <>
            <button onClick={fetchBooks} className="fetch-button">
              Load Books
            </button>
            <SearchBar
              items={items}
              setFilteredItems={setFilteredItems}
              setCurrentPage={setCurrentPage}
            />
            <Pagination
              totalItems={filteredItems.length}
              itemsPerPage={ITEMS_PER_PAGE}
              setCurrentPage={setCurrentPage}
            />
            <ItemList items={currentItems} updateItems={updateItems} />
            <Pagination
              totalItems={filteredItems.length}
              itemsPerPage={ITEMS_PER_PAGE}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
