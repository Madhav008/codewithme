import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

import "./ace.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setUserCode } from "../../store/userCodeSlice";

const AceEditors = () => {
  const { data: question } = useSelector((state) => state.problemMeta);
  const [code, setcode] = useState(question.java);
  const dispatch = useDispatch();
  const langs = ["java", "c_cpp", "python"];
  const theames = ["dracula", "cobalt", "xcode", "github"];
  const [lang, setlang] = useState("java");
  const [size, setSize] = useState(14);
  const [theame, settheame] = useState("cobalt");

  function submitCode(res) {
    dispatch(
      setUserCode({
        code: res,
        lang: "java",
      })
    );
  }

  return (
    <>
      <AceEditor
        mode={lang}
        theme={theame}
        onChange={submitCode}
        fontSize={size}
        highlightActiveLine={true}
        value={question.java}
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
  );
};

export default AceEditors;
