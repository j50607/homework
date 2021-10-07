class stylesheet {
  static getMainTheme() {
    const result = {
      // 主色
      primaryColor: {
        1: '#7a5605',
        2: '#142340',
      },
      secondaryColor: {
        1: '#f3ac0a',
        2: '#21304E',
      },
      // 主漸層色
      btnPrimaryBg: {
        1: 'linear-gradient(180deg, #f3ac0a 0%, #B58007 100%)',
        2: '#FFB83D',
      },
      headerPrimaryBg: {
        1: 'linear-gradient(180deg, #f3ac0a 0%, #B58007 100%)',
        2: '#142340',
      },
      // 文字預設顏色
      fontColor: {
        1: '#4d5772',
        2: '#fff',
      },
      // 文字 active 顏色(可參考 XD tab active)
      fontActiveColor: {
        1: '#1f2022',
        2: '#FFB83D',
      },
      // 連結預設顏色
      linkColor: {
        // 1: '#4ab1ff',
        1: '#0e88f5',
        2: '#fff',
      },
      // 正數預設顏色
      positiveColor: {
        1: '#38c522',
        2: '#38c522',
      },
      // 負數預設顏色
      negativeColor: {
        1: '#ff0000',
        2: '#ff0000',
      },
      // 下拉式選單 hover 顏色
      transparencyColor: {
        1: 'rgba(77, 87, 114, 0.1)',
        2: '#FFF4D9',
      },
      // 背景預設底色
      layoutBg: {
        1: '#f9fcff',
        2: '#10192E',
      },
      // 內容物、方塊預設底色
      primaryContentBg: {
        1: '#fff',
        2: '#142340',
      },
      // 內容物、方塊預設底色
      secondaryContentBg: {
        1: '#ecf2f8',
        2: '#142340',
      },
      // 邊框預設顏色
      borderColor: {
        1: '#bdbdbd',
        2: '#6C82AC',
      },
      // header 高度
      headerHeight: {
        1: '48px',
        2: '48px',
      },
      // footer 高度
      footerHeight: {
        1: '50px',
        2: '50px',
      },
      // 主按鈕文字顏色
      primaryBtnColor: {
        1: '#fff',
        2: '#081024',
      },
      // 次按鈕文字顏色
      secondaryBtnColor: {
        1: '#7a5605',
        2: '#FFFFFF',
      },
      // 维护、未开放遮罩背景色
      maintainBg: {
        1: 'rgba(77, 87, 114, 0.88)',
        2: 'rgba(77, 87, 114, 0.88)',
      },
      inputBorderColor: {
        1: '#f2f2f2',
        2: '#f2f2f2',
      },
      inputBg: {
        1: '#f5f5f5',
        2: '#142340',
      },
      inputFontColor: {
        1: '#333',
        2: '#fff',
      },
      inputPlaceholderColor: {
        1: '#bdbdbd',
        2: '#374E7B',
      },
      labelColor: {
        1: '#4d5772',
        2: '#fff',
      },
      dialogColor: {
        1: '#fff',
        2: '#21304E',
      },
      modalRadius: {
        1: '15px',
        2: '5px',
      },
      selectBg: {
        1: '#ecf2f8',
        2: '#142340',
      },
      // checkbox active 底色
      checkboxActiveBg: {
        1: '#1890ff',
        2: '#FFB83D',
      },
      // checkbox 打勾顏色
      checkboxCheckColor: {
        1: '#fff',
        2: '#21304E',
      },
      // checkbox 邊框
      checkboxBorderColor: {
        1: '#f2f2f2',
        2: '#374E7B',
      },

      // 好友分享页面专用
      checkShareBg: {
        1: '#fff',
        2: '#000',
      },

      checkSharePrimary: {
        1: '#fff',
        2: '#161616',
      },

      checkShareTextColor1: {
        1: '#333',
        2: '#fff',
      },

      checkShareTextColor2: {
        1: '#999',
        2: '#999',
      },

      checkShareTextColor3: {
        1: '#0e88f5',
        2: '#f3ac0a',
      },

      checkShareTextColor4: {
        1: '#fc4718',
        2: '#f3ac0a',
      },

      checkShareTextColor5: {
        1: '#f2f2f2',
        2: '#000',
      },

      checkShareTextColor6: {
        1: '#333',
        2: '#999',
      },

      checkShareTextColor7: {
        1: '#fbfbfb',
        2: '#161616',
      },

      checkShareTextColor8: {
        1: '#fff',
        2: '#333',
      },

      checkShareInputBg: {
        1: '#fff',
        2: '#fff',
      },
      // 優惠活動底色
      activityListColor: {
        1: 'transparent linear-gradient(180deg, #ecf2f8 0%, #fff 100%)',
        2: '#374E7B',
      },
    };
    return result;
  }
}

export default stylesheet;
