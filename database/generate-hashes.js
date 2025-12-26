const bcrypt = require('bcryptjs');

async function generateHashes() {
  const adminPassword = 'admin123';
  const userPassword = 'user123';

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const userHash = await bcrypt.hash(userPassword, 10);

  console.log('\n=== Password Hashes ===\n');
  console.log('Admin (admin@example.com):');
  console.log(`Password: ${adminPassword}`);
  console.log(`Hash: ${adminHash}\n`);
  console.log('User (user@example.com):');
  console.log(`Password: ${userPassword}`);
  console.log(`Hash: ${userHash}\n`);

  console.log('=== SQL INSERT Statements ===\n');
  console.log(`INSERT INTO users (email, password, name, role) VALUES`);
  console.log(`('admin@example.com', '${adminHash}', 'Admin User', 'admin'),`);
  console.log(`('user@example.com', '${userHash}', 'Test User', 'user');`);
}

generateHashes().catch(console.error);
