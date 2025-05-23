const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const jwt = require('jsonwebtoken');

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, val] = arg.split('=');
    args[key.replace(/^--/, '')] = val;
  });
  return args;
}

(async () => {
  const { id, role } = parseArgs();
  if (!id || !role) {
    console.error('Usage: node generate-token.js --id=<userId> --role=<role>');
    process.exit(1);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('❌ Missing JWT_SECRET in your environment');
    process.exit(1);
  }

  // Crea el payload y firma el token
  const payload = { id: Number(id), role };
  const token = jwt.sign(payload, secret, { expiresIn: '8h' });

  console.log(`\n✅ Generated JWT for user ${id} (${role}):\n`);
  console.log(token);
  console.log('\n📋 Copy this token and use it in the Authorization header:\n');
  console.log(`Authorization: Bearer ${token}\n`);
})();
