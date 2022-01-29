import React from "react";
import { useRef } from "react";
import { useDispatch } from 'react-redux'; 
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createWord , createWordFB } from "./redux/modules/word";

const Add = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef([]);

    const word_obj =  (e) => {
        e.preventDefault();

        const word = inputRef.current[0].value;
        const trans = inputRef.current[1].value;
        const exam = inputRef.current[2].value;

        const ref_data = {word:word, trans:trans, exam:exam};

        //dispatch(createWord(ref_data));
        dispatch(createWordFB(ref_data));
        navigate("/");

    }




    
    return(
        
        <Wrap>
            <Title>단어 등록하기</Title>
            <Form onSubmit={word_obj}>
                <div>
                    <label>단어</label>
                    <input type="text" ref={el => inputRef.current[0] = el}/>
                </div>
                <div>
                    <label>해석</label>
                    <input type="text" ref={el => inputRef.current[1] = el}/>
                </div>
                <div>
                    <label>예문</label>
                    <input type="text" ref={el => inputRef.current[2] = el}/>
                </div>
                <button type="submit" onClick={word_obj}>단어등록</button>
            </Form>
        </Wrap>        
    );

}


const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    max-width: 400px;
    margin: 50px auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
`;

const Title = styled.h3`
    font-size: 20px;
    margin-bottom: 40px;
    text-align: center;
`;

const Form = styled.form`

    >div {
        width:100%;
        >label {
            display: block;
            margin-bottom: 10px;
        }
        >input {
            width: 100%;
            height: 30px;
            background: transparent;
            border: none;
            border-bottom: 2px solid rgba(187,231,254,0.4);
            outline: none;
            :focus {
                border-bottom: 2px solid rgba(187,231,254,1);
            }
        }
        margin-bottom: 20px;
    }
    button {
        width:100%;
        height: 50px;
        font-size: 20px;
        border-radius: 10px;
        background-color: #74BDCB;
        color: white;
        border:none;
        margin:40px 0;
        cursor: pointer;
    }
    
`;

export default Add;