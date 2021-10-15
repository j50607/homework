// 繁中语言档
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
  common_comingSoon: '敬請期待',
  common_confirm: '確認',
  common_editedSucceeded: '修改成功',
  common_loginFirst: '請先登錄',
  common_reLogin: '請重新登錄',
  common_logoutSucceeded: '登出成功',
  common_notVerify: '未經授權',
  common_select_language: '請選擇語言',
  common_errorSpecialSymbol: '{titleName}不可包含特殊字元或標點符號',
  common_errorNoFullWidth: '{titleName}不可包含全形字元',
  common_errorFormat: '格式錯誤',
  common_errorLength: '字數過長',
  common_errorGender: '請選擇性別',
  common_errorBirth: '請選擇生日',
  common_errorInviteCodeLen: '邀請碼必須是數字8碼',
  common_errorLenLimitVar: '欄位長度為{bankNumRange}字元',
  common_errorPhoneLenLimitVar: '手機號碼必須是{phoneLen}碼',
  common_errorPhoneBeginLimit: '手機號碼必須是{phoneBeginning0}~{phoneBeginning1}開頭',
  common_errorNoEmpty: '此欄位不可為空值',
  common_errorEmptyZalo: '請輸入Zalo',
  common_errorNoFullWidthZalo: 'Zalo賬號不可包含全形字元',
  common_errorEmptyLine: '請輸入Line',
  common_errorNoFullWidthLine: 'Line賬號不可包含全形字元',
  common_errorEmptyWechat: '請輸入wechat賬號',
  common_errorNoFullWidthWechat: '微信賬號不可包含全形字元',
  common_errorEmptyQq: '請輸入QQ賬號',
  common_errorNoFullWidthQq: 'QQ賬號不可包含全形字元',
  common_errorEmptyEmail: '請輸入Email',
  common_errorEmptyPhone: '請輸入手機號碼',
  common_errorEmptyRealName: '請輸入真實姓名',
  common_errorSpecialSymbolRealName: '真實姓名不可包含特殊字元或標點符號以及數字',
  common_errorNoFullWidthRealName: '真實姓名不可包含全形字元',
  common_errorLenRealName: '真實姓名長度必須小於{nameLen}字元',
  common_errorEmptyNickName: '請輸入昵稱',
  common_errorSpecialSymbolNickName: '昵稱只能輸入1-8位漢字英文數字',
  common_errorLenNickName: '昵稱長度必須小於8字元',
  common_errorEmptyPwd: '請輸入密碼',
  common_errorSpecialSymbolPwd: '密碼不可包含特殊字元或標點符號',
  common_errorNoChinesePwd: '密碼不可包含中文',
  common_errorNoFullWidthPwd: '密碼不可包含全形字元',
  common_errorNeedNumAndLetterPwd: '密碼必須包含英文與數字',
  common_errorLenPwd: '密碼長度必須介於6-12字元',
  common_errorEmptyAccount: '請輸入用戶名',
  common_errorSpecialSymbolAccount: '賬號不可包含特殊字元或標點符號',
  common_errorNoChineseAccount: '賬號不可包含中文',
  common_errorNoFullWidthAccount: '賬號不可包含全形字元',
  common_errorLenAccount: '賬號長度必須介於6-12字元',
  common_errorFormatAccount: '賬號至少須包含一位數字及一位英文',
  common_errorAtLeastNumberCharacters: '至少{number}位字符，必須包含1位大寫字母及1位數字',
  common_errorSamePassword: '新舊密碼不得相同，請重新輸入',
  common_errorPasswordConfirmFailed: '新密碼與確認新密碼輸入不一致，請重新輸入',
  common_errorEmptyBanklName: '請輸入銀行名稱',
  common_errorEmptyPersonId: '請輸入證件號',
  common_errorSpecialSymbolBankName: '銀行名稱不可包含特殊字元或標點符號以及數字',
  common_errorSpecialSymbolName: '戶名不可包含特殊字元或標點符號以及數字',
  common_errorNoFullWidthBanklName: '銀行名稱不可包含全形字元',
  common_errorNoFullWidthPersonalId: '證件號不可包含全形字元',
  common_errorLenBankName: '銀行名稱長度必須小於{bankNameLen}字元',
  common_errorLenPersonalId: '證件號長度必须小於{personalIdLen}字元',
  common_errorNoChinesePersonalId: '證件號不可包含中文',
  common_errorNoChineseAddrNo: '郵遞區號不可包含中文',
  common_errorSpecialSymbolAddrNo: '郵遞區號不可包含特殊字元或标点符号',
  // Views
  views_notFound_desc: '404 page not found',
  views_notFound_backToHome: '回到首頁',
  views_bankcard_nextStep2: '確認',
  views_market_switchLeague: '聯盟選擇',
  views_market_switchLeague_select_all: '全選',
  views_market_switchLeague_select_not: '反選',
  views_match_tablist_all: '全部',
  views_match_tablist_today: '今日',
  views_match_tablist_tomorrow: '明日',
  views_match_tablist_record: '歷史',
  views_market_switchLeague_list_openCount: '已開啟{num}場次',
  views_market_switchLeague_noSelected: '請至少選擇一個聯盟',
  views_market_allLeague_deadLine: '下單截止',

  views_finance_sum_label1: '充值總額',
  views_finance_sum_label2: '提現總額',
  views_finance_popup_label1: '交易類型',
  views_finance_popup_all: '全部',
  views_finance_popup_user_deposit: '充值記錄',
  views_finance_popup_user_withdraw: '提現記錄',
  views_finance_popup_event_gift: '活動贈送',
  views_finance_popup_return_water_record: '返利記錄',
  views_finance_popup_rebate_record: '返點記錄',
  views_finance_popup_poundage: '手續費',
  views_finance_popup_wallet_account_change: '錢包變帳',
  views_finance_popup_transfer_record: '轉賬記錄',
  views_finance_popup_profit: '獲利',
  views_finance_popup_order: '下单',
  views_finance_popup_other: '其他',
  views_finance: '賬務明細',
  views_finance_balance: '餘額',
  views_profile_memberTransfer: '會員互轉',
  views_profile_transfer_title: '會員互轉',
  views_profile_transfer_tabList_subTransfer: '下級轉賬',
  views_profile_transfer_tabList_superiorTransfer: '上級轉賬',
  views_profile_transfer_input_placeholder: '輸入會員帳號搜尋',
  views_profile_transfer_table_title_account: '帳號',
  views_profile_transfer_table_title_Superioraccount: '上級帳號',
  views_profile_transfer_table_title_money: '金額',
  views_profile_transfer_noWithdrawCode: '尚未綁定錢包\n 頁面將跳轉至綁定錢包',
  views_profile_transfer_transfer_disable: '功能未開啟',

  views_profile_title: '我的',
  views_profile_balance: '餘額',
  views_profile_lockWallet: '鎖定錢包',
  views_profile_goDeposit: '我要充值',
  views_profile_goWithdraw: '馬上提現',
  views_profile_transactionRecord: '充提記錄',
  views_profile_walletManagement: '錢包管理',
  views_profile_personalityProfile: '個人資料',
  views_profile_myReport: '我的報表',
  views_profile_myVip: '我的VIP',
  views_profile_share: '全民推廣',
  views_profile_promotion: '優惠活動',
  views_profile_verify: '認證',
  views_profile_service: '客服',
  views_profile_logout: '登出',
  views_profile_logoutSuccess: '登出成功',
  views_profile_selectAvatar: '選擇頭像',
  views_profile_newestMessage: '最新信息',
  views_profile_team: '團隊報表',
  views_profile_team_agent: '代理報表',
  views_profile_team_record: '充提記錄',
  views_profile_team_detail: '下單明細',
  // Components
  components_common_dialog_confirm: '確認',
  components_common_dialog_cancel: '取消',
  components_dSearchList_search: '搜尋',
  components_dHeaderRow_register: '注冊',
  components_dLanguageModal_title: '請選擇語言',
  components_dSelectDateModal_title: '日期篩選',
  components_dSelectDateModal_today: '今日',
  components_dSelectDateModal_yesterday: '昨日',
  components_dSelectDateModal_sevenDays: '七日',
  components_dSelectDateModal_custom: '自定義',
  components_scroll_allLoaded: '已全部加載',
  components_scroll_pullUpLoading: '正在加載...',
  components_scroll_pullDownLoading: '正在刷新',
  components_scroll_continuePullUp: '繼續上拉加載',
  components_scroll_refresh: '刷新成功',
  components_scroll_pullDownRefresh: '下拉刷新',

  components_pages_loginAndRegister_loginRegister_login_user: '賬戶',
  components_pages_loginAndRegister_loginRegister_login_enter_user: '請輸入賬戶',
  components_pages_loginAndRegister_loginRegister_login_password: '密碼',
  components_pages_loginAndRegister_loginRegister_login_enter_password: '請輸入密碼',
  components_pages_loginAndRegister_loginRegister_login_image: '圖形驗證碼',
  components_pages_loginAndRegister_loginRegister_login_enter_image: '請輸入圖形驗證碼',
  components_pages_loginAndRegister_loginRegister_index_loginSuccess: '登錄成功',
  components_pages_loginAndRegister_loginRegister_welcome_back: '歡迎回來',
  components_pages_loginAndRegister_loginRegister_forget: '忘記密碼 ?',
  components_pages_loginAndRegister_loginRegister_login: '登錄',

  components_pages_loginAndRegister_loginRegister_register_new_user: '註冊新賬戶',
  components_pages_loginAndRegister_loginRegister_register_mandatory: '(必填選項)',
  components_pages_loginAndRegister_loginRegister_register_confirm_password: '確認密碼',
  components_pages_loginAndRegister_loginRegister_register_password_again: '請再次輸入密碼',
  components_pages_loginAndRegister_loginRegister_register_agent_code: '邀請碼',
  components_pages_loginAndRegister_loginRegister_register_agent_code_placeholder: '請輸入邀請碼',
  components_pages_loginAndRegister_loginRegister_register_real_name: '真實姓名',
  components_pages_loginAndRegister_loginRegister_register_real_name_placeholder: '請輸入真實姓名',
  components_pages_loginAndRegister_loginRegister_register_nickname: '暱稱',
  components_pages_loginAndRegister_loginRegister_register_nickname_placeholder: '請輸入暱稱',
  components_pages_loginAndRegister_loginRegister_register_phone: '手機號',
  components_pages_loginAndRegister_loginRegister_register_phone_placeholder: '請輸入手機號',
  components_pages_loginAndRegister_loginRegister_register_email: '郵箱',
  components_pages_loginAndRegister_loginRegister_register_email_placeholder: '請輸入郵箱',
  components_pages_loginAndRegister_loginRegister_register_qq: 'QQ號',
  components_pages_loginAndRegister_loginRegister_register_qq_placeholder: '請輸入QQ號',
  components_pages_loginAndRegister_loginRegister_register_weChat: '微信',
  components_pages_loginAndRegister_loginRegister_register_weChat_placeholder: '請輸入微信號',
  components_pages_loginAndRegister_loginRegister_register_line: 'Line',
  components_pages_loginAndRegister_loginRegister_register_line_placeholder: '請輸入Line',
  components_pages_loginAndRegister_loginRegister_register_zalo: 'Zalo',
  components_pages_loginAndRegister_loginRegister_register_zalo_placeholder: '請輸入Zalo',
  components_pages_loginAndRegister_loginRegister_register_whatsApp: 'WhatsApp',
  components_pages_loginAndRegister_loginRegister_register_whatsApp_placeholder: '请输入WhatsApp号',
  components_pages_loginAndRegister_loginRegister_register_birthday: '生日',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: '請輸入生日',
  components_pages_loginAndRegister_loginRegister_register_gender: '性別',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: '請輸入性別',
  components_pages_loginAndRegister_loginRegister_register_gender_male: '男',
  components_pages_loginAndRegister_loginRegister_register_gender_female: '女',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: '未選擇',
  components_pages_loginAndRegister_loginRegister_register: '注冊',
  components_pages_match_record_full_and_half: '全場 / 半場',
  components_pages_match_record_dialog_title: '賽事结果',
  components_pages_match_noData: '暫無賽事',
  components_transferDialog_title: '轉賬',
  components_transferDialog_transfer_account: '轉賬帳號',
  components_transferDialog_transfer_amount: '轉賬金額',
  components_transferDialog_transfer_amount_placeholder: '請輸入金額',
  components_transferDialog_transfer_remark: '備注(限50字)',
  components_transferDialog_transfer_remark_placeholder: '請輸入備注內容',
  components_transferDialog_transfer_confirm: '確認',
  components_transferDialog_transfer_cancel: '取消',
  components_transferDialog_transfer_amount_empty: '轉賬金额不得為0',
  components_transferDialog_transfer_amount_biggerThanBalance: '轉賬金額不得大於餘額',
  components_withdrawCodeDialog_title: '密碼確認',
  components_withdrawCodeDialog_inputCode: '輸入提現密碼',
  components_withdrawCodeDialog_inputCode2: '輸入提現密碼以繼續交易',
  components_withdrawCodeDialog_forgetPassword: '忘記您的密碼了嗎？',
  components_withdrawCodeDialog_contactService: '請聯繫在線客服',
  components_withdrawCodeDialog_transfer_success: '轉賬成功',
  components_quick_login_text: '或以下列方式繼續',
  components_quick_login_success: '成功',

  components_pages_profile_share_title: '好友分享',
  components_pages_profile_share_popup_title: '说明',
  components_pages_profile_share_friend: '好友',
  components_pages_profile_share_placeAnOrder: '下单 100 元',
  components_pages_profile_share_withAllTheFriendsBelow: '与其底下所有好友',
  components_pages_profile_share_theMaximumShareableLimitIs: '可分享上限为',
  components_pages_profile_share_self: '自身',
  components_pages_profile_share_getMoney: '获得 {checkMyselfNP} 元',
  components_pages_profile_share_available: '可获得',
  components_pages_profile_share_exclusiveRecommendationCode: '专属推荐码',
  components_pages_profile_share_sharingLinks: '分享链结',
  components_pages_profile_share_scanCodeSharing: '扫码分享',
  components_pages_profile_share_confirm: '确认',
  components_pages_profile_share_generateInvitationCode: '产生邀请码',
  components_pages_profile_share_resetTheScale: '重新设定比例',
  components_pages_profile_share_shareBonusAvailable: '可领取的分享奖金',
  components_pages_profile_share_receive: '领取',
  components_pages_profile_share_prompt1: '确认后将以新比例计算，且不可再更改',
  components_pages_profile_share_prompt2: '您还可重新设定比例1次',
  components_pages_profile_share_text1: '自身+好友比例合计为',
  components_pages_profile_share_text2: '自身保留的比例越高，可获得的分享奖金额越多但也会造成 好友可设定的分享比例较低，不利扩散裂变，请谨慎设定您 的分享比例。',

  components_match_saleAmount: '銷售量',

  components_pages_profile_team_agent_placeholder1: '輸入會員賬號搜尋',
  components_pages_profile_team_agent_teamInfo: '團隊資訊',
  components_pages_profile_team_agent_teamMembers: '團隊人數',
  components_pages_profile_team_agent_todayAdd: '今日新增',
  components_pages_profile_team_agent_teamRecord: '團隊充提',
  components_pages_profile_team_agent_depositBalance: '充值金額',
  components_pages_profile_team_agent_withdrawBalance: '提現金額',
  components_pages_profile_team_agent_depositFirst: '首充人數',
  components_pages_profile_team_agent_teamTotalBalance: '團隊總餘額',
  components_pages_profile_team_agent_teamBet: '團隊下單',
  components_pages_profile_team_agent_totalAmount: '總金額',
  components_pages_profile_team_agent_profit: '獲利金額',
  components_pages_profile_team_agent_members: '人數',
  components_pages_profile_team_agent_teamProfit: '團隊盈虧',
  components_pages_profile_team_agent_agentTable_account: '賬戶',
  components_pages_profile_team_agent_agentTable_personalAmount: '個人金額',
  components_pages_profile_team_agent_agentTable_teamAmount: '團隊金額',
  components_pages_profile_team_agent_agentTable_lowerNumber: '下級人數',
  components_pages_profile_team_agent_agentTable_superiorAccountNumber: '上級賬號',
  components_pages_profile_team_agent_agentTable_registrationTime: '註冊時間',
  components_pages_profile_team_agent_agentTable_theFirstChargeAmount: '首充金額',
  components_pages_profile_team_agent_agentTable_rechargeTime: '充值時間',
  components_pages_profile_team_agent_agentTable_addMembersToday: '今日新增成員',
  components_pages_profile_team_confirm: '確認',
  components_pages_profile_team_user: '用戶',
  components_pages_profile_team_status: '狀態',
  components_pages_profile_team_time: '時間',
  components_pages_profile_team_amount: '金額',
  components_pages_profile_team_emptyMessage: '查無相關記錄',
  components_pages_profile_team_filterPopup_title: '篩選',
  components_pages_profile_team_filterPopup_status1: '未結算',
  components_pages_profile_team_filterPopup_status2: '已結算',
  components_pages_profile_team_filterPopup_status3: '已撤單',
  components_pages_profile_team_filterPopup_status4: '和局',
  components_pages_profile_team_filterPopup_type: '類型',
  components_pages_profile_team_all: '全部',
  components_pages_profile_team_deposit: '充值',
  components_pages_profile_team_withdraw: '提現',
  components_pages_profile_team_today: '今日',
  components_pages_profile_team_yesterday: '昨日',
  components_pages_profile_team_week: '一周內',
  components_pages_profile_team_withdrawAuditing: '提現審核中',
  components_pages_profile_team_withdrawSuccess: '提現成功',
  components_pages_profile_team_withdrawCancel: '提現取消',
  components_pages_profile_team_withdrawFail: '提現失败',
  components_pages_profile_team_depositAuditing: '充值審核中',
  components_pages_profile_team_depositSuccess: '充值成功',
  components_pages_profile_team_depositFail: '充值失敗',
  components_pages_profile_team_item: '項目',
  components_pages_profile_team_betNo: '訂單編號',
  components_pages_profile_team_betOption: '下單選項',
  components_pages_profile_team_gameTime: '開賽時間',
  components_pages_profile_team_gameDetail: '賽事詳情',
  components_pages_profile_team__gameResult: '賽事結果',
  components_pages_profile_team_bettingType1: '全場',
  components_pages_profile_team_bettingType2: '半場',
  components_pages_profile_team_action1: '展開詳情',
  components_pages_profile_team_action2: '收回詳情',

  error1: '請輸入賬戶',
  error2: '6~12位英數字',
  error3: '密碼不一致',
  error4: '請輸入正確的郵箱位置',
  error5: '請輸入正確的手機號碼長度',
  error6: '請輸入正確的驗證碼',
  error7: '推薦碼不得為空',
  error8: '請輸真實姓名',
  error9: '真實姓名不可包含特殊字元或標點符號以及數字',
  error10: '真實姓名不可包含全形字元',
  error11: '真實姓名必須不超過50字元',
  error12: '請輸入暱稱',
  error13: '暱稱只能輸入1-8位漢字英文數字',
  error14: '暱稱長度必須小於8字元',
  error15: '請輸入手機號碼',
  error16: '請輸入QQ賬號',
  error17: 'QQ賬號不可包含全形字元',
  error18: 'QQ 字數過長',
  error19: 'QQ賬號不包含特殊字符或標點符號',
  error20: '請輸入微信賬號',
  error21: '微信賬號不可包含全形字元',
  error22: '微信賬號不包含特殊字符或標點符號',
  error23: '微信 字數過長',
  error24: '請輸入郵箱',
  error25: '郵箱 格式錯誤',
  error26: '郵箱 字數過長',
  error27: '請輸入Line賬號',
  error28: 'Line賬號不包含特殊字符或標點符號',
  error29: 'Line賬號不可包含全形字元',
  error30: 'Line 字數過長',
  error31: '請輸入Zalo賬號',
  error32: 'Zalo賬號不包含特殊字符或標點符號',
  error33: 'Zalo賬號不可包含全形字元',
  error34: 'Zalo字數過長',
  error35: '請輸入生日',
  error36: '請輸入性別',
  error37: '钱包地址不可包含特殊字符或標點符號',
  error38: '钱包地址不可包含中文',
  error39: '钱包地址必须小于100字元',
  error40: '请输入WhatsApp账号',
  error41: 'whatsApp账号不可包含全形字元',
  error42: 'whatsApp 字数过长',
  error43: 'whatsApp账号不包含特殊字符或标点符号',
  error44: '6-12位英數字',
  error45: '賬戶不包含特殊字符或標點符號',
  error46: '賬戶不可包含全形字元',
  error47: '设定成功',
  error48: '尚未设定无法使用',
  error49: '领取成功',
  error50: '领取失败, 请联系客服',
  error51: '奖金不足, 无法领取奖金',
};

export default {
  ...lang,
};
