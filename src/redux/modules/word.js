import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {db} from "../../firebase";


// Actions
const LOAD = 'word/LOAD';
const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const CHECK = 'word/CHECK';

const initialState = {
  list: [],
};

export const loadWord = (word_list) => {
  return { type: LOAD, word_list };
}

export const createWord = (data) => {
  return { type: CREATE, data };
};

export const checkWord = (word_id) => {
  return { type: CHECK, word_id };
};


// 파이어베이스랑 통신하는 부분
export const loadWordFB = () => {
  return async function (dispatch) {
    // 데이터를 가져와요!
    const word_data = await getDocs(collection(db, "word"));

    let word_list = [];

    word_data.forEach((word)=>{
      word_list.push({id:word.id,...word.data()});
    });

    dispatch(loadWord(word_list));
  }
}

export const createWordFB = (word) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "word"), word);
    const _word = await getDoc(docRef);
    const word_data = {id:_word.id , ..._word.data()};

    dispatch(createWord(word_data));
  }
}

export const checkWordFB = (word_id) => {
  return async function (dispatch, getState) {    
    const docRef = doc(db,"word", word_id);
    const word_index = getState().word.list.findIndex((w)=>{
        return w.id === word_id
    });
    console.log(word_index);
    //await updateDoc(docRef, {check : true});
    await updateDoc(docRef,{check : !getState().word.list[word_index].check});
    
    dispatch(checkWord(word_index));

  }

}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "word/LOAD" : 
      return {list : action.word_list};
    case "word/CREATE":      
      return {list: [...state.list,action.data]};
    case "word/CHECK":{      
      const new_word = state.list.map((val,index) => {
          return index !==action.word_index?val:{...val, check : !val.check};
      });
      return {...state,list : [...new_word]};
        
    }

    default: 
      return state;
  }
}