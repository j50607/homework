// 日文语言档
const lang = {
  home: '首頁',
  // Common
  common_numText1: '1',
  common_numText2: '2',
  common_numText3: '3',
  common_numText4: '4',
  common_numText5: '5',
  common_numText6: '6',
  common_numText7: '7',
  common_numText8: '8',
  common_numText9: '9',
  common_numText10: '10',
  common_comingSoon: '乞うご期待',
  common_confirm: '確認',
  common_editedSucceeded: '変更完了',
  common_loginFirst: '先ずはログインから',
  common_reLogin: '再度ログイン',
  common_logoutSucceeded: 'ログアウトしました',
  common_notVerify: '許可されていません',
  common_select_language: '言語を選択してください',
  common_errorSpecialSymbol: '{titleName}は特殊文字または記号を含まない',
  common_errorNoFullWidth: '{titleName}は全角文字を含まない',
  common_errorFormat: '{titleName}は全角文字を含まない',
  common_errorLength: '文字が長すぎます',
  common_errorGender: '性別を選択して下さい',
  common_errorBirth: '誕生日を選択して下さい',
  common_errorInviteCodeLen: '招待コードは数字8文字まで',
  common_errorLenLimitVar: '備考欄の長さは{bankNumRange}文字まで',
  common_errorPhoneLenLimitVar: '携帯番号は必修{phoneLen}番号',
  common_errorPhoneBeginLimit: '携帯番号は必修{phoneBeginning0}~{phoneBeginning1}の1番目',
  common_errorNoEmpty: '備考欄を空白にしないで下さい',
  common_errorEmptyZalo: 'Zaloを入力して下さい',
  common_errorNoFullWidthZalo: 'Zalo IDは全角文字を含まない',
  common_errorEmptyLine: 'LINE IDを入力して下さい',
  common_errorNoFullWidthLine: 'LINE IDは全角文字を含まない',
  common_errorEmptyWechat: 'wechat IDを入力して下さい',
  common_errorNoFullWidthWechat: 'Wechat IDは全角文字を含まない',
  common_errorEmptyQq: 'QQ IDを入力して下さい',
  common_errorNoFullWidthQq: 'QQ ID全角文字を含まない',
  common_errorEmptyWhatsApp: '请输入WhatsApp账号',
  common_errorNoFullWidthWhatsApp: 'WhatsApp账号不可包含全形字元',
  common_errorEmptyEmail: 'メールアドレスを入力して下さい',
  common_errorEmptyPhone: '携帯番号を入力して下さい',
  common_errorEmptyRealName: '本名を入力して下さい',
  common_errorSpecialSymbolRealName: '本名は特殊文字や記号または数字を含まない',
  common_errorNoFullWidthRealName: '本名は全角文字を含まない',
  common_errorLenRealName: '本名は必修{nameLen}文字より短い文字数',
  common_errorEmptyNickName: 'ニックネームを入力して下さい',
  common_errorSpecialSymbolNickName: 'ニックネームは1－8桁の漢字、英語または数字のみ',
  common_errorLenNickName: 'ニックネームは必修8文字より短い文字数',
  common_errorEmptyPwd: 'パスワードを入力して下さい',
  common_errorSpecialSymbolPwd: 'パスワードは特殊文字または記号を含まない',
  common_errorNoChinesePwd: 'パスワードは中国語を含まない',
  common_errorNoFullWidthPwd: 'パスワードは全角文字を含まない',
  common_errorNeedNumAndLetterPwd: 'パスワードは必修英語と数字を含む',
  common_errorLenPwd: 'パスワードは必修6-12文字数まで',
  common_errorEmptyAccount: 'アカウント名を入力して下さい',
  common_errorSpecialSymbolAccount: 'IDは特殊文字または記号を含まない',
  common_errorNoChineseAccount: 'IDは中国語を含まない',
  common_errorNoFullWidthAccount: 'IDは全角文字を含まない',
  common_errorLenAccount: 'IDは必修6－12文字数まで',
  common_errorFormatAccount: 'IDは1桁の数字と1つの英語を必ず入れてください',
  common_errorAtLeastNumberCharacters: '少なくとも{number}桁数，必須1つの大文字と1桁の数字',
  common_errorSamePassword: '新しいパスワードと旧パスワードを同じにしないで下さい，再度入力',
  common_errorPasswordConfirmFailed: '新しいパスワードと確認パスワードが一致しません，再度入力',
  common_errorEmptyBanklName: '请输入银行名称',
  common_errorEmptyPersonId: '请输入证件号',
  common_errorSpecialSymbolBankName: '银行名称不可包含特殊字元或标点符号以及数字',
  common_errorNoFullWidthBanklName: '银行名称不可包含全形字元',
  common_errorNoFullWidthPersonalId: '证件号不可包含全形字元',
  common_errorLenBankName: '银行名称长度必须小于{bankNameLen}字元',
  common_errorLenPersonalId: '证件号长度必须小于{personalIdLen}字元',
  common_errorNoChinesePersonalId: '证件号不可包含中文',
  common_errorSpecialSymbolName: '戶名不可包含特殊字元或标点符号以及数字',
  common_errorNoChineseAddrNo: '邮编号不可包含中文',
  common_errorSpecialSymbolAddrNo: '邮编号不可包含特殊字元或标点符号',
  // Views
  views_notFound_desc: '404ページが見つかりません',
  views_notFound_backToHome: 'ホームへ戻る',
  views_bankcard_nextStep2: '確認',
  views_market_switchLeague: '联盟选择',
  views_market_switchLeague_select_all: '全选',
  views_market_switchLeague_select_not: '反选',
  views_match_tablist_all: '全部賽事',
  views_match_tablist_today: '今日賽事',
  views_match_tablist_tomorrow: '明日賽事',
  views_match_tablist_record: '歷史場次',
  views_market_switchLeague_list_openCount: '已开启{num}场次',
  views_market_switchLeague_noSelected: '请至少选择一个联盟',
  views_market_allLeague_deadLine: '下單截止',

  views_finance_sum_label1: '充值总额',
  views_finance_sum_label2: '提现总额',
  views_finance_popup_label1: '交易类型',
  views_finance_popup_all: '全部',
  views_finance_popup_user_deposit: '充值记录',
  views_finance_popup_user_withdraw: '提现记录',
  views_finance_popup_event_gift: '活动赠送',
  views_finance_popup_return_water_record: '返利记录',
  views_finance_popup_rebate_record: '返点记录',
  views_finance_popup_poundage: '手续费',
  views_finance_popup_wallet_account_change: '钱包变帐',
  views_finance_popup_transfer_record: '转账记录',
  views_finance_popup_profit: 'Profit',
  views_finance_popup_order: '下单',
  views_finance_popup_other: '其他',
  views_finance: '账务明细',
  views_finance_balance: '余额',
  views_profile_transfer_title: '会员互转',
  views_profile_transfer_tabList_subTransfer: '下级转账',
  views_profile_transfer_tabList_superiorTransfer: '上级转账',
  views_profile_transfer_input_placeholder: '输入会员账号搜寻',
  views_profile_transfer_table_title_account: '账号',
  views_profile_transfer_table_title_Superioraccount: '上级账号',
  views_profile_transfer_table_title_money: '金额',
  views_profile_transfer_noWithdrawCode: '尚未绑定钱包\n 页面将跳转至绑定钱包',
  views_profile_transfer_transfer_disable: '功能未开启',
  views_profile_memberTransfer: '会员互转',
  // Components
  components_common_dialog_confirm: '確認',
  components_common_dialog_cancel: '取り消し',
  components_dSearchList_search: '検索',
  components_dHeaderRow_register: '登録',
  components_dLanguageModal_title: '言語',
  components_dSelectDateModal_title: '日期筛选',
  components_dSelectDateModal_today: '今日',
  components_dSelectDateModal_yesterday: '昨日',
  components_dSelectDateModal_sevenDays: '七日',
  components_dSelectDateModal_custom: '自定义',
  components_scroll_allLoaded: 'すべてロード済み',
  components_scroll_pullUpLoading: 'ロード中...',
  components_scroll_pullDownLoading: 'スクロール中',
  components_scroll_continuePullUp: 'スクロールしてロードを続ける',
  components_scroll_refresh: 'リフレッシュ完了',
  components_scroll_pullDownRefresh: 'スクロールしてリフレッシュする',
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
  components_pages_loginAndRegister_loginRegister_register_whatsApp: 'WhatsApp',
  components_pages_loginAndRegister_loginRegister_register_whatsApp_placeholder: '请输入WhatsApp号',
  components_pages_loginAndRegister_loginRegister_register_birthday: '生日',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: '请输入生日',
  components_pages_loginAndRegister_loginRegister_register_gender: '性别',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: '请输入性别',
  components_pages_loginAndRegister_loginRegister_register_gender_male: '男',
  components_pages_loginAndRegister_loginRegister_register_gender_female: '女',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: '未选择',
  components_pages_loginAndRegister_loginRegister_register: '注冊',
  components_pages_match_record_full_and_half: '全场 / 半场',
  components_pages_match_record_dialog_title: '赛事结果',
  components_pages_match_noData: '暂无赛事',
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

  components_match_saleAmount: '販売量',

  error1: '请输入账户',
  error2: '6－12桁の英語と数字',
  error3: 'パスワードが一致しません',
  error4: '正しいメールアドレス位置を入力して下さい',
  error5: '正しい携帯番号を入力して下さい',
  error6: '正しい検証番号を入力して下さい',
  error7: '招待コードを空白にしないで下さい',
  error8: '请输真本名を入力してください实姓名',
  error9: '本名を入力する際は特殊文字又は記号、数字を含まない',
  error10: '本名を入力する際は全角文字を含まない',
  error11: '本名を入力する際は50文字以上を超えないでください',
  error12: 'ニックネームを入力してください',
  error13: 'ニックネームは漢字、アルファベット又は数字の1-8文字内で入力してください',
  error14: 'ニックネームは8文字以内',
  error15: '電話番号を入力してください',
  error16: 'QQ IDを入力',
  error17: 'QQ アカウントは全角文字を含まない',
  error18: 'QQの字数が長すぎです',
  error19: 'QQアカウントに特殊文字や句読点が含まれていません',
  error20: 'Wechat IDを入力',
  error21: 'Wechat アカウントは全角文字を含まない',
  error22: 'WeChatアカウントには、特殊文字や句読点は含まれていません',
  error23: 'Wechatの字数が長すぎです',
  error24: 'メールアドレスを入力',
  error25: 'メールアドレスが間違えています',
  error26: 'メールアドレスが長すぎです',
  error27: '回線アカウント番号を入力してください',
  error28: '行アカウントに特殊文字または句読点が含まれていません',
  error29: 'LINEアカウントに全幅文字を含めることはできません',
  error30: '行の単語数が長すぎます',
  error31: 'Zaloアカウント番号を入力してください',
  error32: 'Zaloアカウントに特殊文字または句読点が含まれていません',
  error33: 'Zaloアカウントに全幅文字を含めることはできません',
  error34: 'Zaloの単語数が長すぎます',
  error35: '誕生日を入力してください',
  error36: '性別を入力してください',
  error37: '钱包地址不可包含特殊字元或标点符号',
  error38: '钱包地址不可包含中文',
  error39: '钱包地址必须小于100字元',
  error40: '请输入WhatsApp账号',
  error41: 'whatsApp账号不可包含全形字元',
  error42: 'whatsApp 字数过长',
  error43: 'whatsApp账号不包含特殊字符或标点符号',
  error44: '6〜12文字の英数字',
  error45: 'アカウントに特殊文字または句読点が含まれていません',
  error46: 'アカウントに全幅文字を含めることはできません',
  error47: '設定完了',
  error48: '設定から始めてください',
  error49: '受け取り成功',
  error50: '受け取り失敗、お問い合わにご連絡ください',
  error51: 'ボーナスが不足しています、ボーナスを取得できません',
};

export default {
  ...lang,
};
