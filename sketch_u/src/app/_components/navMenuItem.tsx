import styled from "styled-components";
import { colors } from "../utils/colorSheet";

interface MenuItemProps {
  iconSrc: string;
  text: string;
  isselected: boolean;
  onclick: () => void;
}

const MenuItemContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 191px;
  height: 48px;
  background-color: ${(props) => 
    props.$isSelected 
      ? colors.navigation.menuItem.background.selected 
      : colors.navigation.menuItem.background.default
  };
  border-radius: 50px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15));
  color: ${colors.navigation.menuItem.text.default};
  &:hover {
    background-color: ${(props) => 
      props.$isSelected 
        ? colors.navigation.menuItem.background.selected 
        : colors.navigation.menuItem.background.hover
    };
    color: ${(props) => 
      props.$isSelected 
        ? colors.navigation.menuItem.text.default 
        : colors.navigation.menuItem.text.hover
    };
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
