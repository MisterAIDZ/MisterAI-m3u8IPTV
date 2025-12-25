export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("No URL");

    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        res.send(Buffer.from(buffer));
    } catch (e) {
        res.status(500).send("Proxy Error");
    }
}
