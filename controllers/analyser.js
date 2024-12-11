const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB8u-_gBmd9O3iLw_yLiOtnty90oPSOzBk");

const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

exports.generate = async (req, res) => {
  try {
    const prompt = "caption the image";

    const imageResp = await fetch(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg"
    ).then((response) => response.arrayBuffer());

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString("base64"),
          mimeType: "image/*",
        },
      },
      prompt,
    ]);
    console.log(result.response.text());
    res.status(200).json({
      text: result.response.text(),
      image: result.response.data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
let convohistory = [];

exports.textgeneration = async (req, res, next) => {
    try {
      const prompt = req.body.prompt || "";
  
      if (!prompt.trim()) {
        return res.status(400).json({
          status: "failure",
          message: "Prompt cannot be empty",
        });
      }
  
      // Add user prompt to conversation history
      convohistory.push({ role: "user", message: prompt });
  
      // Initialize chat session
      const chat = model.startChat({
        history: convohistory.map(({ role, message }) => ({
          role,
          parts: [{ text: message }],
        })),
      });
  
      // Send message to model
      const result = await chat.sendMessage([prompt]);
  
      // Validate and parse model response
      if (!result || !result.response || !result.response.text) {
        throw new Error("Invalid or missing response from the generative model");
      }
  
      const text = result.response.text;
  
      // Append model's response to conversation history
      convohistory.push({ role: "model", message: text });
  
      return res.status(200).json({
        status: "success",
        data: { response: result},
      });
    } catch (err) {
      console.error("Error during generation:", err);
      return res.status(500).json({
        status: "failure",
        message: `An error occurred: ${err.message}`,
      });
    }
  };
  
