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
const DELETE = 'word/DELETE';

const initialState = {
  list: [],
};

export const loadWord = (word_list) => {
  return { type: LOAD, word_list };
}

export const createWord = (word_data) => {
  return { type: CREATE, word_data };
};

export const updateWord = (word_index, word_data) => {
  return { type: UPDATE, word_index, word_data };
};

export const checkWord = (word_id) => {
  return { type: CHECK, word_id };
};

export const deleteWord = (word_index) => {
  return { type: DELETE, word_index };
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
    const word_data = {id:_word.id , ..._word.data() , check:false};

    dispatch(createWord(word_data));
  }
}

export const updateWordFB = (word_data) => {
  return async function (dispatch, getState) {    
    const docRef = doc(db,"word", word_data.id);
    await getDoc(docRef);
    await updateDoc(docRef,word_data);

    const word_index = getState().word.list.findIndex((w)=>{
        return w.id === word_data.id
    });
    
    dispatch(updateWord(word_index,word_data));

  }
}

//암기 체크
export const checkWordFB = (el) => {
  return async function (dispatch) {
      const docRef = doc(db, "word", el.id)
      updateDoc(docRef, { check: !el.check });

      dispatch(checkWord(docRef.id));
  }
}


export const deleteWordFB = (word_id) => {
  return async function (dispatch , getState) {
    if(!word_id){
      window.alert("아이디가 없습니다.");
      return;
    }
    const docRef = doc(db, "word" , word_id);
    await deleteDoc(docRef);

    const word_list = getState().word.list;
    const word_index = word_list.findIndex((w)=>{
      return w.id === word_id
    });

    dispatch(deleteWord(word_index));
  }

}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "word/LOAD" : 
      return {list : action.word_list};
    case "word/CREATE":      
      return {list: [...state.list,action.word_data]};
    case "word/UPDATE":{      
      const new_word_list = state.list.map((el,index) => {
          return index !==action.word_index?el:action.word_data;
      });
      return {...state,list : [...new_word_list]};
    }
    case "word/CHECK": {
      const new_word_list = state.list.map((el) => {
          return el.id !== action.word_id ?  el :  { ...el, check: !el.check };
      })
      return { list: [...new_word_list] };
    }
    case "word/DELETE": {
      const new_word_list = state.list.filter((l, idx) => {
        return parseInt(action.word_index) !== idx;
      });
  
     return {list: new_word_list};
    }

    default: 
      return state;
  }
}