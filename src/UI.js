import { useReducer, useState, useRef, useEffect } from "react";
import React from 'react'


const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH':{
            return [
                ...state,
                {
                    title: action.payload.name
                }
            ]
    }
        case 'DISMISS':
            {
                return state.filter((_,k) => k!==action.k)
            }
        default:
            return state
    }
}



export default function PracReducer() {
    const[test, setTest] = useState([])
    useEffect(() => {
      testfunc()
    }, [])
  
    async function testfunc(){
        let api = await fetch('https://hn.algolia.com/api/v1/search?query=hello&page=0')
        let apijson = await api.json()
        setTest(apijson.hits)
    }

  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, test)
  console.log(test)
  return (
    <>
    <h2>Search: </h2><input
        ref={inputRef}
        type="text"
        id="name"
        name="name"
      />
    <button onClick={()=>dispatch({type: 'SEARCH'})}>Submit</button>
    
    <br />
    {test.map(
        (x,k)=>(<>
            <span>Title: {x.title}, Author: {x.author}</span>
            <button value={x.title} onClick={()=>dispatch({type: 'DISMISS', k})}>Dismiss</button>
            <br />
            </>)
        )
    }
    
    </>
  )
}
