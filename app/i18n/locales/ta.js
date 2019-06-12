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
      settingLabel: 'U.S Dollar ($)',
    },
    PHP: {
      settingLabel: 'Philippines Peso (₱)',
    },
  },
  landing: {
    coinName: 'Mango Coin',
    coinDescription: 'Make a better future',
    createWallet: 'GUMAWANG WALLET',
    signin: 'Mag-sign in',
    restoreAccount: 'Ibalik ang account',
  },
  signin: {
    title: 'Mag-sign In',
    forgotPassword: 'Nakalimutan ang password',
    inputWalletId: 'Wallet ID',
    inputPassword: 'Passwords',
    btnCreate: 'Gumawa',
    loginFacebook: 'Log In With Facebook',
    signInByPhone: 'Sign In With Phone Number',
    signInByEmail: 'Sign In With Email Address',
    signInByPassport: 'Sign In With ID Number',
    passportNumber: 'Numero ng pasaporte',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    cancel: 'キャンセル',
    searchCountry: 'Please input Keywords',
  },
  createWallet: {
    signin: 'Ma-sign In',
    title: 'Gumawa ng Wallet',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    passportNumber: 'Numero ng Pasaporte',
    facebook: 'Facebook',
  },
  createByPhoneNumber: {
    title: 'Gumawa ng account gmit ang Phone number',
    iAccept: 'Tinata nggap ko ang',
    termsAndConditions: ' mga tuntunin at kundisyon',
    cancel: 'Cancel',
    searchCountry: 'Please input Keywords',
    ListofAcceptableIdentificationCards: 'List of Acceptable Identification Cards',
  },
  createWalletByEmailScreen: {
    title: 'Gumawa ng account gmit ang email address',
    inputEmail: 'Email Address',
    inputPassword: 'Passwords',
    inputPasswordConfirm: 'Kumpirmahin ang Passwords',
    createWallet: 'Gumawa ng Wallet',
    createWaletSuccess: 'Gumawa ng wallet ay tagumpay',
    readAndCheckTerms: 'Please read and accept terms and conditions!',
    emailInvalid: 'Mali ang Email',
    passwordMustMatch: 'Ang password na nilagay ay hindi tugma!',
    requireInfo: 'Please enter full information!',
    passportInvalid: 'ID number is not valid! Please enter only letters and number',
    passwordInvalid: 'Password must include uppercase and lowercase letters, numbers and at least 8 characters',
  },
  createWalletByPassportScreen: {
    title: 'Gumawa ng account gamit ang numero ngpasaporte',
    inputEmail: 'Numero ng Pasaporte',
  },
  dashboard: {
    title: 'Dashboard',
    balance: 'Balance',
  },
  chart: {
    allTime: 'All time',
  },
  send: {
    title: 'Send',
    walletAddress: 'Wallet Address',
    continue: 'Ituloy',
    confirmationTextDefault: 'Ipasok ang iyong 12 backup na mga salita na may mga puwang upang mabawi ang iyong mga pondo at transaksyon',
    confirmationText: 'Are you sure you want to send {{amount}} {{coinName}} to addresss {{address}}?',
    submitted: 'Submitted',
    addressRequired: 'Kinakailangan ang nakuhang address!',
    addressInValid: 'Ang nakuhang address ay hindi wasto!',
    coinValueInValid: 'Ang halaga ng coin ay hindi wasto!',
    titleSlowly: 'Bagalan',
    titleRegular: 'Regular',
    titleFast: 'Mabilis',
    speedSlowly: '30 + Minute',
    speedRegular: '5 + Minute',
    speedFast: '2 + Minute',
    notice: 'Paunawa: Ang wallet na ito ay magagamit sa Ropsten Testnet. Mangyaring huwag magpadala ng barya mula sa Mainnet sa address na ito!!!',
  },
  setting: {
    title: 'Settings',
    profile: 'PROFILE',
    walletId: 'Wallet ID',
    email: 'Email',
    mobileNumber: 'Phone number',
    logIntoWebWallet: 'Mag-log in sa Web wallet',
    perferences: 'Kagustuhan',
    emailNotification: 'Mga abiso sa email',
    localCurrency: 'Lokal na pera',
    security: 'Seguridad',
    verification: 'Dalawang hakbang para mapatunayan',
    changePassword: 'Palitan ang password',
    recoveryPhrase: 'Recovery Private Key ',
    changePin: 'Magpalit ng PIN',
    useFaceIdAsPin: 'Gumamit ng Face ID bilang PIN',
    swipeToReceive: 'I-swipe upang makatanggap',
    unverified: 'Hindi napatunayan',
    disabled: 'Disabled',
    enabled: 'Enabled',
    unconfirmed: 'Hindi kumpirmado',
    passportNumber: 'ID Number',
    rejected: 'Rejected',
  },
  emailVerification: {
    title: 'Pag-verify ng Email',
    content: 'Makakatanggap ng mensahe ang iyong email address tungkol sa mga aktibidad na iyong ginawa, mga paalala sa iyong wallet login ID at mga babayarin sa pagtanggap ng pondo.',
    emailAddress: 'Email Address',
    resend: 'I-send muli',
    cancel: 'Kanselahin',
    update: 'I-update',
    verificationEmailSent: 'A verification link has been sent to your email account.',
    errors: {
      email_already_verified: 'Your email address has already been verified.',
      email_in_use: 'This email address is already in use.',
      cannot_change_email: 'This email can not change',
    },
  },
  request: {
    title: 'Request',
    copyAddress: 'Kopyahin ang Address',
    copied: 'Ang pagkopya ay tagumpay',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  transactions: {
    title: 'Transaksyon',
    noTransactionAvailable: 'No transaction record available.',
  },
  changePassword: {
    title: 'Magpalit ng password',
    curentPassword: 'Kasalukuyang password',
    newPassword: 'Bagong password',
    confirmNewPassword: 'Kumpirmahin ang bagong password',
    cancel: 'Kanselahin',
    update: 'I-update',
    toastEnterFullInfo: 'Mangyaring ipasok ang buong impormasyon',
    toastConfirmPassword: 'Confirm password is incorrect',
    changeSuccess: 'Tagumpay',
    otp: 'Otp Code',
  },
  ChangePinScreen: {
    title: 'Palitan ng PIN',
    changePinSuccess: 'Tagumpay',
    currentPin: 'Kasalukuyang PIN',
    incorrectPincode: 'Maling PIN',
    pleaseAgain: 'Please try again ',
    newPin: 'Bagong PIN',
    confirmNewPin: 'Kumpirmahin ang bagong PIN',
    confirmFail: 'Ang PIN na nilagay ay hindi tugma',
  },
  genneralText: {
    confirmation: 'Kumpirmahin',
    amount: 'Halaga ng pera',
    status: 'Status',
    address: 'Address',
    txid: 'Txid',
    date: 'Petsa',
    ok: 'Ok',
    password: 'Password',
    submit: 'Ipasa',
  },
  resetPassword: {
    forgotPassword: 'Nakalimutan ang password',
    emailAddress: 'Email Address',
    resetPassword: 'Baguhin ang password',
    resetPasswordSuccessMessage: 'Makakatanggap ang iyong email o phone number ng reset password link. Sumunod sa mga tagubilin sa pagbago ng password.',
    verifyYourEmail: 'I-verify ang imong email',
    checkEmailToResetPassword: 'Tingnan ang email upang mabago ang password.',
    emailFieldRequired: 'The email field is required.',
    invalidEmail: 'The email must be a valid email address.',
  },
  transactionDetail: {
    transactionDetail: 'Detalye ng Transaksyon',
    copy_txid: 'Kopyahin ang Txid',
    check_export: 'Check Export',
    copyTxidSuccess: 'Copied Txid successfully.',
  },
  setting2fa: {
    downloadAndInstallTitle: 'I-download at I-install',
    backupKey: 'Backup Key',
    enterBackupKey: 'Ilagay ang iyong backup key',
    setupCode: 'Setup Code',
    googleAuth: 'Google Auth',
    loginPassword: 'Login Password',
    smsAuthCode: 'SMS Auth Code',
    googleAuthCode: 'Google Auth Code',
    sendSms: 'Send SMS',
    launchGoogleAuthenticator: 'Launch Google Authenticator',
    manuallyEnterYourAccount: 'Ilagay ang account at magbigay ng labing-anim na numero na magsisilbing backup key.',
    useGoogleAuthenticator: 'Gamitin ang  Google Authenticator code para makapag-log in.',
    EnterBackupKeyIncorrect: 'Enter backup key incorrect!',
    copyKey: 'Copy key',
    passwordRequired: 'Password is required!',
    smsCodeRequired: 'SMS code is required!',
    smsCodeRequiredNumber: 'SMS code is not a number!',
    googleOtpCodeRequired: 'Google auth code is required!',
    googleOtpCodeRequiredNumber: 'Google auth is not a number!',
    saveKeyOnPaper: 'Itago ang iyong backup key dahil makakatulong ito upang maibalik ang iyong Google Authentication kung nawala ang iyong phone.',
    downloadAndInstall: 'Para makapagsimula, mangyaring i-download at i-install ang ',
    googleAuthenticator: 'Google Authenticator',
    onYourPhone: ' sa iyong mobile phone.',
    enterGoogleOtpKey: 'Ilagay ang labing anim na numero na iyong ginawang backup key.',
  },
  googleOtp2faVerify: {
    title: '2FA Authenticator',
    smsAuthenticator: 'SMS Authenticator',
  },
  restoreWalletScreen: {
    title: 'Ibalik ang Account',
    titleForm: '*Ilagay ang labing dalawang backup words na magsisilbing proteksyon  para maibalik ang iyong pondo at mga transaksyon',
    inputPlaceholder: 'Backup Phrase',
    mnemonicRequired: 'Please enter your backup phrase.',
    invalidMnemonic: 'Invalid backup phrase.',
    errors: {
      mnemonic_not_found: 'Wallet not found.',
      textInput: 'This is case sensitive. Please care about uppercase and lowercase',
    },
  },
  terms: {
    title: 'Mga Tuntunin at Kundisyon',
    contentTermsAndCondition: 'This agreement is between you (together with the “Parties” and each a “Party”) and service operator, MANGO REMITTANCE CU, PHIL. INCORPORATED., its affiliates and subsidiaries (collectively referred to herein as “Mango Remittance”, “we”, “us”, or “our”). By using any Mango Remittance services, whether through the website, any associated website, API, or mobile application (collectively, “Services”), you agree that you have read, understood, and accept all of the terms and conditions located at Mango Remittance website (https://mangocoin.net/terms.html).',
    titleTermsAndCondition: 'TERMS AND CONDITIONS OF USE',
    titlePrivacy: 'Privacy Policy',
    contentPrivacy: 'This Privacy Policy (\"Policy\") describes our policies regarding the collection, usage,\nprotection and processing of personally identifiable information received from Users\n(\"User\", \"You\") of the https:\/\/www.mangocoin.net\/ and its related applications and\nservices (\"Wallet\", \"We\", \"Our\" or \"Us\").\nWe encourage you to read our Privacy Policy carefully before using our Wallet. We do\nnot collect any information that may identify You without your permission. However, by\nusing the Wallet, you give us a consent and permission to collect, store and use the\ninformation about you, including your personal information, as prescribed by this Policy.\nYou acknowledge and agree that such personal information may be transferred to and\nstored on the servers of the Wallet and the servers of authorized third parties.\n1. We may collect the information provided or generated whenever the User takes any\naction in our Wallet or omits to do it or otherwise uses Our services, such as without\nlimitation:\nInformation about yourself, which You may provide to Us, including, but not limited to\nthe name, email address, mailing address, phone number, alias, password and photo\nused by you as an identifier of your account, that allow us to designate the specific\nwallet to you and provide you with the exclusive access to your funds.;\nIP address to identify the session and allow you to terminate the session that doesn’t\nbelong to you;\nCookies. Cookies are files with small amount of data, which may include an anonymous\nunique identifier. Cookies are sent to Your browser from the Wallet and stored on Your\ncomputer&#39;s hard drive. Like many Wallets, We use \"cookies\" to collect information. We\nuse cookies on our Wallet to collect data about Your visit and to allow You to navigate\nfrom page to page without necessity to re-login each time, count visits, and see which\nareas and features of our Wallet are popular. You can control and\/or delete cookies if\nyou wish. You can delete all cookies that are already on Your computer and You can\nset most browsers to prevent them from being stored therein. If You do this, however,\nYou may have to manually adjust some preferences every time You visit the Wallet and\nsome services and functionalities may not work;\nThe type (including identifiers) of the device of the mobile devices You use with the\nWallet, platform type, geolocation information, internet service, operating system,\nbrowser, browser language etc. to provide the best service and identify possible issues\nwith particular type of device or operating system or language;\nIn-Wallet behavioral information such as without limitation Your visits of the Wallet,\nclicks on ads or other similar information including additional related data (or metadata),\nsuch as the time, date, and location related to such behavior. That information would\nhelp you to regain access to your wallet in case you lose your device or forget the password. It also allows us to analyze the usage of our wallet and may help us to\ndesign the better UI in the wallet;\nWe use Google Analytics in Our Wallet. For more information about Google Analytics\nand its “do not track” policy, please visit https:\/\/www.google.com\/analytics\/terms\/us.html\n2. We share some personal information with certain providers that perform services on\nour behalf. We only share the personal information which is necessary for them to\nperform those services. We require any provider with which we may share personal\ninformation to protect that data in a manner consistent with this policy and to limit the\nuse of such personal information to the performance of services for Mango Wallet.\nPlease note that those providers have its’ own privacy policies which will govern the\nshared information. In particular, we may share some information with such providers.\n3. We implement a variety of security measures when You enter, submit, or access to\nour Wallet in order to maintain the safety of Your personal information. We do not use\nvulnerability scanning and\/or scanning to PCI standards. We use regular malware\nscanning. Your personal information is contained behind secured networks and is only\naccessible by a limited number of staff who have special access rights to such systems,\nand are required to keep the information confidential. In addition, all sensitive\/credit\ninformation You supply is encrypted via Secure Socket Layer (SSL) technology.\n4. Without prejudice to Our efforts on protection of Your information nothing herein\nconstitutes a warranty of security of the Wallet, and You agree to transmit information at\nYour own risk. Please note, that the Wallet does not guarantee that Your information\nmay not be accessed, disclosed, altered, or destroyed by breach of any of Our physical,\ntechnical, or managerial safeguards.\n5. We may use the information we collect from You in any ways in order to:\n Deliver the type of content and product in which You are interested in;\n Improve customer service;\n Quickly process Your transactions;\n Provide responses to official requests of competent authorities;\n Send information and updates pertaining to Your use of the Wallet via periodic e-\nmails;\n Help you to regain the access to your wallet in case of lost devices or forgotten\npassword.\n6. Notwithstanding anything to the contrary in this Privacy Policy, We may preserve or\ndisclose Your information if we believe that it is reasonably necessary to comply with a\nlaw, regulation, legal process, or governmental request; to protect the safety of any\nperson or assets and rights related thereto; to address fraud, security or technical\nissues. The Wallet may in particular share Your personal information with law\nenforcement, data protection authorities, government officials, and other authorities only when the Wallet is legally bound to do so or has to protect the safety of users and the\nWallet.\n7. You acknowledge and agree that the Wallet is not liable for any illegal or abusive use\nof Your information. You acknowledge and agree, that in case You share Your\ninformation from the Wallet in social or other networks, or other third-party sites and\/or\nplatforms, your information is subject to privacy policies of such third-party resources.\n8. The information which is no longer identifiable is eligible to be transferred to and to be\nshared with the third parties such as without limitation Our services&#39; providers or\nadvertising partners.\n9. We may, at Our sole discretion, include or offer third-party products or services in the\nWallet. These third-party providers have separate and independent privacy policies.\nWe, therefore, have no responsibility or liability for the content and activities of these\nlinked services.\n10. The wallet may update this Policy at any time. We will notify you on any changes\nprior to the date when they become effective by email (sent to the e-mail address\nspecified in your account) or in the announcement in the wallet or on the website.\n11. If there are any questions regarding this Policy or feedback related thereto You may\ncontact Us using the enq@mangocoin.net e-mail.',
    titleEndUser: 'END-USER LICENSE AGREEMENT',
    contentEndUser: 'This End-User License Agreement (“EULA”) is a legal agreement between You\n(“Licensee”, “You”) as the user (either an individual or an entity) of\nhttps:\/\/www.mangocoin.net\/ and its related mobile and other applications and Mango\nWallet, legal entity acting and incorporated under the laws of Malta (hereinafter referred\nto as “Licensor”) who operates https:\/\/www.mangocoin.net\/ and its related mobile and\nother applications (“Wallet”).\n1. BY INSTALLING, COPYING AND OTHERWISE USING THE SOFTWARE AND THE\nIP YOU ACCEPT THE TERMS OF THIS EULA REGARDING THE SOFTWARE AND\nTHE IP. IF YOU DO NOT ACCEPT THESE TERMS, YOU ARE NOT PERMITTED TO\nUSE THE SOFTWARE AND THE IP.\n2. The definition “Software” refers hereinafter to all HTML files, XML files, Java files,\ngraphics files, animation files, video files, data files, technology, development tools,\nscripts and programs, both in object code and source code etc. The Software is owned\nby Licensor and\/or its affiliates and is incorporated into the Wallet in order to ensure\nfunctionality of the Wallet.\n3. The definition &quot;IP&quot; refers hereinafter to any other intellectual property items of\nLicensor and\/or its affiliates incorporated into or associated with the Wallet such as\npatents, designs know-how, associated media, online or electronic documentation.\n4. Subject to the terms of this Agreement, we hereby grant you a limited, non-\nsublicensable, worldwide, non-assignable, non-exclusive and royalty-free license with\nfollowing rights: you may download, install, use, access, display and run one copy of the\nSoftware only as an end user of the Wallet and You shall use the IP only as an end user\nof the Wallet and only for the purposes of exploiting the Wallet and its functions.\n5. The Software and the IP are protected by copyright, patent, registration and other\nintellectual property regulations. You acknowledge and agree that any and all\nintellectual property rights in the Wallet are and shall remain the exclusive property of\nLicensor. Nothing in this Agreement intends to or shall transfer any intellectual property\nrights to you. You agree, that Licensor and its affiliates may collect and use (including\nthrough any applications) technical information for the purposes of the Wallet support\nservices.\n6. You agree not to sell, transfer, assign, rent, lease, distribute, export, import, act as an\nintermediary or provider, provide licenses or otherwise grant rights to third parties with\nregard to the Software, IP or Wallet or any part thereof.\n7. You may not reverse engineer, decompile, disassemble, otherwise attempt to\ndiscover the source code or algorithms of the Software, adapt, modify or alter otherwise\nthe IP or the Software and any part thereof, disable any features of the Software, create\nderivative works based on the Software or the IP, make back-up copies, register the Software, the IP or any part thereof or use the Software, the IP or any part thereof for\ncommercial purposes, including without limitation deriving profit. Failure to comply with\nrestrictions specified in this EULA may lead to civil, administrative or criminal liability\nunder applicable law.\n8. Licensor may provide to You or make available to You Updates after the date You\nobtain Your initial copy of the Software in order to improve such Software or ultimately\nenhance Your user experience with the Wallet. This EULA applies to all and any\ncomponent of the Update that Licensor may provide to You or make available to You\nafter You obtain Your initial copy of the Software, unless we provide other terms along\nwith such Update. The definition &quot;Update&quot; refers to all updates, upgrades, supplements\nand add-on components (if any) of the Software and IP, including bug fixes, service\nupgrades (partly or entire), products or devices, and updates, and enhancements to any\nSoftware previously installed (including entirely new versions). To use the Software\nprovided through Update, You must first be licensed for the Software identified by\nLicensor as eligible for the Update. The updated Software version may add new\nfunctions and, in some limited cases, may delete existing functions.\n9. This EULA is effective for the period the Wallet, the IP and the Software are being\nused by You.\n10. UNLESS SEPARATELY STATED ALL SOFTWARE AND\/OR IP PROVIDED BY\nLICENSOR WITH THE WALLET (WHETHER INCLUDED WITH THE WALLET,\nDOWNLOADED, OR OTHERWISE OBTAINED) IS PROVIDED “AS IS” AND ON AN\n“AS AVAILABLE” BASIS, WITHOUT WARRANTIES OF ANY KIND FROM LICENSOR,\nEITHER EXPRESS OR IMPLIED. TO THE FULLEST POSSIBLE EXTENT PURSUANT\nTO APPLICABLE LAW, LICENSOR DISCLAIMS ALL WARRANTIES EXPRESS,\nIMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, IMPLIED\nWARRANTIES OF MERCHANTABILITY, SATISFACTORY QUALITY OR\nWORKMANSHIP LIKE EFFORT, FITNESS FOR A PARTICULAR PURPOSE,\nRELIABILITY OR AVAILABILITY, ACCURACY, LACK OF VIRUSES, QUIET\nENJOYMENT, NON INFRINGEMENT OF THIRD PARTY RIGHTS OR OTHER\nVIOLATIONS OF RIGHTS. SOME JURISDICTIONS DO NOT ALLOW EXCLUSIONS\nOR LIMITATIONS OF IMPLIED WARRANTIES, SO SOME OF THE ABOVE\nEXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU. NO ADVICE OR\nINFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM\nLICENSOR OR ITS AFFILIATES SHALL BE DEEMED TO ALTER THIS DISCLAIMER\nBY LICENSOR OF WARRANTY REGARDING THE SOFTWARE AND\/OR IP OR\nEULA, OR TO CREATE ANY WARRANTY OF ANY SORT FROM LICENSOR.\n11. LICENSOR DISCLAIMS ANY RESPONSIBILITY FOR ANY DISCLOSURE OF\nINFORMATION OR ANY OTHER PRACTICES OF ANY THIRD-PARTY APPLICATION\nPROVIDER. LICENSOR EXPRESSLY DISCLAIMS ANY WARRANTY REGARDING\nWHETHER YOUR PERSONAL INFORMATION IS CAPTURED BY ANY THIRD-PARTY APPLICATION PROVIDER OR THE USE TO WHICH SUCH PERSONAL\nINFORMATION MAY BE PUT BY SUCH THIRD-PARTY APPLICATION PROVIDER.\n12. LICENSOR WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING\nOUT OF OR RELATING TO THE USE OR THE INABILITY TO USE THE SOFTWARE\nAND\/OR IP OR COMBINE THE SOFTWARE WITH ANY THIRD PARTY\nAPPLICATION, ITS CONTENT OR FUNCTIONALITY, INCLUDING BUT NOT LIMITED\nTO DAMAGES CAUSED BY OR RELATED TO ERRORS, OMISSIONS,\nINTERRUPTIONS, DEFECTS, DELAY IN OPERATION OR TRANSMISSION,\nCOMPUTER VIRUS, FAILURE TO CONNECT, NETWORK CHARGES, IN-APP\nPURCHASES, AND ALL OTHER DIRECT, INDIRECT, SPECIAL, INCIDENTAL,\nEXEMPLARY, OR CONSEQUENTIAL DAMAGES EVEN IF LICENSOR HAS BEEN\nADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO\nNOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR\nCONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE EXCLUSIONS OR\nLIMITATIONS MAY NOT APPLY TO YOU. NOTWITHSTANDING THE FOREGOING,\nLICENSOR TOTAL LIABILITY TO YOU FOR ALL LOSSES, DAMAGES, CAUSES OF\nACTION, INCLUDING BUT NOT LIMITED TO THOSE BASED ON CONTRACT, TORT,\nOR OTHERWISE, ARISING OUT OF YOUR USE OF THE SOFTWARE AND\/OR IP\nON THIS WALLET, OR ANY OTHER PROVISION OF THIS EULA, SHALL NOT\nEXCEED THE AMOUNT OF 100 USD. THE FOREGOING LIMITATIONS,\nEXCLUSIONS, AND DISCLAIMERS SHALL APPLY TO THE MAXIMUM EXTENT\nPERMITTED BY APPLICABLE LAW, EVEN IF ANY REMEDY FAILS ITS ESSENTIAL\nPURPOSE.\n13. The wallet may update this EULA at any time. We will notify you on any changes\nprior to the date when they become effective by email (sent to the e-mail address\nspecified in your account) or in the announcement in the wallet or on the website.\n14. The Licensee acknowledges and agrees that the breach by it of any obligations\nhereunder may cause serious and irreparable harm to Licensor, which probably could\nnot adequately be compensated for in damages. Licensee therefore consents to an\norder of specific performance or an order of injunctive relief being issued against\nLicensee restraining it from any further breach of such provisions and agrees that\nLicensor may issue such injunction against it without the necessity of an undertaking as\nto damages. The provisions of this section shall not derogate from any other remedy,\nwhich Licensor may have in the event of such a breach.\n15. This EULA represents the entire agreement between You and Licensor relating to\nthe Software and the IP and supersedes all prior or contemporaneous oral or written\ncommunications, proposals and representations with respect to the Software and the IP\nor any other subject matter covered by this EULA.\n16. If any provision of this EULA is held to be void, invalid, unenforceable or illegal, the\nother provisions shall continue in full force and effect.\n17. This EULA and any dispute between the parties arising thereof will be governed the\nlaws of Malta, without giving effect to any conflict of laws principles that may provide for\nthe application of the law of another jurisdiction.\n18. You and Mango Wallet agree to notify each other in writing of any dispute within\nthirty (30) days of when it arises. Notice to Mango Wallet shall be sent to\nenq@mangocoin.net\n19. You and Mango Wallet agree to arbitrate any dispute arising from these Terms or\nyour use of the Services, except for disputes in which either party seeks equitable and\nother relief for the alleged unlawful use of copyrights, trademarks, trade names, logos,\ntrade secrets or patents.\n20. Whether the dispute is heard in arbitration or in court, you will not commence\nagainst Mango Wallet a class action, class arbitration or representative action or\nproceeding.\n21. Any dispute, controversy, difference or claim arising out of or relating to the Terms,\nincluding the existence, validity, interpretation, performance, breach or termination\nthereof or any dispute regarding non-contractual obligations arising out of or relating to\nit shall be referred to and finally resolved by arbitration administered by the Malta\nArbitration Centre (MAC) under the MAC Administered Arbitration Rules in force when\nthe Notice of Arbitration is submitted.\n22. The law of this arbitration clause shall be Malta law.\n23. The seat of arbitration shall be in Malta.',
  },
  backupPassphraseScreen: {
    title: 'Backup Phrase',
  },
  loginUserPin: {
    enterPincode: 'Ilagay ang PIN code',
    incorrectPincode: 'Maling PIN',
    pleaseAgain: 'Please try again ',
    touchID: 'Touch sensor to open your app',
    touchIdDisabled: 'Your touch ID is disable in a few minute',
    errorCodePin: 'Error Code Pin!',
  },
  addPinScreen: {
    title: 'Magdagdag ng bagong PIN',
    changePinSuccess: 'Tagumpay',
    incorrectPincode: 'Incorrect PIN Code',
    pleaseAgain: 'Please try again',
    newPin: 'Bagong PIN',
    currentPin: 'Kasalukuyang PIN',
    confirmNewPin: 'Kumpirmahin ang bagong PIN code',
    confirmFail: 'Ang PIN na nilagay ay hindi tugma',
  },
  localCurrencyScreen: {
    title: 'Lokal na pera',
    cancel: 'Kanselahin',
    confirm: 'Kumpirma',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  backupPassphrase: {
    title: 'Backup your Passphrase',
    titlePrivatekey: 'Backup your Private Key',
    note: 'Please save your Private Key.  This will allow you to recover your wallet.\n',
    important: 'Do not share it or use it on on a malicious/phishing site.\nMake a paper and soft backup.',
    btnCopy: 'Kopyahin',
    btnNext: 'Susunod',
    copied: 'Copied passphrase successfully.',
    copiedPrivateKey: 'Copied private key successfully.',
  },
  exit: {
    content: 'Please click BACK again to exit',
  },
  mobileNumberVerification: {
    title: 'Phone Number Verification',
    contentUpdate: 'Ang iyong mobile phone ay magsisilbing patunay at makakatulong sa seguridad ng iyong wallet account.',
    contentVerify: 'Ilagay ang verification code na natanggap upang ma-verify ang iyong phone number.',
    phoneNumber: 'Phone Number',
    cancel: 'Kanselahin',
    update: 'I-update',
    resend: 'I-send muli',
    verify: 'I-verify',
    message: 'Please enter phone number',
    searchCountry: 'Please input Keywords',
    enterCode: 'Enter code',
  },
  loginListScreen: {
    title: 'Mag-sign In Gamit ang',
    createWallet: 'Gumawa',
    phoneNumber: 'Phone number',
    emailAddress: 'Email Address',
    passportNumber: 'Numero ng pasaporte',
    facebook: 'Facebook',
  },
  PassportNumberVerifyScreen: {
    title: 'ID Number Verify',
    enterPassportNumber: 'Enter ID number number',
    instruction: 'Please take a clear photo like the sample and upload to verify',
    selectImage: 'Choose image',
    continue: 'Continue',
    messengerPassport: 'Please enter ID number',
    messengerImage: 'Please select image',
  },
  uploadPassportNumber: {
    title: 'ID Number Verify',
    selectImage: 'Choose image',
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
  ListofAccep: {
    title: 'List of Acceptable Identification Cards',
    content: ' a. For Filipino citizens: Those issued by any of the following official authorities: \n   i. Government of the Republic of the Philippines, including its political subdivisions, agencies, and instrumentalities; \n      • Passport\n      • Driver is License (including Student Permits with official receipt)\n      • Professional Regulation Commission (PRC) ID\n      • Postal ID (old postal IDs must have a photo of both front and back)\n      • Unified Multi-Purpose ID (UMID)\n      • National Bureau of Investigation (NBI) Clearance\n      • Armed Forces of the Philippines (AFP) ID\n      • Philippine National Police (PNP) ID\n      • Bureau of Fire Protection ID\n      • Certification from the National Council for the Welfare of Disabled Persons (NCWDP)\n      • Department of Social Welfare and Development (DSWD) Certification\n      • OFW ID\n      • Overseas Workers Welfare Administration (OWWA) ID\n      • Police Clearance Certificate or Police Clearance Card\n      • Seaman’s Books\n      • National Integrated Bar of the Philippines ID\n    ii. Government-Owned or -Controlled Corporations (GOCCs);\n      • Government Service Insurance System (GSIS) e-Card\n      • Social Security System (SSS) Card (date of birth must be visible on the ID)\n   iii. Covered persons registered with and supervised or regulated by the Bangko Sentral, SEC or Insurance Commission (IC);\n   iv. Philippine Statistics Authority (PSA) under the Philippine Identification System (PhilSys)',
    contentB: ' b. For foreign nationals: Passport or Alien Certificate of Registration; ',
    contentC: ' c. For Filipino students: School ID signed by the school principal or head of the educational institution; ',
    contentD: ' d. For low risk customers: Any document or information reduced in writing which the covered person deems sufficient to establish the client’s identity; ',
    contentE: ' e. Other identification documents that can be verified using reliable, independent source documents, data or information.',
  },
};
