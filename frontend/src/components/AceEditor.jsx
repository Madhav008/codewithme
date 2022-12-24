import React from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/theme-cobalt"
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

import './ace.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useState } from 'react';

const initialcode = `public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
`
const AceEditors = ({getCode}) => {
    const { data: question } = useSelector((state) => state.problemMeta)
    const [code, setcode] = useState(initialcode)

    const langs = ['java', 'c_cpp', 'python']
    const theames =['dracula','cobalt','xcode','github']
    const [lang, setlang] = useState('java')
    const [size,setSize] = useState(14)
    const [theame,settheame] = useState('cobalt')


    function onChange(newValue) {
        //get value from here    
    }

    useEffect(() => {

        function init() {
            setcode(question.java);
        }
        init();

    }, [question])

    return (
        <>  
            <AceEditor
                mode={lang}
                theme={theame}
                onChange={onChange}
                fontSize={size}
                highlightActiveLine={true}
                value={code}
                name="CodeMirror"
                showPrintMargin={false}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </>
    )
}

export default AceEditors