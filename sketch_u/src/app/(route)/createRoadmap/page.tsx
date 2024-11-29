"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ProfileButton from '@/app/_components/profile';
import RoadMapItem from './roadmapItem';
import NewRoadmap from '@/app/_components/newRoadmap';
import { useRouter } from 'next/navigation';

const StudyContainer = styled.div<{ $movedUp: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Question = styled.h2<{ $movedUp: boolean }>`
  margin-bottom: 64px;
  font-size: 30px;
  color: #333;
  font-weight: 400;
  transition: margin-top font-size 0.6s ease;

  ${({ $movedUp: movedUp }) =>
    movedUp &&
    css`
      margin-bottom: 2px;
      font-size: 23px;
      font-weight: 600;
    `}
`;

const Description = styled.div<{ $movedUp: boolean }>`
  display: none;
  opacity: 0;
  width: 629px;
  height: 60px;
  margin-bottom: 43px;
  margin-top: 2px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  color: #383838;
  font-weight: 400;
  transition: opacity 1s ease;

  ${({ $movedUp: movedUp }) =>
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
  margin-top: 5px;
`;

const RoadMapContainer = styled.div<{ $movedUp: boolean }>`
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

  ${({ $movedUp: movedUp }) =>
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

const EmptyBox = styled.div<{ $movedUp: boolean }>`
  margin-top: 94px;
  ${({ $movedUp: movedUp }) =>
    movedUp &&
    css`
      display: none;
    `}
`;

const InputWrapper = styled.div<{ $movedUp: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: margin 0.6s ease;

  ${({ $movedUp: movedUp }) =>
    movedUp &&
    css`
      margin-top: 11px;
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

const Button = styled.button<{ $movedUp: boolean }>`
  background-color: #76c7c0;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-left: 19px;
  display: ${({ $movedUp: movedUp }) => (movedUp ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));

  &:hover {
    background-color: #63aea6;
  }
`;

const NewButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NewButton = styled.button<{ isResetButton?: boolean }>`
  width: 122px;
  height: 50px;
  background-color: ${({ isResetButton }) => (isResetButton ? '#E9E9E9' : '#76c7c0')};
  border: none;
  border-radius: 25px;
  margin-left: 17px;
  padding: 10px 20px;
  font-size: 17px;
  color: #141414;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));

  &:hover {
    background-color: ${({ isResetButton }) => (isResetButton ? '#d9d9d9' : '#63aea6')};
  }
`;

const DraggedItem = styled.div<{ $isDragging: boolean }>`
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`;

const DUMMY_ROADMAP_DATA = [
  {
    seq: 1,
    topic: 'Understanding Basics',
    description: 'Learn fundamental concepts and terminology',
    start_date: '2024-03-20',
    deadline: '2024-03-27',
    note: 'Focus on core principles'
  },
  {
    seq: 2,
    topic: 'Practical Applications',
    description: 'Apply concepts through hands-on exercises',
    start_date: '2024-03-28',
    deadline: '2024-04-04',
    note: 'Complete practice projects'
  },
  {
    seq: 3,
    topic: 'Advanced Concepts',
    description: 'Explore advanced topics and best practices',
    start_date: '2024-04-05',
    deadline: '2024-04-12',
    note: 'Deep dive into complex scenarios'
  }
];

const RoadmapTitle = styled.input`
  font-size: 23px;
  font-weight: 600;
  color: #333;
  border: none;
  background: transparent;
  text-align: center;
  width: 100%;
  margin-bottom: 2px;
  padding: 5px;
  
  &:hover {
    background-color: #f6f9f3;
  }
  
  &:focus {
    outline: none;
    background-color: #f6f9f3;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 40px;
  height: 100%;
`;

const TimelineContainer = styled.div`
  width: 120px;
  height: 100%;
  padding: 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timeline = styled.div`
  width: 4px;
  background-color: #E9E9E9;
  height: 100%;
  position: relative;
  border-radius: 2px;
`;

const SessionHandle = styled.div<{ $top: number, $height: number }>`
  position: absolute;
  left: -8px;
  width: 20px;
  height: ${props => props.$height}px;
  background-color: #76c7c0;
  border-radius: 10px;
  top: ${props => props.$top}px;
  cursor: grab;
  
  &:hover {
    background-color: #63aea6;
  }
  
  &:active {
    cursor: grabbing;
  }
`;

// 날짜 관련 유틸리티 함수들 추가
const adjustDates = (items: any[]) => {
  return items.map((item, index) => {
    if (!item.startDate || !item.deadline) return item;

    // 현재 아이템의 기간 계산
    const duration = getDaysDifference(item.startDate, item.deadline);
    
    if (index === 0) {
      // 첫 번째 아이템은 시작일만 확인
      if (new Date(item.startDate) > new Date(item.deadline)) {
        item.deadline = addDays(item.startDate, duration);
      }
    } else {
      // 이전 아이템의 마감일 다음 날을 시작일로
      const prevItem = items[index - 1];
      if (prevItem.deadline) {
        const newStartDate = addDays(prevItem.deadline, 1);
        item.startDate = newStartDate;
        item.deadline = addDays(newStartDate, duration);
      }
    }
    return item;
  });
};

const getDaysDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const addDays = (date: string, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};

const StudyForm: React.FC = () => {
  const [movedUp, setMovedUp] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [roadmapItems, setRoadmapItems] = useState([
    { 
      number: 1, 
      name: 'HTML Basics', 
      description: 'Learn the basic structure and tags of HTML.', 
      isEditing: false,
      startDate: '',
      deadline: '',
      note: ''
    },
    { number: 2, name: 'CSS Fundamentals', description: 'Understand how to style your web pages.', isEditing: false, startDate: '', deadline: '', note: '' },
    { number: 3, name: 'JavaScript Introduction', description: 'Get started with JavaScript for interactivity.', isEditing: false, startDate: '', deadline: '', note: '' },
  ]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const router = useRouter();
  const [roadmapName, setRoadmapName] = useState('');

  const handleButtonClick = async () => {
    if (inputValue.trim() === '') return;
    
    try {
      const response = await fetch(`/api/roadmap/createroadmap?topic=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      let roadmapData;
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        console.warn('API 요청 실패, 더미 데이터를 사용합니다.');
        roadmapData = { sessionData: DUMMY_ROADMAP_DATA };
        setRoadmapName(inputValue);
      } else {
        roadmapData = await response.json();
        setRoadmapName(roadmapData.roadmapName || inputValue);
      }
      
      const newRoadmapItems = roadmapData.sessionData.map((session: any) => ({
        number: session.seq,
        name: session.topic,
        description: session.description,
        isEditing: false,
        startDate: session.start_date,
        deadline: session.deadline,
        note: session.note
      }));

      setRoadmapItems(newRoadmapItems);
      setMovedUp(true);
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      setRoadmapName(inputValue);
      // 에러 발생 시에도 더미 데이터 사용
      const newRoadmapItems = DUMMY_ROADMAP_DATA.map(session => ({
        number: session.seq,
        name: session.topic,
        description: session.description,
        isEditing: false,
        startDate: session.start_date,
        deadline: session.deadline,
        note: session.note
      }));

      setRoadmapItems(newRoadmapItems);
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

    // 순서가 변경된 후 날짜 조정
    const adjustedItems = adjustDates(
      updatedItems.map((item, idx) => ({ ...item, number: idx + 1 }))
    );

    setDraggingIndex(overIndex);
    setRoadmapItems(adjustedItems);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
  };

  const handleReset = () => {
    setMovedUp(false);
    setInputValue('');
    setRoadmapItems([]);
    setRoadmapName('');
  };

  const handleSaveRoadmap = async () => {
    try {
      const requestBody = {
        roadmapName: roadmapName,
        sessionData: roadmapItems.map(item => ({
          seq: item.number,
          topic: item.name,
          description: item.description,
          start_date: item.startDate,
          deadline: item.deadline,
          note: item.note || null
        }))
      };

      const response = await fetch('/api/roadmap/saveroadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to save roadmap');
      }

      // Optional: Add success feedback here
      alert('로드맵이 저장되었습니다!');
    } catch (error) {
      console.error('Failed to save roadmap:', error);
      alert('로드맵 저장에 실패했습니다.');
    }
  };

  // 날짜 변경 핸들러 수정
  const handleDateChange = (id: number, newStartDate: string, newDeadline: string) => {
    const updatedItems = roadmapItems.map(item => {
      if (item.number === id) {
        return {
          ...item,
          startDate: newStartDate,
          deadline: newDeadline
        };
      }
      return item;
    });

    // 날짜 변경 후 전체 로드맵 날짜 조정
    const adjustedItems = adjustDates(updatedItems);
    setRoadmapItems(adjustedItems);
  };

  return (
    <StudyContainer $movedUp={movedUp}>
      <ProfileButton />
      <NewRoadmap />
      {!movedUp ? (
        <Question $movedUp={movedUp}>
          어떤 내용에 대해서 공부하고 싶으신가요?
        </Question>
      ) : (
        <>
          <Question $movedUp={movedUp}>
          입력하신 내용을 바탕으로 로드맵을 구성해보았어요.
          </Question>
          <Description $movedUp={movedUp}>
            <div>필요에 따라 각 세션들을 편집해 보세요!</div>
            <div>로드맵은 나중에도 수정할 수 있어요!</div>
            <DivisionLine />
          </Description>
          <RoadmapTitle
            value={roadmapName}
            onChange={(e) => setRoadmapName(e.target.value)}
            placeholder="로드맵 제목을 입력하세요"
          />
        </>
      )}
      <RoadMapContainer $movedUp={movedUp}>
        {roadmapItems.map((item, index) => (
          <DraggedItem
            key={item.number}
            $isDragging={draggingIndex === index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
          >
            <RoadMapItem
              number={item.number}
              name={item.name}
              description={item.description}
              $isEditing={item.isEditing}
              startDate={item.startDate}
              deadline={item.deadline}
              onEdit={handleEdit}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onNameChange={handleNameChange}
              onDescriptionChange={handleDescriptionChange}
              onStartDateChange={(id, date) => {
                const item = roadmapItems.find(i => i.number === id);
                if (item) {
                  handleDateChange(id, date, item.deadline);
                }
              }}
              onDeadlineChange={(id, date) => {
                const item = roadmapItems.find(i => i.number === id);
                if (item) {
                  handleDateChange(id, item.startDate, date);
                }
              }}
            />
          </DraggedItem>
        ))}
      </RoadMapContainer>
      <InputWrapper $movedUp={movedUp}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""
        />
        <Button $movedUp={movedUp} onClick={handleButtonClick}>
          <img src="/icons/SendButton.svg" alt="Send" />
        </Button>
        {movedUp && (
          <NewButtonsContainer>
            <NewButton isResetButton onClick={handleReset}>다시 입력</NewButton>
            <NewButton onClick={handleSaveRoadmap}>좋아요</NewButton>
          </NewButtonsContainer>
        )}
      </InputWrapper>
      <EmptyBox $movedUp={movedUp} />
    </StudyContainer>
  );
};

export default StudyForm;
