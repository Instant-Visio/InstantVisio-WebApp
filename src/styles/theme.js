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
    LANDSCAPE: '@media screen and (min-width: 500px) and (max-height: 500px)',
    TABLET: '@media screen and (max-width: 1179px) and (min-width:768px)',
    MOBILE_AND_TABLET: '@media screen and (max-width: 1179px)',
    DESKTOP: '@media screen and (min-width: 1180px)',
}

export default {
    color: {
        blue: '#5DC5DF',
        red: '#dc3545',
        green: '#189940',
        white: '#ffffff',
        grey: '#323742',
        greyLighten: '#f5f5f5',
        black: '#222222',
        orange: '#F28E1D',
        textBlue: '#438a9d',
        logoGrey: '#aaabbd',
        textGrey: '#35353b',
        otherGrey: '#3d3e45',
    },
    font: sizes,
    spacing: sizes,
}
