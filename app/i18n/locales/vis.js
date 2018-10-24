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
    coinDescription: 'Paghimo og maayong kaugmaon',
    createWallet: 'PAGHIMO OG WALLET',
    signin: 'Mag-sign In',
    restoreAccount: 'Ibalik ang account',
  },
  signin: {
    title: 'Mag-signIn',
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
    title: 'Paghimo og account gamita ang numero sa telepono',
    iAccept: 'Akong gidawat ang',
    termsAndConditions: ' patakaran ug kondisyon',
    createWallet: 'Paghimo og wallet',
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
    emailInvalid: 'Email is not valid!',
    passwordMustMatch: 'Ang pasword nga gisulod dili parehas!',
  },
  createWalletByPassportScreen: {
    title: 'Paghimo og account gamita ang numero sa pasaporte',
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
    continue: 'Ituloy',
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
    perferences: 'Mga gusto o kapilian',
    emailNotification: 'Email Notification',
    localCurrency: 'Lokal na pera',
    security: 'Seguridad',
    verification: '2-step Verification',
    changePassword: 'Bag-oha ang password',
    recoveryPhrase: 'Ibalik',
    changePin: 'Change PIN',
    useFaceIdAsPin: 'Gamita ang Face ID as PIN',
    swipeToReceive: 'I-swipe para madawat',
    verified: 'Napamatud-an',
    unverified: 'Dili napamatud-an',
    disabled: 'Disabled',
    enabled: 'Enabled',
    unconfirmed: 'Unconfirmed',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  emailVerification: {
    title: 'Email Verification',
    content: 'Madawat ka ug mensahe sa imong email address bahin sa imong mga gihimo ug mga pahimangno sa imong account.',
    emailAddress: 'Email Address',
    resend: 'Ipadala ug balik',
    cancel: 'Kansela',
    update: 'I-update',
    verificationEmailSent: 'A verification link has been sent to your email account.',
    errors: {
      email_already_verified: 'Your email address has already been verified.',
      email_in_use: 'This email address is already in use.',
    },
  },
  request: {
    title: 'Request',
    copyAddress: 'Copy Address',
    copied: 'Copied success',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  transactions: {
    title: 'Transactions',
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
    recieved: 'Recieved',
    confirmation: 'Kumpirmaha',
    amount: 'Amount',
    status: 'Status',
    address: 'Address',
    txid: 'Txid',
    date: 'Date',
    ok: 'Ok',
    password: 'Password',
    submit: 'Submit',
  },
  resetPassword: {
    forgotPassword: 'Nakalimtan ang password',
    emailAddress: 'Email Address',
    resetPassword: 'Bag-oha ang password',
    resetPasswordSuccessMessage: 'Madawat sa imong email address o phone number ang reset password link. Sundan ang  mga pahimangno sa bag-o sa password.',
    verifyYourEmail: 'Verify Your Email',
    checkEmailToResetPassword: 'Please check your email to reset',
    emailFieldRequired: 'The email field is required.',
    invalidEmail: 'The email must be a valid email address.',
  },
  transactionDetail: {
    transactionDetail: 'Transaction Detail',
    copy_txid: 'Copy Txid',
    check_export: 'Check Export',
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
    important: 'Do not lose it! It cannot be recovered if you lose it.',
    btnCopy: 'Kopyahon',
    btnNext: 'Next',
  },
  exit: {
    content: 'Please click BACK again to exit',
  },
  mobileNumberVerification: {
    title: 'Mobile Number Verification',
    contentUpdate: 'Your mobile phone can be used to enable two-factor authentication, helping to secure your wallet from unauthorized access.',
    contentVerify: 'We have sent your mobile an SMS message with a verification code. Enter the code to verify your mobile phone number.',
    phoneNumber: 'Phone Number',
    cancel: 'Kansela',
    update: 'I-update',
    resend: 'Ipadala ug balik',
    verify: 'Pamatud-an',
    message: 'Please enter phone number',
  },
  loginListScreen: {
    title: 'Sign In With',
    createWallet: 'Paghimo',
    phoneNumber: 'Phone number',
    emailAddress: 'Email Address',
    passportNumber: 'Numero sa pasaporte',
    facebook: 'Facebook',
  },
};
