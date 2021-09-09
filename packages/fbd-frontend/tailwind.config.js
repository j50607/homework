module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        normal: 'var(--font-color)',
        active: 'var(--font-active-color)',
        link: 'var(--link-color)',
        positive: 'var(--positive-color)',
        negative: 'var(--negative-color)',
        transparency: 'var(--transparency-color)',
        layout: 'var(--layout-bg)',
        'primary-content': 'var(--primary-content-bg)',
        'secondary-content': 'var(--secondary-content-bg)',
        border: 'var(--border-color)',
        maintain: 'var(--maintain-bg)',
      },
      spacing: {
        0: '0px',
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '30px',
        7: '35px',
        8: '40px',
        9: '45px',
        10: '50px',
        11: '60px',
        'h-h': 'var(--header-height)', // header 高度
        'f-h': 'var(--footer-height)', // footer 高度
      },
      borderRadius: {
        3: '3px',
        5: '5px',
        8: '8px',
        10: '10px',
        15: '15px',
        20: '20px',
        50: '50px',
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
};
