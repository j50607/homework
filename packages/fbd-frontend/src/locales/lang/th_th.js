// 泰文语言档
const lang = {
  home: '首頁',
  // Common
  common_numText1: 'หนึ่ง',
  common_numText2: 'สอง ',
  common_numText3: 'สาม',
  common_numText4: 'สี่',
  common_numText5: 'ห้า',
  common_numText6: 'หก ',
  common_numText7: 'เจ็ด',
  common_numText8: 'แปด',
  common_numText9: 'เก้า ',
  common_numText10: 'สิบ',
  common_comingSoon: 'กรุณารอคอย',
  common_confirm: 'ยืนยัน',
  common_editedSucceeded: 'แก้ไขสำเร็จ',
  common_loginFirst: 'กรุณาล็อกอินก่อน',
  common_reLogin: 'กรุณาล็อกอินใหม่',
  common_logoutSucceeded: 'ออกระบบสำเร็จ',
  common_notVerify: 'ยังไม่ได้อนุญาต',
  common_errorSpecialSymbol: 'ต้องไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอน',
  common_errorNoFullWidth: 'ไม่สามารถมีอักขระแบบเต็ม',
  common_errorFormat: 'รูปแบบผิด',
  common_errorLength: 'จำนวนคำยาวเกินไป',
  common_errorGender: 'กรุณาเลือกเพศ',
  common_errorBirth: 'กรุณาเลือกวันเกิด',
  common_errorInviteCodeLen: 'รหัสเชิญต้องเป็นรหัสหมายเลข 8 หลัก ',
  common_errorLenLimitVar: 'ความยาวของฟิลด์คือ {bankNumRange} อักขระ',
  common_errorPhoneLenLimitVar: 'หมายเลขโทรศัพท์มือถือต้องเป็นรหัส {phoneLen}',
  common_errorPhoneBeginLimit: 'หมายเลขโทรศัพท์มือถือต้องขึ้นต้นด้วย {phoneBeginning0}~{phoneBeginning1}',
  common_errorNoEmpty: 'ช่องนี้ไม่สามารถเว้นว่างได้',
  common_errorEmptyZalo: 'กรุณาป้อน Zalo',
  common_errorNoFullWidthZalo: 'บัญชี Zalo ไม่สามารถมีอักขระแบบเต็ม',
  common_errorEmptyLine: 'กรุณากรอก Line',
  common_errorNoFullWidthLine: 'บัญชีไลน์ไม่สามารถมีอักขระเต็ม',
  common_errorEmptyWechat: 'กรุณาใส่บัญชี wechat',
  common_errorNoFullWidthWechat: 'บัญชี WeChat ไม่สามารถมีอักขระแบบเต็ม',
  common_errorEmptyQq: 'โปรดป้อนบัญชี QQ ของคุณ',
  common_errorNoFullWidthQq: 'บัญชี QQ ไม่สามารถมีอักขระแบบเต็ม',
  common_errorEmptyEmail: 'กรุณากรอกอีเมล์',
  common_errorEmptyPhone: 'กรุณากรอกหมายเลขโทรศัพท์',
  common_errorEmptyRealName: 'กรุณากรอกชื่อจริงของท่าน',
  common_errorSpecialSymbolRealName: 'ชื่อจริงต้องไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอนและตัวเลข',
  common_errorNoFullWidthRealName: 'ชื่อจริงไม่สามารถมีอักขระแบบเต็ม',
  common_errorLenRealName: 'ความยาวของชื่อจริงต้องน้อยกว่า {nameLen} อักขระ',
  common_errorEmptyNickName: 'กรุณาใส่ชื่อเล่น',
  common_errorSpecialSymbolNickName: 'ชื่อเล่นใส่ได้เพียง 1-8 ตัวอักษรจีนและตัวเลขภาษาอังกฤษ',
  common_errorLenNickName: 'ความยาวของชื่อเล่นต้องน้อยกว่า 8 ตัวอักษร',
  common_errorEmptyPwd: 'กรุณาใส่รหัสผ่าน',
  common_errorSpecialSymbolPwd: 'รหัสผ่านต้องไม่มีสัญลักษณ์พิเศษหรือเครื่องหมายวรรคตอน',
  common_errorNoChinesePwd: 'รหัสผ่านต้องไม่มีภาษาจีน',
  common_errorNoFullWidthPwd: 'รหัสผ่านต้องไม่มีอักขระแบบเต็ม',
  common_errorNeedNumAndLetterPwd: 'รหัสผ่านต้องมีภาษาอังกฤษและตัวเลข',
  common_errorLenPwd: 'ความยาวของรหัสผ่านต้องอยู่ระหว่าง 6-12 อักขระ',
  common_errorEmptyAccount: 'กรุณากรอกชื่อผู้ใช้',
  common_errorSpecialSymbolAccount: 'บัญชีต้องไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอน',
  common_errorNoChineseAccount: 'บัญชีต้องไม่มีภาษาจีน',
  common_errorNoFullWidthAccount: 'บัญชีต้องไม่มีอักขระเต็ม',
  common_errorLenAccount: 'ความยาวบัญชีต้องอยู่ระหว่าง 6-12 ตัวอักษร',
  common_errorFormatAccount: 'บัญชีจะต้องมีอย่างน้อยหนึ่งหมายเลขและหนึ่งอังกฤษ',
  common_errorAtLeastNumberCharacters: 'อย่างน้อย {number} อักขระ ต้องมีอักษรตัวพิมพ์ใหญ่ 1 ตัวและตัวเลข 1 ตัว',
  common_errorSamePassword: 'รหัสผ่านเก่าและใหม่ต้องไม่ซ้ำกัน โปรดป้อนใหม่',
  common_errorPasswordConfirmFailed: 'รหัสผ่านใหม่ไม่สอดคล้องกับรหัสผ่านใหม่ที่ยืนยันแล้ว โปรดป้อนใหม่อีกครั้ง',
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
  views_notFound_desc: 'ไม่พบหน้า 404',
  views_notFound_backToHome: 'กลับหน้าหลัก',
  views_bankcard_nextStep2: 'ยืนยัน',
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
  views_finance_popup_return_water_record: '返水记录',
  views_finance_popup_rebate_record: '返点记录',
  views_finance_popup_poundage: '手续费',
  views_finance_popup_wallet_account_change: '钱包变帐',
  views_finance_popup_transfer_record: '转账记录',
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
  components_common_dialog_confirm: 'ยืนยัน',
  components_common_dialog_cancel: 'ยกเลิก',
  components_dSearchList_search: 'ค้นหา',
  components_dHeaderRow_register: 'ลงทะเบียน',
  components_dLanguageModal_title: 'ภาษา',
  components_dSelectDateModal_title: '日期筛选',
  components_dSelectDateModal_today: '今日',
  components_dSelectDateModal_yesterday: '昨日',
  components_dSelectDateModal_sevenDays: '七日',
  components_dSelectDateModal_custom: '自定义',
  components_scroll_allLoaded: 'โหลดทั้งหมด',
  components_scroll_pullUpLoading: 'กำลังโหลด...',
  components_scroll_pullDownLoading: 'กำลังรีเฟรซ',
  components_scroll_continuePullUp: 'ดึงขึ้นและโหลดต่อไป',
  components_scroll_refresh: 'รีเฟรซสำเร็จ',
  components_scroll_pullDownRefresh: 'ดึงลงเพื่อรีเฟรช',
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

  error1: '请输入账户',
  error2: '6~12 ตัวอักษรและตัวเลข',
  error3: 'รหัสผ่านไม่สอดคล้องกัน',
  error4: 'โปรดป้อนตำแหน่งอีเมลที่ถูกต้อง',
  error5: 'กรุณากรอกความยาวของหมายเลขโทรศัพท์มือถือให้ถูกต้อง',
  error6: 'กรุณาใส่รหัสยืนยันที่ถูกต้อง',
  error7: 'รหัสอ้างอิงต้องไม่เว้นว่าง',
  error8: 'กรอกชื่อ-สกุลจริง',
  error9: 'ชื่อ-สกุลจริงต้องไม่มีตัวเลขและอักขระพิเศษ',
  error10: 'ชื่อ-สกุลจริงต้องไม่มีสัญลักษณ์',
  error11: 'ชื่อจริงต้องไม่เกิน 50 ตัวอักษร',
  error12: 'ใส่ชื่อเล่น',
  error13: 'ชื่อผู้เล่นเป็นตัวอักษรหรือเลข 1-8 ตัว',
  error14: 'ความยาวชื่อเล่นต้องไม่เกิน 8 ตัวอักษร',
  error15: 'โปรดใส่เบอร์มือถือ',
  error16: 'โปรดใส่บัญชี QQ',
  error17: 'บัญชี QQห้ามมีตัวพิมพ์ใหญ่',
  error18: 'QQ ข้อความยาวเกิน',
  error19: 'บัญชี QQ ไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอน',
  error20: 'โปรดใส่บัญชี  WeChat',
  error21: 'บัญชี WeChat ห้ามมีตัวพิมพ์ใหญ่',
  error22: 'บัญชี WeChat ไม่มีสัญลักษณ์พิเศษหรือเครื่องหมายวรรคตอน',
  error23: 'Wechat ข้อความยาวเกิน',
  error24: 'ใส่่Email',
  error25: 'Email ภาษาที่ใช้ไม่ถูกต้อง',
  error26: 'Email ข้อความยาวเกิน',

  error27: 'กรุณากรอกหมายเลขบัญชีไลน์',
  error28: 'บัญชีไลน์ไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอน',
  error29: 'บัญชีบรรทัดไม่สามารถมีอักขระแบบเต็มความกว้าง',
  error30: 'จำนวนคำในบรรทัดยาวเกินไป',
  error31: 'โปรดป้อนหมายเลขบัญชี Zalo',
  error32: 'บัญชี Zalo ไม่มีอักขระพิเศษหรือเครื่องหมายวรรคตอน',
  error33: 'บัญชี Zalo ไม่สามารถมีอักขระแบบเต็มความกว้าง',
  error34: 'Zalo จำนวนคำยาวเกินไป',
  error35: 'โปรดป้อนวันเกิด',
  error36: 'โปรดป้อนเพศ',
  error37: '钱包地址不可包含特殊字元或标点符号',
  error38: '钱包地址不可包含中文',
  error39: '钱包地址必须小于100字元',
};

export default {
  ...lang,
};
