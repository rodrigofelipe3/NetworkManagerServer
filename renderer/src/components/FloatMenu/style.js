import styled from "styled-components";

export const Menu = styled.ul`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: #262626;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  border-radius: 5px;
  z-index: 9999;
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


export const ModalDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 85%;
  label{ 
    color: #000
  }
`

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5%;
  margin-right: 5%;
`