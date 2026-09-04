const axios = require('axios');
async function check() {
  const html = await axios.get('https://represent-ai-fawn.vercel.app/dashboard');
  console.log('HTML length:', html.data.length);
  const regex = /<script src="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html.data)) !== null) {
    const jsUrl = match[1].startsWith('http') ? match[1] : 'https://represent-ai-fawn.vercel.app' + match[1];
    if (jsUrl.includes('_next/static/chunks/app/dashboard')) {
       console.log('Found chunk:', jsUrl);
       const js = await axios.get(jsUrl);
       console.log('Includes getLatestInv?', js.data.includes('getLatestInv'));
       console.log('Includes .sort(', js.data.includes('.sort('));
    }
  }
}
check();
