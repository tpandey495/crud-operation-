const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = 3000;

// ─── Middleware ───────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ───────────────────────────────────────────
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Products CRUD API is running' });
});

// ─── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`\n💡 Data is stored in an in-memory array (no database).`);
  console.log(`   Watch this terminal to see the array after each operation!\n`);
});
