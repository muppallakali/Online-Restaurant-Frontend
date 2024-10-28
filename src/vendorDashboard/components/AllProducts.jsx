import React, { useState, useEffect } from 'react';
import { API_Path } from '../data/apiPath';

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleProducts = async () => {
        let firmId = localStorage.getItem("firmId");
        if (!firmId) {
            setError("Firm ID not found");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_Path}/product/${firmId}/products`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const newproductdata = await res.json();
            console.log(newproductdata);
            setProducts(newproductdata.products); 
        } catch (error) {
            console.log("Failed to fetch products", error);
            setError("Products fetch failed");
        } finally {
            setLoading(false);
        }
    };
    async function handledelete(productId) {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this item?");
            
            if (confirmDelete) {
                const res = await fetch(`${API_Path}/product/${productId}`, { method: "DELETE" });

                
                if (res.ok) {
                    setProducts(products.filter(product => product._id !== productId));
                    alert("Item is deleted successfully");
                } else {
                    console.log("Failed to delete the product", res.statusText);
                    alert("Failed to delete the product");
                }
            }
        } catch (error) {
            console.error("Failed to delete the product", error);
            alert("Failed to delete the product");
        }
    }

    useEffect(() => {
        handleProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {products.length === 0 ? (
                <h1>No Products Available</h1>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_Path}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: "50px", height: "auto" }} 
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={()=>handledelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
