import styled, { keyframes } from 'styled-components';

const cloudAnimation = () => keyframes`
    0% { left: -20%; }
    100% { left: 120%; }
`;

const Cloud = styled.svg`
    position: absolute;
    z-index: 1;
    width: 15%;
    height: 15%;
    top: ${ ( { top } ) => top }%;
    animation: ${ cloudAnimation() } 15s infinite linear;
`;

const BackgroundAnimation = ( { top } ) => {
    console.log( top )

    return <Cloud
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        top={ top }
        viewBox="0 0 64 80"
    >
            <path
                fill="white"
                d="M 65.4 20.7 C 65.4 20.1 65.4 19.5 65.4 18.9 C 65.4 8.4 57 0 46.5 0 C 38.4 0 31.5 5.1 29.1 12.3 C 27.3 10.5 24.9 9 21.9 9 C 16.5 9 12.3 13.2 12.3 18.6 C 12.3 19.2 12.3 19.8 12.6 20.4 C 5.4 21.6 0 27.6 0 35.1 C 0 43.5 6.6 50.1 15 50.1 H 62.7 C 71.1 50.1 77.7 43.5 77.7 35.1 C 77.7 27.9 72.6 21.9 65.4 20.7 Z"
            />
        </Cloud>

};

export default BackgroundAnimation;