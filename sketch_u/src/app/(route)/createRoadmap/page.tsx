"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ProfileButton from '@/app/_components/profile';
import RoadMapItem from './roadmapItem';

const StudyContainer = styled.div<{ movedUp: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Question = styled.h2<{ movedUp: boolean }>`
  margin-bottom: 64px;
  font-size: 30px;
  color: #333;
  font-weight: 400;
  transition: margin-top font-size 0.6s ease;

  ${({ movedUp }) =>
    movedUp &&
    css`
      margin-bottom: 2px;
      font-size: 23px;
      font-weight: 600;
    `}
`;

const Description = styled.div<{ movedUp: boolean }>`
  display: none;
  opacity: 0;
  width: 629px;
  height: 35px;
  margin-bottom: 43px;
  margin-top: 2px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  color: #383838;
  font-weight: 400;
  transition: opacity 1s ease;

  ${({ movedUp }) =>
    movedUp &&
    css`
      display: flex;
      opacity: 1;
    `}
`;

const DivisionLine = styled.div`
  background-color: #afafaf;
  width: 100%;
  height: 2px;
  border-radius: 100;
`;

const RoadMapContainer = styled.div<{ movedUp: boolean }>`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  transition: all 0.6s ease;
  width: 800px;
  height: 0px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #76c7c0 transparent;

  ${({ movedUp }) =>
    movedUp &&
    css`
      display: flex;
      height: calc(100% - 344px);
    `}

  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background: #76c7c0;
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #63aea6;
  }
`;

const EmptyBox = styled.div<{ movedUp: boolean }>`
  margin-top: 94px;
  ${({ movedUp }) =>
    movedUp &&
    css`
      display: none;
    `}
`;

const InputWrapper = styled.div<{ movedUp: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: margin 0.6s ease;

  ${({ movedUp }) =>
    movedUp &&
    css`
      margin-top: 81px;
    `}
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
  background-color: #f6f9f3;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.15);
  padding-left: 20px;
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
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));

  &:hover {
    background-color: #63aea6;
  }
`;

const DraggedItem = styled.div<{ isDragging: boolean }>`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

const StudyForm: React.FC = () => {
  const [movedUp, setMovedUp] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [roadmapItems, setRoadmapItems] = useState([
    { number: 1, name: 'HTML Basics', description: 'Learn the basic structure and tags of HTML.', isEditing: false },
    { number: 2, name: 'CSS Fundamentals', description: 'Understand how to style your web pages.', isEditing: false },
    { number: 3, name: 'JavaScript Introduction', description: 'Get started with JavaScript for interactivity.', isEditing: false },
  ]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      setMovedUp(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleEdit = (id: number) => {
    setRoadmapItems((items) =>
      items.map((item) =>
        item.number === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleConfirm = (id: number, newName: string, newDescription: string) => {
    setRoadmapItems((items) =>
      items.map((item) =>
        item.number === id
          ? { ...item, name: newName, description: newDescription, isEditing: false }
          : item
      )
    );
  };

  const handleCancel = (id: number) => {
    setRoadmapItems((items) =>
      items.map((item) =>
        item.number === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleNameChange = (id: number, newName: string) => {
    setRoadmapItems((items) =>
      items.map((item) =>
        item.number === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    setRoadmapItems((items) =>
      items.map((item) =>
        item.number === id ? { ...item, description: newDescription } : item
      )
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, overIndex: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === overIndex) return;

    const updatedItems = [...roadmapItems];
    const [draggedItem] = updatedItems.splice(draggingIndex, 1);
    updatedItems.splice(overIndex, 0, draggedItem);

    setDraggingIndex(overIndex);
    setRoadmapItems(
      updatedItems.map((item, idx) => ({ ...item, number: idx + 1 }))
    );
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  return (
    <StudyContainer movedUp={movedUp}>
      <ProfileButton />
      <Question movedUp={movedUp}>
        {movedUp ? '입력하신 내용을 바탕으로 로드맵을 구성해보았어요.' : '어떤 내용에 대해서 공부하고 싶으신가요?'}
      </Question>
      <Description movedUp={movedUp}>
        <div>필요에 따라 각 세션들을 편집해 보세요!</div>
        <DivisionLine />
      </Description>
      <RoadMapContainer movedUp={movedUp}>
        {roadmapItems.map((item, index) => (
          <DraggedItem
            key={item.number}
            isDragging={draggingIndex === index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
          >
            <RoadMapItem
              number={item.number}
              name={item.name}
              description={item.description}
              isEditing={item.isEditing}
              onEdit={handleEdit}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onNameChange={handleNameChange}
              onDescriptionChange={handleDescriptionChange}
            />
          </DraggedItem>
        ))}
      </RoadMapContainer>
      <InputWrapper movedUp={movedUp}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""
        />
        <Button onClick={handleButtonClick}>
          <img src="/icons/SendButton.svg" alt="Send" />
        </Button>
      </InputWrapper>
      <EmptyBox movedUp={movedUp} />
    </StudyContainer>
  );
};

export default StudyForm;