const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany();
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61a79577bd68f1a60ee9c7d6",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque odio fugit saepe optio repudiandae sed ex libero beatae recusandae ipsum ratione earum vero autem officiis harum nisi molestias, modi nihil.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/deohcgfbq/image/upload/v1638777313/YelpCamp/e6jmzvdtifd09fooikw9.jpg',
                    filename: 'YelpCamp/e6jmzvdtifd09fooikw9',
                },
                {
                    url: 'https://res.cloudinary.com/deohcgfbq/image/upload/v1638777313/YelpCamp/i2lffqw7ltgbxger9ulu.jpg',
                    filename: 'YelpCamp/i2lffqw7ltgbxger9ulu',
                }
            ]
        })
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
})