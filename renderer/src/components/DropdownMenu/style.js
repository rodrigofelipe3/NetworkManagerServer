import styled from "styled-components";

export const DropdownBody = styled.div`
    
`

export const DropdownMenu = styled.ul`
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
    background-color: #262626;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    list-style-type: none;
    border-radius: 5px;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`

export const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    color: #f2f2f2;
    background-color: #313131;
  }
`
