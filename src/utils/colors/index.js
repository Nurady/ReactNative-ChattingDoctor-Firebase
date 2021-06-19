const mainColors = {
    green1 : '#0BCAD4',
    green2 : '#4ca1a3',
    green3 : '#EDFCFD',
    dark1 : '#112340',
    dark2 : '#495A75',
    dark3 : '#8092AF',
    gray1 : '#7D8797',
    gray2 : '#eeeeee',
    gray3 : '#f8f5f1',
    gray4 : '#EDEEF0',
    gray5 : '#B1B7C2',
    blue1 : '#0066CB',
    black1 : '#000000',
    black2 : 'rgba(0, 0, 0, 0.5)',
    red1 : '#E06379',
};

export const colors = {
    primary : mainColors.green1,
    secondary : mainColors.dark1,
    tertiary : mainColors.blue1,
    white : 'white',
    black : 'black',
    disable : mainColors.gray4,
    text : {
        primary: mainColors.dark1,
        secondary: mainColors.gray1,
        menuInActive: mainColors.dark2,
        menuActive: mainColors.green1,
        subTitle: mainColors.dark3
    },
    button : {
        primary: {
            background: mainColors.green1,
            text: 'white'
        },
        secondary: {
            background: 'white',
            text: mainColors.dark1
        },
        disable: {
            background: mainColors.gray4,
            text: mainColors.gray5
        },
    },
    borderInput : mainColors.green2,
    border : mainColors.gray2,
    header: mainColors.gray2,
    cardLight: mainColors.green3,
    loadingBackground: mainColors.black2,
    error: mainColors.red1,
};