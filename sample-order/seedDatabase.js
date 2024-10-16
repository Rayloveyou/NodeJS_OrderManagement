const { connectToDatabase } = require('./db');

async function seedDatabase() {
  const db = await connectToDatabase();
  const orders = db.collection('orders');

  // Clear existing orders
  await orders.deleteMany({});

  // Sample order data
  const sampleOrders = [
    { id: "ORD001", customer: "John Doe", product: "TikTok T-Shirt", quantity: 2, total: 39.98 },
    { id: "ORD002", customer: "Jane Smith", product: "TikTok Hoodie", quantity: 1, total: 49.99 },
    { id: "ORD003", customer: "Bob Johnson", product: "TikTok Cap", quantity: 3, total: 44.97 },
    { id: "ORD004", customer: "Alice Brown", product: "TikTok Water Bottle", quantity: 1, total: 14.99 },
    { id: "ORD005", customer: "Charlie Wilson", product: "TikTok Sticker Pack", quantity: 5, total: 9.95 }
  ];

  await orders.insertMany(sampleOrders);
  console.log("Database seeded with sample orders");
}

seedDatabase().catch(console.error);