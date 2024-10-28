import React from 'react';

export default function Sidebar({ setAddFirm, setAddProduct, setShowAllProducts, showFirmTitle }) {
  return (
    <div className="sidebar">
      <ul className="ul">
         {showFirmTitle?<li onClick={setAddFirm}>Add Firm</li>:""}
        <li onClick={setAddProduct}>Add Product</li>
        <li onClick={setShowAllProducts}>All Products</li>
        <li>User Details</li>
      </ul>
    </div>
  );
}
