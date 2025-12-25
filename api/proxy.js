// api/proxy.js
export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send("رابط القناة مطلوب");
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) throw new Error(`سيرفر IPTV استجاب بخطأ: ${response.status}`);

        // إعداد الهيدرز للسماح بالبث وتجاوز CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', response.headers.get('content-type') || 'video/mp2t');

        // تحويل البيانات كـ Buffer وإرسالها
        const arrayBuffer = await response.arrayBuffer();
        res.send(Buffer.from(arrayBuffer));

    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).send("خطأ في جلب البث: " + error.message);
    }
}
