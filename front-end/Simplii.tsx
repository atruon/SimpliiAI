import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import 'dotenv/config'



function Simplii() {
    const [simplifiedText, setSimplifiedText] = useState("");
    const [inputText, setInputText] = useState("")
    const inputTextAreaRef = useRef(null);
    const outputTextAreaRef = useRef(null);

    useEffect(() => {
        if ((inputTextAreaRef.current)) {
            inputTextAreaRef.current.style.height = 'auto';
            inputTextAreaRef.current.style.height = `${inputTextAreaRef.current.scrollHeight}px`
        }
        
        if ((outputTextAreaRef.current)) {
            outputTextAreaRef.current.style.height = 'auto';
            outputTextAreaRef.current.style.height = `${outputTextAreaRef.current.scrollHeight}px`
        }
        chrome.storage.local.get("popupText", (data) => {
            if (data.popupText)  {
                setInputText(() => data.popupText)
            }
        })
        chrome.storage.local.remove("popupText")
        return () => {
        }
        
    }, [inputText, simplifiedText])

    function handleTextInput(e) {
        setInputText(() => e.target.value)
    }


    async function handleSimplifyText() {
        const res = await axios.post(process.env.PLASMO_PUBLIC_LOCAL_HOST, {
            prompt:inputText
        })
        if ("error" in res.data) {
            setSimplifiedText(() => `Error: ${res.data.error.message}(${res.data.error.code})`)
        }
        else {
            setSimplifiedText(() => res.data.processed)
        }
        chrome.storage.local.remove("popupText")
    }


    return <>
        <h1>Simplii: AI-Powered text simplificator</h1>
        <div className='to-process'>
            <h2>To be simplified:</h2>
            <textarea placeholder='Text to be simplified' value={inputText} ref={inputTextAreaRef}
            onChange={(e) => handleTextInput(e)}>
            </textarea>
        </div>
        <div className='processed'>
            <h2>Simplified Text: </h2>
            <textarea readOnly value={simplifiedText} placeholder='Simplified Text Goes here'
            ref={outputTextAreaRef}>
            </textarea>
        </div>
        <button onClick={handleSimplifyText}>Simplify!</button>
    </>
}

export default Simplii