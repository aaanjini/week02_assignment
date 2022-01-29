import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import './App.css';
import './theme.js';
import plus from "./Plus.png";
import { loadWordFB } from "./redux/modules/word";

import { FaCheck , FaPen , FaTimes } from "react-icons/fa";

const Word = (props) => {
    const dispatch = useDispatch(); 

    const wordList = useSelector(state => state.word.list);
    
    React.useEffect( () => {
        dispatch(loadWordFB());
    }, []);


    return(
        <div>
            <WordWrap>
                {wordList.map((el,idx) => {
                    return(
                        <Words key={idx} className="card">
                            <Title>
                                <h3>{el.word}</h3>
                                <div>
                                    <button><FaCheck/></button>
                                    <button><FaPen/></button>
                                    <button><FaTimes/></button>
                                </div>
                            </Title>
                            <Text>
                                <Translate>{el.trans}</Translate>
                                <Example>{el.exam}</Example>
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
        padding: 50px 0px;
    }  
`;

const Words = styled.div`
    width:100%;
    padding: 20px;
    border: 2px solid #BBE7FE;
    border-radius: 10px;
    background-color: white;
    transition: box-shadow 300ms ease-in-out 0s;

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

const WordText = styled.p` //단어
    
`;
const Example = styled.p` //예문
    color: #74BDCB;
    font-size: 13px;   
`;
const Translate = styled.p` //해석
    
`;


const AddPage = styled.a`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color : #D3B5E5;
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
`;

export default Word;