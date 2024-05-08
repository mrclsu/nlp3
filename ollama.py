import requests

url = 'http://127.0.0.1:11434/api/chat'

def post(json):
    r = requests.post(url=url, json=json)
    if r.status_code == 200:
        return True, r.json()["message"]["content"]
    else:
        return False, r.text

def build_json(model, messages, system_prompt, first = True):
    return {
        "model": model,
        "messages": [{"role": "system", "content": system_prompt}] + [{"role": "user" if (i + int(first)) % 2 == 1 else "assistant", "content": message} for i, message in enumerate(messages)],
        "stream": False
    }

def start_chat(socketio, chat_id, llm1, llm2, system_prompt, chat_prompt, chat_length, closing_prompt):

    messages = [chat_prompt]
    print("Starting Prompt: ")
    print(messages[-1])
    print()
    for _ in range(chat_length):
        succ, resp = post(build_json(llm1, messages, system_prompt))
        if succ:
            messages.append(resp)
            # print("\nLLM1:")
            # print(messages[-1])
            socketio.emit(chat_id, {'model': 0, 'response': resp})
        else:
            break
        succ, resp = post(build_json(llm2, messages, system_prompt, False))
        if succ:
            messages.append(resp)
            # print("\nLLM2:")
            # print(messages[-1])
            socketio.emit(chat_id, {'model': 1, 'response': resp})
        else:
            break

    if len(closing_prompt) > 0:
        closing_llm1 = build_json(llm1, messages)
        closing_llm1["messages"].append({"role": "user", "content": closing_prompt})
        succ, resp = post(closing_llm1)
        if succ:
            # print("\nLLM1:")
            # print(resp)
            socketio.emit(chat_id, {'model': 0, 'response': resp})

        messages.append(closing_prompt)
        succ, resp = post(build_json(llm2, messages, False))
        if succ:
            # print("\nLLM2:")
            # print(resp)
            socketio.emit(chat_id, {'model': 1, 'response': resp})