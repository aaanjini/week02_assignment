import React from "react";
import './App.css';
import './theme.js';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loadWordFB , checkWordFB , deleteWordFB} from "./redux/modules/word";

import plus from "./Plus.png";
import { FaCheck , FaPen , FaTimes } from "react-icons/fa";


const Word = (props) => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const wordList = useSelector(state => state.word.list);

    const check_word = (word_id) =>{
        dispatch(checkWordFB(word_id));
    }   

    const delete_word = (word_id) => {
        dispatch(deleteWordFB(word_id));
        window.alert("단어 삭제 완료");
        navigate("/");
    }

    return(
        <div>
            <WordWrap>
                {wordList.map((el,idx) => {
                    return(
                        <Words key={idx} check={el.check} className="card">
                            <Title>
                                <h3>{el.word}</h3>
                                <div>
                                    <button onClick={()=>{check_word(el)}}><FaCheck/></button>
                                    <Link to={{
                                        pathname:`/add/${el.id}`,
                                    }}><FaPen/></Link>
                                    <button><FaTimes onClick={()=>{
                                        delete_word(el.id)
                                    }}/></button>
                                </div>
                            </Title>
                            <Text>
                                <p>{el.trans}</p>
                                <p className="ex">{el.exam}</p>
                            </Text>
                        </Words>
                    );

                })}                
            </WordWrap>
            <AddPage href="/add"><img src={plus} alt="추가 아이콘" /></AddPage>
        </div>       
    );

}

const WordWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px 0px;
    @media screen and (min-width: 768px) {
        padding: 0;
    }  
`;

const Words = styled.div`
    width:100%;
    padding: 20px;
    border: 2px solid #FD7F20;
    border-radius: 0 10px 10px 0;
    background-color: ${(props) => (props.check ? "black" : "#FDB750")};    
    transition: box-shadow 300ms ease-in-out 0s;

    >div > div {
        button,a {
            color : ${(props) => (props.check ? "white" : "black")} ;
        }
        a {
            margin: 0 10px;
        }
    }
    >div {
        > h3 {color : ${(props) => (props.check ? "white" : "black")} ;}
        > p { color : ${(props) => (props.check ? "white" : "black")} ;}
        > p.ex { 
            font-size: 13px;   
            color : ${(props) => (props.check ? "white" : "#9F2B00")} ;
        }
    }
    @media screen and (min-width: 768px) {
        width: calc((100% - 20px) / 2);
    }  
    @media screen and (min-width: 1024px) {
        width : calc((100% - 40px) / 3);
    }
`;

const Title = styled.div`
    margin-bottom: 10px;
    > h3 {
        width: 70%;
        display: inline-block;
        margin: 0;
        vertical-align: super;        
    }
    >div {
        display: inline-block;
        width: calc(30% - 10px);
        margin-left: 10px;
        text-align: right;
        >button {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
        }
        >a {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color : black;
        }
    }
    
`;
const Buttons = styled.div`
    >button {
        background-color: transparent;
        border: none;
        width: 30px;
        padding: 0;
        cursor: pointer;
        >img {
            width: 100%;
        }
    }
`;
const Text = styled.div`
    >p {
        margin: 10px 0;
        
    }
    >hr {
        margin-bottom: 20px;
    }
`;

const AddPage = styled.a`
    display: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color : #FD7F20;
    position: fixed;
    bottom: 20px;
    right: 20px;
    :hover {
        >img {
            transform: rotate(90deg);
        }
    }
    >img {
        transition: transform 300ms ease-in-out 0s;
        width: 100%;
        
    }
    @media screen and (min-width: 1024px) {  
        display: block;
    }
`;

export default Word;