import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { RoadmapService } from "@/services/roadmapService";

const Button = styled.button`
  position: absolute;
  right: 0;
  background-color: #f2f2f2;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  filter: drop-shadow(1px 3px 5px rgba(0, 0, 0, 0.2));
  z-index: 100;
  &:hover {
    background-color: #e1e1e1;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 100;
  min-width: 140px;
  width: max-content;
  transform-origin: top right;
  animation: dropdownFade 0.2s ease-out;

  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: #333;
  font-weight: 500;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }

  &:active {
    background-color: #e5e5e5;
    transform: scale(0.98);
  }

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export default function ProfileButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const handleLogin = () => {
    router.push('/login');
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      const response = await RoadmapService.apiFetch('/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
        }
        throw new Error('Logout failed');
      }

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      setIsLoggedIn(false);
      setUsername(null);
      router.push('/login');
      setShowDropdown(false);
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ position: "absolute", top: "13px", right: "25px", width: "100px", height: "100px"}}>
      <div 
        style={{ position: "relative", width: "100%", height: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button>
          <img src="/icons/profile.svg" alt="Profile Icon" />
        </Button>
        {showDropdown && (
          <DropdownMenu>
            {isLoggedIn ? (
              <>
                <div style={{ padding: "10px 16px", fontSize: "15px", color: "#333" }}>
                  {username}님 환영합니다.
                </div>
                <DropdownButton onClick={() => router.push('/settings')}>크레딧</DropdownButton>
                <DropdownButton onClick={handleLogout}>로그아웃</DropdownButton>
              </>
            ) : (
              <>
                <DropdownButton onClick={handleLogin}>로그인</DropdownButton>
                <DropdownButton onClick={() => router.push('/signup')}>회원가입</DropdownButton>
              </>
            )}
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
