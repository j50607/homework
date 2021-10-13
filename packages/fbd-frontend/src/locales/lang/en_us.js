// 英文语言档
const lang = {
  home: 'Home Page',
  // Common
  common_numText1: 'One',
  common_numText2: 'Two',
  common_numText3: 'Three',
  common_numText4: 'Four',
  common_numText5: 'Five',
  common_numText6: 'Six',
  common_numText7: 'Seven',
  common_numText8: 'Eight',
  common_numText9: 'Nine',
  common_numText10: 'Ten',
  common_comingSoon: 'Stay tuned',
  common_confirm: 'Confirm',
  common_all: 'All',
  common_editedSucceeded: 'Successfully modified',
  common_loginFirst: 'Please log in first',
  common_reLogin: 'Please login again',
  common_logoutSucceeded: 'Sign out successfully',
  common_notVerify: 'Unauthorized',
  common_errorSpecialSymbol: '{titleName} must not contain special characters or punctuation marks',
  common_errorNoFullWidth: '{titleName} must not contain full-width characters',
  common_errorFormat: 'Incorrect format',
  common_errorLength: 'Word count is too long',
  common_errorGender: 'Please select your gender',
  common_errorBirth: 'Please select your birthday',
  common_errorInviteCodeLen: 'Invitation code must be 8 digits',
  common_errorLenLimitVar: 'The length of the field is {bankNumRange} characters',
  common_errorPhoneLenLimitVar: 'The mobile number must be {phoneLen} digits',
  common_errorPhoneBeginLimit: 'The mobile number must begin with {phoneBeginning0}~{phoneBeginning1}',
  common_errorNoEmpty: 'This field cannot be empty',
  common_errorEmptyZalo: 'Please enter Zalo',
  common_errorNoFullWidthZalo: 'Zalo account cannot contain full-width characters',
  common_errorEmptyLine: 'Please enter your Line',
  common_errorNoFullWidthLine: 'Line account cannot contain full-width characters',
  common_errorEmptyWechat: 'Please enter your Wechat account\\',
  common_errorNoFullWidthWechat: 'Wechat account cannot contain full-width characters',
  common_errorEmptyQq: 'Please enter you QQ account',
  common_errorNoFullWidthQq: 'QQ account cannot contain full-width characters',
  common_errorEmptyWhatsApp: 'Please enter your Whatsapp account',
  common_errorNoFullWidthWhatsApp: 'Full-width characters are not allowed in Whatsapp account',
  common_errorEmptyEmail: 'Please enter your email',
  common_errorEmptyPhone: 'Please enter your mobile number',
  common_errorEmptyRealName: 'Please enter your real name',
  common_errorEmptyBanklName: 'Please enter the name of your bank',
  common_errorEmptyPersonId: 'Please enter your ID',
  common_errorSpecialSymbolRealName: 'The real name cannot contain special characters, punctuation marks, or numbers',
  common_errorSpecialSymbolBankName: 'Your bank name cannot contain any special characters, punctuation marks, or numbers',
  common_errorSpecialSymbolName: 'Your bank account number cannot contain any special characters, punctuation marks, or numbers',
  common_errorNoFullWidthRealName: 'The real name cannot contain full-width characters',
  common_errorNoFullWidthBanklName: 'Your bank account cannot contain any fullwidth characters',
  common_errorNoFullWidthPersonalId: 'Your ID cannot contain any fullwidth characters',
  common_errorLenRealName: 'The length of the real name must be less than {nameLen} characters',
  common_errorLenBankName: 'The length of your bank account must be under {bankNameLen} characters.',
  common_errorLenPersonalId: 'The length of your ID must be under {personalIdLen} characters.',
  common_errorEmptyNickName: 'Please enter your nickname',
  common_errorSpecialSymbolNickName: 'The nickname can only enter 1-8 characters of Chinese, English, or number',
  common_errorLenNickName: 'The length of the nickname must be less than 8 characters',
  common_errorEmptyPwd: 'Please enter the password',
  common_errorSpecialSymbolPwd: 'The password cannot contain special characters or punctuation marks',
  common_errorNoChinesePwd: 'The password cannot contain Chinese',
  common_errorNoChinesePersonalId: 'Your ID cannot contain any Chinese characters',
  common_errorNoFullWidthPwd: 'The password cannot contain full-width characters',
  common_errorNeedNumAndLetterPwd: 'The password cannot contain English and numbers',
  common_errorLenPwd: 'The length of the password must be between 6-12 characters',
  common_errorEmptyAccount: 'Please enter the user name',
  common_errorSpecialSymbolAccount: 'The account cannot contain special characters or punctuation marks',
  common_errorNoChineseAccount: 'The account cannot contain Chinese',
  common_errorNoChineseAddrNo: 'Your ZIP code cannot contain any Chinese characters',
  common_errorSpecialSymbolAddrNo: 'Your ZIP code cannot contain any special characters, punctuation marks, or numbers',
  common_errorNoFullWidthAccount: 'The account cannot contain full-width characters',
  common_errorLenAccount: 'The length of the account must be between 6-12 characters',
  common_errorFormatAccount: 'The account must contain at least one number and one English character',
  common_errorAtLeastNumberCharacters: 'At least {number} characters, must contain 1 uppercase letter and 1 number',
  common_errorSamePassword: 'The old and new password must not be the same, please enter it again',
  common_errorPasswordConfirmFailed: 'The new password is inconsistent with the confirmed new password, please enter it again',
  common_passwordModifySuccessNeedRelogin: 'Password changed successfully. Please sign in again',
  common_errorDisconnectedAndRefresh: 'Connection interrupted. Please check the status of your internet and refresh your page',
  common_contactService: 'Contact customer service',
  common_modifyContactService: ' Please contact our online customer service in need of making changes',
  common_noData: 'No data available',
  common_day: 'Day',
  common_date: 'Date',
  common_week: 'Week',
  common_month: 'Month',
  common_delete: 'Delete',
  common_select_placeholder: 'Select Contents',
  common_select_language: 'Please select your language',
  common_delete_success: 'Deleted',
  common_edit_success: 'Changes Saved',
  common_count: 'Times',
  common_limit: 'Limit',
  common_modifySuccess: 'Changes Saved',
  common_sendSuccess: 'Sent',
  common_betFailMsg: 'Bet Placement Failed',
  common_copySuccess: 'Successfully copied',
  common_noContenttoCopy: 'No copyable content',
  common_checkDetail: 'check out details',
  common_language: 'Languages',
  // Views
  views_notFound_desc: '404 page not found',
  views_notFound_backToHome: 'Back to the Home page',
  views_betting_host: 'Main',
  views_betting_info_deadline: 'Betting Deadline',
  views_betting_info_deadlineClosed: 'The betting period has ended',
  views_betting_main_empty: 'The bet has concluded',
  views_betting_main_back: 'Return to the market list',
  views_betting_main_type1: 'Full-court',
  views_betting_main_type2: 'Half-court',
  views_betting_main_totalAmount: 'Total Volume',
  views_betting_main_closed: 'Not available for now',
  views_betting_main_fulled: 'The betting limit has been reached',
  views_betting_main_handleBettingText: 'Success',
  views_betting_main_availableAmount: 'Tradable Volume',
  views_betting_main_popup_title: 'Betting Details',
  views_betting_main_popup_option: 'Betting Options',
  views_betting_main_popup_betAmount: 'Betting Amount',
  views_betting_main_popup_betAmountPlaceholder: 'Please enter your betting amount',
  views_betting_main_popup_balance: 'Balance',
  views_betting_main_popup_profit: 'Profit',
  views_betting_main_popup_charge: 'Fees',
  views_betting_main_popup_expectedProfit: 'Expected Profit',
  views_betting_main_popup_btnAction: 'Place a Bet',
  views_betting_main_popup_btnAction2: 'Acquire Data Update',
  views_betting_main_popup_dollars: '¥',
  views_betting_main_popup_notify1: 'Bet amount should be between {minBet} ~ {maxBet}',
  views_betting_main_popup_notify2: 'Bet amount should not be greater than {limitAmount} ',
  views_betting_statistic_popup_title: 'Trading Volume Details',
  views_betting_statistic_popup_sum: 'Total Volume',
  views_betting_statistic_popup_others: 'Others',
  views_betting_statistic_popup_all: 'All',
  views_betting_score: 'score',
  views_betRecord_item_title: 'Betting Records',
  views_betRecord_item_pending: 'Not Settled',
  views_betRecord_item_label1: 'Betting Amount',
  views_betRecord_item_label2: 'Betting Options',
  views_betRecord_item_label3: 'Fees',
  views_betRecord_item_label4: 'Estimated Profit',
  views_betRecord_item_label5: 'Status',
  views_betRecord_item_label6: 'Match Name',
  views_betRecord_item_label7: 'items',
  views_betRecord_item_action1: 'Show more details',
  views_betRecord_item_action2: 'Show fewer details',
  views_bankcard_nextStep2: 'Confirm',
  views_betRecord_sum_label1: 'Trade Amount : ',
  views_betRecord_sum_label2: 'Settled Matches : ',
  views_betRecord_sum_label3: 'Unsettled Matches : ',
  views_betRecord_sum_label4: 'Realized Profit : ',
  views_betRecord_sum_label5: 'Estimated Profit : ',
  views_betRecord_filterPopup_title: 'Filter',
  views_betRecord_filterPopup_label1: 'Status',
  views_betRecord_filterPopup_label2: 'Item Name',
  views_betRecord_filterPopup_status1: 'Not Settled',
  views_betRecord_filterPopup_status2: 'Settled',
  views_betRecord_filterPopup_status3: 'Order canceled',
  views_betRecord_filterPopup_status4: 'Draw',
  views_betRecord_betNo: 'Order number',
  views_betRecord_gameDetail: 'game details',
  views_profile_title: 'Profile',
  views_profile_balance: 'Balance',
  views_profile_lockWallet: 'Holding amount',
  views_profile_goDeposit: 'Deposit',
  views_profile_goWithdraw: 'Withdrawal',
  views_profile_transactionRecord: 'Transaction',
  views_profile_walletManagement: 'Wallet',
  views_profile_personalityProfile: 'Personal Info',
  views_profile_myReport: 'My Reports',
  views_profile_myVip: 'My VIP',
  views_profile_memberTransfer: 'Transfer to other members',
  views_profile_share: 'Promotional',
  views_profile_promotion: 'Special Discount Event',
  views_profile_verify: 'Certified',
  views_profile_service: 'Customer Service',
  views_profile_logout: 'Sign Out',
  views_profile_logoutSuccess: 'You have signed out',
  views_profile_selectAvatar: 'Choose your Portrait',
  views_profile_newestMessage: 'Latest News',
  views_market_title: 'Market List',
  views_market_switchLeague: 'Choose a League',
  views_market_switchLeague_select_all: 'Select all',
  views_market_switchLeague_select_not: 'Invert selection',
  views_match_tablist_all: 'All',
  views_match_tablist_today: 'Today',
  views_match_tablist_tomorrow: 'Tomorrow',
  views_match_tablist_record: 'History',
  views_market_switchLeague_list_openCount: 'You have initiated {num} games.',
  views_market_switchLeague_noSelected: 'Please select at least one league',
  views_market_allLeague_deadLine: 'Betting Deadline',
  views_profile_withdraw: 'Cash Withdrawal',
  views_profile_withdrawWallet: 'Cash Withdrawal Wallet',
  views_profile_withdrawCodeTitle: 'Enter your password for cash withdrawal',
  views_profile_withdrawAmountTitle: 'Enter the amount for the cash withdrawal',
  views_profile_withdrawFreeCount: 'Free Cash Withdrawal Count',
  views_profile_charge: 'General Cash Withdrawal Fees',
  views_profile_forceCharge: 'Compulsory Cash Withdrawal Fees',
  views_profile_amount: 'Total Withdrawal Amount',
  views_profile_realAmount: 'Balance after the Withdrawal',
  views_profile_balanceNotEnough: 'Insufficient Balance',
  views_profile_withdrawAmount: 'Withdrawal Amount',
  views_profile_currency: 'currency',
  views_profile_depositAmount: 'deposit amount',
  views_profile_handlingFee: 'Handling fee',
  views_profile_promotionAmount: 'promotion',
  views_profile_actualAmount: 'Actually receive',
  views_profile_totalAmount: 'Total Amount',
  views_profile_withdrawAmountPlaceholder: 'Please enter the amount for the cash withdrawal',
  views_profile_withdrawCode_notice1: 'Please enter your password for cash withdrawal to continue',
  views_profile_withdrawCode_notice2: 'Please set a 6-digit cash withdrawal password and commit it to memory',
  views_profile_confirmOrder: 'Confirm your order',
  views_profile_orderNotice: 'Please confirm your order details before making the trade',
  views_profile_chainType: 'Mainnet Type',
  views_profile_walletAddress: 'Wallet Address',
  views_home_matchNews: 'Match News',
  views_home_matchHot: 'Popular Matches',
  views_profile_withdrawHandling: 'Processing Withdrawal',
  views_profile_orderNumber: 'Order Number',
  views_profile_time: 'Time',
  views_profile_chooseWallet: 'Select your Wallet',
  views_profile_noWallet: 'You don’t have a bound wallet',
  views_profile_goBind: 'Bound a Wallet',
  views_profile_deposit: 'Deposit',
  views_profile_vip_level_dollars: '',

  // newstart
  views_profile_deposit_cryptoChannel: 'Virtual Currency Deposit Channel',
  views_profile_deposit_checkTeaching: 'View Tutorial',
  views_profile_deposit_chooseChannel: 'Please select a recharge channel',
  views_profile_deposit_noChannel: 'There is no recharge channel available',
  views_profile_deposit_notice: 'Notes',
  views_profile_deposit_depositInfo: 'Deposit Details',
  views_profile_deposit_nextStep: 'Next Step',
  views_profile_deposit_amountPlaceholder: 'Please enter your deposit amount',
  views_profile_deposit_alreadyCompleteTransfer: 'Transfer completed',
  views_profile_deposit_generateDepositAddress: 'Generating a recharge address',
  views_profile_deposit_depositAmount: 'deposit amount',
  views_profile_deposit_hint: 'Tips',
  views_profile_deposit_discount: 'Promotion',
  views_profile_deposit_fee: 'Fees',
  views_profile_deposit_walletAddress: 'Wallet Address',
  views_profile_deposit_hint_one: 'Please provide the required info above to complete the payment',
  views_profile_deposit_hint_two: 'Promotion {number}% ',
  views_profile_deposit_hint_three: 'Handling fee {number}% ',
  views_profile_deposit_hint_four: 'amount that you actually receive is',
  views_profile_deposit_hint_five: 'amount limit should be {min} - {max} ',
  views_profile_deposit_limitAmount: 'amount limit {min} - {max} ',
  views_profile_deposit_limitAmountWarning: 'The amount should be between {min} – {max}. Contact us for further assistance.',
  views_profile_transfer_title: 'Transfer among members',
  views_profile_transfer_tabList_subTransfer: 'Transfer to a subordinate',
  views_profile_transfer_tabList_superiorTransfer: 'Transfer to a superior',
  views_profile_transfer_input_placeholder: 'Please enter member account to search',
  views_profile_transfer_table_title_account: 'Account',
  views_profile_transfer_table_title_Superioraccount: 'Superior account',
  views_profile_transfer_table_title_money: 'amount',
  views_profile_transfer_noWithdrawCode: 'no wallet added\n Redirecting to wallet setting page',
  views_profile_transfer_transfer_disable: 'function not active',
  views_profile_promotion_allActivity: 'All events',
  views_profile_promotion_passedActivity: 'Past events',
  views_profile_promotion_noData: 'No events',
  views_profile_vip_title: 'My VIP',
  views_profile_vip_current_level: 'Current Level',
  views_profile_vip_betLimit: 'Order limit per around/ per day',
  views_profile_vip_level_review: 'Level overview',

  // newend
  views_profile_depositHandling: 'Processing Deposit',
  views_profile_userinfo_title: 'Personal Info',
  views_profile_userinfo_balance: 'Balance',
  views_profile_userinfo_lockWallet: 'Lock my Wallet',
  views_profile_userinfo_nickName: 'Nickname',
  views_profile_userinfo_nickNameHint: 'You can change your nickname up to 2 times',
  views_profile_userinfo_realName: 'Real Name',
  views_profile_userinfo_gender: 'Gender',
  views_profile_userinfo_birthday: 'Birthday',
  views_profile_userinfo_phone: 'Mobile Number',
  views_profile_userinfo_walletManagement: 'Wallet Management',
  views_profile_userinfo_warning: 'All info above can be changed once completed',
  views_profile_userinfo_notSetting: 'Not set yet',
  views_profile_userinfo_qq: 'QQ',
  views_profile_userinfo_wechat: 'WeChat',
  views_profile_userinfo_mailbox: 'Email',
  views_profile_userinfo_line: 'LINE',
  views_profile_userinfo_zalo: 'Zalo',
  views_profile_userinfo_whatsapp: 'WhatsApp',
  views_profile_userinfo_setting: 'Settings',
  views_profile_userinfo_modifyLoginPassword: 'Change Login Password',
  views_profile_userinfo_modifyWithdrawPassword: 'Change Cash Withdrawal Password',
  views_profile_userinfo_woman: 'Female',
  views_profile_userinfo_man: 'Male',
  views_profile_userinfo_noWallet: 'Withdrawal password is set when adding a wallet. There is no added wallet.',
  views_profile_wallet_addWallet: 'Add a Wallet',
  views_profile_wallet_placeholder1: 'Please enter your mainnet type',
  views_profile_wallet_placeholder2: 'Please enter your wallet address',
  views_profile_wallet_walletAddress: 'Wallet Address：',
  views_profile_wallet_deleteNotice: 'Do you want to delete this wallet?',
  views_profile_userinfo_setNickName_currentNickName: 'Current Nickname',
  views_profile_userinfo_setNickName_newNickName: 'New Nickname',
  views_profile_userinfo_setNickName_pleaseEnterNewNickName: 'Please enter your new nickname',
  views_profile_userinfo_setNickName_nickNameWarning: 'Your nickname can be changed up to 2 times. You have changed it {times} times',
  views_profile_userinfo_setNickName_modifyOverLimit: 'You have used up all your nickname-changing chances',
  views_profile_userinfo_setNickName_onlineService: 'Online Customer Service',
  views_profile_userinfo_setNickName_nickNameConflict: 'Your new nickname cannot be the same as your old one',
  views_profile_userinfo_setNickName_pleaseEnterRealName: 'Please enter your real name',
  views_profile_userinfo_setRealName_warning: 'You can’t change it once you’ve completed the entry',
  views_profile_userinfo_setPhone_title: 'Mobile Number',
  views_profile_userinfo_setPhone_pleaseEnterPhoneNumber: 'Please enter your mobile number',
  views_profile_userinfo_setPhone_verifyPhoneNumber: 'Mobile Verification Code',
  views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber: 'Please enter',
  views_profile_userinfo_setPhone_sendVerifyNumber: 'Verification code',
  views_profile_userinfo_setPhone_sec: 'second',
  views_profile_userinfo_setPhone_loginPassword: 'Login Password',
  views_profile_userinfo_setPhone_pleaseEnterLoginPassword: 'Please enter your login password',
  views_profile_userinfo_setContact_account: '{type} account number',
  views_profile_userinfo_setContact_pleaseEnterAccount: 'Please enter your {type} account number',
  views_profile_userinfo_modifyLoginPassword_title: 'Change Login Password',
  views_profile_userinfo_modifyLoginPassword_oldPassword: 'Previous Login Password',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterOldPassword: 'Please enter your previous password',
  views_profile_userinfo_modifyLoginPassword_newPassword: 'New Login Password',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterNewPassword: 'Please enter a new password with 6-12 digits ',
  views_profile_userinfo_modifyLoginPassword_confirmNewPassword: 'Confirm New Login Password',
  views_profile_userinfo_modifyLoginPassword_confirmNewPasswordAgain: 'Please enter your new password again',
  views_profile_userinfo_modifyWithdrawPassword_title: 'Change Cash Withdrawal Password',
  views_profile_userinfo_modifyWithdrawPassword_withdrawCode: 'Cash Withdrawal Password',
  views_profile_userinfo_modifyWithdrawPassword_enterWithdrawCode: 'Enter your old 6-digit currency withdrawal password',
  views_profile_userinfo_modifyWithdrawPassword_newWithdrawCode: 'New Cash Withdrawal Password',
  views_profile_userinfo_modifyWithdrawPassword_settingWithdrawCode: 'Please set a 6-digit currency withdrawal password and commit it to memory',
  views_profile_userinfo_modifyWithdrawPassword_confirmNewWithdrawCode: 'Confirm your new cash withdrawal password',
  views_finance_sum_label1: 'Total Recharge Amount',
  views_finance_sum_label2: 'Total Cash Withdrawal Amount',
  views_finance_popup_label1: 'Trade Type',
  views_finance_popup_all: 'All',
  views_finance_popup_user_deposit: 'deposit history',
  views_finance_popup_user_withdraw: 'withdrawal history',
  views_finance_popup_event_gift: 'Event bonus',
  views_finance_popup_return_water_record: 'bonus history',
  views_finance_popup_rebate_record: 'rebate history',
  views_finance_popup_poundage: 'Handling fee',
  views_finance_popup_wallet_account_change: 'wallet history',
  views_finance_popup_transfer_record: 'Transfer history',
  views_finance_popup_profit: 'Profit',
  views_finance_popup_order: 'order',
  views_finance_popup_other: 'others',
  views_profile_wallet_addSuccess: 'wallet added successfully',
  views_finance: 'Account details',
  views_profile_transaction_deposit: 'deposit',
  views_profile_transaction_withdraw: 'Withdraw',
  views_profile_transaction_orderNumber: 'Order number',
  views_profile_transaction_depositTime: 'deposit time',
  views_profile_transaction_withdrawTime: 'Withdraw time',
  views_profile_transaction_balance: 'balance',
  views_profile_transaction_status: 'status',
  views_profile_transaction_finishTime: 'Transaction finished at',
  views_profile_transaction_primaryNet: 'main net',
  views_profile_transaction_walletAddress: 'wallet address',
  views_profile_transaction_depositAmount: 'Recharge Amount',
  views_profile_transaction_withdrawAmount: 'Withdraw amount',
  views_profile_transaction_promotionAmount: 'promotion amount',
  views_profile_transaction_handlingFee: 'Handling fee',
  views_profile_transaction_generalHandlingFee: 'General handling fee',
  views_profile_transaction_forceHandlingFee: 'forced withdraw fee',
  views_profile_transaction_realAmount: 'Actual receive amount ',
  views_profile_transaction_success: 'transaction successful',
  views_profile_transaction_cancel: 'transaction canceled',
  views_profile_transaction_fail: 'transaction failed',
  views_profile_transaction_refused: 'transaction declined',
  views_profile_transaction_auditing: 'verifying',
  views_profile_transaction_cancelSuccess: 'cancellation successful',
  views_profile_transaction_cancelAuditing: 'cancellation processing',
  views_profile_transaction_empty: 'no history',
  views_finance_balance: 'balance',
  views_profile_transaction_transactionDetail_orderDetail: 'order detail',

  // Components
  components_common_dialog_confirm: 'Confirm',
  components_common_dialog_cancel: 'Cancel',
  components_dSearchList_search: 'Search',
  components_dHeaderRow_register: 'Register',
  components_dLanguageModal_title: 'Language',
  components_dSelectDateModal_title: 'Date Filter',
  components_dSelectDateModal_today: 'Today',
  components_dSelectDateModal_yesterday: 'Yesterday',
  components_dSelectDateModal_sevenDays: '7 Days',
  components_dSelectDateModal_sevenDays2: 'Within 7 Days',
  components_dSelectDateModal_sevenDays3: 'within a week',
  components_dSelectDateModal_custom: 'Customized',
  components_dSelectDateModal_custom2: 'Customized',
  components_scroll_allLoaded: 'Loaded',
  components_scroll_pullUpLoading: 'Loading…',
  components_scroll_pullDownLoading: 'Refreshing',
  components_scroll_continuePullUp: 'Continue to pull up and load',
  components_scroll_refresh: 'Refresh successfully',
  components_scroll_pullDownRefresh: 'Pull down to refresh',
  components_scroll_pullingText: '下拉即可刷新',
  components_scroll_loosingText: '释放即可刷新',
  components_scroll_loadingText: '加载中...',
  components_pages_loginAndRegister_loginRegister_login_user: 'Account',
  components_pages_loginAndRegister_loginRegister_login_enter_user: 'Please enter your account number',
  components_pages_loginAndRegister_loginRegister_login_password: 'Password',
  components_pages_loginAndRegister_loginRegister_login_enter_password: 'Please enter your password',
  components_pages_loginAndRegister_loginRegister_login_image: 'Captcha Code',
  components_pages_loginAndRegister_loginRegister_login_enter_image: 'Please enter the captcha code',
  components_pages_loginAndRegister_loginRegister_index_loginSuccess: 'You have successfully signed in',
  components_pages_loginAndRegister_loginRegister_index_registerSuccess: 'You have successfully registered',
  components_pages_loginAndRegister_loginRegister_welcome_back: 'Welcome back',
  components_pages_loginAndRegister_loginRegister_forget: 'Forget the password?',
  components_pages_loginAndRegister_loginRegister_login: 'Sign in',

  components_pages_loginAndRegister_loginRegister_register_new_user: 'Register a new account',
  components_pages_loginAndRegister_loginRegister_register_mandatory: '(Required field)',
  components_pages_loginAndRegister_loginRegister_register_confirm_password: 'Confirm Password',
  components_pages_loginAndRegister_loginRegister_register_password_again: 'Please enter your password again',
  components_pages_loginAndRegister_loginRegister_register_agent_code: 'Invitation Code',
  components_pages_loginAndRegister_loginRegister_register_agent_code_placeholder: 'Please enter an invitation code',
  components_pages_loginAndRegister_loginRegister_register_real_name: 'Real Name',
  components_pages_loginAndRegister_loginRegister_register_real_name_placeholder: 'Please enter your real name',
  components_pages_loginAndRegister_loginRegister_register_nickname: 'Nickname',
  components_pages_loginAndRegister_loginRegister_register_nickname_placeholder: 'Please enter your nickname',
  components_pages_loginAndRegister_loginRegister_register_phone: 'Mobile Number',
  components_pages_loginAndRegister_loginRegister_register_phone_placeholder: 'Please enter your mobile number',
  components_pages_loginAndRegister_loginRegister_register_email: 'Email',
  components_pages_loginAndRegister_loginRegister_register_email_placeholder: 'Please enter your email address',
  components_pages_loginAndRegister_loginRegister_register_qq: 'QQ',
  components_pages_loginAndRegister_loginRegister_register_qq_placeholder: 'Please enter your QQ number',
  components_pages_loginAndRegister_loginRegister_register_weChat: 'WeChat',
  components_pages_loginAndRegister_loginRegister_register_weChat_placeholder: 'Please enter your WeChat account number',
  components_pages_loginAndRegister_loginRegister_register_line: 'LINE',
  components_pages_loginAndRegister_loginRegister_register_line_placeholder: 'Please enter your LINE account',
  components_pages_loginAndRegister_loginRegister_register_zalo: 'Zalo',
  components_pages_loginAndRegister_loginRegister_register_whatsApp: 'Whatsapp',
  components_pages_loginAndRegister_loginRegister_register_whatsApp_placeholder: 'Please enter your Whatsapp account',
  components_pages_loginAndRegister_loginRegister_register_zalo_placeholder: 'Please enter your Zalo account',
  components_pages_loginAndRegister_loginRegister_register_birthday: 'birthday',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: 'Please enter your birthday',
  components_pages_loginAndRegister_loginRegister_register_gender: 'Gender',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: 'Please enter your gender',
  components_pages_loginAndRegister_loginRegister_register_gender_male: 'Male',
  components_pages_loginAndRegister_loginRegister_register_gender_female: 'Female',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: 'this field is required',
  components_pages_loginAndRegister_loginRegister_register: 'Register',
  components_pages_match_record_full_and_half: 'Full / Half',
  components_pages_match_record_dialog_title: 'Match Results',
  components_pages_match_noData: 'No match for now',
  components_pages_profile_transaction: 'transaction history',
  components_footer_home: 'Home Page',
  components_footer_match: 'Market',
  components_footer_record: 'Records',
  components_footer_finance: 'Financial',
  components_footer_profile: 'Profile',
  components_match_betAmount: 'Total Sales',
  components_match_saleAmount: 'Sale amount',
  components_datepicker_chooseDate: 'Please select the date',
  components_datepicker_dateRange: 'Beginning time cannot be later than ending time',
  components_transferDialog_title: 'Transfer',
  components_transferDialog_transfer_account: 'Transfer account',
  components_transferDialog_transfer_amount: 'Transfer amount ',
  components_transferDialog_transfer_amount_placeholder: 'Please enter the amount',
  components_transferDialog_transfer_remark: 'Notes (50 characters)',
  components_transferDialog_transfer_remark_placeholder: 'Please enter your note',
  components_transferDialog_transfer_confirm: 'confirm',
  components_transferDialog_transfer_cancel: 'cancel',
  components_transferDialog_transfer_amount_empty: 'Transfer amount cannot be 0',
  components_transferDialog_transfer_amount_biggerThanBalance: 'Transfer amount cannot be greater than balance',
  components_withdrawCodeDialog_title: 'Confirm your password',
  components_withdrawCodeDialog_inputCode: 'Please enter your withdrawal password',
  components_withdrawCodeDialog_inputCode2: 'Please enter your withdrawal password to continue',
  components_withdrawCodeDialog_forgetPassword: 'Forgot password?',
  components_withdrawCodeDialog_contactService: 'Please contact online customer service',
  components_withdrawCodeDialog_transfer_success: 'Transfer successful',
  components_quick_login_text: 'or continue with…',
  components_quick_login_success: 'Successful',
  components_pages_components_vip_holdLevel_betAmount: 'current level order amount',
  components_pages_components_vip_checkRecord_detail: 'Details',
  components_pages_components_vip_checkRecord_receive: 'cash history',
  components_pages_components_vip_vip1Description: 'Upgrade your VIP level to get higher order limit and better bonus ',
  components_pages_components_vip_bet_maxLimit_perRound: 'Order limit per round',
  components_pages_components_vip_bet_maxLimit_perDay: 'Order limit per day',
  components_pages_components_vip_bet_return_profit: 'Return profit',
  components_pages_components_vip_bet_evenlop: 'negative profit envelop',
  components_pages_components_vip_check: 'Review privilege',
  components_pages_components_vip_checkRecord: 'history',
  components_pages_components_vip_distance: 'Distance to the next level',
  components_pages_components_vip_nextLevel_holdLevel_betAmount: 'Order amount to next level',
  components_pages_components_vip_nextLevel_holdLevel_deadLine: 'date',
  components_pages_components_vip_total_deposit: 'Total deposit amount',
  components_pages_components_vip_total_betAmount: 'Total order amount',
  components_pages_components_vip_privilege: 'privilege overview',
  components_pages_components_vip_privilege_level: 'level',
  components_pages_components_vip_perDayLimitHold: 'limit per day maintains at',
  components_pages_components_vip_perRoundLimitHold: 'limit per round maintains at',
  components_pages_components_vip_rebateRateHold: 'order bonus maintains at',
  components_pages_components_vip_envelopHold: 'negative profit maintains at',
  components_pages_components_vip_takeProfit: 'Cash out',
  components_pages_components_vip_perpare_takeProfit: 'bonus ready to be withdrawn',
  components_pages_components_vip_openDetail: 'Open details',
  components_pages_components_vip_returnProfit_description1: 'Bonus is given base on your VIP level when placing the order',
  components_pages_components_vip_returnProfit_description2: 'Formula: sum of the order* current VIP level bonus',
  components_pages_components_vip_envelop_alradyTake: 'already received reward',
  components_pages_components_vip_envelop_description1: 'Formula: net negative profit * current VIP level negative profit bonus',
  components_pages_components_vip_envelop_description2: 'Renew and send every 24 hours automatically',
  components_pages_components_vip_envelop_description3: 'The sum of negative profit envelop is calculated base on the VIP level when closing',
  components_pages_components_vip_review_detailDailog: 'level  requirements',
  components_pages_components_vip_detailDailog_description: 'Place  <span class="text-color">{betSum}</span> orders within 30 days to stay at level <span class="text-color">VIP{level}</span>. Otherwise, your level will be moved down to  <span class="text-color">VIP{preLevel}</span>  ',
  components_pages_components_vip_detailDailog_description2: ' {deadLine} days left.  {alreadyBetSum} orders have been placed',
  components_pages_components_vip_detailDailog_description3: 'Place <span class="text-color">{betSum}</span>  orders within 30 days to get promoted to <span class="text-color">VIP{level}</span>.',
  components_pages_components_vip_detailDailog_description4: '{deadLine} day(s) left. {alreadyBetSum} order(s) have been placed.',
  components_pages_components_vip_detailDailog_description5: 'Total deposit amount since you registered, <span class="text-color">{betSum}</span> left. You will be able to level up to <span class="text-color">VIP{level}</span>.',
  components_pages_components_vip_detailDailog_description6: 'Total order amount since you registered, <span class="text-color">{betSum}</span> left. You will be able to level up to <span class="text-color">VIP{level}</span>.',
  components_pages_components_vip_returnProfit_table_title_time: 'Cash out date',
  components_pages_components_vip_returnProfit_table_title_money: 'Cash out amount',
  components_pages_components_vip_envelop_detail: 'Details',
  components_pages_components_vip_envelop_noData: 'no available record',
  components_pages_components_vip_envelop_detail_date: 'date',
  components_pages_components_vip_envelop_detail_negative_profit: 'net negative profit',
  components_pages_components_vip_envelop_detail_returnProfit_rate: 'return profit rate',
  components_pages_components_vip_envelop_detail_amount: 'amount',
  components_pages_components_vip_envelop_reveice_record: 'Cash out history',
  components_pages_components_vip_envelop_reveice_success: 'Cash out successful',
  components_pages_components_vip_remedyEnable_false: 'Not available',

  components_pages_profile_share_title: 'Share with friends',
  components_pages_profile_share_popup_title: 'Explanation',
  components_pages_profile_share_friend: 'Friends',
  components_pages_profile_share_placeAnOrder: 'Order for 100',
  components_pages_profile_share_withAllTheFriendsBelow: 'And all friends below',
  components_pages_profile_share_theMaximumShareableLimitIs: 'Share limit is',
  components_pages_profile_share_self: 'You',
  components_pages_profile_share_getMoney: 'Obtain {checkMyselfNP} (USDT)',
  components_pages_profile_share_available: 'You can obtain',
  components_pages_profile_share_exclusiveRecommendationCode: 'Invitation code',
  components_pages_profile_share_sharingLinks: 'Share links',
  components_pages_profile_share_scanCodeSharing: 'Share QR codes',
  components_pages_profile_share_confirm: 'Confirm',
  components_pages_profile_share_generateInvitationCode: 'Generate invitation code',
  components_pages_profile_share_resetTheScale: 'Proportion reset',
  components_pages_profile_share_shareBonusAvailable: 'Claimable share bonus',
  components_pages_profile_share_receive: 'Claim',
  components_pages_profile_share_prompt1: "It'll recalculate with new proportion after confirmation. Adjustment is not allowed.",
  components_pages_profile_share_prompt2: 'You can change the proportion setting 1 more time.',
  components_pages_profile_share_text1: 'Total proportion of you and your friends',
  components_pages_profile_share_text2: 'The higher the proportion of self-retention, the greater the amount of sharing prizes that can be obtained, but it will also cause a lower sharing proportion that can be set by friends, which is not good for diffusion and fission. Please set your sharing proportion carefully.',
  components_pages_components_vip_envelop_reveiced: 'Received',
  // Error
  error1: 'Please enter your account number',
  error2: '6~12 characters of English and number',
  error3: 'Inconsistent password',
  error4: 'Please enter the correct email location',
  error5: 'Please enter the correct length of mobile number',
  error6: 'Please enter the correct verification code',
  error7: 'Invitation code cannot be empty',
  error8: 'Please enter your real name',
  error9: 'Real name cannot contain special characters or punctuation marks and numbers',
  error10: 'Real name cannot contain full-width characters',
  error11: 'Your real name cannot contain more than 50 letters',
  error12: 'Please enter a nickname',
  error13: 'Nickname can only enter 1-8 Chinese characters and English numbers',
  error14: 'The length of the nickname must be less than 8 characters',
  error15: 'Please enter the phone number',
  error16: 'Please enter your QQ account',
  error17: 'QQ account cannot contain full-width characters',
  error18: 'QQ character count is too long',
  error19: 'QQ account does not contain special characters or punctuation',
  error20: 'Please enter the wechat account',
  error21: 'WeChat account cannot contain full-width characters',
  error22: 'WeChat account does not contain special characters or punctuation marks',
  error23: 'Wechat is too long',
  error24: 'Please enter Email',
  error25: 'Email format error',
  error26: 'Email word count is too long',
  error27: 'Please enter your LINE account',
  error28: 'LINE account cannot contain special characters or punctuationZ',
  error29: 'LINE account cannot contain full-width characters',
  error30: 'LINE account is too long',
  error31: 'Please enter your Zalo account',
  error32: 'Zola account cannot contain special characters or punctuationZ',
  error33: 'Zalo account cannot contain full-width characters',
  error34: 'Zalo is too long',
  error35: 'Please enter your birthday',
  error36: 'Please enter your gender',
  error37: 'Wallet address cannot contain special characters or punctuation',
  error38: 'Wallet address cannot contain Chinese characters',
  error39: 'Wallet address should be shorter than 100 letters',
  error40: 'Please enter your Whatsapp account',
  error41: 'Whatsapp account cannot contain full-width characters',
  error42: 'Whatsapp account is too long',
  error43: 'Whatsapp account cannot contain special characters or punctuation',
  error44: '6-12 digits letters or numbers',
  error45: 'Account number cannot contain special characters or punctuation',
  error46: 'Account number cannot contain full-width characters',
  error47: 'Setup successful',
  error48: 'It has not been set and cannot be used',
  error49: 'Received successfully',
  error50: 'Receipt failed, please contact customer service',
  error51: 'Insufficient bonus, unable to claim bonus',
};

export default {
  ...lang,
};
