import styled from "styled-components";

export const Menu = styled.ul`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  list-style-type: none;
  border-radius: 5px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

export const MenuItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;