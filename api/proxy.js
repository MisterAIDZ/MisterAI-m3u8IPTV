// api/proxy.js
export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send("Missing URL");
    }

    try {
        const response = await fetch(url);
        
        // إضافة تصاريح الوصول (CORS) ليعمل على المتصفح
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', response.headers.get('content-type'));

        // تمرير البث مباشرة للمشغل
        const readableStream = response.body;
        readableStream.pipe(res);
        
    } catch (error) {
        res.status(500).send("Proxy Error: " + error.message);
    }
}
