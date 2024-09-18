import styled from "styled-components";


export const TopContent = styled.div `
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: end;

    #cpu-usage { 
        cursor: pointer;
        width: 100%;
        padding: 1rem;
        
    }

    #cpu-usage:hover { 
            background-color: #b2b2b2;    
    }
    #mem-usage { 
        cursor: pointer;
        width: 100%;
        padding: 3rem;
        :hover { 
            background-color: #b2b2b2;
        }
    }
    #mem-usage:hover { 
            background-color: #b2b2b2;    
    }
`

export const TableContent = styled.table `
    width: 100%;
    border: 1px solid #000000;
    
    border-radius: 1rem;
`

export const TableHeader = styled.thead`
    width: 100%;
`
export const HeaderCell = styled.th `
    width: 100%;
    padding: 1rem;
`

export const TableBody = styled.tbody `
    width: 100%;
    
`

export const TableRow = styled.tr `
    width: 100%;
    text-align: center;
    #type { 
        text-align: end;
    }

    #information { 
        text-align: start;
    }

    #task-name { 
        text-align: start;
    }
`

export const TableCell = styled.td `
    padding: 0.200rem;
    margin-left: 1rem;
    margin-right: 1rem;
`