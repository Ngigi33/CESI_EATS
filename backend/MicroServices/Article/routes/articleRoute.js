// backend/MicroServices/Article/routes/articleRoute.js
/**
 * @swagger
 *  components:
 *    schemas:
 *      Article:
 *        type: object
 *        required: 
 *          - restaurantId
 *          - name
 *          - description
 *          - price
 *          - image
 *          - type
 *          - category
 *          - restaurantName
 *          - available
 *          properties:
 *            id :
 *              type: string
 *              description: the auto-generate id of the book
 *            restaurantId:
 *              type: string
 *              description: unique
 *            name:
 *              type: string
 *              description: unique
 *            description:
 *              type: string
 *              description: description de l'article
 *            type:
 *              type: string
 *              description: type de l'article
 *            category:
 *                type: string
 *                description: category of the article
 *             price:
 *                type: number
 *                description: price of the article
 *             restaurantName:
 *                type: string
 *                description: restaurant name of the article
 *             available:
 *                type: boolean
 *                description: availability of the article
 *
 */
import express from 'express';
import Article from '../models/articleModel.js';

const articleRouter = express.Router();

// GET all articles


/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Retrieve an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */


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


/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 message:
 *                   type: string
 */

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
/**
 * @swagger
 * /articles/restaurant/{restaurantId}:
 *   get:
 *     summary: Retrieve articles by restaurant ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of restaurant's articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 message:
 *                   type: string
 */
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


/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid input
 */


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


/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Update an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated
 *       404:
 *         description: Article not found
 */

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


/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */

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