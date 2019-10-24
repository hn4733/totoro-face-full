import { createGlobalStyle, theme } from './index';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Audiowide');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    @font-face {
        font-family: 'balonku';
        font-style: italic;
        src: url('/static/fonts/Balonku-Regular.otf') format('opentype');
        src: url('/static/fonts/Balonku-Regular.eot?') format("eot"),
            url('/static/fonts/Balonku-Regular.woff') format("woff"),
            url('/static/fonts/Balonku-Regular.ttf') format("truetype"),
            url('/static/fonts/Balonku-Regular.svg#Balonku-Regular') format("svg");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Family Guy';
        src: url('/static/fonts/famig.eot?') format('eot'),
            url('/static/fonts/famig.ttf') format('truetype'),
            url('/static/fonts/famig.svg#FamilyGuy') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    body {
        margin: 0;
    }
    h1, h2 {
        font-family: 'Family Guy';
        text-transform: uppercase;
    }
    a, button, label {
        font-family: 'Audiowide';
        text-transform: uppercase;
    }
    h3, h4, h5, h6 {
        font-family: 'Family Guy';
        text-transform: uppercase;
        color: ${theme.text};
    }
    h3 {
        font-size: 24px;
    }
    h4 {
        font-size: 19px;
    }
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        color: ${theme.text};
    }
    span {
        display: block; 
    }
    a {
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        color: ${theme.lightBlue};
    }
`;
