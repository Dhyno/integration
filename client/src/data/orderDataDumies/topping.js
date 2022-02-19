import { topingImages } from "../../components/atomic/getAllImages/GetImages";

const topingData=[
    {
        name: 'Buble Tea Gelatin',
        image: topingImages.bubleTea
    },
    {
        name: 'Manggo',
        image: topingImages.manggo
    },
    {
        name: 'Green Coconut',
        image: topingImages.greenCoconut
    },
    {
        name: 'Boba Manggo',
        image: topingImages.bobbaManggo
    },
    {
        name: 'Bill Berry Boba',
        image: topingImages.blueberryBobba
    },
    {
        name: 'Kiwi Popping peral',
        image: topingImages.kiwiPearl
    },
    {
        name: 'Matcha Cantaloppe',
        image: topingImages.matchaCataloppe
    },
    {
        name: 'Strawberry Popping',
        image: topingImages.strawberry
    },
];

const topingOrder={
    getState: null,
    before: null,
    count: 0
}

export { topingData, topingOrder };