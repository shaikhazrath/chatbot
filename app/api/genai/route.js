import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = 'AIzaSyC449GmuXR5ongxeePmqZJ7BUxAbb28fQw';

const genAI = new GoogleGenerativeAI(apiKey);

const pc = new Pinecone({
     apiKey: 'pcsk_3F3uHz_FSL1katfpjvPn3MvsWKmM8onPh1wbeeg3m2fqFSYehrvzeSaChDiwvyf9MHiXia'
});

async function generateEmbeddings(text) {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);

    const embedding = Array.isArray(result.embedding) ? result.embedding : Object.values(result.embedding);

    return embedding;
}

async function geminiAi(conv, namespaceid) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const queryEmbedding = await generateEmbeddings(conv);
    const searchResults = await pc.index('cm').namespace(namespaceid).query({
        vector: queryEmbedding,
        topK: 5,
        includeMetadata: true
      });
    

      const relevantContext = searchResults.matches.map(match => match.metadata.text).join(' ');

      const promptTemplate = `
      You are an AI-powered chatbot designed to assist users in navigating the website. 
      Your goal is to provide helpful information about the company's services, offerings, and resources based on the context below.
    
      Context:
      ${relevantContext}
    
      Instructions:
      - Answer the user's question based on the provided context.
      - If the user asks for navigation help, guide them to the relevant section of the website.
      - If the user's query is unclear, ask clarifying questions to better understand their needs.
      - Keep your responses concise, friendly, and professional.
    
      Question: ${conv}
    `;

    const result = await model.generateContent(promptTemplate);
    const response = result.response.text();
    
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in geminiAi function:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { message, transcriptId } = await request.json();
    const data = await geminiAi(message, transcriptId);
    return new Response(JSON.stringify({ response: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}