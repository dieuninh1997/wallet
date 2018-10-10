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
      settingLabel: 'U.S Dollar ($)'
    },
    PHP: {
      settingLabel: 'Philippines Peso (₱)'
    }
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
    confirmationText: 'Enter your 12 backup words with spaces to recover your funds & transactions',
  },
  setting: {
    title: 'Settings',
    profile: 'PROFILE',
    walletId: 'Wallet ID',
    email: 'Email',
    mobileNumber: 'Mobile Number',
    logIntoWebWallet: 'Log in to Web Wallet',
    perferences: 'Perferences',
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
      email_in_use: 'This email address is already in use.'
    }
  },
  request: {
    title: 'Request',
    copyAddress: 'Copy Address',
    copied: 'Copied success',
  },
  transactions: {
    title: 'Transactions',
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
  restoreWalletScreen: {
    title: 'Restore Account',
    titleForm: 'Enter your 12 backup words with spaces to recover your funds & transactions',
    inputPlaceholder: 'Backup Phrase',
    mnemonicRequired: 'Please enter your backup phrase.',
    invalidMnemonic: 'Invalid backup phrase.',
    errors: {
      mnemonic_not_found: 'Wallet not found.'
    }
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
    important: '**Do not lose it!** It cannot be recovered if you lose it.',
    btnCopy: 'Copy',
    btnNext: 'Next',
  }
};
