import React, {  useState } from 'react'
import Terminal from '../components/Terminals/Terminal';
import axios from 'axios';
import AceEditor from '../components/Ace/AceEditor'
import InputTerminal from '../components/Terminals/InputTerminal';
import RunbarIde from '../components/Navbar/RunbarIde';
import Editor from '../components/Editor';
const CompilerPage = () => {
    const [output, setoutput] = useState({});
    const [code, setcode] = useState('');
    const [input, setinput] = useState('');


    function getCode(res) {
        setcode(res)
    }

    async function submitcode() {

        const options = {
            method: 'POST',
            url: `http://192.168.1.124:2358/submissions`,
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
            },
            data: { "language_id": "62", "source_code": code, "stdin":input }
        };

        const response = await axios.request(options)

        fetchSubmission(response.data.token)

    }

    async function fetchSubmission(token) {
        const options = {
            method: 'GET',
            url: `http://192.168.1.124:2358/submissions/${token}`,
        };


        const res = await axios.request(options);

        if (res.data.status.id >= 3) {
            setoutput(res.data)
            console.log(res.data)
            return
        }
        console.log(res.data)
        setoutput(res.data)

        setTimeout(async () => {
            fetchSubmission(token)
        }, 1500);

    }
    function getInput(e) {
        e.preventDefault()
        setinput(e.target.value)
    }
  return (
    <div>
            <RunbarIde run={submitcode} />
            <div className=" flex min-h-[622px] max-h-[622px]">
                <main role="main" className="w-[70%]">
                    <Editor submitcode={getCode} isIde={true}/>
                    {/* <AceEditor getCode={getCode}/> */}
                </main>
                <div className=" flex flex-col w-[30%] ">
                    <InputTerminal getInput={getInput} placeholder={"Input:"} />
                    <Terminal output={output} placeholder={"Output:"} />
                </div>
            </div>
        </div>
  )
}

export default CompilerPage