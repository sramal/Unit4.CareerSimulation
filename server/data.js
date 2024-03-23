const categories = [
    "Clothing",
    "Shoes",
    "Consumer Electronics",
    "Books, Movies, Music, and Games",
];

const products = [
    {
        title: "Reebok Men's and Big Men's Delta Core T-Shirt, up to Sizes 3XL",
        category: "Clothing",
        price: 12.0,
        quantity: 10,
        image: "https://unsplash.com/photos/assorted-color-folded-shirts-on-wooden-panel-tWOz2_EK5EQ",
    },
    {
        title: "Wrangler Men's and Big Men's Carpenter Pant",
        category: "Clothing",
        price: 21.99,
        quantity: 20,
        image: "https://unsplash.com/photos/blue-denim-jeans-on-white-textile-YeGao3uk8kI",
    },
    {
        title: "Time and Tru Women’s Smocked Waist Midi Dress with Short Sleeves, Sizes XS-XXXL",
        category: "Clothing",
        price: 28.0,
        quantity: 5,
        image: "https://unsplash.com/photos/woman-in-red-and-white-floral-dress-rygrPAseHmY",
    },
    {
        title: "Women's Simple Foldover Stretch A-Line Flared Knee Length Skirt Comfy Stylish",
        category: "Clothing",
        price: 28.0,
        quantity: 10,
        image: "https://unsplash.com/photos/a-woman-in-a-dress-and-boots-is-walking-down-a-set-of-stairs-VvezsaGkYZw",
    },
    {
        title: "Scoop Women's Block Heel Mule Sandals",
        category: "Shoes",
        price: 35.0,
        quantity: 10,
        image: "https://unsplash.com/photos/black-and-pink-peep-toe-heeled-sandals-s7TceQs70xs",
    },
    {
        title: "VerPetridure Woman Summer Sandals Open Toe Buckle Ankle Strap Espadrilles Flatform Wedge Casual Sandal",
        category: "Shoes",
        price: 17.3,
        quantity: 20,
        image: "https://unsplash.com/photos/woman-in-orange-and-brown-leather-open-toe-sandals-DfQSEG0N_tw",
    },
    {
        title: `Herman Survivors Men's Boulder Waterproof 6" Steel Toe Work Boots`,
        category: "Shoes",
        price: 54.98,
        quantity: 5,
        image: "https://unsplash.com/photos/brown-leather-lace-up-boot-8cT5ja0P_N4",
    },
    {
        title: "Avia Men's QuickFlash Athletic Low-Top Sneakers, Sizes 8-13",
        category: "Shoes",
        price: 19.98,
        quantity: 10,
        image: "https://unsplash.com/photos/white-nike-air-force-1-low-PGTO_A0eLt4",
    },
    {
        title: "Apple MacBook Air 13.3 inch Laptop - Space Gray. M1 Chip, 8GB RAM, 256GB storage",
        category: "Consumer Electronics",
        price: 699.0,
        quantity: 10,
        image: "https://unsplash.com/photos/macbook-pro-RSCirJ70NDM",
    },
    {
        title: 'SAMSUNG 27" Odyssey G65B QHD 240Hz 1ms(GTG) 1000R Curved Gaming Monitor - LS27BG650ENXGO',
        category: "Consumer Electronics",
        price: 299.99,
        quantity: 20,
        image: "https://unsplash.com/photos/flat-screen-tv-zhvaeh-R9rA",
    },
    {
        title: 'SAMSUNG 55" Class CU7000B Crystal UHD 4K Smart Television UN55CU7000BXZA',
        category: "Consumer Electronics",
        price: 367.99,
        quantity: 5,
        image: "https://unsplash.com/photos/tv-on-cabinet-with-cream-color-wall-and-wood-flooring3d-rendering-MM_5_BrhRtA",
    },
    {
        title: "Apple Magic Keyboard with Numeric Keypad - US English",
        category: "Consumer Electronics",
        price: 107.84,
        quantity: 10,
        image: "https://unsplash.com/photos/silver-and-white-computer-keyboard-PXaQXThG1FY",
    },

    {
        title: "WWE 2K24 Deluxe Edition, Xbox One/Xbox Series X",
        category: "Books, Movies, Music, and Games",
        price: 109.76,
        quantity: 10,
        image: "https://unsplash.com/photos/white-xbox-one-game-controller-ABbtsOGAmZ4",
    },
    {
        title: "The Marvels (Blu-Ray + Digital Copy)",
        category: "Books, Movies, Music, and Games",
        price: 24.96,
        quantity: 20,
        image: "https://unsplash.com/photos/a-pile-of-comics-sitting-on-top-of-a-table-LSPUdV6IWsY",
    },
    {
        title: "The Guardians (Hardcover) by John Grisham",
        category: "Books, Movies, Music, and Games",
        price: 367.99,
        quantity: 5,
        image: "https://unsplash.com/photos/white-book-page-on-white-textile-plbb7pkEjkQ",
    },
    {
        title: "Apple Magic Keyboard with Numeric Keypad - US English",
        category: "Books, Movies, Music, and Games",
        price: 107.84,
        quantity: 10,
        image: "https://unsplash.com/photos/silver-and-white-computer-keyboard-PXaQXThG1FY",
    },
];

module.exports = {
    categories,
    products,
};
