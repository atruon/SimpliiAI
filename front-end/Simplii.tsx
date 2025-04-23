import { useEffect, useState, useRef } from 'react'



function Simplii() {
    const [simplifiedText, setSimplifiedText] = useState("");
    const [inputText, setInputText] = useState("")
    const inputTextAreaRef = useRef(null);

    useEffect(() => {
        if ((inputTextAreaRef.current)) {
            inputTextAreaRef.current.style.height = 'auto';
            inputTextAreaRef.current.style.height = `${inputTextAreaRef.current.scrollHeight}px`
        }
    }, [inputText])

    function handleTextInput(e) {
        setInputText(i => e.target.value)
    }


    function handleSimplifyText() {
        setSimplifiedText(s => "Simplified Text!")
        console.log("Simplified the text!")
    }


    return <>
        <h1>Simplii: AI-Powered text simplificator</h1>
        <div className='to-process'>
            <h2>To be simplified:</h2>
            <textarea placeholder='Text to be simplified' ref={inputTextAreaRef}
            onChange={(e) => handleTextInput(e)}>
            </textarea>
        </div>
        <div className='processed'>
            <h2>Simplified Text: </h2>
            <textarea readOnly value={simplifiedText} placeholder='Simplified Text Goes here'></textarea>
        </div>
        <button onClick={handleSimplifyText}>Simplify!</button>
    </>
}

export default Simplii