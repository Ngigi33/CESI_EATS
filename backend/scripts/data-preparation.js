// data-preparation.js
import mongoose from 'mongoose';

// IMPORTANT: Make sure this MONGODB_URI matches the one your servers use
const MONGODB_URI = 'mongodb://localhost:27017/cesi-eats';

// --- Schemas (must match your actual backend schemas) ---
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const restaurantSchema = new mongoose.Schema({
    userId: Number, // You might remove this if userId is not directly on Restaurant schema anymore
    owner: Number,
    name: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'open' },
    image: String,
    opening: String,
    closing: String,
    tags: [String],
    description: String,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

const articleSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    image: String,
    description: String,
    price: { type: Number, required: true },
    type: { type: String, required: true }
});
const Article = mongoose.model('Article', articleSchema);


async function prepareData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🔌 MongoDB connected for data preparation');

        // --- Clear existing data (optional, for a fresh start) ---
        // This is good practice when seeding, but be careful in production!
        await User.deleteMany({});
        await Restaurant.deleteMany({});
        await Article.deleteMany({});
        console.log('✅ Cleared existing User, Restaurant, and Article data');

        // --- Create a dummy user ---
        const dummyUser = await User.create({ name: 'Test User', email: 'test@example.com' });
        console.log('👤 Dummy user created:', dummyUser);
        console.log('** IMPORTANT: Use this User ID in StoreContext.jsx:**', dummyUser._id);


        // --- Create dummy restaurant and articles ---
        const dummyRestaurant = await Restaurant.create({
            name: 'Burger Joint',
            address: '101 Main St',
            status: 'open',
            image: 'https://example.com/burger_joint.png', // Replace with a real image URL
            opening: '09:00',
            closing: '22:00',
            tags: ['Fast Food', 'Burgers'],
            description: 'Best burgers in town!'
        });
        console.log('🍕 Dummy restaurant created:', dummyRestaurant);

        const dummyArticle1 = await Article.create({
            restaurantId: dummyRestaurant._id,
            name: 'Classic Burger',
            price: 10.99,
            image: 'https://example.com/classic_burger.png', // Replace with a real image URL
            description: 'A delicious classic beef burger.',
            type: 'Burger'
        });

        const dummyArticle2 = await Article.create({
            restaurantId: dummyRestaurant._id,
            name: 'Fries',
            price: 3.50,
            image: 'https://example.com/fries.png', // Replace with a real image URL
            description: 'Crispy golden fries.',
            type: 'Side'
        });
        console.log('🍔 Dummy articles created:', dummyArticle1.name, dummyArticle2.name);


    } catch (error) {
        console.error('❌ Data preparation error:', error);
        console.error('Make sure your MongoDB server is running.');
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected.');
    }
}

prepareData();