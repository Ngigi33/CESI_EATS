
import { assets } from '../../assets/assets'
import './Add.css'

import React, { useState } from 'react'; // adapte ce chemin si nécessaire

const Add = () => {
  const [imageFile, setImageFile] = useState(null);
  const restaurantId = '6859bab946b06892e618e4a9'; // valeur par défaut

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append('restaurantId', restaurantId);
    formData.append('name', form.name.value); // nom du produit
    formData.append('description', form.description.value);
    formData.append('category', form.category.value);
    formData.append('price', form.price.value);
    formData.append('image', imageFile);

const obj = {};
for (const [key, value] of formData.entries()) {
  obj[key] = value;
}

console.log(obj);             // objet JS rempli
console.log(JSON.stringify(obj));

    try {
      console.log('FormData:', formData);
      const response = await fetch('http://localhost:4002/api/menu/create', {
        method: 'POST',
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        alert('Produit ajouté avec succès');
        form.reset();
        setImageFile(null);
      } else {
        alert("Échec de l'ajout coté frontend", await response.text());
        console.error('Erreur :', await response.text());
      }
    } catch (err) {
      console.error('Erreur serveur :', err);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : assets.upload_area}
            alt="preview"
            style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
          />
        </label>
        <input
          type="file"
          id="image"
          name="image"
          hidden
          required
          onChange={handleImageChange}
        />

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" id='name' name='name' placeholder='Type here' required />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea id='description' name="description" rows="4" placeholder='Write content here' required />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select id='category' name="category" required>
              <option value="">Select category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price (€)</p>
            <input type="number" id="price" step="0.01" name='price' placeholder='20.00' required />
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
