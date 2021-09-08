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
  common_contactService: '联系客服',
  common_noData: '暂无资料',

  // Views
  views_notFound_desc: '404 page not found',
  views_notFound_backToHome: '回到首页',
  views_betting_host: '主',
  views_betting_info_deadline: '下单截止',
  views_betting_main_type1: '全场',
  views_betting_main_type2: '半场',
  views_betting_main_totalAmount: '总成交量',
  views_betting_main_closed: '未开放',
  views_betting_main_fulled: '投注已满',
  views_betting_main_availableAmount: '可交易量',
  views_betting_main_popup_title: '下单详情',
  views_betting_main_popup_option: '下单选项',
  views_betting_main_popup_betAmount: '投注金额',
  views_betting_main_popup_betAmountPlaceholder: '请输入投注金额',
  views_betting_main_popup_balance: '余额',
  views_betting_main_popup_profit: '获利',
  views_betting_main_popup_charge: '手续费',
  views_betting_main_popup_expectedProfit: '预期获利',
  views_betting_main_popup_btnAction: '下单',
  views_betting_statistic_popup_title: '交易量明细',
  views_betting_statistic_popup_sum: '总成交量',
  views_betting_statistic_popup_others: '其他',
  views_betRecord_item_title: '下单记录',
  views_betRecord_item_pending: '未结算',
  views_betRecord_item_label1: '下单金额',
  views_betRecord_item_label2: '下单选项',
  views_betRecord_item_label3: '手续费',
  views_betRecord_item_label4: '预估获利',
  views_betRecord_item_label5: '状态',
  views_betRecord_item_action1: '展开详情',
  views_betRecord_item_action2: '收回详情',
  views_bankcard_nextStep2: '確認',
  views_betRecord_sum_label1: '交易金额 : ',
  views_betRecord_sum_label2: '已结赛事 : ',
  views_betRecord_sum_label3: '未结赛事 : ',
  views_betRecord_sum_label4: '已实现获利 : ',
  views_betRecord_sum_label5: '预估获利 : ',
  views_betRecord_filterPopup_title: '筛选',
  views_betRecord_filterPopup_label1: '状态',
  views_betRecord_filterPopup_label2: '项目名称',
  views_betRecord_filterPopup_status1: '未结算',
  views_betRecord_filterPopup_status2: '已结算',
  views_profile_title: '我的',
  views_profile_balance: '余额',
  views_profile_lockWallet: '锁定钱包',
  views_profile_goDeposit: '我要充值',
  views_profile_goWithdraw: '马上提现',
  views_profile_transactionRecord: '充提记录',
  views_profile_walletManagement: '钱包管理',
  views_profile_personalityProfile: '个人资料',
  views_profile_myReport: '我的报表',
  views_profile_myVip: '我的VIP',
  views_profile_share: '全民推广',
  views_profile_promotion: '优惠活动',
  views_profile_verify: '认证',
  views_profile_service: '客服',
  views_profile_logout: '登出',
  views_profile_selectAvatar: '选择头像',
  views_profile_newestMessage: '最新信息',
  views_market_title: '市场列表',
  views_market_switchLeague: '联盟选择',
  views_market_switchLeague_select_all: '全选',
  views_market_switchLeague_select_not: '反选',
  views_market_switchLeague_list_openCount: '已开启{num}场次',
  views_match_tablist_all: '全部賽事',
  views_match_tablist_today: '今日賽事',
  views_match_tablist_tomorrow: '明日賽事',
  views_match_tablist_record: '歷史場次',
  views_profile_withdraw: '提现',
  views_profile_withdrawWallet: '提现钱包',
  views_profile_withdrawCodeTitle: '输入提现密码',
  views_profile_withdrawAmountTitle: '输入提现金额',
  views_profile_withdrawFreeCount: '免费提现次数',
  views_profile_charge: '一般提现手续费',
  views_profile_forceCharge: '强制提现手续费',
  views_profile_amount: '提款总额',
  views_profile_realAmount: '提现后余额',
  views_profile_balanceNotEnough: '余额不足',
  views_profile_withdrawAmount: '提现金额',
  views_profile_totalAmount: '总金额',
  views_profile_withdrawAmountPlaceholder: '请输入提现金额',
  views_profile_withdrawCode_notice1: '输入提现密码以继续交易',
  views_profile_withdrawCode_notice2: '设定6位数提现密码，请牢记密码',
  views_profile_confirmOrder: '确认订单',
  views_profile_orderNotice: '交易前请确认订单资讯',
  views_profile_mainNetwork: '主网类型',
  views_profile_walletAddress: '钱包地址',
  views_home_matchNews: '赛事快讯',
  views_home_matchHot: '热门赛事',
  views_profile_withdrawHandling: '出款进行中',
  views_profile_orderNumber: '订单编号',
  views_profile_time: '时间',
  views_profile_chooseWallet: '请选择钱包',
  views_profile_noWallet: '无任何钱包',
  views_profile_goBind: '前往绑定钱包',
  views_profile_deposit: '充值',
  views_profile_depositHandling: '入款进行中',

  // Components
  components_common_dialog_confirm: '确认',
  components_common_dialog_cancel: '取消',
  components_dSearchList_search: '搜寻',
  components_dHeaderRow_register: '注册',
  components_dLanguageModal_title: '请选择语言',
  components_dSelectDateModal_title: '日期筛选',
  components_dSelectDateModal_today: '今日',
  components_dSelectDateModal_yesterday: '昨日',
  components_dSelectDateModal_sevenDays: '七日',
  components_dSelectDateModal_sevenDays2: '7日內',
  components_dSelectDateModal_custom: '自定义',
  components_dSelectDateModal_custom2: '自訂',
  components_scroll_allLoaded: '已全部加载',
  components_scroll_pullUpLoading: '正在加载...',
  components_scroll_pullDownLoading: '正在刷新',
  components_scroll_continuePullUp: '继续上拉加载',
  components_scroll_refresh: '刷新成功',
  components_scroll_pullDownRefresh: '下拉刷新',
  components_pages_loginAndRegister_loginRegister_login_user: '账户',
  components_pages_loginAndRegister_loginRegister_login_enter_user: '请输入账户',
  components_pages_loginAndRegister_loginRegister_login_password: '密码',
  components_pages_loginAndRegister_loginRegister_login_enter_password: '请输入密码',
  components_pages_loginAndRegister_loginRegister_login_image: '图形验证码',
  components_pages_loginAndRegister_loginRegister_login_enter_image: '请输入图形验证码',
  components_pages_loginAndRegister_loginRegister_index_loginSuccess: '登录成功',
  components_pages_loginAndRegister_loginRegister_welcome_back: '欢迎回来',
  components_pages_loginAndRegister_loginRegister_forget: '忘记密码 ?',
  components_pages_loginAndRegister_loginRegister_login: '登录',

  components_pages_loginAndRegister_loginRegister_register_new_user: '注册新账户',
  components_pages_loginAndRegister_loginRegister_register_mandatory: '(必填选项)',
  components_pages_loginAndRegister_loginRegister_register_confirm_password: '确认密码',
  components_pages_loginAndRegister_loginRegister_register_password_again: '请再次输入密码',
  components_pages_loginAndRegister_loginRegister_register_agent_code: '邀请码',
  components_pages_loginAndRegister_loginRegister_register_agent_code_placeholder: '请输入邀请码',
  components_pages_loginAndRegister_loginRegister_register_real_name: '真实姓名',
  components_pages_loginAndRegister_loginRegister_register_real_name_placeholder: '请输入真实姓名',
  components_pages_loginAndRegister_loginRegister_register_nickname: '昵称',
  components_pages_loginAndRegister_loginRegister_register_nickname_placeholder: '请输入昵称',
  components_pages_loginAndRegister_loginRegister_register_phone: '手机号',
  components_pages_loginAndRegister_loginRegister_register_phone_placeholder: '请输入手机号',
  components_pages_loginAndRegister_loginRegister_register_qq: 'QQ号',
  components_pages_loginAndRegister_loginRegister_register_qq_placeholder: '请输入QQ号',
  components_pages_loginAndRegister_loginRegister_register_weChat: '微信',
  components_pages_loginAndRegister_loginRegister_register_weChat_placeholder: '请输入微信号',
  components_pages_loginAndRegister_loginRegister_register: '注冊',
  components_footer_home: '首页',
  components_footer_match: '市场',
  components_footer_record: '记录',
  components_footer_finance: '账务',
  components_footer_profile: '我的',

  // Error
  error1: '6~12位英数字混合',
  error2: '6~12位英数字',
  error3: '密码不一致',
  error4: '请输入正确的邮箱位置',
  error5: '请输入正确的手机号码长度',
  error6: '请输入正确的验证码',
  error7: '推荐码不得为空',
  error8: '请输真实姓名',
  error9: '真实姓名不可包含特殊字元或标点符号以及数字',
  error10: '真实姓名不可包含全形字元',
  error11: '真实姓名必须为英文且不超过50字元',
  error12: '请输入昵称',
  error13: '昵称只能输入1-8位汉字英文数字',
  error14: '昵称长度必须小于8字元',
  error15: '请输入手机号码',
  error16: '请输入QQ账号',
  error17: 'QQ账号不可包含全形字元',
  error18: 'QQ 字数过长',
  error19: 'QQ账号不包含特殊字符或标点符号',
  error20: '请输入wechat账号',
  error21: '微信账号不可包含全形字元',
  error22: '微信账号不包含特殊字符或标点符号',
  error23: 'Wechat 字数过长',
};

export default {
  ...lang,
};
