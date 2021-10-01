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
  common_errorEmptyWhatsApp: '请输入WhatsApp账号',
  common_errorNoFullWidthWhatsApp: 'WhatsApp账号不可包含全形字元',
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
  common_date: 'Day',
  common_week: 'Week',
  common_month: 'Month',
  common_delete: 'Delete',
  common_select_placeholder: 'Select Contents',
  common_delete_success: 'Deleted',
  common_edit_success: 'Changes Saved',
  common_count: 'Times',
  common_limit: 'Limit',
  common_modifySuccess: 'Changes Saved',
  common_sendSuccess: 'Sent',
  common_betFailMsg: 'Bet Placement Failed',
  common_copySuccess: 'Copy successfully',
  common_noContenttoCopy: 'There is no content to copy',
  common_checkDetail: 'View details',
  common_language: 'Language',
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
  views_betting_main_popup_notify1: 'The amount of the bet must be between {minBet} ~ {maxBet}',
  views_betting_main_popup_notify2: 'The amount of the bet must not be greater than {limitAmount}',
  views_betting_statistic_popup_title: 'Trading Volume Details',
  views_betting_statistic_popup_sum: 'Total Volume',
  views_betting_statistic_popup_others: 'Others',
  views_betting_statistic_popup_all: 'All',
  views_betRecord_item_title: 'Betting Records',
  views_betRecord_item_pending: 'Not Settled',
  views_betRecord_item_label1: 'Betting Amount',
  views_betRecord_item_label2: 'Betting Options',
  views_betRecord_item_label3: 'Fees',
  views_betRecord_item_label4: 'Estimated Profit',
  views_betRecord_item_label5: 'Status',
  views_betRecord_item_label6: 'Match Name',
  views_betRecord_item_label7: 'Item Name',
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
  views_betRecord_filterPopup_status3: 'The order has been delete',
  views_betRecord_filterPopup_status4: 'Draw',
  views_betRecord_betNo: 'Order number',
  views_betRecord_gameDetail: 'Event details',
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
  views_profile_memberTransfer: 'Member transfer',
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
  views_match_tablist_all: 'All Matches',
  views_match_tablist_today: 'Today’s Matches',
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
  views_profile_currency: 'Currency',
  views_profile_depositAmount: 'Deposit amount',
  views_profile_handlingFee: 'Handling fees',
  views_profile_promotionAmount: 'Promotion',
  views_profile_actualAmount: 'Actual payment',
  views_profile_totalAmount: 'Total Amount',
  views_profile_withdrawAmountPlaceholder: 'Please enter the amount for the cash withdrawal',
  views_profile_withdrawCode_notice1: 'Please enter your password for cash withdrawal to continue',
  views_profile_withdrawCode_notice2: 'Please set a 6-digit cash withdrawal password and commit it to memory',
  views_profile_confirmOrder: 'Confirm your bet',
  views_profile_orderNotice: 'Please confirm your betting details before making the trade',
  views_profile_chainType: 'Mainnet Type',
  views_profile_walletAddress: 'Wallet Address',
  views_home_matchNews: 'Match News',
  views_home_matchHot: 'Popular Matches',
  views_profile_withdrawHandling: 'Processing Withdrawals',
  views_profile_orderNumber: 'Betting Number',
  views_profile_time: 'Time',
  views_profile_chooseWallet: 'Select your Wallet',
  views_profile_noWallet: 'You don’t have a bound wallet',
  views_profile_goBind: 'Bound a Wallet Now',
  views_profile_deposit: 'Deposit',

  // newstart
  views_profile_deposit_cryptoChannel: 'Virtual Currency Deposit Channel',
  views_profile_deposit_checkTeaching: 'View Tutorial',
  views_profile_deposit_chooseChannel: 'Please select a recharge channel',
  views_profile_deposit_noChannel: 'There is no recharge channel available',
  views_profile_deposit_notice: 'Notes',
  views_profile_deposit_depositInfo: 'Deposit Details',
  views_profile_deposit_nextStep: 'Next Step',
  views_profile_deposit_amountPlaceholder: 'Please enter your deposit amount',
  views_profile_deposit_alreadyCompleteTransfer: 'Remittance Completed',
  views_profile_deposit_generateDepositAddress: 'Generating a recharge address',
  views_profile_deposit_depositAmount: 'Deposit Amount',
  views_profile_deposit_hint: 'Hint',
  views_profile_deposit_discount: 'Promotion',
  views_profile_deposit_fee: 'Fees',
  views_profile_deposit_walletAddress: 'Wallet Address',
  views_profile_deposit_hint_one: 'Please provide the required info above to complete the payment',
  views_profile_deposit_hint_two: 'Promotion {number}%',
  views_profile_deposit_hint_three: 'Fees {number}%',
  views_profile_deposit_hint_four: 'The actual amount of the payment is',
  views_profile_deposit_hint_five: 'The  limit amount  must  be {min} - {max}',
  views_profile_deposit_limitAmount: 'The  limit amount will  be {min} - {max} ',
  views_profile_deposit_limitAmountWarning: 'The amount must be between {min} - {max}.If you have any questions, please contact customer service.',
  views_profile_transfer_title: 'Member transfer',
  views_profile_transfer_tabList_subTransfer: 'Subordinate transfer',
  views_profile_transfer_tabList_superiorTransfer: 'Superior transfer',
  views_profile_transfer_input_placeholder: 'Enter the member account search',
  views_profile_transfer_table_title_account: 'Account',
  views_profile_transfer_table_title_Superioraccount: 'Superior transfer',
  views_profile_transfer_table_title_money: 'Amount',
  views_profile_transfer_noWithdrawCode: 'You haven’t bound your wallet,\n the page jumps to the wallet binding',
  views_profile_transfer_transfer_disable: 'The function is not turned on',
  views_profile_promotion_allActivity: '全部活动',
  views_profile_promotion_passedActivity: '过往活动',
  views_profile_promotion_noData: '暂无活动',
  views_profile_vip_title: '我的VIP',
  views_profile_vip_current_level: '当前等级',
  views_profile_vip_betLimit: '单场/单日下单上限',
  views_profile_vip_level_review: '等级浏览',

  // newend
  views_profile_depositHandling: 'Processing Deposits',
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
  views_profile_userinfo_noWallet: 'The withdrawal password is set when the wallet binding,you haven’t bound your wallet',
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
  views_profile_userinfo_modifyLoginPassword_pleaseEnterNewPassword: 'Please enter your new password',
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
  views_finance_popup_user_deposit: 'Member Recharge',
  views_finance_popup_user_withdraw: 'Member Cash Withdrawal',
  views_finance_popup_event_gift: 'Event gift',
  views_finance_popup_return_water_record: 'Reward points record',
  views_finance_popup_rebate_record: 'Rebate record',
  views_finance_popup_poundage: 'Fees',
  views_finance_popup_wallet_account_change: 'Wallet changing',
  views_finance_popup_transfer_record: 'Transfer record',
  views_finance_popup_profit: 'Profit',
  views_finance_popup_order: 'Place an order',
  views_finance_popup_other: 'Others',
  views_profile_wallet_addSuccess: 'Wallet has been added successfully',
  views_finance: 'Account details',
  views_profile_transaction_deposit: 'Recharge',
  views_profile_transaction_withdraw: 'Withdrawal',
  views_profile_transaction_orderNumber: 'Betting Number',
  views_profile_transaction_depositTime: 'Deposit Time',
  views_profile_transaction_withdrawTime: 'Withdrawal Time',
  views_profile_transaction_balance: 'Balance',
  views_profile_transaction_status: 'Status',
  views_profile_transaction_finishTime: 'The time of the transaction was completed',
  views_profile_transaction_primaryNet: 'Mainnet',
  views_profile_transaction_walletAddress: 'Wallet Address',
  views_profile_transaction_depositAmount: 'Recharge Amount',
  views_profile_transaction_withdrawAmount: 'Withdrawal Amount',
  views_profile_transaction_promotionAmount: 'Discount amount',
  views_profile_transaction_handlingFee: 'Handling fees',
  views_profile_transaction_generalHandlingFee: 'General handling fees',
  views_profile_transaction_forceHandlingFee: 'Compulsory Cash Withdrawal Fees',
  views_profile_transaction_realAmount: 'Actual payment',
  views_profile_transaction_success: 'The transaction was successful',
  views_profile_transaction_cancel: 'The transaction was cancelled',
  views_profile_transaction_fail: 'The transaction failed',
  views_profile_transaction_refused: 'The transactio was rejected',
  views_profile_transaction_auditing: 'Under review',
  views_profile_transaction_cancelSuccess: 'The cancellation was successful',
  views_profile_transaction_cancelAuditing: 'The cancellation is still under review',
  views_profile_transaction_empty: 'No data available',
  views_finance_balance: 'Balance',
  views_profile_transaction_transactionDetail_orderDetail: 'Order detail',

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
  components_dSelectDateModal_sevenDays3: 'Within 7 Days',
  components_dSelectDateModal_custom: 'Customized',
  components_dSelectDateModal_custom2: 'Customized',
  components_scroll_allLoaded: 'Loaded',
  components_scroll_pullUpLoading: 'Loading…',
  components_scroll_pullDownLoading: 'Refreshing',
  components_scroll_continuePullUp: 'Continue to pull up and load',
  components_scroll_refresh: 'Refresh successfully',
  components_scroll_pullDownRefresh: 'Pull down to refresh',
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
  components_pages_loginAndRegister_loginRegister_register_line: 'Line',
  components_pages_loginAndRegister_loginRegister_register_line_placeholder: 'Please enter your Line account number',
  components_pages_loginAndRegister_loginRegister_register_zalo: 'Zalo',
  components_pages_loginAndRegister_loginRegister_register_whatsApp: 'WhatsApp',
  components_pages_loginAndRegister_loginRegister_register_whatsApp_placeholder: '请输入WhatsApp号',
  components_pages_loginAndRegister_loginRegister_register_zalo_placeholder: 'Please enter your Zalo account number',
  components_pages_loginAndRegister_loginRegister_register_birthday: 'Birthday',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: 'Please enter the birthday',
  components_pages_loginAndRegister_loginRegister_register_gender: 'Gender',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: 'Please enter the gender',
  components_pages_loginAndRegister_loginRegister_register_gender_male: 'Male',
  components_pages_loginAndRegister_loginRegister_register_gender_female: 'Female',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: 'Not selected',
  components_pages_loginAndRegister_loginRegister_register: 'Register',
  components_pages_match_record_full_and_half: 'Full / Half',
  components_pages_match_record_dialog_title: 'Match Results',
  components_pages_match_noData: 'No match for now',
  components_pages_profile_transaction: 'Transaction',
  components_footer_home: 'Home Page',
  components_footer_match: 'Market',
  components_footer_record: 'Records',
  components_footer_finance: 'Financial',
  components_footer_profile: 'Profile',
  components_match_betAmount: 'Total Sales',
  components_datepicker_chooseDate: 'Choose date',
  components_datepicker_dateRange: 'The start time must not be greater than the end time',
  components_transferDialog_title: 'Transfer',
  components_transferDialog_transfer_account: 'Transfer account',
  components_transferDialog_transfer_amount: 'Transfer amount',
  components_transferDialog_transfer_amount_placeholder: 'Please enter the amount',
  components_transferDialog_transfer_remark: 'Remarks (limited to 50 words)',
  components_transferDialog_transfer_remark_placeholder: 'Please enter the content of remark',
  components_transferDialog_transfer_confirm: 'Confirm',
  components_transferDialog_transfer_cancel: 'Cancel',
  components_transferDialog_transfer_amount_empty: 'The transfer amount must not be 0',
  components_transferDialog_transfer_amount_biggerThanBalance: 'The amount transferred must not be greater than the balance',
  components_withdrawCodeDialog_title: 'Password confirm',
  components_withdrawCodeDialog_inputCode: 'Enter your password for cash withdrawal',
  components_withdrawCodeDialog_inputCode2: 'Please enter your password for cash withdrawal to continue',
  components_withdrawCodeDialog_forgetPassword: 'Forget the password?',
  components_withdrawCodeDialog_contactService: 'Please contact customer service',
  components_withdrawCodeDialog_transfer_success: 'Transfer succeed',
  components_quick_login_text: 'Continue in the following way',
  components_quick_login_success: 'success',
  components_pages_components_vip_holdLevel_betAmount: '当前保级下单量',
  components_pages_components_vip_checkRecord_detail: '详情',
  components_pages_components_vip_checkRecord_receive: '领取记录',
  components_pages_components_vip_vip1Description: '提升您的VIP等级，提高下单上限，更多 下单返利及负利红包等您拿！',
  components_pages_components_vip_bet_maxLimit_perRound: '单场下单上限',
  components_pages_components_vip_bet_maxLimit_perDay: '单日下单上限',
  components_pages_components_vip_bet_return_profit: '下单返利',
  components_pages_components_vip_bet_evenlop: '负利红包',
  components_pages_components_vip_check: '查看特权',
  components_pages_components_vip_checkRecord: '查看记录',
  components_pages_components_vip_distance: '距离',
  components_pages_components_vip_nextLevel_holdLevel_betAmount: '晋级保级下单量',
  components_pages_components_vip_nextLevel_holdLevel_deadLine: '日',
  components_pages_components_vip_total_deposit: '总充值量',
  components_pages_components_vip_total_betAmount: '总下单量',
  components_pages_components_vip_privilege: '特权详情',
  components_pages_components_vip_privilege_level: '等級',
  components_pages_components_vip_perDayLimitHold: '单日上限维持',
  components_pages_components_vip_perRoundLimitHold: '单场上限维持',
  components_pages_components_vip_rebateRateHold: '下单返利维持',
  components_pages_components_vip_envelopHold: '负利红包维持',
  components_pages_components_vip_takeProfit: '领取',
  components_pages_components_vip_perpare_takeProfit: '待领取返利',
  components_pages_components_vip_openDetail: '展开资讯',
  components_pages_components_vip_returnProfit_description1: '依照下單當時的VIP等級給予返利',
  components_pages_components_vip_returnProfit_description2: '計算方式 : 下單金額*當前等級返利%',
  components_pages_components_vip_envelop_alradyTake: '已领取回馈',
  components_pages_components_vip_envelop_description1: '計算方式 : 24小時內淨負利 * 當前等級負利反饋%',
  components_pages_components_vip_envelop_description2: '24小時結算一次，自動發送',
  components_pages_components_vip_envelop_description3: '依照結算時的VIP等級計算負利紅包金額',
  components_pages_components_vip_review_detailDailog: '等級需求',
  components_pages_components_vip_detailDailog_description: '您30天内须完成 <span class="text-secondary">{betSum}</span> 下单量才能保留等级 <span class="text-secondary">VIP{level}</span>，否则将会被调整至等级 <span class="text-secondary">VIP{preLevel}</span> 。',
  components_pages_components_vip_detailDailog_description2: '尚余 {deadLine} 天，您已完成 {alreadyBetSum} 下单量。',
  components_pages_components_vip_detailDailog_description3: '30天内须完成 <span class="text-secondary">{betSum}</span> 下单量才能晋升为等级 <span class="text-secondary">VIP{level}</span>。',
  components_pages_components_vip_detailDailog_description4: '尚余 {deadLine} 天，您已完成 {alreadyBetSum} 下单量。',
  components_pages_components_vip_detailDailog_description5: '您注册帐号以来的总充值量，剩余 <span class="text-secondary">{depositSum}</span> 即可晋升等级 <span class="text-secondary">VIP{level}</span> 。',
  components_pages_components_vip_detailDailog_description6: '您注册帐号以来的总下单量，剩余 <span class="text-secondary">{betSum}</span> 即可晋升等级 <span class="text-secondary">VIP{level}</span> 。',
  components_pages_components_vip_returnProfit_table_title_time: '领取日期',
  components_pages_components_vip_returnProfit_table_title_money: '领取金额',
  components_pages_components_vip_envelop_detail: '详情',
  components_pages_components_vip_envelop_noData: '暂无记录',
  components_pages_components_vip_envelop_detail_date: '日期',
  components_pages_components_vip_envelop_detail_negative_profit: '净负利',
  components_pages_components_vip_envelop_detail_returnProfit_rate: '返利比例',
  components_pages_components_vip_envelop_detail_amount: '金额',
  components_pages_components_vip_envelop_reveice_record: '领取记录',
  components_pages_components_vip_envelop_reveice_success: '领取成功',
  // Error
  error1: 'Please enter your account',
  error2: '6~12 characters of English and number',
  error3: 'Inconsistent password',
  error4: 'Please enter the correct email location',
  error5: 'Please enter the correct length of mobile number',
  error6: 'Please enter the correct verification code',
  error7: 'Invitation code cannot be empty',
  error8: 'Please enter your real name',
  error9: 'Real name cannot contain special characters or punctuation marks and numbers',
  error10: 'Real name cannot contain full-width characters',
  error11: 'Real name must be no more than 50 characters',
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
  error27: 'Please enter Line account number',
  error28: 'Line account does not contain special characters or punctuation marks',
  error29: 'Line account cannot contain full-width characters',
  error30: 'Line word count is too long',
  error31: 'Please enter Zalo account number',
  error32: 'Zalo account does not contain special characters or punctuation marks',
  error33: 'Zalo account cannot contain full-width characters',
  error34: 'Zalo word count is too long',
  error35: 'Please enter birthday',
  error36: 'Please enter gender',
  error37: 'Wallet address does not contain special characters or punctuation',
  error38: 'Wallet address cannot contain any Chinese characters',
  error39: 'The length of the wallet address must be less than 100 characters',
  error40: '请输入whatsApp账号',
  error41: 'whatsApp账号不可包含全形字元',
  error42: 'whatsApp 字数过长',
  error43: 'whatsApp账号不包含特殊字符或标点符号',
  error44: '6-12 alphanumerics',
  error45: 'Account does not contain special characters or punctuation marks',
  error46: 'Account cannot contain full-width characters',
};

export default {
  ...lang,
};
