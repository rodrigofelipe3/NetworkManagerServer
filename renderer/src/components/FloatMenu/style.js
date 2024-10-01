import styled from "styled-components";

export const Menu = styled.ul`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #262626;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  border-radius: 5px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

export const MenuItem = styled.li`
  color: #f2f2f2;
  padding: 12px;
  cursor: pointer;
  &:hover {
    color: #f2f2f2;
    background-color: #313131;
  }
`;