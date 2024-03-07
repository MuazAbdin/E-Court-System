import React from 'react';
import { Wrapper } from '../assets/stylingWrappers/CasesMangment';

export default function CasesMangment() {
  return (
    <Wrapper>
      <div className='title'>Cases</div>
      <CreateButton>Create</CreateButton>
      <CasesList>
        <CaseRow> 
          <CaseText title="Title">Title</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Case Status</CaseText>
          <CaseText title="Case Court">Case Court</CaseText>
        </CaseRow>
        <CaseRow>
          <CaseText title="Title">Case 1</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Status</CaseText>
          <CaseText title="Case Court">Court</CaseText>
          <EditButton>Edit</EditButton>
        </CaseRow>

        <CaseRow>
          <CaseText title="Title">Case 2</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Status</CaseText>
          <CaseText title="Case Court">Court</CaseText>
          <EditButton>Edit</EditButton>
        </CaseRow>

        <CaseRow>
          <CaseText title="Title">Case 3</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Status</CaseText>
          <CaseText title="Case Court">Court</CaseText>
          <EditButton>Edit</EditButton>
        </CaseRow>

        <CaseRow>
          <CaseText title="Title">Case 4</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Status</CaseText>
          <CaseText title="Case Court">Court</CaseText>
          <EditButton>Edit</EditButton>
        </CaseRow>

        <CaseRow>
          <CaseText title="Title">Case 5</CaseText>
          <CaseText title="Case number">Case number</CaseText>
          <CaseText title="Case Status">Status</CaseText>
          <CaseText title="Case Court">Court</CaseText>
          <CreateButton>Edit</CreateButton>
        </CaseRow>
        </CasesList>
    </Wrapper>
  );
}
