const colors = require("tailwindcss/colors");
const measurements={
  'auto': 'auto',
  '0': '0px',
  '1/2': '50%',
  '1/3': '33.33333%',
  '2/3': '66.66667%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.66667%',
  '5/6': '83.33333%',
  '9/10': '90%',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '28px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '18': '72px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '48': '192px',
  '64': '256px',
  '80':'320px',
  'full': '100%',
  'screen-w': '100vw',
  'fit' :'fit-content',
  'min' :'min-content',
  'max' :'max-content',
  'unset' :'unset',
  'initial' :'initial',

  'screen-h': '100vh',
  'screen-h-90': '90vh',
  'screen-h-80': '80vh',
  'screen-h-70': '70vh',
  'screen-h-50': '50vh',
  'inherit':'inherit'

}

function others(){
  for (let i = 0; i < 1000; i++) {
    measurements[`${i}px`]=`${i}px`
  }
  for (let i = 0; i < 100; i++) {
    measurements[`${i}%`]=`${i}%`
  }
}
others()
module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./layouts/**/*.{html,js}",

  ],
  theme: {
    extend: {
      colors:{
        ...colors,
        'primary': '#00afee',
        'primary-dark': '#1865c7',
        'primary-light': '#66e1ff',
        'primary-lighter': '#d3ffff',
        'primary-purple': '#262162',
        'primary-purple-light': '#554990',
        'primary-purple-lighter': '#8475c1',
        'primary-red': '#EA1C23',
        'primary-red-light': '#ff917a',
        'primary-red-lighter': '#ffc3a9',
        'primary-yellow':'#F6ED31',
        'modal':'#5757585A',
        'grey-bg':'#fafafa',
        'grey-skeleton':'#d1d1d1',
        'loader':'rgba(124,124,127,0.2)',
        'grey-input':'#dde9d4',
        'dashboard-grey':'#eeeeee',
      },
      spacing:{
        ...measurements
      },
      minWidth:{...measurements},
      minHeight:{...measurements},
      maxWidth:{...measurements},
      borderWidth:{...measurements},
      fontSize:{...measurements},
      borderRadius: {
        'none': '0',
        default: '6px',
        'full':'50%',
        'sm':'4px',
        'md':'8px',
        'lg':'16px',
        'pill':'9999px'
      },
      zIndex: {
        'auto': 'auto',
        '0': 0,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '1':1,
        '2':2,
        '3':3,
        '4':4,
        '5':5,
        '6':6,
        '7':7,
        'n1':-1,
        'n2':-2,
        'n3':-3,
        'n4':-4,
        'n5':-5,
        'n6':-6,
        'n7':-7,
        'n8':-8,
      },
      // screens: {
      //   'xsm': '280px',
      //   'sm': '640px',
      //   'md': '768px',
      //   'lg': '1024px',
      //   'xl': '1280px',
      //   '2xl': '1536px',
      // }

    },
  },
  plugins: [  ],
}
