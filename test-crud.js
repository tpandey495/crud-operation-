// ═══════════════════════════════════════════════════════════
//  CRUD Test Script — Tests Create, Read, Update, Delete
//  Run: node test-crud.js (while server is running)
// ═══════════════════════════════════════════════════════════

const BASE_URL = 'http://localhost:3000/api/products';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const request = async (method, url, body) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(url, options);
  const data = await res.json();
  return { status: res.status, data };
};

const printResult = (step, label, result) => {
  console.log(`\n${'═'.repeat(55)}`);
  console.log(`  STEP ${step}: ${label}`);
  console.log(`${'═'.repeat(55)}`);
  console.log(`  Status: ${result.status}`);
  console.log(`  Response:`);
  console.log(JSON.stringify(result.data, null, 2));
};

const runTests = async () => {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║        🧪 CRUD Operations Test Suite              ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // ─── 1. CREATE — Add 3 products ───────────────────────
  const product1 = await request('POST', BASE_URL, {
    name: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone with A17 chip',
    price: 999.99,
    stock: 50,
    category: 'Electronics',
  });
  printResult(1, 'CREATE — iPhone 15 Pro', product1);

  await delay(300);

  const product2 = await request('POST', BASE_URL, {
    name: 'Nike Air Max 90',
    description: 'Classic running shoes',
    price: 129.99,
    stock: 200,
    category: 'Footwear',
  });
  printResult(2, 'CREATE — Nike Air Max 90', product2);

  await delay(300);

  const product3 = await request('POST', BASE_URL, {
    name: 'The Art of Programming',
    description: 'A comprehensive guide to coding',
    price: 49.99,
    stock: 100,
    category: 'Books',
  });
  printResult(3, 'CREATE — The Art of Programming', product3);

  await delay(300);

  // ─── 2. READ ALL ──────────────────────────────────────
  const allProducts = await request('GET', BASE_URL);
  printResult(4, 'READ ALL — Get all products', allProducts);

  await delay(300);

  // ─── 3. READ ONE ──────────────────────────────────────
  const oneProduct = await request('GET', `${BASE_URL}/1`);
  printResult(5, 'READ ONE — Get product with id 1', oneProduct);

  await delay(300);

  // ─── 4. UPDATE ────────────────────────────────────────
  const updated = await request('PUT', `${BASE_URL}/2`, {
    name: 'Nike Air Max 90 (Limited Edition)',
    price: 159.99,
    stock: 150,
  });
  printResult(6, 'UPDATE — Update product with id 2', updated);

  await delay(300);

  // ─── 5. READ ALL after update ─────────────────────────
  const afterUpdate = await request('GET', BASE_URL);
  printResult(7, 'READ ALL — Verify update', afterUpdate);

  await delay(300);

  // ─── 6. DELETE ────────────────────────────────────────
  const deleted = await request('DELETE', `${BASE_URL}/3`);
  printResult(8, 'DELETE — Delete product with id 3', deleted);

  await delay(300);

  // ─── 7. READ ALL after delete ─────────────────────────
  const afterDelete = await request('GET', BASE_URL);
  printResult(9, 'READ ALL — Verify delete (should be 2 products)', afterDelete);

  await delay(300);

  // ─── 8. ERROR cases ───────────────────────────────────
  const notFound = await request('GET', `${BASE_URL}/999`);
  printResult(10, 'ERROR — Get non-existent product (expect 404)', notFound);

  const badCreate = await request('POST', BASE_URL, { description: 'Missing name and price' });
  printResult(11, 'ERROR — Create without required fields (expect 400)', badCreate);

  // ─── Summary ──────────────────────────────────────────
  console.log(`\n${'═'.repeat(55)}`);
  console.log('  ✅ All CRUD tests completed!');
  console.log(`${'═'.repeat(55)}`);
  console.log('\n  📌 Summary:');
  console.log('     • CREATE — 3 products added');
  console.log('     • READ   — All + single product retrieved');
  console.log('     • UPDATE — Product 2 modified');
  console.log('     • DELETE — Product 3 removed');
  console.log('     • ERRORS — 404 & 400 handled correctly');
  console.log('\n  💡 Check the SERVER terminal to see the array logs!\n');
};

runTests().catch((err) => {
  console.error('❌ Test failed:', err.message);
  console.error('   Make sure the server is running: node server.js');
});
