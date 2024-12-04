"use client";

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ProfileButton from '@/app/_components/profile';
import RoadMapItem from './roadmapItem';
import NewRoadmap from '@/app/_components/newRoadmap';
import { useRouter } from 'next/navigation';
import { RoadmapService } from '@/services/roadmapService';

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

  &:disabled {
    background-color: #e9e9e9;
    cursor: not-allowed;
  }
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
    deadline: '2024-03-21',
    note: 'Focus on core principles'
  },
  {
    seq: 2,
    topic: 'Practical Applications',
    description: 'Apply concepts through hands-on exercises',
    start_date: '2024-03-22',
    deadline: '2024-03-24',
    note: 'Complete practice projects'
  },
  {
    seq: 3,
    topic: 'Advanced Concepts',
    description: 'Explore advanced topics and best practices',
    start_date: '2024-03-25',
    deadline: '2024-03-30',
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

    if (index === 0) {
      // 첫 번째 아이템은 시작일과 종료일만 확인
      if (new Date(item.startDate) > new Date(item.deadline)) {
        item.deadline = addDays(item.startDate, getDaysDifference(item.startDate, item.deadline));
      }
      return item;
    }

    // 이전 아이템과 현재 아이템의 날짜가 겹치는지 확인
    const prevItem = items[index - 1];
    const currentStart = new Date(item.startDate);
    const prevEnd = new Date(prevItem.deadline);

    // 날짜가 겹치는 경우에만 조정
    if (currentStart <= prevEnd) {
      const duration = getDaysDifference(item.startDate, item.deadline);
      item.startDate = addDays(prevItem.deadline, 1);
      item.deadline = addDays(item.startDate, duration);
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

const StartDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #383838;
`;

const StartDateInput = styled.input`
  padding: 5px 10px;
  border: 1px solid #76c7c0;
  border-radius: 5px;
  font-size: 16px;
  color: #383838;
  
  &:focus {
    outline: none;
    border-color: #63aea6;
  }
`;

// styled-components 추가
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #76c7c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [originalValues, setOriginalValues] = useState<{
    items: Array<{
      number: number;
      name: string;
      description: string;
      startDate: string;
      deadline: string;
      isEditing: boolean;
      note: string;
    }>;
    editingId?: number;
  }>({ items: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    if (inputValue.trim() === '') return;
    
    setIsLoading(true); // 로딩 시작
    
    try {
      const response = await RoadmapService.apiFetch(`/roadmap/createroadmap?topic=${encodeURIComponent(inputValue)}`, {
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
        roadmapData.sessionData = JSON.parse(roadmapData.sessionData);
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

      // 날짜 조정
      const adjustedItems = adjustDatesToStartDate(newRoadmapItems, startDate);
      setRoadmapItems(adjustedItems);
      setMovedUp(true);
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      setRoadmapName(inputValue);
      const newRoadmapItems = DUMMY_ROADMAP_DATA.map(session => ({
        number: session.seq,
        name: session.topic,
        description: session.description,
        isEditing: false,
        startDate: session.start_date,
        deadline: session.deadline,
        note: session.note
      }));

      // 날짜 조정
      const adjustedItems = adjustDatesToStartDate(newRoadmapItems, startDate);
      setRoadmapItems(adjustedItems);
      setMovedUp(true);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };
  const handleEdit = (id: number) => {
    setOriginalValues({
      items: [...roadmapItems],
      editingId: id
    });
    
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
    if (originalValues.items.length > 0) {
      setRoadmapItems(originalValues.items.map(item => ({
        ...item,
        isEditing: false
      })));
    }
    
    setOriginalValues({ items: [] });
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
    setRoadmapItems(updatedItems);
  };

  const handleDrop = () => {
    if (draggingIndex === null) return;

    // 아이템의 순서가 변경된 후, 날짜를 조정
    const updatedItems = adjustDates(roadmapItems);

    // 전체 로드맵의 시작일과 종료일을 유지하면서 날짜 조정
    const totalDuration = getDaysDifference(updatedItems[0].startDate, updatedItems[updatedItems.length - 1].deadline);
    const newStartDate = new Date(startDate);
    const newEndDate = addDays(newStartDate.toISOString().split('T')[0], totalDuration);

    const adjustedItems = updatedItems.map((item, index) => {
      const duration = getDaysDifference(item.startDate, item.deadline);
      if (index === 0) {
        item.startDate = newStartDate.toISOString().split('T')[0];
      } else {
        item.startDate = addDays(updatedItems[index - 1].deadline, 1);
      }
      item.deadline = addDays(item.startDate, duration);
      // seq 값을 업데이트
      item.number = index + 1;
      return item;
    });

    setRoadmapItems(adjustedItems);
    setDraggingIndex(null);
  };

  const handleReset = () => {
    setMovedUp(false);
    setInputValue('');
    setRoadmapItems([]);
    setRoadmapName('');
  };

  const handleSaveRoadmap = async () => {
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

    const result = await RoadmapService.saveRoadmap(requestBody);
    
    if (result.success) {
      alert('로드맵이 저장되었습니다!');
    } else {
      if (result.error === 'Unauthorized') {
        router.push('/login');
        return;
      }
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

    // 날짜 순서대로 정렬
    const sortedItems = [...updatedItems].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // 겹치는 날짜가 있는 경우에만 조정
    const adjustedItems = adjustDatesToStartDate(sortedItems, startDate);
    setRoadmapItems(adjustedItems);
  };

  // 전체 로드맵 시작일 변경 핸들러
  const handleRoadmapStartDateChange = (newStartDate: string) => {
    setStartDate(newStartDate);
    // 각 아이템의 기간을 유지하면서 날짜 조정
    const adjustedItems = adjustDatesToStartDate(roadmapItems, newStartDate);
    setRoadmapItems(adjustedItems);
  };

  // 날짜 조정 함수 추가
  const adjustDatesToStartDate = (items: any[], newStartDate: string) => {
    return items.map((item, index) => {
      const duration = getDaysDifference(item.startDate, item.deadline);
      if (index === 0) {
        item.startDate = newStartDate;
      } else {
        const prevItem = items[index - 1];
        item.startDate = addDays(prevItem.deadline, 1);
      }
      item.deadline = addDays(item.startDate, duration);
      return item;
    });
  };

  return (
    <StudyContainer $movedUp={movedUp}>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
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
          <StartDateContainer>
            <span>로드맵 시작일:</span>
            <StartDateInput
              type="date"
              value={startDate}
              onChange={(e) => handleRoadmapStartDateChange(e.target.value)}
            />
          </StartDateContainer>
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
          disabled={movedUp}
        />
        <Button $movedUp={movedUp} onClick={handleButtonClick}>
          <img src="/icons/sendbutton.svg" alt="Send" />
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

