import NoteContext from "./NoteContext";
import React, { useState } from "react";


const NoteState = (props) => {

    const [loginformData, setLoginFormData] = useState({
        email: "",
        password: ""

    })

    const [signupform, setSignUpForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [formData, setFormData] = useState({
        comments: ""
      })

    const [input, setInput] = useState(false);

    const [fetchedCommment, setFectchedComment] = useState('');






    return (
        <NoteContext.Provider value={{formData, setFormData, signupform, setSignUpForm, loginformData, setLoginFormData, input, setInput, fetchedCommment, setFectchedComment}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;