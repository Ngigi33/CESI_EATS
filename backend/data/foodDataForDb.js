// backend/data/foodDataForDb.js

// Ce fichier contient uniquement les données des plats, avec les URLs des images servies par le backend
// Il est destiné à être importé par populate_db.js

// Assurez-vous que le port ARTICLE_SERVICE_PORT est correctement configuré dans votre .env (par défaut 4005)
export const food_list_for_db = [
    {
        _id: "1",
        name: "Greek salad",
        image: "food_1.png", // CORRECTION : Juste le nom du fichier
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: "food_2.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "3",
        name: "Clover Salad",
        image: "food_3.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "4",
        name: "Chicken Salad",
        image: "food_4.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: "food_5.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: "food_6.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        image: "food_7.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "8",
        name: "Veg Rolls",
        image: "food_8.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: "food_9.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: "food_10.png",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: "food_11.png",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: "food_12.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: "food_13.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: "food_14.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: "food_15.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "16",
        name: "Bread Sandwich",
        image: "food_16.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "17",
        name: "Cup Cake",
        image: "food_17.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "18",
        name: "Vegan Cake",
        image: "food_18.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: "food_19.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "20",
        name: "Sliced Cake",
        image: "food_20.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "21",
        name: "Garlic Bread",
        image: "food_21.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "22",
        name: "Mix Veg Pulav",
        image: "food_22.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "23",
        name: "Rice Bowl",
        image: "food_23.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "24",
        name: "Veg Biryani",
        image: "food_24.png",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheesy Pasta",
        image: "food_25.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: "food_26.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "27",
        name: "Creamy Pasta",
        image: "food_27.png",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "28",
        name: "Chicken Pasta",
        image: "food_28.png",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "29",
        name: "Buttter Noodles",
        image: "food_29.png",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "30",
        name: "Veg Noodles",
        image: "food_30.png",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "31",
        name: "Somen Noodles",
        image: "food_31.png",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "32",
        name: "Cooked Noodles",
        image: "food_32.png",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];