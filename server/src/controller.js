const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const multer = require("multer");

// Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyC6cXSCXkwUlLxBjxG-KGMCDjFzV6lsoTc");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Make sure your uploads directory exists
const ensureUploadsDir = () => {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
  }
};

// Call this when your server starts
ensureUploadsDir();

// The actual controller function
const postScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("Received file:", req.file);

    // Read the image file and convert to Base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");
    
    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: req.file.mimetype,
                data: base64Image,
              },
            },
            {
              text: `
Analyze this image and determine its eco-friendliness.

### **Evaluation Criteria:**  
1. **Ingredients Impact:** Identify harmful substances like microplastics, palm oil, or parabens.  
2. **Certifications:** Detect eco-certifications such as USDA Organic, Fair Trade, or Rainforest Alliance.  
3. **Packaging Sustainability:** Assess recyclability, biodegradability, or plastic content.  
4. **Overall Eco-Score (1-10):** Provide a rating based on sustainability.

### **Response Format (Strict JSON)**:
{
  "ecoScore": (1-10),
  "verdict": "Short summary of sustainability",
  "suggestions": "Actionable recommendations for eco-friendly alternatives"
}

Return **only JSON output**, without explanations or markdown formatting.
            `,
            },
          ],
        },
      ],
    };

    const response = await model.generateContent(requestBody);
    let textResponse = response.response.text();

    // Extract JSON from AI response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("AI response does not contain valid JSON.");
    }

    const jsonResponse = JSON.parse(jsonMatch[0]);
    console.log("Processed response:", jsonResponse);

    return res.json(jsonResponse);
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ error: "Failed to process image", details: error.message });
  }
};

// Export both the controller and the middleware
module.exports = { 
  postScore,
  uploadMiddleware: upload.single('image') // This is important!
};