async function testCrypt(password: string): Promise<string> {
  const bcrypt = require('bcrypt');
  return await bcrypt.hash(password, 10);
}

async function main() {
  const bcrypt = require('bcrypt');
  const newHash = await bcrypt.hash('12345', 10);
  console.log(newHash);
}

main();
