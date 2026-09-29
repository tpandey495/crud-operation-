// ═══════════════════════════════════════════════════════════
//  In-Memory Product Store (Array)
// ═══════════════════════════════════════════════════════════

let products = [{
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone with A17 chip',
    price: 999.99,
    stock: 50,
    category: 'Electronics',
  }];
let nextId = 1;

// Helper: log the current state of the array
const logProducts = (operation) => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📦 [${operation}] — Current Products Array:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (products.length === 0) {
    console.log('   (empty — no products yet)');
  } else {
    console.table(products);
  }
  console.log(`   Total items: ${products.length}\n`);
};

// ─── CREATE ─────────────────────────────────────────────
const createProduct = (req, res) => {
   console.log(req.body);
  const { name, description, price, stock, category } = req.body;

 

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required.' });
  }

  const product = {
    id: nextId++,
    name,
    description: description || null,
    price: parseFloat(price),
    stock: stock ?? 0,
    category: category || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  products.push(product);
  logProducts('CREATE');

  res.status(201).json({ message: 'Product created successfully', product });
};

// ─── READ ALL ────────────────────────────────────────────
const getAllProducts = (req, res) => {
  logProducts('READ ALL');
  res.json({ total: products.length, products });
};

// ─── READ ONE ────────────────────────────────────────────
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }

  logProducts(`READ ONE (id: ${id})`);
  res.json({ product });
};

// ─── UPDATE ──────────────────────────────────────────────
const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }

  const { name, description, price, stock, category } = req.body;
  const current = products[index];

  products[index] = {
    ...current,
    name: name ?? current.name,
    description: description !== undefined ? description : current.description,
    price: price !== undefined ? parseFloat(price) : current.price,
    stock: stock !== undefined ? stock : current.stock,
    category: category !== undefined ? category : current.category,
    updated_at: new Date().toISOString(),
  };

  logProducts(`UPDATE (id: ${id})`);
  res.json({ message: 'Product updated successfully', product: products[index] });
};

// ─── DELETE ──────────────────────────────────────────────
const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found.` });
  }

  const deleted = products.splice(index, 1)[0];
  logProducts(`DELETE (id: ${id})`);
  res.json({ message: 'Product deleted successfully', product: deleted });
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
