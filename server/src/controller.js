const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyC6cXSCXkwUlLxBjxG-KGMCDjFzV6lsoTc"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const postScore = async (req, res) => {
  try {
    const { ocrText } = req.body; // Extract OCR text from request body

    const structuredPrompt = `
Analyze the following product label information and determine its eco-friendliness based on its ingredients, certifications, and packaging details.

**Product Information (Extracted from OCR):**  
"${ocrText}"

### Evaluation Criteria:  
1. **Ingredients Impact:** Check for harmful substances (e.g., microplastics, palm oil, parabens) and highlight them if present.  
2. **Certifications:** Identify if the product mentions eco-certifications (e.g., USDA Organic, Fair Trade, Rainforest Alliance).  
3. **Packaging Sustainability:** If packaging details are available, determine if it’s recyclable, biodegradable, or plastic-heavy.  
4. **Overall Eco-Score (1-10):** Provide an eco-score based on the above factors.  

### **Response Format (Strictly JSON)**:  
{
  "ecoScore": (1-10),
  "verdict": "Short summary of sustainability",
  "suggestions": "Actionable recommendations for more eco-friendly alternatives"
}

Ensure the response is **valid JSON**, with no additional text, explanations, or markdown formatting.
`;

    const response = await model.generateContent(structuredPrompt);
    let textResponse = response.response.text();

    // Extract JSON from the AI response by removing any markdown or unwanted text
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/); // Extract JSON content
    if (!jsonMatch) {
      throw new Error("AI response does not contain valid JSON.");
    }

    const jsonResponse = JSON.parse(jsonMatch[0]); // Convert to JSON object

    return res.json(jsonResponse); // Send a valid JSON response
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ error: "Failed to get eco-score", details: error.message });
  }
};

module.exports = {
  postScore,
};
