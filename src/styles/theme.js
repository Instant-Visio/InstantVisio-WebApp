const sizes = {
    XXS: '0.25rem', //  4px
    XS: '0.5rem', //    8px
    S: '0.75rem', //   12px
    M: '1rem', //      16px
    L: '1.25rem', //   20px
    XL: '1.5rem', //   24px
    XXL: '2rem', //    32px
    XXXL: '3rem', //    48px
}

export const SCREEN = {
    MOBILE: '@media screen and (max-width: 767px)',
    TABLET: '@media screen and (max-width: 1279px) and (min-width:768px)',
    DESKTOP_AND_TABLET: '@media screen and (min-width: 1280px)',
}

export default {
    color: {
        blue: '#5DC5DF',
        red:  '#dc3545',
        white: '#ffffff',
        logoGrey: '#aaabbd',
        textGrey: '#8e91a2',
        grey: '#323742',
        black: '#222222',
        orange: '#F28E1D'
    },
    font: sizes,
    spacing: sizes
}