// 簡中语言档
const lang = {
  home: '首頁',
  // Common
  common_numText1: '一',
  common_numText2: '二',
  common_numText3: '三',
  common_numText4: '四',
  common_numText5: '五',
  common_numText6: '六',
  common_numText7: '七',
  common_numText8: '八',
  common_numText9: '九',
  common_numText10: '十',
  common_comingSoon: '敬请期待',
  common_confirm: '确认',
  common_editedSucceeded: '修改成功',
  common_loginFirst: '请先登录',
  common_reLogin: '请重新登录',
  common_logoutSucceeded: '登出成功',
  common_notVerify: '未经授权',
  common_errorSpecialSymbol: '{titleName}不可包含特殊字元或标点符号',
  common_errorNoFullWidth: '{titleName}不可包含全形字元',
  common_errorFormat: '格式错误',
  common_errorLength: '字数过长',
  common_errorGender: '请选择性别',
  common_errorBirth: '请选择生日',
  common_errorInviteCodeLen: '邀请码必须是数字8码',
  common_errorLenLimitVar: '栏位长度为{bankNumRange}字元',
  common_errorPhoneLenLimitVar: '手机号码必须是{phoneLen}码',
  common_errorPhoneBeginLimit: '手机号码必须是{phoneBeginning0}~{phoneBeginning1}开头',
  common_errorNoEmpty: '此栏位不可为空值',
  common_errorEmptyZalo: '请输入Zalo',
  common_errorNoFullWidthZalo: 'Zalo账号不可包含全形字元',
  common_errorEmptyLine: '请输入Line',
  common_errorNoFullWidthLine: 'Line账号不可包含全形字元',
  common_errorEmptyWechat: '请输入wechat账号',
  common_errorNoFullWidthWechat: '微信账号不可包含全形字元',
  common_errorEmptyQq: '请输入QQ账号',
  common_errorNoFullWidthQq: 'QQ账号不可包含全形字元',
  common_errorEmptyEmail: '请输入Email',
  common_errorEmptyPhone: '请输入手机号码',
  common_errorEmptyRealName: '请输入真实姓名',
  common_errorEmptyBanklName: '请输入银行名称',
  common_errorEmptyPersonId: '请输入证件号',
  common_errorSpecialSymbolRealName: '真实姓名不可包含特殊字元或标点符号以及数字',
  common_errorSpecialSymbolBankName: '银行名称不可包含特殊字元或标点符号以及数字',
  common_errorSpecialSymbolName: '戶名不可包含特殊字元或标点符号以及数字',
  common_errorNoFullWidthRealName: '真实姓名不可包含全形字元',
  common_errorNoFullWidthBanklName: '银行名称不可包含全形字元',
  common_errorNoFullWidthPersonalId: '证件号不可包含全形字元',
  common_errorLenRealName: '真实姓名长度必须小于{nameLen}字元',
  common_errorLenBankName: '银行名称长度必须小于{bankNameLen}字元',
  common_errorLenPersonalId: '证件号长度必须小于{personalIdLen}字元',
  common_errorEmptyNickName: '请输入昵称',
  common_errorSpecialSymbolNickName: '昵称只能输入1-8位汉字英文数字',
  common_errorLenNickName: '昵称长度必须小于8字元',
  common_errorEmptyPwd: '请输入密码',
  common_errorSpecialSymbolPwd: '密码不可包含特殊字元或标点符号',
  common_errorNoChinesePwd: '密码不可包含中文',
  common_errorNoChinesePersonalId: '证件号不可包含中文',
  common_errorNoFullWidthPwd: '密码不可包含全形字元',
  common_errorNeedNumAndLetterPwd: '密码必须包含英文与数字',
  common_errorLenPwd: '密码长度必须介于6-12字元',
  common_errorEmptyAccount: '请输入用户名',
  common_errorSpecialSymbolAccount: '账号不可包含特殊字元或标点符号',
  common_errorNoChineseAccount: '账号不可包含中文',
  common_errorNoChineseAddrNo: '邮编号不可包含中文',
  common_errorSpecialSymbolAddrNo: '邮编号不可包含特殊字元或标点符号',
  common_errorNoFullWidthAccount: '账号不可包含全形字元',
  common_errorLenAccount: '账号长度必须介于6-12字元',
  common_errorFormatAccount: '账号至少须包含一位数字及一位英文',
  common_errorAtLeastNumberCharacters: '至少{number}位字符，必须包含1位大写字母及1位数字',
  common_errorSamePassword: '新旧密码不得相同，请重新输入',
  common_errorPasswordConfirmFailed: '新密码与确认新密码输入不一致，请重新输入',
  common_errorDisconnectedAndRefresh: '连线中断，请检查网路并刷新页面',
  // Views
  views_notFound_desc: '404 page not found',
  views_notFound_backToHome: '回到首页',
  views_betRecord_item_pending: '未结算',
  views_betRecord_item_label1: '下单金额',
  views_betRecord_item_label2: '下单选项',
  views_betRecord_item_label3: '手续费',
  views_betRecord_item_label4: '预估获利',
  views_betRecord_item_label5: '状态',
  views_betRecord_item_action1: '展开详情',
  views_betRecord_item_action2: '收回详情',
  views_bankcard_nextStep2: '確認',

  // Components
  components_common_dialog_confirm: '确认',
  components_common_dialog_cancel: '取消',
  components_dSearchList_search: '搜寻',
  components_dHeaderRow_register: '注册',
  components_dLanguageModal_title: '语言',
  components_dSelectDateModal_title: '日期筛选',
  components_dSelectDateModal_today: '今日',
  components_dSelectDateModal_yesterday: '昨日',
  components_dSelectDateModal_sevenDays: '七日',
  components_dSelectDateModal_custom: '自定义',
  components_scroll_allLoaded: '已全部加载',
  components_scroll_pullUpLoading: '正在加载...',
  components_scroll_pullDownLoading: '正在刷新',
  components_scroll_continuePullUp: '继续上拉加载',
  components_scroll_refresh: '刷新成功',
  components_scroll_pullDownRefresh: '下拉刷新',
};

export default {
  ...lang,
};
