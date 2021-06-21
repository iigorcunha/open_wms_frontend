import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    main: {
      darkBlue: '#023047',
      darkBlue80: '#305467',
      violet: '#54478C',
      blue: '#219EBC',
      cyan: '#8ECAE6',
      orange: '#FB8500',
      yellow: '#FFB703',
      yellow80: '#FAC030',
      green: '#16DB93',
      lightGreen: '#16DB93',
      white: '#F5F5F5',
      offWhite: '#EEEEEE',
    },
    white: '#F5F5F5',
    greenBtn: {
      500: '#16DB93',
      600: '#14C584',
      700: '#12AF76',
    },
    yellowBtn: {
      500: '#FFB703',
      600: '#E6A503',
      700: '#CC9202',
    },
    blueBtn: {
      500: '#219EBC',
      600: '#1E8EA9',
      700: '#1A7E96',
    },
  },
  fonts: {
    heading: 'Quicksand',
    body: 'Quicksand',
  },
});
