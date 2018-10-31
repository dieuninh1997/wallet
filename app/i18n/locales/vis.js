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
    createWallet: 'PAGHIMO OG WALLET',
    signin: 'Mag-sign In',
    restoreAccount: 'Ibalik og account',
  },
  signin: {
    title: 'Mag-sign In',
    forgotPassword: 'Nakalimtan ang password',
    inputWalletId: 'Wallet ID',
    inputPassword: 'Passwords',
    btnCreate: 'Paghimo',
    loginFacebook: 'Login With Facebook',
    signInByPhone: 'Sign In With Phone Number',
    signInByEmail: 'Sign In With Email Address',
    signInByPassport: 'Sign In With Passport',
    passportNumber: 'Numero sa pasaporte',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
  },
  createWallet: {
    signin: 'Mag-sign In',
    title: 'Paghimo og wallet',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    passportNumber: 'Passport Number',
    facebook: 'Facebook',
  },
  createByPhoneNumber: {
    title: 'Paghimo og account gamit ang numero sa telepono',
    iAccept: 'Akong gidawat ang',
    termsAndConditions: ' patakaran ug kondisyon',
    createWallet: 'Paghimo og wallet',
    cancel: 'Cancel',
    searchCountry: 'Please input Keywords',
  },
  createWalletByEmailScreen: {
    title: 'Paghimo og account gamita ang email address',
    inputEmail: 'Email Address',
    inputPassword: 'Passwords',
    inputPasswordConfirm: 'Kumpirmaha ang iyong password',
    iAccept: 'Akong gidawat ang',
    termsAndConditions: ' Patakaran ug kundisyon',
    createWallet: 'Paghimo og wallet',
    createWaletSuccess: 'Tagumpay',
    readAndCheckTerms: 'Please read and accept terms and conditions!',
    emailInvalid: 'Sayop nga email!',
    passwordMustMatch: 'Ang pasword nga gisulod dili parehas!',
    requireInfo: 'Please enter full information!',
  },
  createWalletByPassportScreen: {
    title: 'Paghimo og account gamit ang numero sa pasaporte',
    inputEmail: 'Numero sa pasaporte',
    inputPassword: 'Passwords',
    inputPasswordConfirm: 'Kumpirmaha ang iyong password',
    iAccept: 'Akong gidawat ang',
    termsAndConditions: ' Patakaran ug kundisyon',
    createWallet: 'Paghimo og wallet',
    createWaletSuccess: 'Tagumpay',
  },
  dashboard: {
    title: 'Dashboard',
    balance: 'Balance',
  },
  send: {
    title: 'Send',
    walletAddress: 'Wallet Address',
    continue: 'Padayon',
    confirmationTextDefault: 'Gibutang ang dose nga salita para mabalik ang imong pondo at transaksyon',
    confirmationText: 'Are you sure want to send {{amount}} {{coinName}} to addresss {{address}}?',
    submitted: 'Submitted',
    addressRequired: 'Recieved address is required!',
    addressInValid: 'Recieved address is not valid!',
    coinValueInValid: 'Coin value is not valid!',
    titleSlowly: 'Bagalan',
    titleRegular: 'Regular',
    titleFast: 'Mabilis',
    speedSlowly: '30 + Minute',
    speedRegular: '5 + Minute',
    speedFast: '2 + Minute',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  setting: {
    title: 'Mga opsyon sa account',
    profile: 'PROFILE',
    walletId: 'Wallet ID',
    email: 'Email',
    mobileNumber: 'Phone Number',
    logIntoWebWallet: 'Mag-log in og Web wallet',
    perferences: 'Mga himan',
    emailNotification: 'Pahibalo sa Email',
    localCurrency: 'Lokal nga kwarta',
    security: 'Seguridad',
    verification: 'Duha ka lakang aron pamatud-an',
    changePassword: 'Bag-oha ang password',
    recoveryPhrase: 'Ibalik',
    changePin: 'Usba ang PIN',
    useFaceIdAsPin: 'Gamita ang Face ID as PIN',
    swipeToReceive: 'I-swipe para madawat',
    verified: 'Napamatud-an',
    unverified: 'Dili napamatud-an',
    disabled: 'Disabled',
    enabled: 'Enabled',
    unconfirmed: 'Dili nakumpirmaha',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  emailVerification: {
    title: 'Pag-verify sa Email',
    content: 'Madawat ka ug mensahe sa imong email address bahin sa imong mga gihimo ug mga pahimangno sa imong account.',
    emailAddress: 'Email Address',
    resend: 'Ipadala ug balik',
    cancel: 'Kansela',
    update: 'I-update',
    verificationEmailSent: 'A verification link has been sent to your email account.',
    errors: {
      email_already_verified: 'Your email address has already been verified.',
      email_in_use: 'Gigamit nimo ang imong email address. Paghimo og bag-ong email address.',
    },
  },
  request: {
    title: 'Request',
    copyAddress: 'Kopyahon ang address',
    copied: 'Pagkopya malampuson',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  transactions: {
    title: 'Transaksyon',
    noTransactionAvailable: 'No transaction record available.',
  },
  changePassword: {
    title: 'Bag-oha ang password',
    curentPassword: 'Kasamtangang password',
    newPassword: 'Bag-ong password',
    confirmNewPassword: 'Kumpirmaha amg imong  bag-ong password',
    cancel: 'Kansela',
    update: 'I-update',
    toastEnterFullInfo: 'Please enter full information',
    toastConfirmPassword: 'Ang password na nilagay ay hindi tugma',
    changeSuccess: 'Malampuson',
  },
  ChangePinScreen: {
    title: 'Bag-oha ang PIN',
    changePinSuccess: 'Malampuson',
    currentPin: 'Kasamtangang PIN',
    incorrectPincode: 'Sayop nga PIN',
    pleaseAgain: 'Please try again ',
    newPin: 'Bag-ong PIN',
    confirmNewPin: 'Kumpirmaha ang bag-ong PIN code',
    confirmFail: 'Ang PIN nga gisulod dili parehas',
  },
  genneralText: {
    back: 'Back',
    recieved: 'Nadawat',
    confirmation: 'Kumpirmaha',
    amount: 'Kantidad sa kwarta',
    status: 'Status',
    address: 'Address',
    txid: 'Txid',
    date: 'Petsa',
    ok: 'Ok',
    password: 'Password',
    submit: 'Ipasa',
  },
  resetPassword: {
    forgotPassword: 'Nakalimtan ang password',
    emailAddress: 'Email Address',
    resetPassword: 'Usba nga password',
    resetPasswordSuccessMessage: 'Madawat sa imong email address o phone number ang reset password link. Sundan ang  mga pahimangno sa bag-o sa password.',
    verifyYourEmail: 'I-verify ang imong email',
    checkEmailToResetPassword: 'Tan-awa ang email aron mausab ang password.',
    emailFieldRequired: 'The email field is required.',
    invalidEmail: 'The email must be a valid email address.',
  },
  transactionDetail: {
    transactionDetail: 'Transaction Detail',
    copy_txid: 'Kopyahon ang Txid',
    check_export: 'Check Export',
  },
  setting2fa: {
    downloadAndInstallTitle: 'I-download ug I-install',
    backupKey: 'Backup Key',
    enterBackupKey: 'Ilagay ang iyong backup key',
    setupCode: 'Setup Code',
    googleAuth: 'Google Auth',
    loginPassword: 'Login Password',
    smsAuthCode: 'SMS Auth Code',
    googleAuthCode: 'Google Auth Code',
    sendSms: 'Send SMS',
    launchGoogleAuthenticator: 'Launch Google Authenticator',
    manuallyEnterYourAccount: 'Ibutang ang account ug paghatag og napulo ug unom ka mga numero nga magsilbi nga backup key.',
    useGoogleAuthenticator: 'Gamita ang Google Authenticator code sa pag-log in',
    EnterBackupKeyIncorrect: 'Enter backup key incorrect!',
    copyKey: 'Kopyahon ang key',
    passwordRequired: 'Password is required!',
    smsCodeRequired: 'SMS code is required!',
    smsCodeRequiredNumber: 'SMS code is not a number!',
    googleOtpCodeRequired: 'Google auth code is required!',
    googleOtpCodeRequiredNumber: 'Google auth is not a number!',
    saveKeyOnPaper: 'Itago ang imong backup key kay makatabang kini unsaon pagbalik sa imong Google Authentication kung mawala ang imong mobile phone.',
    downloadAndInstall: 'Palihug mag-download ug mag-install ang ',
    googleAuthenticator: 'Google Authenticator',
    onYourPhone: ' sa imong mobile phone aron makasugod.',
    enterGoogleOtpKey: 'Ibutang sa napulo ug unom ka mga numero sa imong gihimo na backup key.',
  },
  googleOtp2faVerify: {
    title: '2FA Authenticator',
    smsAuthenticator: 'SMS Authenticator',
  },
  restoreWalletScreen: {
    title: 'Ibalik ang account',
    titleForm: 'Gibutang ang dose nga salita para mabalik ang imong pondo at transaksyon',
    inputPlaceholder: 'Backup Phrase',
    mnemonicRequired: 'Please enter your backup phrase.',
    invalidMnemonic: 'Invalid backup phrase.',
    errors: {
      mnemonic_not_found: 'Wallet not found.',
    },
  },
  terms: {
    title: 'Patakaran ug kundisyon',
    content: 'This agreement is beetween you and the service operator, Mango. By using any services made available through the Mango website (https://www.mgc.com).',
  },
  backupPassphraseScreen: {
    title: 'Backup Phrase',
  },
  loginUserPin: {
    enterPincode: 'Ibutang ang imong  PIN code',
    incorrectPincode: 'Sayop nga PIN',
    pleaseAgain: 'Please try again ',
    touchID: 'Touch sensor to open your app',
    touchIdDisabled: 'Your touch ID is disable in a few minute',
  },
  addPinScreen: {
    title: 'Add New PIN',
    changePinSuccess: 'Malampuson',
    incorrectPincode: 'Sayop nga PIN',
    pleaseAgain: 'Please try again',
    newPin: 'Bag-ong PIN',
    currentPin: 'Kasamtangang PIN',
    confirmNewPin: 'Kumpirmaha ang bag-ong PIN code',
    confirmFail: 'Ang PIN nga gisulod dili parehas',
  },
  localCurrencyScreen: {
    title: 'Lokal na pera',
    cancel: 'Kansela',
    confirm: 'Kumpirmaha',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  backupPassphrase: {
    title: 'Backup your Passphrase',
    note: 'Please save these words in order. These words will allow you to recover your wallet.\n',
    important: 'Ayaw kini kapildi tungod kay kini dili mapasig-uli.',
    btnCopy: 'Kopyahon',
    btnNext: 'Sunod',
  },
  exit: {
    content: 'Please click BACK again to exit',
  },
  mobileNumberVerification: {
    title: 'Phone Number Verification',
    contentUpdate: 'Ang imong mobile phone magsilbi nga usa ka pamatuod ug makatabang sa seguridad sa imong wallet account.',
    contentVerify: 'Ibutang ang verification code nga nadawat aron sa pag-verify sa imong mobile phone.',
    phoneNumber: 'Phone Number',
    cancel: 'Kansela',
    update: 'I-update',
    resend: 'Ipadala ug balik',
    verify: 'Pamatud-an',
    message: 'Please enter phone number',
    searchCountry: 'Please input Keywords',
  },
  loginListScreen: {
    title: 'Sign In With',
    createWallet: 'Paghimo',
    phoneNumber: 'Phone number',
    emailAddress: 'Email Address',
    passportNumber: 'Numero sa pasaporte',
    facebook: 'Facebook',
  },
  PassportNumberVerifyScreen: {
    title: 'Passport Number',
    enterPassportNumber: 'Enter passport number',
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
};
