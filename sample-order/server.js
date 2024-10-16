// // 


// const express = require('express');
// const ExcelJS = require('exceljs');
// const { connectToDatabase } = require('./db');

// const app = express();
// const port = 3000;

// app.use(express.static('public'));

// let db;

// async function initializeDatabase() {
//   db = await connectToDatabase();
// }

// initializeDatabase();

// app.get('/api/orders', async (req, res) => {
//   try {
//     const orders = await db.collection('orders').find().toArray();
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// app.get('/api/export', async (req, res) => {
//   try {
//     const orders = await db.collection('orders').find().toArray();
    
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Orders');
    
//     worksheet.addRow(['Order ID', 'Customer', 'Product', 'Quantity', 'Total']);
    
//     orders.forEach(order => {
//       worksheet.addRow([order.id, order.customer, order.product, order.quantity, order.total]);
//     });
    
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
    
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (error) {
//     console.error('Error exporting orders:', error);
//     res.status(500).json({ error: 'Failed to export orders' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const ExcelJS = require('exceljs');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Sample order data
const sampleOrders = [
  { id: "ORD001", customer: "John Doe", product: "TikTok T-Shirt", quantity: 2, total: 39.98 },
  { id: "ORD002", customer: "Jane Smith", product: "TikTok Hoodie", quantity: 1, total: 49.99 },
  { id: "ORD003", customer: "Bob Johnson", product: "TikTok Cap", quantity: 3, total: 44.97 },
  { id: "ORD004", customer: "Alice Brown", product: "TikTok Water Bottle", quantity: 1, total: 14.99 },
  { id: "ORD005", customer: "Charlie Wilson", product: "TikTok Sticker Pack", quantity: 5, total: 9.95 }
];

app.get('/api/orders', (req, res) => {
  res.json(sampleOrders);
});

app.get('/api/export', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');
    
    worksheet.addRow(['Order ID', 'Customer', 'Product', 'Quantity', 'Total']);
    
    sampleOrders.forEach(order => {
      worksheet.addRow([order.id, order.customer, order.product, order.quantity, order.total]);
    });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting orders:', error);
    res.status(500).json({ error: 'Failed to export orders' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});