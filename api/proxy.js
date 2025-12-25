export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).send("URL missing");

    try {
        const response = await fetch(url);
        // إضافة الهيدرز التي تسمح للمتصفح بتشغيل الفيديو (تجاوز CORS)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');

        const arrayBuffer = await response.arrayBuffer();
        res.send(Buffer.from(arrayBuffer));
    } catch (error) {
        res.status(500).send("Proxy error: " + error.message);
    }
}
