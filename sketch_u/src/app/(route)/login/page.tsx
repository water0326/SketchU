"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileButton from '@/app/_components/profile';
import { RoadmapService } from '@/services/roadmapService';
import { colors } from '@/app/utils/colorSheet';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 800px;
  padding: 32px;
  background: ${colors.white};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 32px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const InputGroup = styled.div`
  position: relative;
  width: 482px;
  margin-bottom: 21px;
`;

const InputIcon = styled.img`
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
`;

const Input = styled.input`
  width: 482px;
  height: 50px;
  padding: 0 16px;
  border: 1px solid ${colors.border};
  border-radius: 25px;
  font-size: 15px;
  background: ${colors.roadmap.inputBg};
  box-shadow: inset 0 3px 8px ${colors.roadmap.inputShadow};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.current.background};
    background: ${colors.white};
  }

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

const LoginButton = styled.button`
  width: 482px;
  height: 50px;
  margin-top: 35px;
  background: ${colors.roadmapPage.button.primary};
  border: none;
  border-radius: 25px;
  color: ${colors.black};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${colors.roadmapPage.button.primaryHover};
  }
`;

const SignUpButton = styled.button`
  width: 482px;
  height: 50px;
  margin-top: 18px;
  background: ${colors.button.background};
  border-radius: 25px;
  color: ${colors.text.secondary};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${colors.button.hover};
  }
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await RoadmapService.apiFetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('아이디 또는 비밀번호가 올바르지 않습니다.');
          return;
        }
        throw new Error('로그인 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      // 토큰과 username 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('username', username);

      // 홈페이지로 리다이렉트
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
    <ProfileButton />
      <LoginBox>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon src="/icons/id.svg" alt="ID Icon" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디"
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon src="/icons/pw.svg" alt="Password Icon" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </InputGroup>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton type="button" onClick={() => router.push('/signup')}>
            회원가입
          </SignUpButton>
        </Form>
      </LoginBox>
    </Container>
  );
} 