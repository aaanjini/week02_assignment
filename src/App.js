import React from 'react';
import {Route,Routes, Link} from 'react-router-dom';
import styled from "styled-components";
import './App.css';
import Add from './Add';
import Word from './Word';

 

function App() {

  
  return (
    <div className="App">
      <Header>
          <Link to="/"><h1>Vocabulary</h1></Link>
      </Header>
      <Container>
        <Routes>
          <Route path="/" element={<Word />}/> 
          <Route path="/add" element={<Add />}/>
        </Routes>
      </Container>      
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
    background-color: white;
    text-align: left;
    border-bottom: 1px solid #ddd;
    > a {
      display: block;
      color:#D3B5E5;
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

export default App;
