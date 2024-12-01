import os
import pickle
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import UnstructuredURLLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from llm_helper import llm


file_path = 'vector_store.pkl'




def process_url(urls):
    loader = UnstructuredURLLoader(urls=urls)
    data = loader.load()
    print(data[0])

    text_splitter = RecursiveCharacterTextSplitter(
        separators=['\n\n', '\n', '.', ','],
        chunk_size=500,
        chunk_overlap=100
    )

    docs = text_splitter.split_documents(data)

    embeddings = HuggingFaceEmbeddings(model_name="all-mpnet-base-v2")
    vector_store = FAISS.from_documents(docs, embeddings)

    with open(file_path, "wb") as f:
        pickle.dump(vector_store, f)

    return data


def predict(query:str):
    if os.path.exists(file_path):
        with open(file_path, "rb") as f:
            vectorstore = pickle.load(f)
            chain = RetrievalQAWithSourcesChain.from_llm(llm=llm, retriever=vectorstore.as_retriever())
            result = chain({"question": query}, return_only_outputs=True)

            return result


