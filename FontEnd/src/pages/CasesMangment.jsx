import React from 'react';
import { Wrapper } from '../assets/stylingWrappers/CasesMangment';

export default function CasesMangment() {
  return (
    <Wrapper>
    <div className='title'>Cases</div>
    <button className='create-button'>Create</button>
    <div className='case-row'>
      <span className='case-text' title="Title">Title</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Case Status</span>
      <span className='case-text' title="Case Court">Case Court</span>
      <button className='edit-button'>Edit</button>
    </div>
    <div className='case-row'>
      <span className='case-text' title="Title">Case 1</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>
    <div className='case-row'>
      <span className='case-text' title="Title">Case 2</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>


    <div className='case-row'>
      <span className='case-text' title="Title">Case 3</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>


    <div className='case-row'>
      <span className='case-text' title="Title">Case 4</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>


    <div className='case-row'>
      <span className='case-text' title="Title">Case 5</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>


    <div className='case-row'>
      <span className='case-text' title="Title">Case 6</span>
      <span className='case-text' title="Case number">Case number</span>
      <span className='case-text' title="Case Status">Status</span>
      <span className='case-text' title="Case Court">Court</span>
      <button className='edit-button'>Edit</button>
    </div>
    
  </Wrapper>
  );
}
