import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Editor from '../components/Editor';
import axios from 'axios';
import Problems from '../components/Problems';
import Terminal from '../components/Terminal';
import Runbar from '../components/Runbar';


const Home = ({ user }) => {
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

    useEffect(() => {
        if (user != null) {
            toast.success(`Hi ,Thank You For Login`);
        }
    }, [user])

    return (
        <div >
            <Runbar run={submitcode} />
            <div className=" flex ">
                <div className="w-[30%] ">
                    <Problems />
                </div>
                <main role="main" className="w-[60%]">
                    <Editor submitcode={getCode} />
                </main>
                <div className=" flex flex-col w-[25%] ">
                    <Terminal getInput={getInput} placeholder={"Input:"} isDisabled={false} />
                    <Terminal output={output} placeholder={"Output:"} isDisabled={true} />
                </div>
            </div>
        </div>
    )
}

export default Home