import React from 'react'

const Timer = () => {
    return (
        <div>
        <span className="countdown font-mono text-2xl">
        {/* <span style={{"--value":10}}></span>: */}
        <span style={{"--value":24}}></span>:
        <span style={{"--value":7}}></span>
      </span></div>
    )
}

export default Timer