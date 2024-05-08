import requests

url = 'http://127.0.0.1:11434/api/chat'

LLM1 = "llama3"
LLM2 = "phi3"
SYSTEM_PROMPT = """You are a participant in a debate. You have to argue about a given topic by reacting to your opponent's text. 
You have to give concise answers to your opponent and concede when you feel appropriate, 
for example if you can't defend your initial argument from a counter, or otherwise lost the argument. 
You must not argue against your own side with novel information that you give, you can only do that by accepting your opponent's counterargument against your own."""
CHAT_PROMPT = ""
CHAT_LENGTH = 3


def post(json):
    r = requests.post(url=url, json=json)
    if r.status_code == 200:
        return True, r.json()["message"]["content"]
    else:
        return False, r.text

def build_json(model, messages, first = True):
    return {
        "model": model,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}] + [{"role": "user" if (i + int(first)) % 2 == 1 else "assistant", "content": message} for i, message in enumerate(messages)],
        "stream": False
    }

def start_chat(socketio, chat_id):
    messages = ["Climate change is not real, because the winters are getting colder in some places."]
    print("Starting Prompt: ")
    print(messages[-1])
    print()
    for _ in range(CHAT_LENGTH):
        succ, resp = post(build_json(LLM1, messages))
        if succ:
            messages.append(resp)
            # print("\nLLM1:")
            # print(messages[-1])
            socketio.emit(chat_id, {'model': 0, 'response': resp})
        else:
            break
        succ, resp = post(build_json(LLM2, messages, False))
        if succ:
            messages.append(resp)
            # print("\nLLM2:")
            # print(messages[-1])
            socketio.emit(chat_id, {'model': 1, 'response': resp})
        else:
            break