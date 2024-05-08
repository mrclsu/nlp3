import type { Component } from 'solid-js';
import Params from './components/Params';

const App: Component = () => {
    return (
        <div class='flex flex-col px-32 py-10 h-full w-full justify-evenly content-center'>
            <Params />
        </div>
    );
};

export default App;
