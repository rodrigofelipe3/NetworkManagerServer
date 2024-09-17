import styled from "styled-components";


export const TopContent = styled.div `
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: end;

    #cpu-usage { 
        width: 100%;
        padding: 1rem;
    }
    #mem-usage { 
        width: 100%;
        padding: 1rem;
    }
`

export const TableContent = styled.table `
    width: 100%;
`

export const TableHeader = styled.thead`
    width: 100%;
`
export const HeaderCell = styled.th `
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

`

export const TableCell = styled.td `
    padding: 0.200rem;
`