import { useState } from 'react';

const App = () => {
    // State to store the user input value
    const [value, setValue] = useState("");
    // State to handle error messages
    const [error, setError] = useState("");
    // State to keep track of the chat history
    const [chatHistory, setChatHistory] = useState([]);

    // List of predefined questions for the 'Surprise Me' feature
    const surpriseOptions = [
          'What is bayes theorem?',
        'What is the Fibonacci sequence?',
        'What is a qubit?',
        'Why is nvidia stock price booming?',
        'How bullish is the market in todays world,',
        'What does bullish mean?',
        'Why are GPUs used in Machine learning training instead of CPUs?',
        'What is the Heisenberg Uncertainty Principle?',
        'How do enzymes catalyze chemical reactions?',
        'What is Keynesian economics?',
        'How does the electoral college work in the United States?',
        'What is the significance of the Magna Carta?',
        'How does a black hole form?',
        'What are the principles of sustainable development?',
        'What is the difference between classical and operant conditioning in psychology?',
        'How does the greenhouse effect contribute to global warming?',
        'What is the role of DNA in genetic inheritance?',
        'What is the difference between modernism and postmodernism in literature?',
        'How do supply and demand affect market prices?',
        'What is the function of the mitochondria in a cell?',
        'What is the significance of Shakespeares Hamlet in English literature?',
        'How do civil rights movements impact society?',
        'What is quantum entanglement?',
        'How are public policies developed and implemented?',
        'What is the impact of social media on communication?',
        'How do vaccines stimulate the immune system?',
        'What is the role of ethics in artificial intelligence development?',
    ];

    // Function to pick a random question from the surpriseOptions
    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
        setValue(randomValue);
    };

    // Function to handle the submission of a question and fetch the response
    const getResponse = async () => {
        if (!value) {
            setError("Error! Please ask a question");
            return;
        }

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: chatHistory,
                    message: value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch('http://localhost:8000/gemini', options);
            const data = await response.text();
            console.log(data);
            // Update chat history with the user's question and the model's response
            setChatHistory(oldChatHistory => [...oldChatHistory, { role: "user", parts: value }, { role: "model", parts: data }]);
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong, Please try again!");
        }
    };

    // Function to clear the current input and any displayed error message
    const clear = () => {
        setValue("");
        setError("");
        setChatHistory([]);
    };

    // The rendered component structure
    return (
        <div className="app">
            <p>How is your studying going my fellow scholar?
                <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
            </p>
            <div className="input-container">
                <input
                    value={value}
                    placeholder={"Im struggling with my midterms"}
                    onChange={e => setValue(e.target.value)}
                />
                {!error && <button onClick={getResponse}>Ask Me</button>}
                {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p>{error}</p>}
            <div className="search-result">
                {chatHistory.map((chatItem, _index) => (
                    <div key={_index}>
                        <p className="answer">{chatItem.role}: {chatItem.parts}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
