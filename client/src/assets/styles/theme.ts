import './billabong/index.scss';
import { createMuiTheme, lighten, darken } from '@material-ui/core/styles';
import { PaletteColor } from '@material-ui/core/styles/createPalette';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

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
  main: '#f00000',
  light: '#f18787',
  dark: '#e32c2c',
  contrastText: '#fff',
};

const yellow: PaletteColor = {
  main: '#f7b500',
  light: '#ffb74d',
  dark: '#ff9800',
  contrastText: '#000',
};

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
    MuiInput: {
      root: {
        backgroundColor: '#fff',
        padding: '10px 20px',
        borderRadius: 30,
      },
      input: {
        fontSize: 12,
      },
    },
  },
  palette: {
    primary: dark,
    secondary: green,
    error: red,
    warning: yellow,
  },
  typography: {
    fontFamily,
    h4: {
      fontSize: '1.75rem',
    },
  },
});

export default theme;
