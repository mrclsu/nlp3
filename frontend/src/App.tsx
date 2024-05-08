import { createSignal, type Component } from 'solid-js';
import Params from './components/Params';
import Thread from './components/Thread';

/*
    * The App component is the root component of the application. It contains two child components:
    * - Params: A form to input the channel ID.
    * - Thread: A component to display the messages in the channel.
*/
const App: Component = () => {
    const [channel, setChannel] = createSignal<string | undefined>();

    return (
        <div class='flex flex-col px-32 py-10 h-full w-full justify-evenly content-center'>
            <Params setChannel={setChannel} />
            <Thread channelId={channel} />
        </div>
    );
};

export default App;
