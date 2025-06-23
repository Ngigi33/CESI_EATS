import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const ArticlesContent = ({ articles, openModal }) => {
  return (
    <div className="articles-content">
      <div className="content-header">
        <h1 className="content-title">Articles</h1>
        <button
          onClick={() => openModal('article')}
          className="btn btn-primary"
        >
          <Plus className="btn-icon" />
          <span>Add Article</span> {/* Changed to English */}
        </button>
      </div>

      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Article</th> {/* Changed to English */}
                <th className="table-header-cell">Type</th>
                <th className="table-header-cell">Price</th> {/* Changed to English */}
                <th className="table-header-cell">Actions</th> {/* Changed to English */}
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className="table-row">
                  <td className="table-cell">
                    <div className="article-info">
                      <img
                        src={article.image}
                        alt={article.name}
                        className="article-image"
                      />
                      <div>
                        <p className="article-name">{article.name}</p>
                        <p className="article-description">{article.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="article-type-badge">
                      {article.type}
                    </span>
                  </td>
                  <td className="table-cell article-price">{article.price}€</td>
                  <td className="table-cell">
                    <div className="table-actions">
                      <button
                        onClick={() => openModal('article', article)}
                        className="action-btn edit-btn"
                      >
                        <Edit className="btn-icon" />
                      </button>
                      <button className="action-btn view-btn">
                        <Eye className="btn-icon" />
                      </button>
                      <button className="action-btn delete-btn">
                        <Trash2 className="btn-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticlesContent;