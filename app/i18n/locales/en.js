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
    createWallet: 'CREATE A WALLET',
    signin: 'Sign In',
    restoreAccount: 'Restore Account',
  },
  signin: {
    title: 'Sign In',
    forgotPassword: 'Forgot password',
    inputWalletId: 'Wallet ID',
    inputPassword: 'Passwords',
    btnCreate: 'Create',
    loginFacebook: 'Login With Facebook',
  },
  createWallet: {
    signin: 'Sign In',
    title: 'Create A Wallet',
    phoneNumber: 'Phone number',
    emailAddress: 'Email Address',
    passportNumber: 'Passport Number',
    facebook: 'Facebook',
  },
  createByPhoneNumber: {
    title: 'Create by Phone Number',
    iAccept: 'I accept the',
    termsAndConditions: ' terms and conditions',
    createWallet: 'Create Wallet',
  },
  createWalletByEmailScreen: {
    title: 'Create by Email Address',
    inputEmail: 'Email Address',
    inputPassword: 'Passwords',
    inputPasswordConfirm: 'Confirm Passwords',
    iAccept: 'I accept the',
    termsAndConditions: ' terms and conditions',
    createWallet: 'Create Wallet',
    createWaletSuccess: 'Create wallet success',
    readAndCheckTerms: 'Please read and accept terms and conditions!',
    emailInvalid: 'Email is not valid!',
    passwordMustMatch: 'Password must match password confirmation!',
  },
  createWalletByPassportScreen: {
    title: 'Create by Passport Number',
    inputEmail: 'Passport Number',
    inputPassword: 'Passwords',
    inputPasswordConfirm: 'Confirm Passwords',
    iAccept: 'I accept the',
    termsAndConditions: ' terms and conditions',
    createWallet: 'Create Wallet',
    createWaletSuccess: 'Create wallet success',
  },
  dashboard: {
    title: 'Dashboard',
    balance: 'Balance',
  },
  send: {
    title: 'Send',
    walletAddress: 'Wallet Address',
    continue: 'Continue',
    confirmationTextDefault: 'Enter your 12 backup words with spaces to recover your funds & transactions',
    confirmationText: 'Are you sure want to send {{amount}} {{coinName}} to addresss {{address}}?',
    submitted: 'Submitted',
    addressRequired: 'Recieved address is required!',
    addressInValid: 'Recieved address is not valid!',
    coinValueInValid: 'Coin value is not valid!',
    titleSlowly: 'Slowly',
    titleRegular: 'Regular',
    titleFast: 'Fast',
    speedSlowly: '30 + Minute',
    speedRegular: '5 + Minute',
    speedFast: '2 + Minute',
    notice: 'Notice: This wallet is avaiable on Ropsten Testnet. Please do not send coin from Mainnet to this address!!!',
  },
  setting: {
    title: 'Settings',
    profile: 'PROFILE',
    walletId: 'Wallet ID',
    email: 'Email',
    mobileNumber: 'Mobile Number',
    logIntoWebWallet: 'Log in to Web Wallet',
    perferences: 'Preferences',
    emailNotification: 'Email Notification',
    localCurrency: 'Local Currency',
    security: 'Security',
    verification: '2-step Verification',
    changePassword: 'Change Password',
    recoveryPhrase: 'Recovery Phrase',
    changePin: 'Change PIN',
    useFaceIdAsPin: 'Use Face ID as PIN',
    swipeToReceive: 'Swipe to Receive',
    verified: 'Verified',
    unverified: 'Unverified',
    disabled: 'Disabled',
    enabled: 'Enabled',
    unconfirmed: 'Unconfirmed',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  emailVerification: {
    title: 'Email Verification',
    content: 'Your verified email address is used to send login codes when suspicious or unusual activity is detected, to remind you of your wallet login ID, and to send bitcoin payment alerts when you receive funds.',
    emailAddress: 'Email Address',
    resend: 'Resend',
    cancel: 'Cancel',
    update: 'Update',
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
    title: 'Change Password',
    curentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    cancel: 'Cancel',
    update: 'Update',
    toastEnterFullInfo: 'Please enter full information',
    toastConfirmPassword: 'Confirm password is incorrect',
    changeSuccess: 'Change password success',
  },
  ChangePinScreen: {
    title: 'Change PIN',
    changePinSuccess: 'Change pin code success',
    currentPin: 'Current PIN',
    incorrectPincode: 'Incorrect PIN Code',
    pleaseAgain: 'Please try again	',
    newPin: 'New PIN',
    confirmNewPin: 'Confirm New PIN',
    confirmFail: 'Your entries did not match',
  },
  genneralText: {
    back: 'Back',
    recieved: 'Recieved',
    confirmation: 'Confirmation',
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
    forgotPassword: 'Forgot Password',
    emailAddress: 'Email Address',
    resetPassword: 'Reset Password',
    resetPasswordSuccessMessage: 'Reset password link was sent to your email/phone number. Please follow the instruction to reset password.',
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
    downloadAndInstall: 'Download and Install',
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
    title: 'Restore Account',
    titleForm: 'Enter your 12 backup words with spaces to recover your funds & transactions',
    inputPlaceholder: 'Backup Phrase',
    mnemonicRequired: 'Please enter your backup phrase.',
    invalidMnemonic: 'Invalid backup phrase.',
    errors: {
      mnemonic_not_found: 'Wallet not found.',
    },
  },
  terms: {
    title: 'Terms and Conditions',
    content: 'This agreement is beetween you and the service operator, Mango. By using any services made available through the Mango website (https://www.mgc.com).',
  },
  backupPassphraseScreen: {
    title: 'Backup Phrase',
  },
  loginUserPin: {
    enterPincode: 'Enter your PIN code',
    incorrectPincode: 'Incorrect PIN Code',
    pleaseAgain: 'Please try again	',
    touchID: 'Touch sensor to open your app',
  },
  addPinScreen: {
    title: 'Add New PIN',
    changePinSuccess: 'Add pin code success',
    incorrectPincode: 'Incorrect PIN Code',
    pleaseAgain: 'Please try again',
    newPin: 'New PIN',
    currentPin: 'Current PIN',
    confirmNewPin: 'Confirm New PIN',
    confirmFail: 'Your entries did not match',
  },
  localCurrencyScreen: {
    title: 'Local Currency',
    cancel: 'Cancel',
    confirm: 'Confirm',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'Philippines Peso (₱)',
  },
  backupPassphrase: {
    title: 'Backup your Passphrase',
    note: 'Please save these words in order. These words will allow you to recover your wallet.\n',
    important: 'Do not lose it! It cannot be recovered if you lose it.',
    btnCopy: 'Copy',
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
    cancel: 'Cancel',
    update: 'Update',
    resend: 'Resend',
    verify: 'Verify',
    message: 'Please enter phone number',
  },
};
