import { useCallback, useEffect, useRef, useState } from 'react'
import '../App.css'


function Form() {
    const[numberAllowed, setNumberAllowed] = useState(true)
    const[password, setPassword] = useState("")
    const[length, setLength] = useState(8)
    const[specialAllowed, setSpecialAllowed] = useState(false)
    const[copy, setCopy] = useState(" ")

    // Use Reference hook........
    const passRef = useRef(null)

    // Use Callback hook........
    const generatePassword = useCallback(()=>{
        setCopy("")
        let pass = ''
        let allowedChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
         if (numberAllowed){allowedChar+="0123456789"}
        if(specialAllowed){allowedChar+='<>?/!@#$%^&*()'}
        
        for(let i = 0;i<length;i++){
        let char = (Math.floor(Math.random()*allowedChar.length))            
        pass += allowedChar.charAt(char)
        }      
        setPassword(pass)
 
        }, [length, specialAllowed, numberAllowed, setPassword])
        
    // Use Effect hook........
    // useEffect(()=>{generatePassword()}, [length])

    function copyToClipboard(){
        window.navigator.clipboard.writeText(password)
        passRef.current?.select()
        setCopy("Copied to Clipboard")
    }

  return (
    <>
    <h1 className='h1'>Password Generator</h1>
    <div className="generator"> 
        <div className="password"> 
            <input type="text" 
                placeholder="password" 
                value={password} 
                readOnly 
                ref={passRef}/> 
            <button onClick={copyToClipboard}>Copy</button> 
        </div> 
        <h3>{copy}</h3>

        <div className="options">  
            <div className="option" style={{width:"17rem"}}> 
                <input type="range" 
                    min={6} 
                    max={24} 
                    value={length} 
                    style={{outline:'none'}}
                    onChange={(e) => {setLength(e.target.value)
                        setPassword("")}}/>
            <span style={{marginLeft:'1rem'}}>Length: {length}</span> 
            </div>
            <div className="option checkbox"> 
                <label> 
                    <input type="checkbox" 
                        id="digits" 
                        defaultChecked = {numberAllowed}
                        onChange={()=>{
                            setNumberAllowed((prev) => !prev)
                            setPassword("")}}/> 
                    <span>0-9</span> 
                </label> 
            </div> 
            <div className="option checkbox"> 
                <label> 
                    <input type="checkbox" 
                        id="special" 
                        defaultChecked={specialAllowed}
                        onChange={()=>{setSpecialAllowed((prev=>!prev))
                            setPassword("")}}
                        /> 
                    <span>Special Characters</span> 
                </label> 
            </div> 
        </div> 
        <button className="generate" 
            onClick={()=>{generatePassword()}}> 
            {password?"Regenerate Password":"Generate Password"}
        </button> 
    </div> 
    </>
  )
}

export default Form
