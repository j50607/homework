// 越南文语言档
const lang = {
  home: 'Trang chủ',
  // Common
  common_numText1: 'Một',
  common_numText2: 'Hai',
  common_numText3: 'Ba',
  common_numText4: 'Bốn',
  common_numText5: 'Năm',
  common_numText6: 'Sáu',
  common_numText7: 'Bảy',
  common_numText8: 'Tám',
  common_numText9: 'Chín',
  common_numText10: 'Mười',
  common_comingSoon: 'Vui lòng đón chờ ',
  common_confirm: 'Xác nhận ',
  common_all: 'Toàn bộ',
  common_editedSucceeded: 'Sửa đổi thành công ',
  common_loginFirst: 'Vui lòng chọn đăng nhập ',
  common_reLogin: 'Vui lòng đăng nhập lại ',
  common_logoutSucceeded: 'Đăng vào thành công ',
  common_notVerify: 'Chưa được cấp phép ',
  common_errorSpecialSymbol: 'Không được chứa bao gồm ký  tự đặc biệt và dấu chấm câu {titlename}',
  common_errorNoFullWidth: 'Không được chứa bao gồm ký  tự độ rộng toàn phần {titlename}',
  common_errorFormat: 'Quy cách sai ',
  common_errorLength: 'Chữ số quá dài',
  common_errorGender: 'Vui lòng lựa chọn giới tính ',
  common_errorBirth: 'Vui lòng lựa chọn ngày sinh ',
  common_errorInviteCodeLen: 'Cần nhập mã giới thiệu cần phải có 8 chữ số ',
  common_errorLenLimitVar: 'Dòng có độ dài {banknumrange} ký  tự',
  common_errorPhoneLenLimitVar: 'Số điện thoại cần phải là {phonelen} số',
  common_errorPhoneBeginLimit: 'Số điện thoại  cần phải là{phonebeginning0}~{phonebeginning1} bắt đầu',
  common_errorNoEmpty: 'Dòng này không thể để trống ',
  common_errorEmptyZalo: 'Vui lòng nhập Zalo vào',
  common_errorNoFullWidthZalo: 'Tài khoản zalo không thể chứ bao gồm các ký tự độ rộng toàn phần',
  common_errorEmptyLine: 'Vui lòng nhập Line vào',
  common_errorNoFullWidthLine: 'Tài khoản line không thể chứa bao gồm các ký tự có độ rộng đầy đủ ',
  common_errorEmptyWechat: 'Vui lòng nhập tài khoản wechat vào ',
  common_errorNoFullWidthWechat: 'Tài khoản wechat không thể chứa bao gồm các ký tự có độ rộng toàn phần',
  common_errorEmptyQq: 'Vui lòng nhập tài khoản QQ vào ',
  common_errorNoFullWidthQq: 'Tài khoản QQ không thể chứ bao gồm các ký tự có độ rộng toàn phần',
  common_errorEmptyEmail: 'Vui lòng nhập Email vào ',
  common_errorEmptyPhone: 'Vui lòng nhập vào số điện thoại vào ',
  common_errorEmptyRealName: 'Vui lòng nhập họ và tên thật vào ',
  common_errorSpecialSymbolRealName: 'Họ và tên thật không thể chứa các ký tự đặc biệt hoặc các ký tự chấm câu và số ',
  common_errorNoFullWidthRealName: 'Họ và tên không thể chứa các ký tự có độ rộng toàn phần',
  common_errorLenRealName: 'Độ dài tên thật cần phải nhỏ hơn {namelen} ký tự ',
  common_errorEmptyNickName: 'Vui lòng nhập tên biệt danh vào ',
  common_errorSpecialSymbolNickName: 'Tên biệt danh chỉ có thể chứa 1-8 chữ tiếng việt không dấu và số ',
  common_errorLenNickName: 'Độ dài của tên biệt danh cần phải ít hơn 8n ký tự ',
  common_errorEmptyPwd: 'Vui lòng nhập mật khẩu ',
  common_errorSpecialSymbolPwd: 'Mật khẩu không thể chứa bao gồm các ký tự đặc biệt hoặc dấu chấm câu ',
  common_errorNoChinesePwd: 'Mật khẩu không thể chứa bao gồm tiếng trung quốc ',
  common_errorNoFullWidthPwd: 'Mật khẩu không thể chứa bao gồm các ký tự có độ rộng toàn phần ',
  common_errorNeedNumAndLetterPwd: 'Mật khẩu cần phải chứa bao gồm chữ viết hoa không dấu ',
  common_errorLenPwd: 'Độ dài mật khẩu cần phải chứa từ 6-12 ký tự ',
  common_errorEmptyAccount: 'Vui lòng nhập tên người dùng vào ',
  common_errorSpecialSymbolAccount: 'Tài khoản không được chứa ký tự đặc biệt và dấu chấm câu ',
  common_errorNoChineseAccount: 'Tài khoản không được chứa chữ tiếng trung ',
  common_errorNoFullWidthAccount: 'Tài khoản không thể chứa ký tự có độ rộng toàn phần ',
  common_errorLenAccount: 'Độ dài tài khoản cần phải từ 6-12 ký tự ',
  common_errorFormatAccount: 'Tài khoản phải chứa ít nhất 1 số và tiếng việt không dấu',
  common_errorAtLeastNumberCharacters: 'Ít nhất {number} ký tự, phải chứa 1 chữ hoa và 1 số',
  common_errorSamePassword: 'Mật khẩu cũ và mới không được giống nhau, vui lòng nhập lại',
  common_errorPasswordConfirmFailed: 'Mật khẩu mới và mật khẩu xác nhận không giống nhau , vui lòng điền lại ',
  common_errorEmptyBanklName: 'Vui lòng nhập tên ngân hàng',
  common_errorEmptyPersonId: 'Vui lòng nhập số giấy phép',
  common_errorSpecialSymbolBankName: 'Tên ngân hàng không thể chứa bao gồm ký tự đặc biệt hoặc dấu chấm câu và chữ số',
  common_errorNoFullWidthBanklName: 'Tên ngân hàng không thể chứa bao gồm kí tự',
  common_errorNoFullWidthPersonalId: 'Số giấy phép không thể chứa bao gồm kí tự',
  common_errorLenBankName: 'Độ dài chữ cái tên ngân hàng cần phải nhỏ hơn {bankNameLen}',
  common_errorLenPersonalId: 'Độ dài chữ cái số giấy phép cần phải nhỏ hơn {personalIdLen}',
  common_errorNoChinesePersonalId: 'Số giấy phép không thể chứa bao gồm tiếng trung',
  common_errorSpecialSymbolName: 'Tài khoản không thể chứa bao gồm ký tự đặc biệt hoặc dấu chấm câu và chữ số',
  common_errorNoChineseAddrNo: 'Mã bưa điện không thể bao gồm tiếng trung quốc',
  common_errorSpecialSymbolAddrNo: 'Mã bưu điện không thể bao gồm kí tự đặc biệt hoặc dấu chấm câu',
  common_passwordModifySuccessNeedRelogin: 'Sửa đổi mật khẩu thành công , vui lòng đăng nhập lại ',
  common_errorDisconnectedAndRefresh: 'Liên kết đang trong ngoại tuyến , vui lòng kiểm tra mạng vào lại trang',
  common_contactService: 'Liên hệ cskh',
  common_modifyContactService: 'Nếu bạn cần sửa đổi, vui lòng liên hệ với cskh trực tuyến"',
  common_noData: 'Không có thông tin',
  common_day: 'Ngày',
  common_week: 'Tuần',
  common_month: 'Tháng',
  common_delete: 'Xóa bỏ',
  common_select_placeholder: 'Vui lòng lựa chọn nội dung',
  common_delete_success: 'Xóa bỏ thành công',
  common_edit_success: 'Chỉnh sửa thành công',
  common_count: 'Lần',
  common_limit: 'Giới hạn',
  common_modifySuccess: 'Thay đổi thành công',
  common_sendSuccess: 'Phát tặng thành công',
  common_betFailMsg: 'Đặt cược thất bại',
  common_copySuccess: 'Sao chép thành công',
  common_noContenttoCopy: 'Không có nội dung được sao chép',
  common_checkDetail: 'Tìm kiếm chi tiết',
  common_language: 'Ngôn ngữ',

  // Views
  views_notFound_desc: 'không tìm thấy trang',
  views_notFound_backToHome: 'Quay về trang chủ ',
  views_betting_host: 'Chủ',
  views_betting_info_deadline: 'Đình chỉ đơn cược',
  views_betting_info_deadlineClosed: 'Đơn cược đã bị đình chỉ',
  views_betting_main_empty: 'Đơn cược đã bị đóng tắt',
  views_betting_main_back: 'Quay lại danh sách thị trường',
  views_betting_main_type1: 'toàn trận',
  views_betting_main_type2: 'nửa trận',
  views_betting_main_totalAmount: 'tổng lượng giao thành công',
  views_betting_main_closed: 'Chưa mở rộng',
  views_betting_main_fulled: 'Đặt cược đã đầy',
  views_betting_main_handleBettingText: 'Đang tiền hành đặt cược',
  views_betting_main_availableAmount: 'Số lượng có thể giao dịch',
  views_betting_main_popup_title: 'Chi tiết đơn cược',
  views_betting_main_popup_option: 'Tùy chọn đặt cược',
  views_betting_main_popup_betAmount: 'Số tiền đặt cược',
  views_betting_main_popup_betAmountPlaceholder: 'Vui lòng nhập số tiền đặt cược vào',
  views_betting_main_popup_balance: 'Số dư',
  views_betting_main_popup_profit: 'Lợi nhuận',
  views_betting_main_popup_charge: 'Tiền phí gửi',
  views_betting_main_popup_expectedProfit: 'Kỳ vọng lợi nhuận',
  views_betting_main_popup_btnAction: 'Đặt cược',
  views_betting_main_popup_btnAction2: 'Nhận được thông tin mới',
  views_betting_main_popup_dollars: 'đồng',
  views_betting_main_popup_notify1: 'Số tiền đặt cược phải từ {minBet} ~ {maxBet}',
  views_betting_main_popup_notify2: 'Số tiền đặt cược không lớn hơn {limitAmount}',
  views_betting_statistic_popup_title: 'Chi tiết số lương giao dịch',
  views_betting_statistic_popup_sum: 'tổng lượng giao thành công',
  views_betting_statistic_popup_others: 'Khác ',
  views_betting_statistic_popup_all: 'Toàn bộ',
  views_betRecord_item_title: 'Lịch sử đơn cược',
  views_betRecord_item_pending: 'Chưa kết toán',
  views_betRecord_item_label1: 'Số tiền đặt cược',
  views_betRecord_item_label2: 'Tùy chọn đặt cược',
  views_betRecord_item_label3: 'Tiền phí gửi',
  views_betRecord_item_label4: 'Kỳ vọng lợi nhuận',
  views_betRecord_item_label5: 'Trạng thái',
  views_betRecord_item_label6: 'Tên trận đấu',
  views_betRecord_item_label7: 'Tên dự án',
  views_betRecord_item_action1: 'Mở rộng chi tiết',
  views_betRecord_item_action2: 'Chi tiết thu về',
  views_bankcard_nextStep2: 'Xác nhận ',
  views_betRecord_sum_label1: 'Số tiền giao dịch : ',
  views_betRecord_sum_label2: 'kết thúc trận đấu : ',
  views_betRecord_sum_label3: 'Chưa kết thúc trận đấu : ',
  views_betRecord_sum_label4: 'Đã được nhận lợi nhuận : ',
  views_betRecord_sum_label5: 'Kỳ vọng lợi nhuận : ',
  views_betRecord_filterPopup_title: 'Tùy chọn',
  views_betRecord_filterPopup_label1: 'Trạng thái',
  views_betRecord_filterPopup_label2: 'Tên dự án',
  views_betRecord_filterPopup_status1: 'Chưa kết toán',
  views_betRecord_filterPopup_status2: 'Đã kết toán',
  views_betRecord_filterPopup_status3: 'Đã hủy đơn',
  views_betRecord_filterPopup_status4: 'Ván hoà',
  views_profile_title: 'Của tôi',
  views_profile_balance: 'Số dư',
  views_profile_lockWallet: 'Móc khóa túi tiền',
  views_profile_goDeposit: 'Nạp tiền',
  views_profile_goWithdraw: 'Rút tiền',
  views_profile_transactionRecord: 'Lịch sử nạp rút',
  views_profile_walletManagement: 'Quản lí túi tiền',
  views_profile_personalityProfile: 'Thông tin cá nhân',
  views_profile_myReport: 'Báo biểu của tôi',
  views_profile_myVip: 'Vip của tôi',
  views_profile_share: 'Quảng bá toàn dân',
  views_profile_promotion: 'Hoạt động ưu đãi',
  views_profile_verify: 'Xác minh',
  views_profile_service: 'Chăm sóc khách hàng',
  views_profile_logout: 'Đăng xuất',
  views_profile_logoutSuccess: 'Đăng xuất thành công',
  views_profile_selectAvatar: 'Lựa chọn ảnh chính',
  views_profile_newestMessage: 'Thông tin mới nhất ',
  views_market_title: 'Danh sách thị trường ',
  views_market_switchLeague: 'Lựa chọn liên minh',
  views_market_switchLeague_select_all: 'Chọn toàn bộ',
  views_market_switchLeague_select_not: 'Chọn ngược',
  views_match_tablist_all: 'Toàn bộ',
  views_match_tablist_today: 'Hôm nay',
  views_match_tablist_tomorrow: 'Ngày mai',
  views_match_tablist_record: 'Lịch sử',
  views_market_switchLeague_list_openCount: 'Đã mở rộng phát hành{num}',
  views_market_switchLeague_noSelected: 'Vui lòng lựa chọn ít nhất một liên minh',
  views_market_allLeague_deadLine: 'Đình chỉ đơn cược',
  views_profile_withdraw: 'Rút tiền',
  views_profile_withdrawWallet: 'Rút tiền ở túi tiền',
  views_profile_withdrawCodeTitle: 'Vui lòng nhập mật khẩu rút tiền',
  views_profile_withdrawAmountTitle: 'Vui lòng nhập số tiền cần rút',
  views_profile_withdrawFreeCount: 'Số lần số tiền rút tiền miễn phí',
  views_profile_charge: 'Bảng phí rút tiền',
  views_profile_forceCharge: 'Phí rút tiền bắt buộc',
  views_profile_amount: 'Tổng số tiền rút',
  views_profile_realAmount: 'Số dư khi rút tiền còn lại',
  views_profile_balanceNotEnough: 'Số dư không đủ',
  views_profile_withdrawAmount: 'Số tiền được rút',
  views_profile_currency: 'Tiền điện tử',
  views_profile_depositAmount: 'Số tiền nạp',
  views_profile_handlingFee: 'Phí thủ tục',
  views_profile_promotionAmount: 'Khuyến mại',
  views_profile_actualAmount: 'Thực tế đến tài khoản',
  views_profile_totalAmount: 'Tổng số tiền',
  views_profile_withdrawAmountPlaceholder: 'Vui lòng nhập số tiền cần rút',
  views_profile_withdrawCode_notice1: 'Nhập mật khẩu rút tiền rồi tiếp tục giao dịch',
  views_profile_withdrawCode_notice2: 'Thiết lập mật khẩu rút tiền 6 chữ số , vui lòng ghi nhớ mật khẩu',
  views_profile_confirmOrder: 'Xác nhận đơn',
  views_profile_orderNotice: 'Vui lòng xác nhận thông tin giao dịch trước khi gửi đơn xử lí',
  views_profile_chainType: 'Thể loại mạng chính',
  views_profile_walletAddress: 'Địa chỉ túi tiền',
  views_home_matchNews: 'Tin tức trận đấu',
  views_home_matchHot: 'Sự kiện hot',
  views_profile_withdrawHandling: 'Rút tiền đang tiến hành',
  views_profile_orderNumber: 'Mã đơn chờ xử lí',
  views_profile_time: 'Thời gian',
  views_profile_chooseWallet: 'Vui lòng chọn túi tiền',
  views_profile_noWallet: 'chưa liên kết túi tiền',
  views_profile_goBind: 'túi tiền liên kết hiện tại',
  views_profile_deposit: 'Nạp tiền',
  // newstart
  views_profile_deposit_cryptoChannel: 'Kênh thanh toán tiền điện tử',
  views_profile_deposit_checkTeaching: 'kiểm tra giáo trình',
  views_profile_deposit_chooseChannel: 'Vui lòng chọn kênh nạp tiền',
  views_profile_deposit_noChannel: 'Không có bất kì kênh nạp tiền khác',
  views_profile_deposit_notice: 'Chú ý vấn đề',
  views_profile_deposit_depositInfo: 'Thông tin nạp tiền ',
  views_profile_deposit_nextStep: 'Phần tiếp theo',
  views_profile_deposit_amountPlaceholder: 'Vui lòng nhập số tiền nạp',
  views_profile_deposit_alreadyCompleteTransfer: 'Đã hoàn thành chuyển tiền',
  views_profile_deposit_generateDepositAddress: 'tạo ra địa chỉ nạp tiền',
  views_profile_deposit_depositAmount: 'Số tiền nạp',
  views_profile_deposit_hint: 'Gửi giao dịch',
  views_profile_deposit_discount: 'Khuyến mại',
  views_profile_deposit_fee: 'Tiền phí gửi',
  views_profile_deposit_walletAddress: 'Địa chỉ túi tiền',
  views_profile_deposit_hint_one: 'không điền các thông tin trên tạo ra chuyển khoản bị thất bại',
  views_profile_deposit_hint_two: 'Ưu đãi {number}%',
  views_profile_deposit_hint_three: 'Tiền phí gửi {number}%',
  views_profile_deposit_hint_four: 'Tiền thật sẽ đến tài khoản',
  views_profile_deposit_hint_five: 'Giới hạn phải từ  {min} - {max}',
  views_profile_deposit_limitAmount: 'Hạn mức {min} - {max}',
  views_profile_deposit_limitAmountWarning: 'Số tiền cần phải từ {min} - {max} , xảy ra sự cố vui lòng liên hệ cskh',
  views_profile_transfer_title: 'Hội viên chuyển tiền',
  views_profile_transfer_tabList_subTransfer: 'Cấp dưới chuyển tiền',
  views_profile_transfer_tabList_superiorTransfer: 'Cấp trên chuyển tiền',
  views_profile_transfer_input_placeholder: 'Nhập tìm kiếm tài khoản hội viên',
  views_profile_transfer_table_title_account: 'Tài khoản',
  views_profile_transfer_table_title_Superioraccount: 'Tài khoản cấp trên',
  views_profile_transfer_table_title_money: 'Số tiền',
  views_profile_transfer_noWithdrawCode: 'Túi tiền chưa được cài đặt \\ trang chủ sẽ chuyển đến ví tiền',
  views_profile_transfer_transfer_disable: 'Công năng chưa được mở rộng',
  // newend
  views_profile_depositHandling: 'Đang tiến hành nạp tiền',
  views_profile_userinfo_title: 'Thông tin cá nhân',
  views_profile_userinfo_balance: 'Số dư',
  views_profile_userinfo_lockWallet: 'khoá túi tiền',
  views_profile_userinfo_nickName: 'nickname',
  views_profile_userinfo_nickNameHint: 'nickname chỉ có thể sửa đổi 2 lần',
  views_profile_userinfo_realName: 'Họ và tên thật',
  views_profile_userinfo_gender: 'Giới tính',
  views_profile_userinfo_birthday: 'Ngày sinh',
  views_profile_userinfo_phone: 'Số điện thoại di động',
  views_profile_userinfo_walletManagement: 'Quản lí túi tiền',
  views_profile_userinfo_warning: 'các thông tin trên sau khi nhập không thể sửa đổi',
  views_profile_userinfo_notSetting: 'Chưa cài đặt',
  views_profile_userinfo_qq: 'QQ',
  views_profile_userinfo_wechat: 'Wechat',
  views_profile_userinfo_mailbox: 'Email',
  views_profile_userinfo_line: 'LINE',
  views_profile_userinfo_zalo: 'Zalo',
  views_profile_userinfo_setting: 'Cài đặt',
  views_profile_userinfo_modifyLoginPassword: 'Sửa đổi mật khẩu đăng nhập',
  views_profile_userinfo_modifyWithdrawPassword: 'Sửa đổi mật khẩu rút tiền',
  views_profile_userinfo_woman: 'Nữ',
  views_profile_userinfo_man: 'Nam',
  views_profile_userinfo_noWallet: 'Mật khẩu túi tiền cần được cài đặt , hiện tại bạn chưa cài đặt túi tiền。',
  views_profile_wallet_addWallet: 'Thêm mới túi tiền',
  views_profile_wallet_placeholder1: 'Vui lòng chọn thể loại mạng chính',
  views_profile_wallet_placeholder2: 'Vui lòng nhập địa chỉ rút tiền điện tử',
  views_profile_wallet_walletAddress: 'Địa chỉ túi tiền',
  views_profile_wallet_deleteNotice: 'Bạn có chắc chắn muốn xóa bỏ túi tiền này không?',
  views_profile_userinfo_setNickName_currentNickName: 'nickname  hiện tại',
  views_profile_userinfo_setNickName_newNickName: 'Tên biệt danh mới',
  views_profile_userinfo_setNickName_pleaseEnterNewNickName: 'Vui lòng nhập mới tên biệt danh',
  views_profile_userinfo_setNickName_nickNameWarning: 'Tên biệt danh chỉ có thể sửa đổi 2 lần , đã sửa đổi {times} lần',
  views_profile_userinfo_setNickName_modifyOverLimit: 'Sửa đổi tên biệt danh đã đạt đến giới hạn cho phép',
  views_profile_userinfo_setNickName_onlineService: 'CSKH trực tuyến',
  views_profile_userinfo_setNickName_nickNameConflict: 'Tên biệt danh cũ mới không thể giống nhau',
  views_profile_userinfo_setNickName_pleaseEnterRealName: 'Vui lòng nhập họ và tên thật',
  views_profile_userinfo_setRealName_warning: 'Sau khi nhập không thể thay đổi',
  views_profile_userinfo_setPhone_title: 'Số điện thoại di động',
  views_profile_userinfo_setPhone_pleaseEnterPhoneNumber: 'Vui lòng nhập số điện thoại di động',
  views_profile_userinfo_setPhone_verifyPhoneNumber: 'Mã xác nhận ở điện thoại ',
  views_profile_userinfo_setPhone_pleaseEnterVerifyPhoneNumber: 'Vui lòng nhập mã xác nhận ở điện thoại',
  views_profile_userinfo_setPhone_sendVerifyNumber: 'Gửi mã xác nhận',
  views_profile_userinfo_setPhone_sec: 'Giây',
  views_profile_userinfo_setPhone_loginPassword: 'Đăng nhập mật khẩu',
  views_profile_userinfo_setPhone_pleaseEnterLoginPassword: 'Hãy nhập mật khẩu đăng nhập',
  views_profile_userinfo_setContact_account: '{type} Tài khoản',
  views_profile_userinfo_setContact_pleaseEnterAccount: 'Vui lòng nhập {type} tài khoản',
  views_profile_userinfo_modifyLoginPassword_title: 'Sửa đổi mật khẩu đăng nhập',
  views_profile_userinfo_modifyLoginPassword_oldPassword: 'Mật khẩu đăng nhập cũ',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterOldPassword: 'Vui lòng nhập mật khẩu cũ',
  views_profile_userinfo_modifyLoginPassword_newPassword: 'Vui lòng nhập mật khẩu mới',
  views_profile_userinfo_modifyLoginPassword_pleaseEnterNewPassword: 'Vui lòng nhập 6 - 12 số mật khẩu mới',
  views_profile_userinfo_modifyLoginPassword_confirmNewPassword: 'Xác nhận mật khẩu đăng nhập mới',
  views_profile_userinfo_modifyLoginPassword_confirmNewPasswordAgain: 'Vui lòng nhập lại thêm mật khẩu mới lần nữa',
  views_profile_userinfo_modifyWithdrawPassword_title: 'Sửa đổi mật khẩu rút tiền',
  views_profile_userinfo_modifyWithdrawPassword_withdrawCode: 'Mật khẩu rút tiền',
  views_profile_userinfo_modifyWithdrawPassword_enterWithdrawCode: 'nhập vào mật khẩu rút tiền 6 số cũ',
  views_profile_userinfo_modifyWithdrawPassword_newWithdrawCode: 'mật khẩu rút tiền mới',
  views_profile_userinfo_modifyWithdrawPassword_settingWithdrawCode: 'cài đặt mật khẩu rút tiền 6 số ,đồng thời ghi nhớ mật khẩu',
  views_profile_userinfo_modifyWithdrawPassword_confirmNewWithdrawCode: 'xác nhận mật mã rút tiền mới',
  views_finance_sum_label1: 'tổng tiền nạp',
  views_finance_sum_label2: 'tổng tiền rút',
  views_finance_popup_label1: 'loại hình giao dịch',
  views_finance_popup_all: 'Toàn bộ',
  views_finance_popup_artificial_deposit: 'nạp tiền thủ công',
  views_finance_popup_artificial_withdraw: 'rút tiền thủ công ',
  views_finance_popup_user_deposit: 'Lịch sử nạp tiền',
  views_finance_popup_user_withdraw: 'Lịch sử rút tiền',
  views_finance_popup_event_gift: 'Hoạt động tặng thưởng',
  views_finance_popup_return_water_record: 'Lịch sử hoàn cược',
  views_finance_popup_rebate_record: 'Lịch sử hoàn điểm',
  views_finance_popup_poundage: 'Phí thủ tục',
  views_finance_popup_wallet_account_change: 'Túi tiền đổi khoản',
  views_finance_popup_transfer_record: 'Lịch sử chuyển khoản',
  views_finance_popup_profit: 'Lợi nhuận',
  views_finance_popup_other: 'khác',
  views_profile_wallet_addSuccess: 'Đã thêm túi tiền thành công',
  views_finance: 'Chi tiết kết toán',
  views_profile_transaction_deposit: 'Nạp tiền',
  views_profile_transaction_withdraw: 'Rút tiền',
  views_profile_transaction_orderNumber: 'Mã đơn chờ xử lý',
  views_profile_transaction_depositTime: 'Thời gian nạp tiền',
  views_profile_transaction_withdrawTime: 'Thời gian rút tiền',
  views_profile_transaction_balance: 'Số dư ',
  views_profile_transaction_status: 'Trạng thái',
  views_profile_transaction_finishTime: 'Thời gian hoàn thành giao dịch',
  views_profile_transaction_primaryNet: 'Mạng chính',
  views_profile_transaction_walletAddress: 'Địa chỉ túi tiền',
  views_profile_transaction_depositAmount: 'Số tiền nạp',
  views_profile_transaction_withdrawAmount: 'Số tiền rút',
  views_profile_transaction_promotionAmount: 'Số tiền khuyến mãi',
  views_profile_transaction_handlingFee: 'Tiền phí gửi',
  views_profile_transaction_generalHandlingFee: 'Một bảng tiền phí gửi',
  views_profile_transaction_forceHandlingFee: 'Tiền phí rút tiền bắt buộc',
  views_profile_transaction_realAmount: 'Tiền thật đến tài khoản',
  views_profile_transaction_success: 'Giao dịch thành công',
  views_profile_transaction_cancel: 'Giao dịch bị hủy bỏ',
  views_profile_transaction_fail: 'Giao dịch thất bại',
  views_profile_transaction_refused: 'Giao dịch bị từ chối',
  views_profile_transaction_auditing: 'Đang xét duyệt',
  views_profile_transaction_cancelSuccess: 'Hủy đơn thành công',
  views_profile_transaction_cancelAuditing: 'Hủy đơn đang tiến hành',
  views_profile_transaction_empty: 'Không có thông tin',
  views_finance_balance: 'Số dư',
  views_profile_memberTransfer: 'Hội viên trao đổi',
  // Components
  components_common_dialog_confirm: 'Xác nhận',
  components_common_dialog_cancel: 'Hủy',
  components_dSearchList_search: 'Tìm kiếm',
  components_dHeaderRow_register: 'Đăng ký',
  components_dLanguageModal_title: 'ngôn ngữ',
  components_dSelectDateModal_title: 'lựa chọn ngày',
  components_dSelectDateModal_today: 'hôm nay',
  components_dSelectDateModal_yesterday: 'hôm qua',
  components_dSelectDateModal_sevenDays: '7 ngày',
  components_dSelectDateModal_sevenDays2: 'trong 7 ngày',
  components_dSelectDateModal_sevenDays3: 'trong 7 ngày',
  components_dSelectDateModal_custom: 'tự định nghĩa',
  components_dSelectDateModal_custom2: 'tự đặt',
  components_scroll_allLoaded: 'Toàn bộ đã tải',
  components_scroll_pullUpLoading: 'Đang tải',
  components_scroll_pullDownLoading: 'Đang làm mới ',
  components_scroll_continuePullUp: 'Kéo lên để tiếp tục tải ',
  components_scroll_refresh: 'Làm mới thành công',
  components_scroll_pullDownRefresh: 'Kéo xuống làm mới',
  components_pages_loginAndRegister_loginRegister_login_user: 'tài khoản',
  components_pages_loginAndRegister_loginRegister_login_enter_user: 'vui lòng nhập vào tài khoản',
  components_pages_loginAndRegister_loginRegister_login_password: 'mật mã',
  components_pages_loginAndRegister_loginRegister_login_enter_password: 'vui lòng nhập vào mật mã',
  components_pages_loginAndRegister_loginRegister_login_image: 'mã xác nhận từ hình',
  components_pages_loginAndRegister_loginRegister_login_enter_image: 'vui lòng nhập vào mã xác nhận từ hình',
  components_pages_loginAndRegister_loginRegister_index_loginSuccess: 'đăng nhập thành công',
  components_pages_loginAndRegister_loginRegister_index_registerSuccess: 'đăng ký thành công',
  components_pages_loginAndRegister_loginRegister_welcome_back: 'hoan nghênh trở lại',
  components_pages_loginAndRegister_loginRegister_forget: 'quên mật khẩu ?',
  components_pages_loginAndRegister_loginRegister_login: 'đăng nhập',

  components_pages_loginAndRegister_loginRegister_register_new_user: 'đăng ký tài khoản',
  components_pages_loginAndRegister_loginRegister_register_mandatory: '(bắt buộc lựa mục)',
  components_pages_loginAndRegister_loginRegister_register_confirm_password: 'xác nhận mật mã',
  components_pages_loginAndRegister_loginRegister_register_password_again: 'vui lòng nhập lại mật mã',
  components_pages_loginAndRegister_loginRegister_register_agent_code: 'mã giới thiệu',
  components_pages_loginAndRegister_loginRegister_register_agent_code_placeholder: 'vui lòng nhập vào mã giới thiệu',
  components_pages_loginAndRegister_loginRegister_register_real_name: 'tên thật',
  components_pages_loginAndRegister_loginRegister_register_real_name_placeholder: 'vui lòng nhập vào tên thật',
  components_pages_loginAndRegister_loginRegister_register_nickname: 'nickname',
  components_pages_loginAndRegister_loginRegister_register_nickname_placeholder: 'vui lòng nhập vào nickname',
  components_pages_loginAndRegister_loginRegister_register_phone: 'số điện thoại',
  components_pages_loginAndRegister_loginRegister_register_phone_placeholder: 'vui lòng nhập số điện thoại',
  components_pages_loginAndRegister_loginRegister_register_email: 'mail',
  components_pages_loginAndRegister_loginRegister_register_email_placeholder: 'vui lòng nhập vào mail',
  components_pages_loginAndRegister_loginRegister_register_qq: 'mã QQ',
  components_pages_loginAndRegister_loginRegister_register_qq_placeholder: 'vui lòng nhập vào mã QQ',
  components_pages_loginAndRegister_loginRegister_register_weChat: 'wechat',
  components_pages_loginAndRegister_loginRegister_register_weChat_placeholder: 'vui lòng nhập vào mã wechat',
  components_pages_loginAndRegister_loginRegister_register_line: 'Line',
  components_pages_loginAndRegister_loginRegister_register_line_placeholder: 'Vui lòng nhập line',
  components_pages_loginAndRegister_loginRegister_register_zalo: 'Zalo',
  components_pages_loginAndRegister_loginRegister_register_zalo_placeholder: 'Vui lòng nhập zalo vào',
  components_pages_loginAndRegister_loginRegister_register_birthday: 'Ngày sinh',
  components_pages_loginAndRegister_loginRegister_register_birthday_placeholder: 'Vui lòng điền Ngày sinh',
  components_pages_loginAndRegister_loginRegister_register_gender: 'Giới tính',
  components_pages_loginAndRegister_loginRegister_register_gender_placeholder: 'Vui lòng điền giới tính vào',
  components_pages_loginAndRegister_loginRegister_register_gender_male: 'Nam',
  components_pages_loginAndRegister_loginRegister_register_gender_female: 'Nữ',
  components_pages_loginAndRegister_loginRegister_register_gender_noSetting: 'Chưa chọn',
  components_pages_loginAndRegister_loginRegister_register: 'đăng ký',
  components_pages_match_record_full_and_half: 'toàn trận / nửa trận ',
  components_pages_match_record_dialog_title: 'kết quả thi đấu',
  components_pages_match_noData: 'tạm thời không có thi đấu',
  components_pages_profile_transaction: 'Lịch sử nạp rút',
  components_footer_home: 'trang chính',
  components_footer_match: 'thị trường',
  components_footer_record: 'lịch sử',
  components_footer_finance: 'tài khoản',
  components_footer_profile: 'của tôi',
  components_match_betAmount: 'tổng lượng tiêu thụ',
  components_datepicker_chooseDate: 'Chọn thời gian',
  components_datepicker_dateRange: 'Thời gian bắt đầu không thể lớn hơn thời gian kết thúc',
  components_transferDialog_title: 'Chuyển khoản',
  components_transferDialog_transfer_account: 'Tài khoản chuyển tiền',
  components_transferDialog_transfer_amount: 'Số tiền chuyển khoản',
  components_transferDialog_transfer_amount_placeholder: 'Vui lòng nhập số tiền vào',
  components_transferDialog_transfer_remark: 'Ghi chú ( giới hạn 50 chữ )',
  components_transferDialog_transfer_remark_placeholder: 'Vui lòng điền nội dung ghi chú',
  components_transferDialog_transfer_confirm: 'Xác nhận',
  components_transferDialog_transfer_cancel: 'Hủy bỏ',
  components_transferDialog_transfer_amount_empty: 'Số tiền chuyển khoản không thể là 0',
  components_transferDialog_transfer_amount_biggerThanBalance: 'Số tiền chuyển khoản không thể lớn hơn số dư',
  components_withdrawCodeDialog_title: 'Mật khẩu xác minh',
  components_withdrawCodeDialog_inputCode: 'Vui lòng điền mật khầu rút tiền vào',
  components_withdrawCodeDialog_inputCode2: 'Vui lòng điền mật khẩu rút tiền rồi tiếp tục giao dịch',
  components_withdrawCodeDialog_forgetPassword: 'Bạn đã mật khẩu của bạn rồi sao ?',
  components_withdrawCodeDialog_contactService: 'Vui lòng liên hệ cskh trực tuyến',
  components_withdrawCodeDialog_transfer_success: 'Chuyển khoản thành công',
  components_quick_login_text: 'Hoặc tiếp tục thêm cách sau',
  components_quick_login_success: 'Thành công',

  error1: 'Vui lòng điền tài khoản',
  error2: '6~12 chữ số',
  error3: 'mật mã không đồng nhất',
  error4: 'vui lòng nhập chính xác vị trí mail',
  error5: 'vui lòng nhập chính xác độ dài số điện thoại',
  error6: 'vui lòng nhập chính xác mã xác nhận',
  error7: 'mã giới thiệu không được để trống',
  error8: 'vui lòng nhập tên thật',
  error9: 'tên thật không thể chứa  chữ đặc biệt hoặc ký tự với số',
  error10: 'tên thật không thể chứa bao gồm kí tự',
  error11: 'tên thật bắt buộc là tiếng anh và không vượt quá 50 chữ',
  error12: 'vui lòng nhập nickname',
  error13: 'nickname chỉ được nhập 1-8 chữ và số',
  error14: 'độ dài nickname bắt buộc phải dưới 8 chữ số',
  error15: 'vui lòng nhập số điện thoại',
  error16: 'vui lòng nhập vào tài khoản QQ',
  error17: 'QQ không thể chứa bao gồm kí tự',
  error18: 'số chữ QQ quá dài',
  error19: 'tài khoản QQ không bao gồm ký tự đặc biệt hoặc dấu chấm câu',
  error20: 'vui lòng nhập vào tài khoản wechat',
  error21: 'wechat không thể chứa bao gồm kí tự',
  error22: 'tài khoản wechat không bao gồm ký tự đặc biệt hoặc dấu chấm câu',
  error23: 'số chữ wechat quá dài',
  error24: 'vui lòng nhập vào mail',
  error25: 'quy cách mail bị sai',
  error26: 'số chữ mail quá dài',
  error27: 'Vui lòng nhập số tài khoản Dòng',
  error28: 'Tài khoản dòng không chứa các ký tự đặc biệt hoặc dấu chấm câu',
  error29: 'Tài khoản dòng không được chứa các ký tự có độ rộng đầy đủ',
  error30: 'Số từ dòng quá dài',
  error31: 'Vui lòng nhập số tài khoản Zalo',
  error32: 'Tài khoản Zalo không có ký tự đặc biệt hoặc dấu chấm câu',
  error33: 'Tài khoản Zalo không được chứa các ký tự full-width',
  error34: 'Số lượng từ trên Zalo quá dài',
  error35: 'Vui lòng nhập ngày sinh',
  error36: 'Vui lòng nhập giới tính',
  error37: '钱包地址不可包含特殊字元或标点符号',
  error38: '钱包地址不可包含中文',
  error39: '钱包地址必须小于100字元',
};

export default {
  ...lang,
};
