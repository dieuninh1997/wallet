export default {
  coin: {
    MGC: {
      fullname: 'MangoCoin',
    },
    BTC: {
      fullname: 'Bitcoin',
    },
    ETH: {
      fullname: 'Ethereum',
    },
  },
  currency: {
    USD: {
      settingLabel: 'Đô la Mỹ ($)',
    },
    PHP: {
      settingLabel: 'Tiền Philippines (₱)',
    },
  },
  landing: {
    coinName: 'Mango Coin',
    coinDescription: 'Tạo một tương lai tốt hơn',
    createWallet: 'Tạo Ví',
    signin: 'Đăng nhập',
    restoreAccount: 'Khôi phục tài khoản',
  },
  signin: {
    title: 'Đăng Nhập',
    forgotPassword: 'Quên mật khẩu',
    inputWalletId: 'Địa chỉ ví/tài khoản',
    inputPassword: 'Mật khẩu',
    btnCreate: 'Tạo ví',
    loginFacebook: 'Login With Facebook',
    signInByPhone: 'Sign In With Phone',
    signInByEmail: 'Sign In With Email Address',
    signInByPassport: 'Sign In With Passport',
    passportNumber: 'Passport Number',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    cancel: 'キャンセル',
    searchCountry: 'Please input Keywords',
  },
  createWallet: {
    signin: 'Đăng nhập',
    title: 'Tạo ví',
    phoneNumber: 'Số điện thoại',
    emailAddress: 'Địa chỉ email',
    passportNumber: 'Số hộ chiếu',
    facebook: 'Facebook',
  },
  createByPhoneNumber: {
    title: 'Tạo bằng số điện thoại',
    iAccept: 'Tôi chấp nhận',
    termsAndConditions: ' điều khoản dịch vụ.',
    cancel: 'Cancel',
    searchCountry: 'Please input Keywords',
  },
  createWalletByEmailScreen: {
    title: 'Tạo ví bằng email',
    inputEmail: 'Địa chỉ email',
    inputPassword: 'Mật khẩu',
    inputPasswordConfirm: 'Xác nhận mật khẩu',
    createWallet: 'Tạo ví',
    createWaletSuccess: 'Tạo ví thành công',
    readAndCheckTerms: 'Hãy đọc và chấp nhận điều khoản!',
    emailInvalid: 'Email không đúng',
    passwordMustMatch: 'Xác nhận mật khẩu không đúng!',
    requireInfo: 'Hãy nhập đầy đủ thông tin!',
    passportInvalid: 'Passport is not valid! Please enter only letters and number',
    passwordInvalid: 'Password must include uppercase and lowercase letters, numbers and at least 8 characters',
  },
  createWalletByPassportScreen: {
    title: 'Tạo ví bắng số hộ chiếu',
    inputEmail: 'Số hộ chiếu',
  },
  dashboard: {
    title: 'Dashboard',
    balance: 'Số dư',
  },
  chart: {
    allTime: 'All time',
  },
  send: {
    title: 'Send',
    walletAddress: 'Địa chỉ ví',
    continue: 'Tiếp tục',
    confirmationTextDefault: 'Nhập 12 từ bí mật để khôi phục tài khoản và giao dịch.',
    confirmationText: 'Bạn có chắc chắn muốn gửi {{amount}} {{coinName}} tới địa chỉ {{address}}?',
    submitted: 'Submitted',
    addressRequired: 'Recieved address is required!',
    addressInValid: 'Recieved address is not valid!',
    coinValueInValid: 'Coin value is not valid!',
    titleSlowly: 'Chậm',
    titleRegular: 'Bình thường',
    titleFast: 'Nhanh',
    speedSlowly: '30 + Phút',
    speedRegular: '5 + Phút',
    speedFast: '2 + Phút',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  setting: {
    title: 'Cài đặt',
    profile: 'Hồ sơ',
    walletId: 'Địa chỉ ví',
    email: 'Email',
    mobileNumber: 'Số điện thoại',
    logIntoWebWallet: 'Đăng nhập phiên bản Web',
    perferences: 'Ưa thích',
    emailNotification: 'Thông báo tới email',
    localCurrency: 'Chuyển đổi tiền tệ',
    security: 'Bảo mật',
    verification: 'Xác thực 2 lớp',
    changePassword: 'Đổi mật khẩu',
    recoveryPhrase: 'Khóa khôi phục',
    changePin: 'Đổi PIN',
    useFaceIdAsPin: 'Sử dụng Face ID thay PIN',
    swipeToReceive: 'Trượt để nhận',
    unverified: 'Chưa xác thực',
    disabled: 'Đã tắt',
    enabled: 'Đã bật',
    unconfirmed: 'Chưa xác nhận',
    passportNumber: 'Số hộ chiếu',
    rejected: 'Đã từ chối',
  },
  emailVerification: {
    title: 'Kiểm tra Email',
    content: 'Email xác thực của bạn được dùng để gửi mã đăng nhập khi phát hiện có hoạt động đáng ngờ hoặc bất thường, để nhắc nhở bạn tài khoản đăng nhập, và cảnh bảo về các giao dịch trong tài khoản của bạn.',
    emailAddress: 'Địa chỉ email',
    resend: 'Gửi lại',
    cancel: 'Hủy',
    update: 'Cập nhập',
    verificationEmailSent: 'Link xác thực đã được gửi đến email của bạn.',
    errors: {
      email_already_verified: 'Địa chỉ email của bạn đã được xác thực.',
      email_in_use: 'Email đã được sử dụng.',
      cannot_change_email: 'Không thể thay đổi email',
    },
  },
  request: {
    title: 'Nhận',
    copyAddress: 'Sao chép địa chỉ',
    copied: 'Sao chép thành công',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  transactions: {
    title: 'Giao dịch',
    noTransactionAvailable: 'No transaction record available.',
  },
  changePassword: {
    title: 'Đổi mật khẩu',
    curentPassword: 'Mật khẩu hiện tại',
    newPassword: 'Mật khẩu mới',
    confirmNewPassword: 'Xác nhận mật khẩu mới',
    cancel: 'Hủy',
    update: 'Cập nhập',
    toastEnterFullInfo: 'Hãy điền đầy đủ thông tin',
    toastConfirmPassword: 'Mật khẩu xác nhận không đúng',
    changeSuccess: 'Thay đổi mật khẩu thành công',
    otp: 'Mã Otp',
  },
  ChangePinScreen: {
    title: 'Đổi mã PIN',
    changePinSuccess: 'Đổi mã pin thành công',
    currentPin: 'Mã PIN hiện tại',
    incorrectPincode: 'Mã pin không đúng',
    pleaseAgain: 'Hãy thử lại	',
    newPin: 'Mã PIN mới',
    confirmNewPin: 'Xác nhận mã PIN mới',
    confirmFail: 'Bạn nhập không đúng',
  },
  genneralText: {
    confirmation: 'Xác nhận',
    amount: 'Số lượng',
    status: 'Trạng thái',
    address: 'Địa chỉ',
    txid: 'Txid',
    date: 'Ngày',
    ok: 'Ok',
    password: 'Mật khẩu',
    submit: 'Submit',
  },
  resetPassword: {
    forgotPassword: 'Quên mật khẩu',
    emailAddress: 'Địa chỉ mail',
    resetPassword: 'Lấy lại mật khẩu',
    resetPasswordSuccessMessage: 'Link lấy lại mật khẩu đã được gửi đến email/điện thoại của bạn.',
    verifyYourEmail: 'Kiểm tra email',
    checkEmailToResetPassword: 'Hãy kiểm tra email để lấy lại',
    emailFieldRequired: 'Bạn phải nhập email.',
    invalidEmail: 'Email phải là một địa chỉ hợp lệ.',
  },
  transactionDetail: {
    transactionDetail: 'Chi tiết giao dịch',
    copy_txid: 'Copy Txid',
    check_export: 'Check Export',
    copyTxidSuccess: 'Copied Txid successfully.',
  },
  setting2fa: {
    downloadAndInstallTitle: 'Download and Install',
    backupKey: 'Backup Key',
    enterBackupKey: 'Enter Backup Key',
    setupCode: 'Setup Code',
    googleAuth: 'Google Auth',
    loginPassword: 'Login Password',
    smsAuthCode: 'SMS Auth Code',
    googleAuthCode: 'Google Auth Code',
    sendSms: 'Send SMS',
    launchGoogleAuthenticator: 'Launch Google Authenticator',
    manuallyEnterYourAccount: 'Manually enter your account and provided 16-digit key',
    useGoogleAuthenticator: 'Use Google Authenticator code to login',
    EnterBackupKeyIncorrect: 'Enter backup key incorrect!',
    copyKey: 'Copy key',
    passwordRequired: 'Password is required!',
    smsCodeRequired: 'SMS code is required!',
    smsCodeRequiredNumber: 'SMS code is not a number!',
    googleOtpCodeRequired: 'Google auth code is required!',
    googleOtpCodeRequiredNumber: 'Google auth is not a number!',
    saveKeyOnPaper: 'Please save this key on paper. This key will allow you to recover your Google Authentication in case of phone loss.',
    downloadAndInstall: 'Please download and install',
    googleAuthenticator: 'Google Authenticator',
    onYourPhone: 'on your phone to begin.',
    enterGoogleOtpKey: 'Please enter the 16-digit key you just backed up.',
  },
  googleOtp2faVerify: {
    title: '2FA Authenticator',
    smsAuthenticator: 'SMS Authenticator',
  },
  restoreWalletScreen: {
    title: 'Khôi phục tài khoản',
    titleForm: 'Nhập 12 từ bí mật để khôi phục tài khoản và giao dịch.',
    inputPlaceholder: 'Khóa bảo mật',
    mnemonicRequired: 'Nhập khóa bảo mật.',
    invalidMnemonic: 'Sai khóa bảo mật.',
    errors: {
      mnemonic_not_found: 'Không tìm thấy wallet trên hệ thống.',
      textInput: 'This is case sensitive. Please care about uppercase and lowercase',
    },
  },
  terms: {
    title: 'Điều khoản dịch vụ',
    contentTermsAndCondition: 'This agreement is between you (together with the “Parties” and each a “Party”) and service operator, MANGO REMITTANCE CU, PHIL. INCORPORATED., its affiliates and subsidiaries (collectively referred to herein as “Mango Remittance”, “we”, “us”, or “our”). By using any Mango Remittance services, whether through the website, any associated website, API, or mobile application (collectively, “Services”), you agree that you have read, understood, and accept all of the terms and conditions located at Mango Remittance website (https://mangocoin.net/terms.html).',
    titleTermsAndCondition: 'TERMS AND CONDITIONS OF USE',
    titlePrivacy: 'Privacy Policy',
    contentPrivacy: 'This Privacy Policy (\"Policy\") describes our policies regarding the collection, usage,\nprotection and processing of personally identifiable information received from Users\n(\"User\", \"You\") of the https:\/\/www.mangocoin.net\/ and its related applications and\nservices (\"Wallet\", \"We\", \"Our\" or \"Us\").\nWe encourage you to read our Privacy Policy carefully before using our Wallet. We do\nnot collect any information that may identify You without your permission. However, by\nusing the Wallet, you give us a consent and permission to collect, store and use the\ninformation about you, including your personal information, as prescribed by this Policy.\nYou acknowledge and agree that such personal information may be transferred to and\nstored on the servers of the Wallet and the servers of authorized third parties.\n1. We may collect the information provided or generated whenever the User takes any\naction in our Wallet or omits to do it or otherwise uses Our services, such as without\nlimitation:\nInformation about yourself, which You may provide to Us, including, but not limited to\nthe name, email address, mailing address, phone number, alias, password and photo\nused by you as an identifier of your account, that allow us to designate the specific\nwallet to you and provide you with the exclusive access to your funds.;\nIP address to identify the session and allow you to terminate the session that doesn’t\nbelong to you;\nCookies. Cookies are files with small amount of data, which may include an anonymous\nunique identifier. Cookies are sent to Your browser from the Wallet and stored on Your\ncomputer&#39;s hard drive. Like many Wallets, We use \"cookies\" to collect information. We\nuse cookies on our Wallet to collect data about Your visit and to allow You to navigate\nfrom page to page without necessity to re-login each time, count visits, and see which\nareas and features of our Wallet are popular. You can control and\/or delete cookies if\nyou wish. You can delete all cookies that are already on Your computer and You can\nset most browsers to prevent them from being stored therein. If You do this, however,\nYou may have to manually adjust some preferences every time You visit the Wallet and\nsome services and functionalities may not work;\nThe type (including identifiers) of the device of the mobile devices You use with the\nWallet, platform type, geolocation information, internet service, operating system,\nbrowser, browser language etc. to provide the best service and identify possible issues\nwith particular type of device or operating system or language;\nIn-Wallet behavioral information such as without limitation Your visits of the Wallet,\nclicks on ads or other similar information including additional related data (or metadata),\nsuch as the time, date, and location related to such behavior. That information would\nhelp you to regain access to your wallet in case you lose your device or forget the password. It also allows us to analyze the usage of our wallet and may help us to\ndesign the better UI in the wallet;\nWe use Google Analytics in Our Wallet. For more information about Google Analytics\nand its “do not track” policy, please visit https:\/\/www.google.com\/analytics\/terms\/us.html\n2. We share some personal information with certain providers that perform services on\nour behalf. We only share the personal information which is necessary for them to\nperform those services. We require any provider with which we may share personal\ninformation to protect that data in a manner consistent with this policy and to limit the\nuse of such personal information to the performance of services for Mango Wallet.\nPlease note that those providers have its’ own privacy policies which will govern the\nshared information. In particular, we may share some information with such providers.\n3. We implement a variety of security measures when You enter, submit, or access to\nour Wallet in order to maintain the safety of Your personal information. We do not use\nvulnerability scanning and\/or scanning to PCI standards. We use regular malware\nscanning. Your personal information is contained behind secured networks and is only\naccessible by a limited number of staff who have special access rights to such systems,\nand are required to keep the information confidential. In addition, all sensitive\/credit\ninformation You supply is encrypted via Secure Socket Layer (SSL) technology.\n4. Without prejudice to Our efforts on protection of Your information nothing herein\nconstitutes a warranty of security of the Wallet, and You agree to transmit information at\nYour own risk. Please note, that the Wallet does not guarantee that Your information\nmay not be accessed, disclosed, altered, or destroyed by breach of any of Our physical,\ntechnical, or managerial safeguards.\n5. We may use the information we collect from You in any ways in order to:\n Deliver the type of content and product in which You are interested in;\n Improve customer service;\n Quickly process Your transactions;\n Provide responses to official requests of competent authorities;\n Send information and updates pertaining to Your use of the Wallet via periodic e-\nmails;\n Help you to regain the access to your wallet in case of lost devices or forgotten\npassword.\n6. Notwithstanding anything to the contrary in this Privacy Policy, We may preserve or\ndisclose Your information if we believe that it is reasonably necessary to comply with a\nlaw, regulation, legal process, or governmental request; to protect the safety of any\nperson or assets and rights related thereto; to address fraud, security or technical\nissues. The Wallet may in particular share Your personal information with law\nenforcement, data protection authorities, government officials, and other authorities only when the Wallet is legally bound to do so or has to protect the safety of users and the\nWallet.\n7. You acknowledge and agree that the Wallet is not liable for any illegal or abusive use\nof Your information. You acknowledge and agree, that in case You share Your\ninformation from the Wallet in social or other networks, or other third-party sites and\/or\nplatforms, your information is subject to privacy policies of such third-party resources.\n8. The information which is no longer identifiable is eligible to be transferred to and to be\nshared with the third parties such as without limitation Our services&#39; providers or\nadvertising partners.\n9. We may, at Our sole discretion, include or offer third-party products or services in the\nWallet. These third-party providers have separate and independent privacy policies.\nWe, therefore, have no responsibility or liability for the content and activities of these\nlinked services.\n10. The wallet may update this Policy at any time. We will notify you on any changes\nprior to the date when they become effective by email (sent to the e-mail address\nspecified in your account) or in the announcement in the wallet or on the website.\n11. If there are any questions regarding this Policy or feedback related thereto You may\ncontact Us using the enq@mangocoin.net e-mail.',
    titleEndUser: 'END-USER LICENSE AGREEMENT',
    contentEndUser: 'This End-User License Agreement (“EULA”) is a legal agreement between You\n(“Licensee”, “You”) as the user (either an individual or an entity) of\nhttps:\/\/www.mangocoin.net\/ and its related mobile and other applications and Mango\nWallet, legal entity acting and incorporated under the laws of Malta (hereinafter referred\nto as “Licensor”) who operates https:\/\/www.mangocoin.net\/ and its related mobile and\nother applications (“Wallet”).\n1. BY INSTALLING, COPYING AND OTHERWISE USING THE SOFTWARE AND THE\nIP YOU ACCEPT THE TERMS OF THIS EULA REGARDING THE SOFTWARE AND\nTHE IP. IF YOU DO NOT ACCEPT THESE TERMS, YOU ARE NOT PERMITTED TO\nUSE THE SOFTWARE AND THE IP.\n2. The definition “Software” refers hereinafter to all HTML files, XML files, Java files,\ngraphics files, animation files, video files, data files, technology, development tools,\nscripts and programs, both in object code and source code etc. The Software is owned\nby Licensor and\/or its affiliates and is incorporated into the Wallet in order to ensure\nfunctionality of the Wallet.\n3. The definition &quot;IP&quot; refers hereinafter to any other intellectual property items of\nLicensor and\/or its affiliates incorporated into or associated with the Wallet such as\npatents, designs know-how, associated media, online or electronic documentation.\n4. Subject to the terms of this Agreement, we hereby grant you a limited, non-\nsublicensable, worldwide, non-assignable, non-exclusive and royalty-free license with\nfollowing rights: you may download, install, use, access, display and run one copy of the\nSoftware only as an end user of the Wallet and You shall use the IP only as an end user\nof the Wallet and only for the purposes of exploiting the Wallet and its functions.\n5. The Software and the IP are protected by copyright, patent, registration and other\nintellectual property regulations. You acknowledge and agree that any and all\nintellectual property rights in the Wallet are and shall remain the exclusive property of\nLicensor. Nothing in this Agreement intends to or shall transfer any intellectual property\nrights to you. You agree, that Licensor and its affiliates may collect and use (including\nthrough any applications) technical information for the purposes of the Wallet support\nservices.\n6. You agree not to sell, transfer, assign, rent, lease, distribute, export, import, act as an\nintermediary or provider, provide licenses or otherwise grant rights to third parties with\nregard to the Software, IP or Wallet or any part thereof.\n7. You may not reverse engineer, decompile, disassemble, otherwise attempt to\ndiscover the source code or algorithms of the Software, adapt, modify or alter otherwise\nthe IP or the Software and any part thereof, disable any features of the Software, create\nderivative works based on the Software or the IP, make back-up copies, register the Software, the IP or any part thereof or use the Software, the IP or any part thereof for\ncommercial purposes, including without limitation deriving profit. Failure to comply with\nrestrictions specified in this EULA may lead to civil, administrative or criminal liability\nunder applicable law.\n8. Licensor may provide to You or make available to You Updates after the date You\nobtain Your initial copy of the Software in order to improve such Software or ultimately\nenhance Your user experience with the Wallet. This EULA applies to all and any\ncomponent of the Update that Licensor may provide to You or make available to You\nafter You obtain Your initial copy of the Software, unless we provide other terms along\nwith such Update. The definition &quot;Update&quot; refers to all updates, upgrades, supplements\nand add-on components (if any) of the Software and IP, including bug fixes, service\nupgrades (partly or entire), products or devices, and updates, and enhancements to any\nSoftware previously installed (including entirely new versions). To use the Software\nprovided through Update, You must first be licensed for the Software identified by\nLicensor as eligible for the Update. The updated Software version may add new\nfunctions and, in some limited cases, may delete existing functions.\n9. This EULA is effective for the period the Wallet, the IP and the Software are being\nused by You.\n10. UNLESS SEPARATELY STATED ALL SOFTWARE AND\/OR IP PROVIDED BY\nLICENSOR WITH THE WALLET (WHETHER INCLUDED WITH THE WALLET,\nDOWNLOADED, OR OTHERWISE OBTAINED) IS PROVIDED “AS IS” AND ON AN\n“AS AVAILABLE” BASIS, WITHOUT WARRANTIES OF ANY KIND FROM LICENSOR,\nEITHER EXPRESS OR IMPLIED. TO THE FULLEST POSSIBLE EXTENT PURSUANT\nTO APPLICABLE LAW, LICENSOR DISCLAIMS ALL WARRANTIES EXPRESS,\nIMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, IMPLIED\nWARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY OR\nWORKMANSHIP LIKE EFFORT, FITNESS FOR A PARTICULAR PURPOSE,\nRELIABILITY OR AVAILABILITY, ACCURACY, LACK OF VIRUSES, QUIET\nENJOYMENT, NON INFRINGEMENT OF THIRD PARTY RIGHTS OR OTHER\nVIOLATIONS OF RIGHTS. SOME JURISDICTIONS DO NOT ALLOW EXCLUSIONS\nOR LIMITATIONS OF IMPLIED WARRANTIES, SO SOME OF THE ABOVE\nEXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU. NO ADVICE OR\nINFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM\nLICENSOR OR ITS AFFILIATES SHALL BE DEEMED TO ALTER THIS DISCLAIMER\nBY LICENSOR OF WARRANTY REGARDING THE SOFTWARE AND\/OR IP OR\nEULA, OR TO CREATE ANY WARRANTY OF ANY SORT FROM LICENSOR.\n11. LICENSOR DISCLAIMS ANY RESPONSIBILITY FOR ANY DISCLOSURE OF\nINFORMATION OR ANY OTHER PRACTICES OF ANY THIRD-PARTY APPLICATION\nPROVIDER. LICENSOR EXPRESSLY DISCLAIMS ANY WARRANTY REGARDING\nWHETHER YOUR PERSONAL INFORMATION IS CAPTURED BY ANY THIRD-PARTY APPLICATION PROVIDER OR THE USE TO WHICH SUCH PERSONAL\nINFORMATION MAY BE PUT BY SUCH THIRD-PARTY APPLICATION PROVIDER.\n12. LICENSOR WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING\nOUT OF OR RELATING TO THE USE OR THE INABILITY TO USE THE SOFTWARE\nAND\/OR IP OR COMBINE THE SOFTWARE WITH ANY THIRD PARTY\nAPPLICATION, ITS CONTENT OR FUNCTIONALITY, INCLUDING BUT NOT LIMITED\nTO DAMAGES CAUSED BY OR RELATED TO ERRORS, OMISSIONS,\nINTERRUPTIONS, DEFECTS, DELAY IN OPERATION OR TRANSMISSION,\nCOMPUTER VIRUS, FAILURE TO CONNECT, NETWORK CHARGES, IN-APP\nPURCHASES, AND ALL OTHER DIRECT, INDIRECT, SPECIAL, INCIDENTAL,\nEXEMPLARY, OR CONSEQUENTIAL DAMAGES EVEN IF LICENSOR HAS BEEN\nADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO\nNOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR\nCONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE EXCLUSIONS OR\nLIMITATIONS MAY NOT APPLY TO YOU. NOTWITHSTANDING THE FOREGOING,\nLICENSOR TOTAL LIABILITY TO YOU FOR ALL LOSSES, DAMAGES, CAUSES OF\nACTION, INCLUDING BUT NOT LIMITED TO THOSE BASED ON CONTRACT, TORT,\nOR OTHERWISE, ARISING OUT OF YOUR USE OF THE SOFTWARE AND\/OR IP\nON THIS WALLET, OR ANY OTHER PROVISION OF THIS EULA, SHALL NOT\nEXCEED THE AMOUNT OF 100 USD. THE FOREGOING LIMITATIONS,\nEXCLUSIONS, AND DISCLAIMERS SHALL APPLY TO THE MAXIMUM EXTENT\nPERMITTED BY APPLICABLE LAW, EVEN IF ANY REMEDY FAILS ITS ESSENTIAL\nPURPOSE.\n13. The wallet may update this EULA at any time. We will notify you on any changes\nprior to the date when they become effective by email (sent to the e-mail address\nspecified in your account) or in the announcement in the wallet or on the website.\n14. The Licensee acknowledges and agrees that the breach by it of any obligations\nhereunder may cause serious and irreparable harm to Licensor, which probably could\nnot adequately be compensated for in damages. Licensee therefore consents to an\norder of specific performance or an order of injunctive relief being issued against\nLicensee restraining it from any further breach of such provisions and agrees that\nLicensor may issue such injunction against it without the necessity of an undertaking as\nto damages. The provisions of this section shall not derogate from any other remedy,\nwhich Licensor may have in the event of such a breach.\n15. This EULA represents the entire agreement between You and Licensor relating to\nthe Software and the IP and supersedes all prior or contemporaneous oral or written\ncommunications, proposals and representations with respect to the Software and the IP\nor any other subject matter covered by this EULA.\n16. If any provision of this EULA is held to be void, invalid, unenforceable or illegal, the\nother provisions shall continue in full force and effect.\n17. This EULA and any dispute between the parties arising thereof will be governed the\nlaws of Malta, without giving effect to any conflict of laws principles that may provide for\nthe application of the law of another jurisdiction.\n18. You and Mango Wallet agree to notify each other in writing of any dispute within\nthirty (30) days of when it arises. Notice to Mango Wallet shall be sent to\nenq@mangocoin.net\n19. You and Mango Wallet agree to arbitrate any dispute arising from these Terms or\nyour use of the Services, except for disputes in which either party seeks equitable and\nother relief for the alleged unlawful use of copyrights, trademarks, trade names, logos,\ntrade secrets or patents.\n20. Whether the dispute is heard in arbitration or in court, you will not commence\nagainst Mango Wallet a class action, class arbitration or representative action or\nproceeding.\n21. Any dispute, controversy, difference or claim arising out of or relating to the Terms,\nincluding the existence, validity, interpretation, performance, breach or termination\nthereof or any dispute regarding non-contractual obligations arising out of or relating to\nit shall be referred to and finally resolved by arbitration administered by the Malta\nArbitration Centre (MAC) under the MAC Administered Arbitration Rules in force when\nthe Notice of Arbitration is submitted.\n22. The law of this arbitration clause shall be Malta law.\n23. The seat of arbitration shall be in Malta.',
  },
  backupPassphraseScreen: {
    title: 'Sao lưu khóa bảo mật.',
  },
  loginUserPin: {
    enterPincode: 'Nhập mã PIN',
    incorrectPincode: 'Sai mã PIN',
    pleaseAgain: 'Hãy thử lại	',
    touchID: 'Touch sensor to open your app',
    touchIdDisabled: 'Your touch ID is disable in a few minute',
    errorCodePin: 'Error Code Pin!',
  },
  addPinScreen: {
    title: 'Tạo mã PIN',
    changePinSuccess: 'Tạo mã PIN thành công',
    incorrectPincode: 'Mã PIN không đúng',
    pleaseAgain: 'Hãy thử lại',
    newPin: 'Mã PIN mới',
    currentPin: 'Mã PIN hiện tại',
    confirmNewPin: 'Xác nhận mã PIN mới',
    confirmFail: 'Bạn nhập không đúng',
  },
  localCurrencyScreen: {
    title: 'Chuyển đổi tiền tệ',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    usDollar: 'Tiền Mỹ ($)',
    philippinesPeso: 'Tiền Philippines (₱)',
  },
  backupPassphrase: {
    title: 'Sao lưu khóa bảo mật',
    titlePrivatekey: 'Sao lưu khóa bảo mật',
    note: 'Hãy sao lưu các từ bên dưới theo thứ tự. Những từ này sẽ cho phép bạn khôi phục ví.\n',
    important: 'Đừng làm mất! Bạn không thể khôi phục ví nếu mất nó.',
    btnCopy: 'Sao chép',
    btnNext: 'Tiếp',
    copied: 'Copied passphrase successfully.',
    copiedPrivateKey: 'Copied private key successfully.',
  },
  exit: {
    content: 'Please click BACK again to exit',
  },
  mobileNumberVerification: {
    title: 'Mobile Number Verification',
    contentUpdate: 'Your mobile phone can be used to enable two-factor authentication, helping to secure your wallet from unauthorized access.',
    contentVerify: 'We have sent your mobile an SMS message with a verification code. Enter the code to verify your mobile phone number.',
    phoneNumber: 'Phone Number',
    cancel: 'Cancel',
    update: 'Update',
    resend: 'Resend',
    verify: 'Verify',
    message: 'Please enter phone number',
    searchCountry: 'Please input Keywords',
    enterCode: 'Enter code',
  },
  loginListScreen: {
    title: 'Sign In With',
    createWallet: 'Create',
    phoneNumber: 'Phone number',
    emailAddress: 'Email Address',
    passportNumber: 'Passport Number',
    facebook: 'Facebook',
  },
  PassportNumberVerifyScreen: {
    title: 'Passport Number',
    enterPassportNumber: 'Enter passport number',
    instruction: 'Please take a clear photo like the sample and upload to verify',
    selectImage: 'Select Image',
    continue: 'Continue',
    messengerPassport: 'Please enter passport number',
    messengerImage: 'Please select image',
  },
  uploadPassportNumber: {
    title: 'Passport Number',
    selectImage: 'Select Image',
    submit: 'Submit',
    submitSuccess: 'submit success',
    messengerImage: 'Please select image',
  },
  http: {
    _426: 'Update Required',
    _503: 'Server Maintenance.',
  },
  mangoHeader: {
    settings: 'Settings',
    signout: 'Sign out',
  },
  mangoConnectionLost: {
    titleMessage: 'No Internet Connection',
    contentMessageFirst: 'You are not connected to the internet.',
    contentMessageSecond: 'Make sure Wi-Fi is on, Airplane Mode is off and try again.',
  },
};
