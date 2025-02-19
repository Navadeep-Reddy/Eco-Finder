const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAEgDO5u4HX2vHsOFrepxChz6WhUKmTd5w");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Navadeep:ObkEeEdXvdNfEqlh@userdata.4xm3b.mongodb.net/?retryWrites=true&w=majority&appName=UserData";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db('hquickie');
const user_collection = db.collection('users');  
const meal_collection = db.collection('meals')


// test function to show how mongoDB can be used here
async function test() {

    const query = {name: "Navadeep"};

    const user = await user_collection.findOne(query);

    console.log(user);
}
//test()

const postRecommendFood = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const structuredPrompt = `Return ONLY a raw JSON object (no markdown, no backticks) with nutritional information for ${prompt} with this exact structure an do not mention the units:
    {
      "Proteins": "<value> g",
      "Carbs": "<value> g",
      "Fats": "<value> g",
      "Calories": "<value> cal"
    }`;

    const response = await model.generateContent(structuredPrompt);
    let jsonString = response.response.text().trim();
    
    // Remove any markdown formatting if present
    if (jsonString.includes("```")) {
      jsonString = jsonString.replace(/```json\n|\n```|```/g, "");
    }
    
    const nutritionData = JSON.parse(jsonString);
    return res.json(nutritionData);
  } catch (error) {
    console.error("Error details:", error);
    return res.json({"Proteins":"0","Carbs":"0","Fats":"0","Calories":"0"});
  }
};

const getUserId = async (req, res) => {
    const g_id = req.params.googleid;

    // Directly writing the query along with the options which will have sort and projection
    const obj_id = await user_collection.findOne({googleId: g_id}, {
        projection: {_id:true}
    })

    res.json(obj_id)
}

const postMeal = async (req, res) => {

  try{
    const {Calories, Proteins, Carbs, Fats, UserName, UserEmail, UserId} = req.body;

    const result = await meal_collection.insertOne({
      name: UserName,
      email: UserEmail,
      id:UserId,
      nutrients: {
        Proteins: Proteins,
        Carbs: Carbs,
        Fats: Fats,
        Calories: Calories
      }
    });
    res.status(201).json({
      message: "Meal added successfully",
      mealId: result.insertedId
    });
  }

  catch(error) {
    console.error("Error inserting meal:", error);
    res.status(500).json({ error: "An error occurred while adding the meal" });    
  }

    
}


const getMacros = async (req, res) => {
  try {
    const { uid } = req.params; // Assuming the user ID is passed as a URL parameter

    // Perform the aggregation query
    const result = await meal_collection.aggregate([
      {
        $match: { id: uid } // Filter documents with the provided user ID
      },
      {
        $group: {
          _id: "$id", // Group by the `id` field
          totalProteins: { $sum: "$nutrients.Proteins" },
          totalCarbs: { $sum: "$nutrients.Carbs" },
          totalFats: { $sum: "$nutrients.Fats" },
          totalCalories: { $sum: "$nutrients.Calories" }
        }
      }
    ]).toArray(); // Convert the aggregation cursor to an array

    if (result.length === 0) {
      return res.status(404).json({ message: "No data found for the specified user ID" });
    }

    // Send the aggregated result as the response
    res.json(result[0]); // Return the first (and only) result
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const postRecommendMacros = async (req, res) => {
  try {

    //Calories is not being used 
    const { totalProteins, totalCarbs, totalFats, totalCalories } = req.body;
    

    const structuredPrompt = `Return ONLY a raw JSON object (no markdown, no backticks) with the suggested macronutrient balanced nutritients amount if this is the current intake of Proteins, Carbs, Fats in grams respectively ${totalProteins, totalCarbs, totalFats} with this exact structure an do not mention the units:
    {
      "RecommendedProteins": "<value> g",
      "RecommendedCarbs": "<value> g",
      "RecommendedFats": "<value> g"
    }`;

    const response = await model.generateContent(structuredPrompt);
    let jsonString = response.response.text().trim();
    
    // Remove any markdown formatting if present
    if (jsonString.includes("```")) {
      jsonString = jsonString.replace(/```json\n|\n```|```/g, "");
    }
    
    const nutritionData = JSON.parse(jsonString);
    return res.json(nutritionData);
  } catch (error) {
    console.error("Error details:", error);
    return res.json({"Proteins":"0","Carbs":"0","Fats":"0","Calories":"0"});
  }
};

const postVerdict = async (req, res) => {
  try {

    //Calories is being used 
    const { totalProteins, totalCarbs, totalFats, totalCalories } = req.body;
    

    const structuredPrompt = `
Based on the following dietary information, determine whether this diet is nutritionally balanced and provides adequate nutrients. 

* **Total Proteins:** ${totalProteins} grams
* **Total Carbohydrates:** ${totalCarbs} grams
* **Total Fats:** ${totalFats} grams
* **Total Calories:** ${totalCalories} calories

Provide a concise answer (e.g., "This diet appears balanced.", or "This diet may be low in protein. Consider increasing intake of [sources of protein]"). If the diet is not balanced, suggest specific and actionable recommendations for improvement and do not suggest relative to a day but generally look at the balance. 
`;              
    const response = await model.generateContent(structuredPrompt);
    
    return res.send(response.response.text());
  } catch (error) {
    console.error("Error details:", error);
    return res.send(`Failed to get verdict ${error}`)
  }
};

module.exports = {
  postRecommendFood,
  getUserId,
  postMeal,
  getMacros,
  postRecommendMacros,
  postVerdict
}