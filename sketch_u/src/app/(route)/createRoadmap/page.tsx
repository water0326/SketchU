"use client";

import React from 'react';
import styled from 'styled-components';
import ProfileButton from '@/app/_components/profile';

const StudyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Question = styled.h2`
  margin-bottom: 64px;
  font-size: 30px;
  color: #333;
  font-weight: 400;
`;
const EmptyBox = styled.div`
  margin-top: 94px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  border-radius: 25px;
  outline: none;
  font-size: 1.1rem;
  background-color: transparent;
  width: 774px;
  height: 50px;
  background-color: #F6F9F3;
  box-shadow: inset 0 3px 8px rgba(0,0,0,0.15);
  padding-left: 20px; /* 왼쪽 여백을 추가하여 텍스트를 왼쪽에서 떨어뜨립니다. */
  padding-top: 2px;
`;

const Button = styled.button`
  background-color: #76c7c0;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0,0,0,0.2));

  &:hover {
    background-color: #63aea6;
  }
`;

const StudyForm: React.FC = () => {
  return (
    <StudyContainer>
      <ProfileButton></ProfileButton>
      <Question>어떤 내용에 대해서 공부하고 싶으신가요?</Question>
      <InputWrapper>
        <Input placeholder="" />
        <Button>
          <img src="/icons/SendButton.svg" alt="S" />
        </Button>
      </InputWrapper>
      <EmptyBox></EmptyBox>
    </StudyContainer>
  );
};

export default StudyForm;
