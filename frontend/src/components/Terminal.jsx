import React from 'react'
import './terminal.css'
const Terminal = ({placeholder,isDisabled,output,getInput}) => {
  return (
        <textarea onChange={getInput} value={output?output.stdout:null} disabled={isDisabled} placeholder={placeholder} className="terminal text-lg p-3">
            
        </textarea>
  )
}

export default Terminal