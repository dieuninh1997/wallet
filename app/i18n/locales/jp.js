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
    coinName: 'マンゴーコイン',
    coinDescription: 'より良い未来のために',
    createWallet: 'ウォレットの作成',
    signin: 'サインイン',
    restoreAccount: 'アカウントの復元',
  },
  signin: {
    title: 'サインイン',
    forgotPassword: 'パスワードを忘れた方',
    inputWalletId: 'ウォレットID',
    inputPassword: 'パスワード',
  },
  createWallet: {
    signin: 'サインイン',
    title: 'ウォレットの作成',
    phoneNumber: '電話番号',
    emailAddress: 'メールアドレス',
    passportNumber: 'パスポート番号',
    facebook: 'Facebook',
  },
  createByPhoneNumber: {
    title: '電話番号で作成',
    iAccept: 'に同意する',
    termsAndConditions: 'サービス規約',
    createWallet: 'ウォレットの作成',
  },
  createWalletByEmailScreen: {
    title: 'メールアドレスで作成',
    inputEmail: 'メールアドレス',
    inputPassword: 'パスワード',
    inputPasswordConfirm: 'パスワードの確認',
    iAccept: 'に同意する',
    termsAndConditions: 'サービス規約',
    createWallet: 'ウォレットの作成',
    createWaletSuccess: '完了しました',
    readAndCheckTerms: 'Please read and accept terms and conditions!',
    emailInvalid: 'Email is not valid!',
    passwordMustMatch: 'Password must match password confirmation!',
  },
  dashboard: {
    title: 'ダッシュボード',
    balance: '残高',
  },
  send: {
    title: 'Send',
    walletAddress: 'Wallet Address',
    continue: '続ける',
    confirmationTextDefault: 'スペースで区切り、12個の復元フレーズを入力し、通貨と決済を復元します',
    confirmationText: 'Are you sure want to send {{amount}} {{coinName}} to addresss {{address}}?',
    submitted: 'Submitted',
    addressRequired: 'Recieved address is required!',
    addressInValid: 'Recieved address is not valid!',
    coinValueInValid: 'Coin value is not valid!',
  },
  setting: {
    title: '設定',
    profile: 'プロフィール',
    walletId: 'ウォレットID',
    email: 'メールアドレス',
    mobileNumber: '電話番号',
    logIntoWebWallet: 'Webウォレットにサインイン',
    perferences: '詳細設定',
    emailNotification: 'メール通知',
    localCurrency: '現地通貨',
    security: 'セキュリティ',
    verification: '2段階認証',
    changePassword: 'パスワード変更',
    recoveryPhrase: '復元フレーズ',
    changePin: 'PIN変更',
    useFaceIdAsPin: 'Face IDを認証に使用する',
    swipeToReceive: 'スワイプして受信',
    verified: '確認済み',
    unverified: '未確認',
    disabled: '無効',
    unconfirmed: '未確認',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'ペソ (₱)',
  },
  emailVerification: {
    title: 'Email Verification',
    content: 'この確認済みメールアドレスは、不正な動作が確認された際、認証コードの送付に使用されます。また、サインインIDの通知や、資金を受領した際の確認にも使用されます。',
    emailAddress: 'メールアドレス',
    resend: '再送する',
    cancel: 'キャンセル',
    update: '更新する',
    verificationEmailSent: 'A verification link has been sent to your email account.',
    errors: {
      email_already_verified: 'Your email address has already been verified.',
      email_in_use: 'This email address is already in use.',
    },
  },
  request: {
    title: 'リクエスト',
    copyAddress: 'アドレスのコピー',
    copied: 'コピーしました',
  },
  transactions: {
    title: 'トランザクション',
    noTransactionAvailable: 'No transaction record available.',
  },
  changePassword: {
    title: 'パスワード変更',
    curentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    confirmNewPassword: 'パスワードの確認',
    cancel: 'キャンセル',
    update: '更新する',
    toastEnterFullInfo: 'Please enter full information',
    toastConfirmPassword: 'パスワードが一致しません',
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
    title: '  アカウントの復元',
    titleForm: 'スペースで区切り、12個の復元フレーズを入力し、通貨と決済を復元します',
    inputPlaceholder: 'フレーズのバックアップ',
    mnemonicRequired: 'Please enter your backup phrase.',
    invalidMnemonic: 'Invalid backup phrase.',
    errors: {
      mnemonic_not_found: 'Wallet not found.',
    },
  },
  terms: {
    title: 'サービス規約',
    content: 'This agreement is beetween you and the service operator, Mango. By using any services made available through the Mango website (https://www.mgc.com).',
  },
  loginUserPin: {
    enterPincode: 'PINを入力して下さい',
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
    title: '現地通貨',
    cancel: 'キャンセル',
    confirm: '確認',
    usDollar: 'U.S Dollar ($)',
    philippinesPeso: 'ペソ (₱)',
  },
  backupPassphrase: {
    title: 'Backup your Passphrase',
    note: 'Please save these words in order. These words will allow you to recover your wallet.\n',
    important: '※紛失注意！※ 紛失した場合、復元できません。\n※共有注意！※ このファイルを悪意あるWebサイトで使用するとあなたの資金が盗まれます。',
    btnCopy: 'Copy',
    btnNext: 'Next',
  },
};
