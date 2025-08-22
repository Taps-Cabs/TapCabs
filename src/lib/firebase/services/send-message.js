
// // pages/api/send-message.js

// export default async function handler(req, res) {
//     if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

//     const { phone, name, orderId } = req.body;

//     try {
//         const response = await axios.post('https://backend.aisensy.com/campaign/api/v1', {
//             campaignName: "Order Update", // Can be any name
//             destination: phone, // e.g. "91XXXXXXXXXX"
//             userName: "YOUR_USERNAME", // from AiSensy
//             template_name: "order_update", // your template name
//             template_data: [name, orderId],
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer YOUR_API_KEY',
//             },
//         });

//         return res.status(200).json({ success: true, data: response.data });
//     } catch (error) {
//         console.error("Send error:", error.response?.data || error.message);
//         return res.status(500).json({ success: false, error: error.message });
//     }
// }
