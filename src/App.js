import React , {useEffect} from 'react';
import {Route,Routes, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import './App.css';
import Add from './Add';
import Word from './Word';
import tiger from './tiger.png';
import { async } from '@firebase/util';

import {loadWordFB} from './redux/modules/word';

function App() {
  const dispatch = useDispatch(); 

  React.useEffect(async() => {
      dispatch(loadWordFB());
  }, []);

  return (
    <div className="App">
      <Header>
          <Link to="/"><h1>Vocabulary</h1></Link>
      </Header>
      <Container>
        <Routes>
          <Route path="/" element={<Word />}/> 
          <Route path="/add" element={<Add type="add"/>} />
          <Route path="/add/:id" element={<Add type="edit"/>}/>
        </Routes>
      </Container> 
      <div>
        <Tiger src={tiger}/>
      </div>    
    </div>
  );
}


const Header = styled.header`
    width: 100vw;
    height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    padding: 0 20px;
    background-color: #FD7F20;
    text-align: left;
    > a {
      display: block;
      color:black;
      margin : 10px 0 0;
      text-decoration: none;
      > h1 {
        margin:0;
      }
    }    
`;

const Container = styled.div`
    width: 100%;
    padding: 20px;
    margin-top: 40px;  

    @media screen and (min-width: 768px) {  
      padding: 40px;
    }
    
    @media screen and (min-width: 1024px) {  
      max-width: 1400px;
      margin: 60px auto 0px;
    }
`;

const Tiger = styled.img`
  position: fixed;
  left: -40px;
  bottom: -50px;
  width: 200px;
  animation-name: _scroll;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  @keyframes _scroll {
    0% {bottom : -150px}
    50% {bottom : -80px}
    100% {bottom : -150px}
  }
  @media screen and (min-width: 768px) {  
    width: 400px;
    left: -80px;
    bottom: -300px;
    width: 400px;
    @keyframes _scroll {
      0% {bottom : -300px}
      50% {bottom : -200px}
      100% {bottom : -300px}
    }
  }  
`;

export default App;
