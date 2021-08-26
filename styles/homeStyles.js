import styled, { keyframes } from 'styled-components';

export const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledMain = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin-top: 3rem;
  @media ( max-width: 600px ) {
    width: 100%;
    flex-direction: column;
  }
`;

const toDoStyledAnimation = () => keyframes`
    0% { transform: rotate( 0deg ); }
    33% { transform: rotate( -5deg ); }
    66% { transform: rotate( 5deg ); }
    100% { transform: rotate( 0deg ); }
`;

export const StyledToDo = styled.div`
    z-index: 2;
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    background: ${ ( { finished } ) => finished ? "darkgreen" : "darkred" };
    color: white;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: background 0.15s ease;
    width: 45%;
    &:hover, &:active, &:focus {
        animation: ${ toDoStyledAnimation() } 0.15s linear;
    }
`;

export const StyledToDoContentField = styled.textarea`
    border: none;
    background: none;
    font-family: inherit;
    font-size: x-large;
    font-weight: bold;
    color: inherit;
    resize: none;
`;

export const StyledToDoButton = styled.button`
    border: none;
    background: white;
    color: ${ ( { finished } ) => finished ? "darkgreen" : "darkred" };
    transition: color 0.15s ease;
    border-radius: 3px;
    font-family: inherit;
    font-size: 10pt;
    font-weight: bold;
    margin: 3px;
    transition: transform 0.15s linear;
    &:hover, &:active, &:focus {
        transform: scale( 1.1 );
    }
`;

export const StyledForm = styled.form`
    z-index: 2;
    display: flex;
    flex-direction: row;
`;
