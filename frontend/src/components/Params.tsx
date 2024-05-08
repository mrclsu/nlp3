import { Component, createSignal } from 'solid-js';

const Params: Component = () => {
    const [temp, setTemp] = createSignal<number>(0.5);

    const enforceBounds = (e: { currentTarget: HTMLInputElement }) => {
        let min = parseInt(e.currentTarget.min);
        let max = parseInt(e.currentTarget.max);
        let current = parseInt(e.currentTarget.value);

        if (current < min) {
            e.currentTarget.value = e.currentTarget.min;
        } else if (current > max) {
            e.currentTarget.value = e.currentTarget.max;
        }
    };

    return (
        <form class='flex flex-col justify-evenly content-evenly h-1/3 rounded-sm'>
            <input
                name='starting-prompt'
                type='text'
                placeholder='Starting Prompt'
            />
            <input
                name='starting-prompt'
                type='text'
                placeholder='System Prompt'
            />

            <div class='flex flex-row justify-between gap-2'>
                {[1, 2].map((n) => (
                    <select
                        class='w-1/2'
                        name={`llm-${n}`}
                    >
                        <option
                            disabled
                            selected
                        >
                            LLM {n}
                        </option>
                        <option>llama3</option>
                        <option>llama2</option>
                        <option>phi3</option>
                    </select>
                ))}
            </div>
            <div class='flex flex-row content-center justify-center'>
                <input
                    class='w-2/3'
                    onInput={(e) => enforceBounds(e)}
                    placeholder='Conversation Length'
                    type='number'
                    min={1}
                    max={20}
                />

                <span class='block'>{temp()}</span>
                <input
                    class='block h-2 w-full cursor-pointer appearance-none rounded-md bg-gray-200 [&::-webkit-slider-thumb]:!bg-primary'
                    value={temp()}
                    onInput={(e) => setTemp(parseFloat(e.currentTarget.value))}
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                />
            </div>
            <button class='border-black border-2 w-fit py-1 px-4 rounded-md'>
                Start
            </button>
        </form>
    );
};

export default Params;
