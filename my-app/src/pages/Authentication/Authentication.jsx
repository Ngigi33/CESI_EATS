import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // In a real app, you would connect to your authentication API here
    // For demo purposes, we'll simulate successful authentication
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/delivery'); // Redirect to the delivery dashboard
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/CESI-EATS.png" alt="CESI EATS" />
        </div>
        
        <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
              />
            </div>
          )}
          
          <button type="submit" className="auth-button">
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </form>
        
        <p className="auth-toggle">
          {isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? 'S\'inscrire' : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
