"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ProfileButton from '@/app/_components/profile';
import { RoadmapService } from '@/services/roadmapService';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpBox = styled.div`
  width: 800px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
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
  border: 1px solid #E5E5E5;
  border-radius: 25px;
  font-size: 15px;
  background: #F6F9F3;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:focus {
    border-color: #90D8BF;
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.span`
  color: #FF4444;
  font-size: 13px;
  margin-top: 6px;
  margin-left: 16px;
  display: block;
`;

const SignUpButton = styled.button`
  width: 482px;
  height: 50px;
  margin-top: 35px;
  background: #90D8BF;
  border: none;
  border-radius: 25px;
  color: black;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #7EC5AD;
  }
`;

const LoginLink = styled.button`
  width: 482px;
  height: 50px;
  margin-top: 18px;
  background: #F6F9F3;
  border-radius: 25px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #EDF3EA;
  }
`;

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      password: '',
      confirmPassword: '',
    };

    // 아이디 검증
    if (!formData.username) {
      newErrors.username = '아이디를 입력해주세요';
      isValid = false;
    } else if (formData.username.length < 4) {
      newErrors.username = '아이디는 4자 이상이어야 합니다';
      isValid = false;
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await RoadmapService.apiFetch('/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (response.status === 201) {
          // 회원가입 성공
          router.push('/login');
        } else if (response.status === 409) {
          // 중복된 사용자 이름
          setErrors(prev => ({
            ...prev,
            username: '이미 사용 중인 아이디입니다',
          }));
        } else {
          // 기타 에러
          throw new Error('회원가입 처리 중 오류가 발생했습니다');
        }
      } catch (error) {
        console.error('회원가입 에러:', error);
        alert('회원가입 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <Container>
      <ProfileButton />
      <SignUpBox>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon src="/icons/id.svg" alt="ID Icon" />
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="아이디"
              required
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <InputIcon src="/icons/pw.svg" alt="Password Icon" />
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="비밀번호"
              required
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>
          <InputGroup>
            <InputIcon src="/icons/pw.svg" alt="Confirm Password Icon" />
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="비밀번호 확인"
              required
            />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </InputGroup>
          <SignUpButton type="submit">회원가입</SignUpButton>
          <LoginLink type="button" onClick={() => router.push('/login')}>
            이미 계정이 있으신가요? 로그인
          </LoginLink>
        </Form>
      </SignUpBox>
    </Container>
  );
} 