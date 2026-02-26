const STRAPI_URL = 'https://reassuring-flower-045536ee58.strapiapp.com';

async function getProductIds() {
  const slugs = ['iphone-15-pro-max', 'samsung-s24-ultra'];
  const results = {};

  for (const slug of slugs) {
    const res = await fetch(`${STRAPI_URL}/api/productos?filters[slug][$eq]=${slug}`);
    const json = await res.json();
    if (json.data && json.data.length > 0) {
      results[slug] = json.data[0].documentId || json.data[0].id;
      console.log(`Found ${slug}: ${results[slug]}`);
    }
  }
  
  process.stdout.write(JSON.stringify(results));
}

getProductIds();
