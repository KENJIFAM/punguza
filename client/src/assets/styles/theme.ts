import './billabong/index.scss';
import { createMuiTheme, lighten, darken } from '@material-ui/core/styles';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;

const dark: PaletteColor = {
  main: '#222b45',
  light: lighten('#222b45', 0.2),
  dark: darken('#222b45', 0.2),
  contrastText: '#fff',
};

const green: PaletteColor = {
  main: '#a2bfb8',
  light: '#d4dddb',
  dark: darken('#a2bfb8', 0.2),
  contrastText: '#000',
};

const red: PaletteColor = {
  main: '#f18787',
  light: lighten('#f18787', 0.2),
  dark: darken('#f18787', 0.2),
  contrastText: '#fff',
};

// const yellow: PaletteColor = {
//   main: '#e0c87b',
//   light: lighten('#e0c87b', 0.2),
//   dark: darken('#e0c87b', 0.2),
//   contrastText: '#000',
// };

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          overscrollBehaviorY: 'contain',
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
        },
        body: {
          fontFamily,
          margin: 0,
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          fontSize: 16,
          overscrollBehaviorY: 'contain',
          padding: 0,
          height: '100%',
          width: '100%',
          touchAction: 'manipulation',
        },
        '*': {
          boxSizing: 'border-box',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 400,
        height: 46,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        fontSize: 12,
        letterSpacing: 0.41,
        fontWeight: 700,
      },
      textColorPrimary: {
        color: dark.main,
      },
    },
    MuiTabs: {
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      },
    },
    MuiTextField: {
      root: {
        backgroundColor: '#fff',
        padding: '10px 20px',
        borderRadius: 30,
      },
    },
    MuiInput: {
      input: {
        fontSize: 12,
      },
    },
  },
  palette: {
    primary: dark,
    secondary: green,
    error: red,
    // warning: yellow,
  },
  typography: {
    fontFamily,
    // h1: {
    //   fontWeight: 400,
    //   fontSize: '2.5rem',
    // },
    // h2: {
    //   fontWeight: 400,
    //   fontSize: '2.25rem',
    // },
    // h3: {
    //   fontWeight: 500,
    //   fontSize: '2rem',
    // },
    h4: {
      fontSize: '1.75rem',
    },
    // h5: {
    //   fontWeight: 500,
    //   fontSize: '1.5rem',
    // },
    // h6: {
    //   fontWeight: 600,
    //   fontSize: '1.25rem',
    // },
  },
});
console.log(theme);

export default theme;
