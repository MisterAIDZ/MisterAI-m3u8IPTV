// api/proxy.js
export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("No URL provided");

    try {
        const response = await fetch(url);
        const data = await response.arrayBuffer();
        
        // إعدادات السماح لكي يعمل المشغل بدون قيود CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        
        res.send(Buffer.from(data));
    } catch (e) {
        res.status(500).send("Proxy Error");
    }
}
