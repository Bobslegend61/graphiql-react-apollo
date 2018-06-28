import React from 'react'
import "./Level.css";

const Level = ({ percentCompleted, notPercentCompleted }) => {
  return (
    <div className="todo-completed-level" style={ { background: `linear-gradient(to right, #7481FF ${ percentCompleted }, #B28C00 ${ notPercentCompleted })` } }></div>
  )
}

export default Level;