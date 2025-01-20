import styled from "styled-components";
import { FaStopCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";


export const TopContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #fff;


  #Content-CPU { 
    display: flex;
    width: 85%;
    align-items: center;
    border: solid 2px #797979;
    padding: 0.5rem 1rem 0.5rem 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.8rem;
  }

  #div-cpu-percent { 
    margin-right: 2rem;
    h2{ 
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  #Content-Memory { 
    display: flex;
    width: 85%;
    align-items: center;
    border: solid 2px #797979;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border-radius: 0.8rem;
  }

  #div-memory-percent { 
    margin-right: 2rem;
    h2{ 
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  #StopButton { 
    display: flex;
    align-items: center;
    justify-content: center;

    h3 { 
      margin-right: 1rem;
      margin-bottom: 0.5rem;

    }
  }
  #div-cpu-temp { 
    margin-left: 1rem;
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

export const StopButton = styled(FaStopCircle)`
  width: 2.5rem;
  height: 2.5rem;
  color: #a82525;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover { 
    color: #7f0000;
  }
`

export const StartButton = styled(FaCirclePlay)`
  width: 2.5rem;
  height: 2.5rem;
  color: #00ce25;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover { 
    color: #007715;
  }
`