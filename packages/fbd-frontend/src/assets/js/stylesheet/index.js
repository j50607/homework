class stylesheet {
  static getMainTheme() {
    const result = {
      // 主色
      primaryColor: {
        1: '#7a5605',
      },
      // 主漸層色
      btnPrimaryBg: {
        1: 'linear-gradient(180deg, #f3ac0a 0%, #B58007 100%)',
      },
      headerPrimaryBg: {
        1: 'linear-gradient(180deg, #f3ac0a 0%, #B58007 100%)',
      },
      // 文字預設顏色
      fontColor: {
        1: '#4d5772',
      },
      // 文字 active 顏色(可參考 XD tab active)
      fontActiveColor: {
        1: '#1f2022',
      },
      // 連結預設顏色
      linkColor: {
        1: '#4ab1ff',
      },
      // 正數預設顏色
      positiveColor: {
        1: '#38c522',
      },
      // 負數預設顏色
      negativeColor: {
        1: '#ff0000',
      },
      // 下拉式選單 hover 顏色
      transparencyColor: {
        1: 'rgba(77, 87, 114, 0.1)',
      },
      // 背景預設底色
      layoutBg: {
        1: '#f9fcff',
      },
      // 內容物、方塊預設底色
      primaryContentBg: {
        1: '#fff',
      },
      // 內容物、方塊預設底色
      secondaryContentBg: {
        1: '#ecf2f8',
      },
      // 邊框預設顏色
      borderColor: {
        1: '#bdbdbd',
      },
      // header 高度
      headerHeight: {
        1: '48px',
      },
      // footer 高度
      footerHeight: {
        1: '50px',
      },
      // 主按鈕文字顏色
      primaryBtnColor: {
        1: '#fff',
      },
      // 次按鈕文字顏色
      secondaryBtnColor: {
        1: '#7a5605',
      },
      // 维护、未开放遮罩背景色
      maintainBg: {
        1: 'rgba(77, 87, 114, 0.88)',
      },
    };

    return result;
  }
}

export default stylesheet;
