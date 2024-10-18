import React, {useState} from 'react'
import './quiz.css'
import{ data } from '../../assets/Dataata';

function Quiz(){
  let[index,setINDEX] = userState(0);
  let[question,setquestion] = useState(data[index]);
  const checkAns = (e,ans) => {
    if(question.ans===ans){
      e.target.classList.add("correct");
    }
    else{
      e.target.classList.add("wrong");
    }
  }
  return(
  <div classname='container'>
    <h1>Take  time to save your life</h1>
    <hr />
    <h2>{index+1}.{question.question}</h2>
    <ul>
        <li onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
    </ul>
    <button>Next</button>
    <div className="index">1 of 5 questions</div>
  </div>
  )
}
