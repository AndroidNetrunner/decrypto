import styled from "styled-components"

function HintList({ index, hints }: { index: number, hints: string[] }) {
    return (
        <>
            <h4>{index + 1}번</h4>
            {hints.map((hint) => <li key={hint}>{hint}</li>)}
        </>
    )
}

export default function OpponentHints({ hints }: { hints: [string[], string[], string[], string[]] }) {
    return <>
        <h3>
            상대팀의 힌트 기록
        </h3>
        <WordList>
            {hints.map((hint, index) => <HintList key={hint[0]} index={index} hints={hint} />)}
        </WordList>
    </>
}

const WordList = styled.ul`
    li {
        list-style: none;
    }
`;
