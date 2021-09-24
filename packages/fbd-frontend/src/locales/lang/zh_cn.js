// 简中语言档
const lang = {
  home: '首页',
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
  common_all: '全部',
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
  common_errorSpecialSymbolName: '户名不可包含特殊字元或标点符号以及数字',
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
  common_passwordModifySuccessNeedRelogin: '密码修改成功，请重新登录',
  common_errorDisconnectedAndRefresh: '连线中断，请检查网路并刷新页面',
  common_contactService: '联系客服',
  common_modifyContactService: ' 若需修改请联系在线客服',
  common_noData: '暂无资料',
  common_day: '天',
  common_week: '周',
  common_month: '月',
  common_delete: '删除',
  common_select_placeholder: '请选择内容',
  common_delete_success: '删除成功',
  common_edit_success: '编辑成功',
  common_count: '次',
  common_limit: '限制',
  common_modifySuccess: '更改成功',
  common_sendSuccess: '发送成功',
  common_betFailMsg: '投注失败',
  common_copySuccess: '复制成功',
  common_noContenttoCopy: '没有内容可以复制',
  common_checkDetail: '查看详情',
  common_language: '语言',
  common_select_language: '请选择语言',

  // Views
  views_notFound_desc: '404 page not found',
  views_notFound_backToHome: '回到首页',
  views_betting_host: '主',
  views_betting_info_deadline: '下单截止',
  views_betting_info_deadlineClosed: '下单已截止',
  views_betting_main_empty: '下单已关闭',
  views_betting_main_back: '返回市场列表',
  views_betting_main_type1: '全场',
  views_betting_main_type2: '半场',
  views_betting_main_totalAmount: '总成交量',
  views_betting_main_closed: '未开放',
  views_betting_main_fulled: '投注已满',
  views_betting_main_handleBettingText: '投注进行中',
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
  views_betting_main_popup_btnAction2: '获取最新资料',
  views_betting_main_popup_dollars: '元',
  views_betting_main_popup_notify1: '投注金额需介于{minBet} ~ {maxBet}',
  views_betting_main_popup_notify2: '投注金额不得大于{limitAmount}',
  views_betting_statistic_popup_title: '交易量明细',
  views_betting_statistic_popup_sum: '总成交量',
  views_betting_statistic_popup_others: '其他',
  views_betting_statistic_popup_all: '全部',
  views_betRecord_item_title: '下单记录',
  views_betRecord_item_pending: '未结算',
  views_betRecord_item_label1: '下单金额',
  views_betRecord_item_label2: '下单选项',
  views_betRecord_item_label3: '手续费',
  views_betRecord_item_label4: '预估获利',
  views_betRecord_item_label5: '状态',
  views_betRecord_item_label6: '赛事名',
  views_betRecord_item_label7: '项目',
  views_betRecord_item_action1: '展开详情',
  views_betRecord_item_action2: '收回详情',
  views_bankcard_nextStep2: '确认',
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
  views_betRecord_filterPopup_status3: '已撤单',
  views_betRecord_filterPopup_status4: '和局',
  views_betRecord_betNo: '订单号',
  views_betRecord_gameDetail: '赛事详情',
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
  views_profile_memberTransfer: '会员互转',
  views_profile_share: '全民推广',
  views_profile_promotion: '优惠活动',
  views_profile_verify: '认证',
  views_profile_service: '客服',
  views_profile_logout: '登出',
  views_profile_logoutSuccess: '登出成功',
  views_profile_selectAvatar: '选择头像',
  views_profile_newestMessage: '最新信息',
  views_market_title: '市场列表',
  views_market_switchLeague: '联盟选择',
  views_market_switchLeague_select_all: '全选',
  views_market_switchLeague_select_not: '反选',
  views_match_tablist_all: '全部',
  views_match_tablist_today: '今日',
  views_match_tablist_tomorrow: '明日',
  views_match_tablist_record: '历史',
  views_market_switchLeague_list_openCount: '已开启{num}场次',
  views_market_switchLeague_noSelected: '请至少选择一个联盟',
  views_market_allLeague_deadLine: '下单截止',
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
  views_profile_currency: '货币',
  views_profile_depositAmount: '充值金额',
  views_profile_handlingFee: '手续费',
  views_profile_promotionAmount: '優惠',
  views_profile_actualAmount: '实际到账',
  views_profile_totalAmount: '总金额',
  views_profile_withdrawAmountPlaceholder: '请输入提现金额',
  views_profile_withdrawCode_notice1: '输入提现密码以继续交易',
  views_profile_withdrawCode_notice2: '设定6位数提现密码，请牢记密码',
  views_profile_confirmOrder: '确认订单',
  views_profile_orderNotice: '交易前请确认订单资讯',
  views_profile_chainType: '主网类型',
  views_profile_walletAddress: '钱包地址',
  views_home_matchNews: '赛事快讯',
  views_home_matchHot: '热门赛事',
  views_profile_withdrawHandling: '出款进行中',
  views_profile_orderNumber: '订单编号',
  views_profile_time: '时间',
  views_profile_chooseWallet: '请选择钱包',
  views_profile_noWallet: '无绑定钱包',
  views_profile_goBind: '前往绑定钱包',
  views_profile_deposit: '充值',
  // newstart
  views_profile_deposit_cryptoChannel: '虚拟币充值通道',
  views_profile_deposit_checkTeaching: '查看教程',
  views_profile_deposit_chooseChannel: '请选择充值通道',
  views_profile_deposit_noChannel: '无任何充值通道',
  views_profile_deposit_notice: '注意事项',
  views_profile_deposit_depositInfo: '充值资讯',
  views_profile_deposit_nextStep: '下一步',
  views_profile_deposit_amountPlaceholder: '请输入充值金额',
  views_profile_deposit_alreadyCompleteTransfer: '已完成汇款',
  views_profile_deposit_generateDepositAddress: '产生充值地址',
  views_profile_deposit_depositAmount: '充值金额',
  views_profile_deposit_hint: '提示',
  views_profile_deposit_discount: '优惠',
  views_profile_deposit_fee: '手续费',
  views_profile_deposit_walletAddress: '钱包地址',
  views_profile_deposit_hint_one: '未填入上述资讯将造成到账失败',
  views_profile_deposit_hint_two: '优惠{number}%',
  views_profile_deposit_hint_three: '手续费{number}%',
  views_profile_deposit_hint_four: '实际到账金额为',
  views_profile_deposit_hint_five: '限额须为 {min} - {max}',
  views_profile_deposit_limitAmount: '限额 {min} - {max}',
  views_profile_deposit_limitAmountWarning: '金额需介于{min} - {max}，如有问题请联系客服',
  views_profile_transfer_title: '会员互转',
  views_profile_transfer_tabList_subTransfer: '下级转账',
  views_profile_transfer_tabList_superiorTransfer: '上级转账',
  views_profile_transfer_input_placeholder: '输入会员账号搜寻',
  views_profile_transfer_table_title_account: '账号',
  views_profile_transfer_table_title_Superioraccount: '上级账号',
  views_profile_transfer_table_title_money: '金额',
  views_profile_transfer_noWithdrawCode: '尚未绑定钱包\n 页面将跳转至绑定钱包',
  views_profile_transfer_transfer_disable: '功能未开启',
  views_profile_promotion_allActivity: '全部活动',
  views_profile_promotion_passedActivity: '过往活动',
  views_profile_promotion_noData: '暂无活动',

  // newend
  views_profile_depositHandling: '入款进行中',
  views_profile_userinfo_title: '个人资料',
  views_profile_userinfo_balance: '余额',
  views_profile_userinfo_lockWallet: '锁定钱包',
  views_profile_userinfo_nickName: '昵称',
  views_profile_userinfo_nickNameHint: '昵称只能修改2次',
  views_profile_userinfo_realName: '真实姓名',
  views_profile_userinfo_gender: '性别',
  views_profile_userinfo_birthday: '生日',
  views_profile_userinfo_phone: '手机号码',
  views_profile_userinfo_walletManagement: '钱包管理',
  views_profile_userinfo_warning: '以上资料经输入后无法修改',
  views_profile_userinfo_notSetting: '未设定',
  views_profile_userinfo_qq: 'QQ',
  views_profile_userinfo_wechat: '微信',
  views_profile_userinfo_mailbox: '邮箱',
  views_profile_userinfo_line: 'LINE',
  views_profile_userinfo_zalo: 'Zalo',
  views_profile_userinfo_setting: '设置',
  views_profile_userinfo_modifyLoginPassword: '修改登录密码',
  views_profile_userinfo_modifyWithdrawPassword: '修改提现密码',
  views_profile_userinfo_woman: '女',
  views_profile_userinfo_man: '男',
  views_profile_userinfo_noWallet: '提现密码于绑定钱包时设定，您目前尚未绑定钱包。',
  views_profile_wallet_addWallet: '新增钱包',
  views_profile_wallet_placeholder1: '请输入主网类型',
  views_profile_wallet_placeholder2: '请输入虚拟币提现地址',
  views_profile_wallet_walletAddress: '钱包地址：',
  views_profile_wallet_deleteNotice: '确认要将此钱包删除吗',
  views_profile_userinfo_setNickName_currentNickName: '目前昵称',
  views_profile_userinfo_setNickName_newNickName: '新昵称',
  views_profile_userinfo_setNickName_pleaseEnterNewNickName: '请输入新昵称',
  views_profile_userinfo_setNickName_nickNameWarning: '昵称只能修改 2 次，已修改 {times} 次',
  views_profile_userinfo_setNickName_modifyOverLimit: '修改昵称次数已达上限, 若要修改请联系',
  views_profile_userinfo_setNickName_onlineService: '在线客服',
  views_profile_userinfo_setNickName_nickNameConflict: '新旧昵称不得相同',
  views_profile_userinfo_setNickName_pleaseEnterRealName: '请输入真实姓名',
  views_profile_userinfo_setRealName_warning: '输入后无法变更',
  views_profile_userinfo_setPhone_title: '手机号码',
  views_profile_userinfo_setPhone_pleaseEnterPhoneNumber: '请输入手机号码',
  views_profile_userinfo_setPhone_verifyPhoneNumber: '手机验证码',
  views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber: '请输入手机验证码',
  views_profile_userinfo_setPhone_sendVerifyNumber: '发送验证码',
  views_profile_userinfo_setPhone_sec: '秒',
  views_profile_userinfo_setPhone_loginPassword: '登录密码',
  views_profile_userinfo_setPhone_pleaseEnterLoginPassword: '请输入登录密码',
  views_profile_userinfo_setContact_account: '{type}账号',
  views_profile_userinfo_setContact_pleaseEnterAccount: '请输入{type}账号',
  views_profile_userinfo_modifyLoginPassword_title: '修改登录密码',
  views_profile_userinfo_modifyLoginPassword_oldPassword: '旧登录密码',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterOldPassword: '请输入旧密码',
  views_profile_userinfo_modifyLoginPassword_newPassword: '新登录密码',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterNewPassword: '请输入6-12位新密码',
  views_profile_userinfo_modifyLoginPassword_confirmNewPassword: '确认新登录密码',
  views_profile_userinfo_modifyLoginPassword_confirmNewPasswordAgain: '请再次输入新密码',
  views_profile_userinfo_modifyWithdrawPassword_title: '修改提现密码',
  views_profile_userinfo_modifyWithdrawPassword_withdrawCode: '提现密码',
  views_profile_userinfo_modifyWithdrawPassword_enterWithdrawCode: '输入6位数旧提币密码',
  views_profile_userinfo_modifyWithdrawPassword_newWithdrawCode: '新提现密码',
  views_profile_userinfo_modifyWithdrawPassword_settingWithdrawCode: '设定6位数提币密码，并牢记密码',
  views_profile_userinfo_modifyWithdrawPassword_confirmNewWithdrawCode: '确认新提现密码',
  views_finance_sum_label1: '充值总额',
  views_finance_sum_label2: '提现总额',
  views_finance_popup_label1: '交易类型',
  views_finance_popup_all: '全部',
  views_finance_popup_user_deposit: '充值记录',
  views_finance_popup_user_withdraw: '提现记录',
  views_finance_popup_event_gift: '活动赠送',
  views_finance_popup_return_water_record: '返水记录',
  views_finance_popup_rebate_record: '返点记录',
  views_finance_popup_poundage: '手续费',
  views_finance_popup_wallet_account_change: '钱包变帐',
  views_finance_popup_transfer_record: '转账记录',
  views_finance_popup_profit: '獲利',
  views_finance_popup_order: '下单',
  views_finance_popup_other: '其他',
  views_profile_wallet_addSuccess: '钱包已新增成功',
  views_finance: '账务明细',
  views_profile_transaction_deposit: '充值',
  views_profile_transaction_withdraw: '提现',
  views_profile_transaction_orderNumber: '订单编号',
  views_profile_transaction_depositTime: '充值时间',
  views_profile_transaction_withdrawTime: '提现时间',
  views_profile_transaction_balance: '余额',
  views_profile_transaction_status: '状态',
  views_profile_transaction_finishTime: '交易完成时间',
  views_profile_transaction_primaryNet: '主网',
  views_profile_transaction_walletAddress: '钱包地址',
  views_profile_transaction_depositAmount: '充值金额',
  views_profile_transaction_withdrawAmount: '提现金额',
  views_profile_transaction_promotionAmount: '优惠金额',
  views_profile_transaction_handlingFee: '手续费',
  views_profile_transaction_generalHandlingFee: '一般手续费',
  views_profile_transaction_forceHandlingFee: '强制提现手续费',
  views_profile_transaction_realAmount: '实际到账',
  views_profile_transaction_success: '交易成功',
  views_profile_transaction_cancel: '交易取消',
  views_profile_transaction_fail: '交易失败',
  views_profile_transaction_refused: '交易拒绝',
  views_profile_transaction_auditing: '审核中',
  views_profile_transaction_cancelSuccess: '撤单成功',
  views_profile_transaction_cancelAuditing: '撤单审核中',
  views_profile_transaction_empty: '暂无资料',
  views_finance_balance: '余额',
  views_profile_transaction_transactionDetail_orderDetail: '订单详情',

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
  components_dSelectDateModal_sevenDays3: '一周内',
  components_dSelectDateModal_custom: '自定义',
  components_dSelectDateModal_custom2: '自订',
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
  components_pages_loginAndRegister_loginRegister_index_registerSuccess: '注册成功',
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
  components_pages_loginAndRegister_loginRegister_register_email: '邮箱',
  components_pages_loginAndRegister_loginRegister_register_email_placeholder: '请输入邮箱',
  components_pages_loginAndRegister_loginRegister_register_qq: 'QQ号',
  components_pages_loginAndRegister_loginRegister_register_qq_placeholder: '请输入QQ号',
  components_pages_loginAndRegister_loginRegister_register_weChat: '微信',
  components_pages_loginAndRegister_loginRegister_register_weChat_placeholder: '请输入微信号',
  components_pages_loginAndRegister_loginRegister_register_line: 'Line',
  components_pages_loginAndRegister_loginRegister_register_line_placeholder: '请输入Line',
  components_pages_loginAndRegister_loginRegister_register_zalo: 'Zalo',
  components_pages_loginAndRegister_loginRegister_register_zalo_placeholder: '请输入Zalo',
  components_pages_loginAndRegister_loginRegister_register_birthday: '生日',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: '请输入生日',
  components_pages_loginAndRegister_loginRegister_register_gender: '性别',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: '请输入性别',
  components_pages_loginAndRegister_loginRegister_register_gender_male: '男',
  components_pages_loginAndRegister_loginRegister_register_gender_female: '女',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: '未选择',
  components_pages_loginAndRegister_loginRegister_register: '注册',
  components_pages_match_record_full_and_half: '全场 / 半场',
  components_pages_match_record_dialog_title: '赛事结果',
  components_pages_match_noData: '暂无赛事',
  components_pages_profile_transaction: '充提记录',
  components_footer_home: '首页',
  components_footer_match: '市场',
  components_footer_record: '记录',
  components_footer_finance: '账务',
  components_footer_profile: '我的',
  components_match_betAmount: '总销量',
  components_match_saleAmount: '销售量',
  components_datepicker_chooseDate: '选择日期',
  components_datepicker_dateRange: '开始时间不得大于结束时间',
  components_transferDialog_title: '转账',
  components_transferDialog_transfer_account: '转账账号',
  components_transferDialog_transfer_amount: '转账金额',
  components_transferDialog_transfer_amount_placeholder: '请输入金额',
  components_transferDialog_transfer_remark: '备注(限50字)',
  components_transferDialog_transfer_remark_placeholder: '请输入备注内容',
  components_transferDialog_transfer_confirm: '确认',
  components_transferDialog_transfer_cancel: '取消',
  components_transferDialog_transfer_amount_empty: '转账金额不得为0',
  components_transferDialog_transfer_amount_biggerThanBalance: '转账金额不得大于余额',
  components_withdrawCodeDialog_title: '密码确认',
  components_withdrawCodeDialog_inputCode: '输入提现密码',
  components_withdrawCodeDialog_inputCode2: '输入提现密码以继续交易',
  components_withdrawCodeDialog_forgetPassword: '忘记您的密码了吗？',
  components_withdrawCodeDialog_contactService: '请联系在线客服',
  components_withdrawCodeDialog_transfer_success: '转账成功',

  components_quick_login_text: '或以下列方式继续',
  components_quick_login_success: '成功',
  // Error
  error1: '请输入账户',
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
  error20: '请输入微信账号',
  error21: '微信账号不可包含全形字元',
  error22: '微信账号不包含特殊字符或标点符号',
  error23: '微信 字数过长',
  error24: '请输入邮箱',
  error25: '邮箱 格式错误',
  error26: '邮箱 字数过长',
  error27: '请输入Line账号',
  error28: 'Line账号不包含特殊字符或标点符号',
  error29: 'Line账号不可包含全形字元',
  error30: 'Line 字数过长',
  error31: '请输入Zalo账号',
  error32: 'Zalo账号不包含特殊字符或标点符号',
  error33: 'Zalo账号不可包含全形字元',
  error34: 'Zalo字数过长',
  error35: '请输入生日',
  error36: '请输入性别',
  error37: '钱包地址不可包含特殊字元或标点符号',
  error38: '钱包地址不可包含中文',
  error39: '钱包地址必须小于100字元',
};

export default {
  ...lang,
};
