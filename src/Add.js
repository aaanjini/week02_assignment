import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { createWordFB, updateWordFB } from "./redux/modules/word";

const Add = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef([]);
    const word_id = params.id;    
    let word_data = useSelector(state => state.word.list).find(a => a.id === word_id);
    
    console.log(word_data);

    const word_obj =  (e) => {
        e.preventDefault();

        const word = inputRef.current[0].value;
        const trans = inputRef.current[1].value;
        const exam = inputRef.current[2].value;

        const ref_data = {word:word, trans:trans, exam:exam , check: false};

        dispatch(createWordFB(ref_data));
        window.alert("단어 등록 완료");
        navigate("/");

        
    }

    const edit_word =  (e) => {
        e.preventDefault();

        const word = inputRef.current[0].value;
        const trans = inputRef.current[1].value;
        const exam = inputRef.current[2].value;

        let ref_data = {id:word_id ,word:word, trans:trans, exam:exam};

        dispatch(updateWordFB(ref_data));
        window.alert("단어 수정 완료");
        navigate("/");        
    }


    
    return(

        <Wrap>
            {props.type === 'add' ? <Title>단어 등록하기</Title> : <Title>단어 수정하기</Title>}
            <Form onSubmit={word_obj}>
                <div>
                    <label>단어</label>
                    <input type="text" ref={el => inputRef.current[0] = el} defaultValue={word_data?word_data.word : null}/>
                </div>
                <div>
                    <label>해석</label>
                    <input type="text" ref={el => inputRef.current[1] = el} defaultValue={word_data?word_data.trans : null}/>
                </div>
                <div>
                    <label>예문</label>
                    <input type="text" ref={el => inputRef.current[2] = el} defaultValue={word_data?word_data.exam : null}/>
                </div>
                {props.type === 'add' ? 
                    <button type="submit" onClick={word_obj}>단어등록</button> :
                    <button type="submit" onClick={edit_word}>단어수정</button>
                }
                
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
    margin:60px auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    @media screen and (min-width: 1024px) {  
        margin: 20px auto;
    }
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
            border-bottom: 2px solid rgba(253,127,32,0.4);
            outline: none;
            :focus {
                border-bottom: 2px solid rgba(253,127,32,1);
            }
        }
        margin-bottom: 20px;
    }
    button {
        width:100%;
        height: 50px;
        font-size: 20px;
        border-radius: 10px;
        background-color: #FD7F20;
        color: white;
        border:none;
        margin:40px 0;
        cursor: pointer;
    }
    
`;

export default Add;