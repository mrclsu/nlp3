import uuid
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from threading import Thread
from flask_cors import CORS

from ollama import start_chat


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

def start_ollama_chat(data, form):
    llm1 = form["llm-1"]
    llm2 = form["llm-2"]


    start_chat(socketio, data)
    print("starting")

@app.route('/start', methods=['POST'])
def handle_post():
    if request.form:
        req_id = uuid.uuid4()
        thread = Thread(target=start_ollama_chat, args=(req_id, request.form))
        thread.start()

        return jsonify({
            "id": req_id,
            "form": request.form
        }), 200
    else:
        return jsonify({"error": "Request must be JSON"}), 400

@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    socketio.run(app, debug=True, port=3001)