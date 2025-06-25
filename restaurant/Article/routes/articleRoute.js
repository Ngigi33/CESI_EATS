// backend/MicroServices/Article/routes/articleRoute.js

// backend/MicroServices/Article/routes/articleRoute.js

import express from 'express';
import Article from '../models/articleModel.js';

const articleRouter = express.Router();

// GET all articles
articleRouter.get('/', async (req, res) => {
    try {
        const articles = await Article.find({});
        
        // Transform articles to ensure proper image URLs
        const transformedArticles = articles.map(article => {
            const articleObj = article.toObject();
            
            // Construct proper image URL if it's just a filename
            if (articleObj.image && !articleObj.image.startsWith('http')) {
                articleObj.image = `http://localhost:${process.env.PORT || 4005}/images/food/${articleObj.image}`;
            }
            
            return articleObj;
        });
        
        res.json({
            success: true,
            data: transformedArticles,
            message: 'Articles retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching articles',
            error: error.message
        });
    }
});

// GET article by ID
articleRouter.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }
        
        const articleObj = article.toObject();
        
        // Construct proper image URL if it's just a filename
        if (articleObj.image && !articleObj.image.startsWith('http')) {
            articleObj.image = `http://localhost:${process.env.PORT || 4005}/images/food/${articleObj.image}`;
        }
        
        res.json({
            success: true,
            data: articleObj,
            message: 'Article retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching article',
            error: error.message
        });
    }
});

// GET articles by restaurant
articleRouter.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const articles = await Article.find({ restaurantId: req.params.restaurantId });
        
        // Transform articles to ensure proper image URLs
        const transformedArticles = articles.map(article => {
            const articleObj = article.toObject();
            
            // Construct proper image URL if it's just a filename
            if (articleObj.image && !articleObj.image.startsWith('http')) {
                articleObj.image = `http://localhost:${process.env.PORT || 4005}/images/food/${articleObj.image}`;
            }
            
            return articleObj;
        });
        
        res.json({
            success: true,
            data: transformedArticles,
            message: 'Restaurant articles retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching restaurant articles:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching restaurant articles',
            error: error.message
        });
    }
});

// POST create new article
articleRouter.post('/', async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        const savedArticle = await newArticle.save();
        
        res.status(201).json({
            success: true,
            data: savedArticle,
            message: 'Article created successfully'
        });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(400).json({
            success: false,
            message: 'Error creating article',
            error: error.message
        });
    }
});

// PATCH update article
articleRouter.patch('/:id', async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedArticle) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }
        
        res.json({
            success: true,
            data: updatedArticle,
            message: 'Article updated successfully'
        });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(400).json({
            success: false,
            message: 'Error updating article',
            error: error.message
        });
    }
});

// DELETE article
articleRouter.delete('/:id', async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        
        if (!deletedArticle) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting article',
            error: error.message
        });
    }
});

export default articleRouter;