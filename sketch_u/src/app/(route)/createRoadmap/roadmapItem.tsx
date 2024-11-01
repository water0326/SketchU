import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

type RoadMapItemProps = {
  number: number;
  name: string;
  description: string;
  isEditing: boolean;
  onEdit: (id: number) => void;
  onConfirm: (id: number, newName: string, newDescription: string) => void;
  onCancel: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
  onDescriptionChange: (id: number, newDescription: string) => void;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const RoadMapItemContainer = styled.div<{ isEditing: boolean }>`
  width: 572px;
  min-height: 113px;
  height: auto;
  background-color: ${({ isEditing }) => (isEditing ? '#90D8BF' : '#f6f9f3')};
  border-radius: 13px;
  transition: all 0.4s;
`;

const NameContainer = styled.div<{ isEditing: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: ${({ isEditing }) => (isEditing ? '10px' : '21px')};
  margin-right: ${({ isEditing }) => (isEditing ? '10px' : '21px')};
  margin-top: ${({ isEditing }) => (isEditing ? '10px' : '13px')};
  margin-bottom: ${({ isEditing }) => (isEditing ? '8px' : '0px')};
  border-radius: 10px;
  
  width: auto;
  background-color: ${({ isEditing }) => (isEditing ? '#FFFFFF' : 'transparent')};
`;

const ItemNumber = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #272727;
  margin-right: 7px;
`;

const ItemName = styled.div`
  font-size: 23px;
  font-weight: 600;
  color: #272727;
`;

const EditableInput = styled.input`
  padding-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  width: 100%;
  font-size: 23px;
  font-weight: 600;
  color: #272727;
  border: none;
  background-color: transparent;
  outline: none;
`;

const ItemDescription = styled.div`
  font-size: 18px;
  color: #525252;
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

const EditableTextArea = styled.textarea<{ isEditing: boolean }>`
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  font-size: 18px;
  color: #525252;
  font-weight: 400;
  border: none;
  background-color: ${({ isEditing }) => (isEditing ? '#FFFFFF' : 'transparent')};
  outline: none;
  resize: none;
  border-radius: 10px;
  overflow: hidden;
`;

const ItemImage = styled.img`
  margin-left: 10px;
  width: 18px;
  height: 18px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const RoadMapItem: React.FC<RoadMapItemProps> = ({
  number,
  name,
  description,
  isEditing,
  onEdit,
  onConfirm,
  onCancel,
  onNameChange,
  onDescriptionChange,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  return (
    <Container>
      <RoadMapItemContainer isEditing={isEditing}>
        <NameContainer isEditing={isEditing}>
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
              isEditing={isEditing}
              value={description}
              onChange={(e) => onDescriptionChange(number, e.target.value)}
              rows={2}
            />
          </DescContainer>
        ) : (
          <ItemDescription>{description}</ItemDescription>
        )}
      </RoadMapItemContainer>
      <div>
        {!isEditing && (
          <ItemImage
            src="./icons/pencil.svg"
            alt="Edit icon"
            onClick={() => onEdit(number)}
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
              onClick={() => onCancel(number)}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default RoadMapItem;