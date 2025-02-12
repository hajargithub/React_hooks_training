import { useState, useEffect } from "react";

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = searchTerm.trim() !== "" 
        ? `https://api.daaif.net/products?title=${encodeURIComponent(searchTerm)}` 
        // // Encodage sécurisé des caractères spéciaux comme espace,accent...
        : `https://api.daaif.net/products`;

        const response = await fetch( url);
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();
        console.log("Produits reçus de l'API pour", searchTerm, ":", data.products);

        const filteredProducts = searchTerm.trim() !== ""
        ? data.products.filter(product =>
            product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        : data.products;

      console.log("Produits après filtrage :", filteredProducts);
      setProducts(filteredProducts)
      } catch (err) {
        console.error("Erreur API:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination

  return {
    products,
    loading,
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
  };
};

export default useProductSearch;
