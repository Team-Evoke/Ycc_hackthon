const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb+srv://presentationnew106:Tyj2rZsTAIiROmbI@cluster0.me75a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertRandomData() {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('your_collection_name');

    const randomData = {
        symbol: 'AAPL',
        price: (Math.random() * (200 - 180) + 180).toFixed(2),
        volume: Math.floor(Math.random() * (6000 - 5000) + 5000),
        change: (Math.random() * (2 - (-2)) + (-2)).toFixed(2),
        low: (Math.random() * (185 - 180) + 180).toFixed(2),
        high: (Math.random() * (195 - 190) + 190).toFixed(2),
        timestamp: new Date()
    };

    await collection.insertOne(randomData);
    console.log('Inserted random data:', randomData);
}

setInterval(insertRandomData, 5000); // Insert random data every 5 seconds

async function getStockData() {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('your_collection_name');

    const latestData = await collection.find({ symbol: 'AAPL' }).sort({ timestamp: -1 }).limit(1).toArray();

    return latestData[0];
}

module.exports = { getStockData };
