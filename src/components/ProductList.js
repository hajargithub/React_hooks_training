import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";
import ProductCard from "./ProductCard";
import { Button, Pagination, Spinner, Row, Col, Form } from "react-bootstrap";

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);

        const uniqueCategories = [
          ...new Set(response.data.products.map((prod) => prod.category)),
        ];
        setCategories(uniqueCategories);

        const maxProductPrice = Math.max(
          ...response.data.products.map((prod) => prod.price)
        );
        setMaxPrice(maxProductPrice);
        setPriceRange([0, maxProductPrice]);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div
      className={`p-4 rounded ${
        isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Row className="mb-3">
        {/*  Filtre par catégorie */}
        <Col md={4}>
          <Form.Label>
            {language === "fr" ? "Catégorie" : "Category"}
          </Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`form-select ${
              isDarkTheme
                ? "bg-secondary bg-gradient text-light border-0"
                : "bg-light"
            }`}
          >
            <option value="all">{language === "fr" ? "Toutes" : "All"}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/*  Filtre par plage de prix (Range Slider ajusté) */}
        <Col md={8}>
          <Form.Label>
            {language === "fr" ? "Plage de prix (€)" : "Price Range (€)"}
          </Form.Label>
          <div
            className={`p-2 rounded ${
              isDarkTheme ? "bg-secondary bg-gradient text-light" : "bg-light"
            }`}
          >
            <Form.Range
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="custom-range"
            />
            <div className="d-flex justify-content-between mt-1 range-values">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p>{language === "fr" ? "Chargement..." : "Loading..."}</p>
        </div>
      ) : (
        <>
          <Row>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <p>
                {translations[language].productsNotFound} "{searchTerm}"
              </p>
            )}
          </Row>

          {/* Pagination */}
          <Pagination className="justify-content-center">
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default ProductList;
