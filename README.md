# Our NLP 3 Assignment

## Team Members

- Benedek Bahrami
- Marcell Schuh

## Web App Setup

### Install dependencies

To run the frontend and backend, you need to install the dependencies. Run the following commands:

Node.js and npm are required to run the frontend. You can install them from [nodejs.org](https://nodejs.org/en/).

```bash
    pip install -r requirements.txt
    cd frontend
    npm install
```

You will also need to install ollama from [ollama.com](https://ollama.com/).
To download models for the first time, run the following commands in two terminal windows:

```bash
    ollama serve
```

```bash
    ollama pull <model name>
```

### Run the web app

In three separate terminals run the following commands:

```bash
    ollama serve
```

```bash
    python backend.py
```

```bash
    cd frontend
    npm run dev
```

The web app should be available at `http://localhost:3000/`.
