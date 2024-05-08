import { Component, createSignal } from 'solid-js';

const Params: Component<{
    setChannel: (id: string | undefined) => void;
}> = (props) => {
    const [temp, setTemp] = createSignal<number>(0.5);

    const submitForm = (e: Event & { currentTarget: HTMLFormElement }) => {
        e.preventDefault();

        const sendForm = async () => {
            let formData = new FormData(e.currentTarget);
            let res = await fetch('http://localhost:3001/start', {
                method: 'POST',
                body: formData,
            });

            let json = await res.json();
            props.setChannel(json.id);
            console.log(json);
        };

        sendForm();
    };

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
        <form
            class='flex flex-col justify-evenly content-evenly h-fit gap-1 rounded-sm'
            onsubmit={submitForm}
        >
            <input
                name='starting-prompt'
                type='text'
                placeholder='Starting Prompt'
                required
            />
            <input
                name='sys-prompt'
                type='text'
                placeholder='System Prompt'
                required
            />
            <input
                name='closing-prompt'
                type='text'
                placeholder='Closing Prompt (Optional)'
            />
            <div class='flex flex-row justify-between gap-2'>
                {[1, 2].map((n) => (
                    <input
                        class='w-1/2'
                        type='text'
                        name={`llm-${n}`}
                        placeholder={`LLM ${n}`}
                        required
                    ></input>
                ))}
            </div>
            <div class='flex flex-row content-center justify-between gap-2'>
                <input
                    name='conv-len'
                    class='w-2/3'
                    onInput={(e) => enforceBounds(e)}
                    placeholder='Conversation Length'
                    type='number'
                    required
                    min={1}
                    max={20}
                />
                <div class='flex flex-col w-1/3'>
                    <span class='block'>Temperature: {temp()}</span>
                    <input
                        name='temp'
                        class='block h-2 w-full cursor-pointer appearance-none rounded-md bg-gray-200 [&::-webkit-slider-thumb]:!bg-primary'
                        value={temp()}
                        onInput={(e) =>
                            setTemp(parseFloat(e.currentTarget.value))
                        }
                        type='range'
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
            </div>
            <button
                formAction='submitForm'
                class='border-black border-2 w-fit py-1 px-4 rounded-md self-center'
            >
                Start
            </button>
        </form>
    );
};

export default Params;
