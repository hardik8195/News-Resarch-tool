from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os


load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("API key not found! Please set it in the .env file.")   

llm = ChatGroq(
    temperature=0.7,  
    model="llama-3.1-70b-versatile",
    stop_sequences="\n"
)

if __name__=="__main__":
    res = llm.invoke("hello")
    print(res.content)

