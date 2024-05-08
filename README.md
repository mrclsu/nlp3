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

You will also need to install ollama from [ollama.com](https://ollama.com/). And run it with the following command:

```bash
    ollama serve
```

To download models for the first time, run the following command:

```bash
    ollama pull <model name>
```

### Run the web app

In two separate terminals run the following commands:

```bash
    python backend.py
```

```bash
    cd frontend
    npm run dev
```

The web app should be available at `http://localhost:3000/`.
