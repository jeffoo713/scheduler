import React from 'react';

import './InterviewerListItem.scss';

const InterviewerListItem = props => {
  return (
    <li
      className={
        props.selected ? 'interviewers__item--selected' : 'interviewers__item'
      }
      onClick={props.setInterviewer}
    >
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

export default InterviewerListItem;
