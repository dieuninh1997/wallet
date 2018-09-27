if (typeof btoa === 'undefined') {
  global.btoa = str => Buffer.from(str, 'binary').toString('base64');
}

if (typeof atob === 'undefined') {
  global.atob = b64Encoded => Buffer.from(b64Encoded, 'base64').toString('binary');
}

// global.sleep = time => new Promise(resolve => setTimeout(resolve, time));
