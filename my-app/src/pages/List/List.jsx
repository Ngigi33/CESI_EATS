import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';

const List = () => {
  const [imageFile, setImageFile] = useState(null);
  const [articles, setArticles] = useState([]);
  const restaurantId = '6859bab946b06892e618e4a9'; // valeur par défaut

  // Récupération des articles au chargement
  useEffect(() => {
    fetch(`http://localhost:4002/api/menu/list?restaurantId=${restaurantId}`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Erreur fetch articles:', err));
  }, []);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    formData.append('restaurantId', restaurantId);
    formData.append('name', form.name.value);
    formData.append('description', form.description.value);
    formData.append('category', form.category.value);
    formData.append('price', form.price.value);
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:4002/api/menu/create', {
        method: 'POST',
        body: formData,  // important : envoyer formData pour gérer fichier
      });

      if (response.ok) {
        alert('Produit ajouté avec succès');
        form.reset();
        setImageFile(null);

        // Recharger la liste des articles après ajout
        const newArticles = await fetch(`http://localhost:4002/api/menu/list?restaurantId=${restaurantId}`).then(res => res.json());
        setArticles(newArticles);
      } else {
        const text = await response.text();
        alert("Échec de l'ajout coté frontend: " + text);
        console.error('Erreur :', text);
      }
    } catch (err) {
      console.error('Erreur serveur :', err);
    }
  };

  // Fonctions fictives pour Modifier et Supprimer (à implémenter)
  const handleEdit = (id) => {
    alert(`Modifier article ${id} - à implémenter`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet article ?')) return;

    try {
      const response = await fetch(`http://localhost:4002/api/menu/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Article supprimé');
        setArticles(articles.filter(article => article.id !== id));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='add'>
      {/* Formulaire */}
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

      {/* Liste des articles */}
      <div className="articles-list" style={{ marginTop: 40 }}>
        <h2>Liste des articles</h2>
        {articles.length === 0 && <p>Aucun article disponible.</p>}
        {articles.map(article => (
          <div key={article.id} className="food-item" style={{ marginBottom: 20 }}>
            <div className="food-item-img-container">
              <img className="food-item-image" src={article.image || assets.upload_area} alt={article.name} />
            </div>
            <div className="food-item-info">
              <div className="food-item-name-rating">
                <p>{article.name}</p>
                {/* Ici tu peux afficher une note par étoiles si tu veux */}
              </div>
              <p className="food-item-desc">{article.description}</p>
              <p><strong>Catégorie:</strong> {article.category}</p>
              <p><strong>Prix:</strong> {article.price}€</p>
              <p><strong>Type:</strong> {article.type || 'N/A'}</p>
              <p><strong>Restaurant:</strong> {article.restaurantName || 'Inconnu'}</p>
              <p><strong>Validé:</strong> {article.isValid ? 'Oui' : 'Non'}</p>
              <div className="food-item-actions">
                <button onClick={() => handleEdit(article.id)} className="btn-edit">Modifier</button>
                <button onClick={() => handleDelete(article.id)} className="btn-delete">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
