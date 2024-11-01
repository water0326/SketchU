"use client";

import styled from 'styled-components';
import React, { useState } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Sidebar = styled.div`
  width: 61.6%;
  background: transparent;
  padding: 1rem;
  border-radius: 13px;
  height: 100%;
  padding: 0 59px;
`;

const Content = styled.div`
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 13px;
  width: 35%;
  height: 100%;
`;

const RoadmapTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 33px;
  font-weight: 600;
`;

const SessionList = styled.ul`
  list-style-type: none;
`;

const SessionItem = styled.li<{ selected: boolean }>`
    width: 822px;
    height: 113px;
    padding-left: 21px;
    padding-top: 13px;
    margin-bottom: 1rem;
    background: ${(props) => (props.selected ? '#90D8BF' : '#F6F9F3')};
    border-radius: 13px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

`;

const SessionTitleContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

const Number = styled.div`
    font-size: 26px;
    color: #3C3C3C;
    font-weight: 600;
`;

const Title = styled.div`
    margin-left: 7px;
    font-size: 23px;
    color: #000000;
    font-weight: 600;
`;

const SessionDescription = styled.div`
    font-size: 18px;
    color: #3C3C3C;
    font-weight: 400;
`;

const Note = styled.div`
  margin-top: 1rem;
`;

export default function HomePage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const sessions = [
    { title: '기타 구매하기', description: '150만원짜리 펜더 텔레캐스터를 구매하세요!' },
    { title: '피킹 연습하기', description: '크로매틱 연습을 통해 300 bpm까지 연습해보세요!' },
    { title: '노래 연주해보기', description: '반짝반짝 작은별 노래를 연주해보며, 사용감을 익히세요!' },
    { title: '해머링 & 풀링', description: '해머링과 풀링을 연습하여 원손의 다양한 기술을 습득해보세요!' },
    { title: '스윕 피킹', description: '설명설명설명설명설명설명설명설명설명' },
    { title: '기타 줄 끊보기', description: '기타 줄을 4개로 만들어보아요!' },
  ];

  return (
    <Container>
      <Sidebar>
        <RoadmapTitle>일렉기타</RoadmapTitle>
        <SessionList>
          {sessions.map((session, index) => (
            <SessionItem
              key={index}
              selected={selectedSession === index}
              onClick={() => setSelectedSession(index)}
            >
                <SessionTitleContainer>
                    <Number>{'0' + (index+1)}</Number>
                    <Title>{session.title}</Title>
                </SessionTitleContainer>
                <SessionDescription>{session.description}</SessionDescription>
            </SessionItem>
          ))}
        </SessionList>
      </Sidebar>
      <Content>
        {selectedSession !== null && (
          <>
            <RoadmapTitle>{sessions[selectedSession].title}</RoadmapTitle>
            <p>{sessions[selectedSession].description}</p>
            <Note>
              <h4>메모</h4>
              <p>
                해머링 풀링 하면서 현재 어려운 점:
                <br />1. 손꾸락 아픔
                <br />2. 힘이 부족한가?
              </p>
            </Note>
          </>
        )}
      </Content>
    </Container>
  );
}