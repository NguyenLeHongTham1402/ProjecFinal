import styled from "styled-components";

export const Container = styled.div`
    margin: 100px 0;
    width: 100%;
`

export const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
`

export const Title = styled.h1`
    font-weight: normal;
    text-align: center;
    margin: 60px 0;
    margin-top: 0;
    text-transform: uppercase;
    font-size: 28px;
`