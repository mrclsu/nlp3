import { io } from 'socket.io-client';
import {
    Accessor,
    Signal,
    createSignal,
    createEffect,
    Component,
    For,
} from 'solid-js';

// import { socket } from '../socket';

const Thread: Component<{ channelId: Accessor<string | undefined> }> = (
    props,
) => {
    const [messages, setMessages] = createSignal<Message[]>([], {
        equals: false,
    });

    const socket = io('localhost:3001');

    createEffect(() => {
        let id = props.channelId();
        console.log('Id is', id);
        console.log(socket);
        const listener = (msg) => {
            console.log('rec');
            console.log(msg);
            setMessages((m) => [...m, msg]);
        };

        if (id !== undefined) {
            socket.on(id, listener);
        }

        return () => {
            socket.off(id, listener);
        };
    });

    return (
        <div class='flex flex-col h-full w-full justify-evenly content-center pt-2'>
            <ul class='list-none'>
                <For each={messages()}>
                    {(message, _) => (
                        <li class='block border-black border-2 p-2 m-2'>
                            LLM {message.model}: {message.response}
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};

export default Thread;
