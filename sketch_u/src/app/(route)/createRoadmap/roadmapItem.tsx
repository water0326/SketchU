import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/app/utils/colorSheet';

type RoadMapItemProps = {
  number: number;
  name: string;
  description: string;
  $isEditing: boolean;
  onEdit: (id: number) => void;
  onConfirm: (id: number, newName: string, newDescription: string) => void;
  onCancel: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
  onDescriptionChange: (id: number, newDescription: string) => void;
  startDate: string;
  deadline: string;
  onStartDateChange?: (id: number, date: string) => void;
  onDeadlineChange?: (id: number, date: string) => void;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: ${colors.roadmap.item.container};
  border-radius: 15px;
  transition: background-color 0.3s ease;
`;

const RoadMapItemContainer = styled.div<{ $isEditing: boolean }>`
  width: 600px;
  min-height: 120px;
  height: auto;
  background-color: ${({ $isEditing }) => 
    $isEditing ? colors.roadmap.item.editingBackground : colors.roadmap.item.background};
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const NameContainer = styled.div<{ $isEditing: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: ${({ $isEditing }) => ($isEditing ? '10px' : '21px')};
  margin-right: ${({ $isEditing }) => ($isEditing ? '10px' : '21px')};
  margin-top: ${({ $isEditing }) => ($isEditing ? '10px' : '13px')};
  margin-bottom: ${({ $isEditing }) => ($isEditing ? '8px' : '0px')};
  border-radius: 10px;
  
  width: auto;
  background-color: ${({ $isEditing }) => 
    $isEditing ? colors.roadmap.item.background : 'transparent'};
`;

const ItemNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.roadmap.item.number};
  margin-right: 10px;
`;

const ItemName = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.roadmap.item.name};
`;

const EditableInput = styled.input`
  padding: 12px;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.roadmap.item.name};
  border: 1px solid ${colors.roadmap.dateInput.border};
  border-radius: 8px;
  background-color: ${colors.roadmap.item.background};
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${colors.roadmap.dateInput.borderFocus};
  }
`;

const ItemDescription = styled.div`
  font-size: 18px;
  color: ${colors.roadmap.item.description};
  font-weight: 400;
  margin-left: 21px;
`;

const DescContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const EditableTextArea = styled.textarea<{ $isEditing: boolean }>`
  padding: 12px;
  width: 100%;
  font-size: 18px;
  color: ${colors.roadmap.item.description};
  font-weight: 400;
  border: 1px solid ${colors.roadmap.dateInput.border};
  background-color: ${colors.roadmap.item.background};
  outline: none;
  resize: none;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: ${colors.roadmap.dateInput.borderFocus};
  }
`;

const ItemImage = styled.img`
  margin-left: 10px;
  width: 18px;
  height: 18px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 21px;
  margin-bottom: 8px;
`;

const DateInfo = styled.div`
  font-size: 14px;
  color: ${colors.roadmap.item.date};
`;

const DateInput = styled.input`
  padding: 5px;
  margin: 0 5px;
  border: 1px solid ${colors.roadmap.dateInput.border};
  border-radius: 5px;
  background-color: ${colors.roadmap.item.dateInput.background};
  font-size: 14px;
  color: ${colors.roadmap.item.date};

  &:invalid {
    border-color: ${colors.roadmap.item.dateInput.invalidBorder};
  }
`;

const RoadMapItem: React.FC<RoadMapItemProps> = ({
  number,
  name,
  description,
  $isEditing: isEditing,
  onEdit,
  onConfirm,
  onCancel,
  onNameChange,
  onDescriptionChange,
  startDate,
  deadline,
  onStartDateChange,
  onDeadlineChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [originalName, setOriginalName] = useState(name);
  const [originalDescription, setOriginalDescription] = useState(description);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleEdit = (id: number) => {
    setOriginalName(name);
    setOriginalDescription(description);
    onEdit(id);
  };

  const handleCancel = (id: number) => {
    onCancel(id);
  };

  const validateDate = (date: string, isStart: boolean) => {
    if (!date) return;
    
    if (isStart && deadline) {
      // 시작일이 마감일보다 늦을 수 없음
      if (new Date(date) > new Date(deadline)) {
        return false;
      }
    } else if (!isStart && startDate) {
      // 마감일이 시작일보다 빠를 수 없음
      if (new Date(date) < new Date(startDate)) {
        return false;
      }
    }
    return true;
  };

  return (
    <Container>
      <RoadMapItemContainer $isEditing={isEditing}>
        <NameContainer $isEditing={isEditing}>
          {!isEditing && <ItemNumber>{number}</ItemNumber>}
          {isEditing ? (
            <EditableInput value={name} onChange={(e) => onNameChange(number, e.target.value)} />
          ) : (
            <ItemName>{name}</ItemName>
          )}
        </NameContainer>
        {isEditing ? (
          <DescContainer>
            <EditableTextArea
              ref={textAreaRef}
              $isEditing={isEditing}
              value={description}
              onChange={(e) => onDescriptionChange(number, e.target.value)}
              rows={2}
            />
          </DescContainer>
        ) : (
          <ItemDescription>{description}</ItemDescription>
        )}
        <DateContainer>
          <DateInfo>
            시작일: {isEditing ? (
              <DateInput
                type="date"
                value={startDate}
                onChange={(e) => {
                  if (validateDate(e.target.value, true)) {
                    onStartDateChange && onStartDateChange(number, e.target.value);
                  }
                }}
              />
            ) : (
              startDate
            )}
          </DateInfo>
          <DateInfo>
            마감일: {isEditing ? (
              <DateInput
                type="date"
                value={deadline}
                onChange={(e) => {
                  if (validateDate(e.target.value, false)) {
                    onDeadlineChange && onDeadlineChange(number, e.target.value);
                  }
                }}
              />
            ) : (
              deadline
            )}
          </DateInfo>
        </DateContainer>
      </RoadMapItemContainer>
      <div>
        {!isEditing && (
          <ItemImage
            src="./icons/pencil.svg"
            alt="Edit icon"
            onClick={() => handleEdit(number)}
          />
        )}
        {isEditing && (
          <>
            <ItemImage
              src="./icons/Save.svg"
              alt="Confirm icon"
              onClick={() => onConfirm(number, name, description)}
            />
            <ItemImage
              src="./icons/Cancel.svg"
              alt="Cancel icon"
              onClick={() => handleCancel(number)}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default RoadMapItem;