import styled from "styled-components";

export const TopContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #fff;

  #cpu-usage {
    cursor: pointer;
    width: 67%;
    padding: 1rem;
    border-radius: 0.5rem;
    background-image:  ${({ visible }) => (visible ? "linear-gradient(to top, #0056C6, #4C91FF)" : 'none')};
  }

  #cpu-usage:hover {
    background-color: #0056C6;
  }
  #mem-usage {
    cursor: pointer;
    width: 67%;
    padding: 1rem;
    border-radius: 0.5rem;
    background-image:  ${props => props.isActive? "linear-gradient(to top, #0056C6, #4C91FF)" : "none" }
    
  }
  #mem-usage:hover {
    background-color: #0056C6;
  }

  #Content-CPU { 
    display: flex;
    align-items: center;
    border: solid 2px #fff;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 0.8rem;
  }

  #div-cpu-percent { 
    margin-right: 2rem;
    h2{ 
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  #task-row:hover{ 
    cursor: pointer;
  }
`;

export const TableHeader = styled.thead`
  width: 100%;
  background-color: #1e2126;
  color: #d6d6d6;
`;
export const HeaderCell = styled.th`
  width: 100%;
  padding: 1rem;
`;

export const TableBody = styled.tbody`
  width: 100%;
    
`;

export const TableRow = styled.tr`
  width: 100%;
  text-align: center;
  color: #d6d6d6;

  &:nth-child(even) {
    background-color: #2e3135; /* Cor para as linhas pares */

    :hover {
      background-color: #25282b;
    }
  }
  &:nth-child(even):hover {
    background-color: #25282b;
  }

  &:nth-child(odd) {
    background-color: #25292d; /* Cor para as linhas ímpares */
  }

  &:nth-child(odd):hover {
    background-color: #161a1e;
  }
  &:hover {
    color: #bcbcbc;
  }
  #type {
    text-align: end;
    padding-right: 1.5rem;
  }

  #information {
    text-align: start;
    padding-left: 1.5rem;
  }

  #task-name {
    text-align: start;
  }

`;

export const TableCell = styled.td`
  padding: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;
