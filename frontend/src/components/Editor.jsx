import React, { useEffect, useRef, useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/python/python'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/theme/dracula.css';
import Codemirror from 'codemirror';
import { useSelector } from 'react-redux'

const initialcode = `public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
`
const Editor = ({ submitcode ,isIde}) => {
    const { data: question } = useSelector((state) => state.problemMeta)
    
    const editorRef = useRef(null)
    const [code, setcode] = useState(initialcode)


    useEffect(() => {
        function init() {
            
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                    autocorrect: true,
                    lineWrapping: true
                }
            );
            if(isIde){
                editorRef.current.setValue(code)
            }else{
                editorRef.current.setValue(question.java)
            }
            submitcode(editorRef.current.getValue())
            //Use For Realtime changes
            editorRef.current.on('change', (instance, changes) => {
                console.log(instance.getValue())
                submitcode(editorRef.current.getValue())
            })
        }
            init()
    },[])

    


    return (
        <div>
            <div className='bg-gray-500'>Navbar</div>
            <textarea id="realtimeEditor"></textarea>
        </div>
    );


}

export default Editor