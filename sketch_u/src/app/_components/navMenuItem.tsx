import styled from "styled-components";

interface MenuItemProps {
  iconSrc: string;
  text: string;
  isselected: boolean;
  onclick: () => void;
}

const SELECTED_COLOR = "#E8FFF7";

const MenuItemContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 191px;
  height: 48px;
  background-color: ${(props) => (props.$isSelected ? SELECTED_COLOR : "#e8fff700")};
  border-radius: 50px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
  color: #1a1a1a;
  &:hover {
    background-color: ${(props) => (props.$isSelected ? SELECTED_COLOR : "#e8fff7aa")};
    color: ${(props) => (props.$isSelected ? "#1a1a1a" : "#000000")};
  }
`;

const IconWrapper = styled.div`
  margin-left: 17px;
  height: 24px;
`;

const MenuItemText = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 21px;
  font-weight: 500;
  margin-top: 4px;
  margin-left: 9px;
`;

const MenuItemComponent: React.FC<MenuItemProps> = ({ iconSrc, text, isselected: isSelected, onclick: onClick }) => {
  return (
    <MenuItemContainer $isSelected={isSelected} onClick={onClick}>
      <IconWrapper>
        <img src={iconSrc} alt="" />
      </IconWrapper>
      <MenuItemText>{text}</MenuItemText>
    </MenuItemContainer>
  );
};

export default MenuItemComponent;
