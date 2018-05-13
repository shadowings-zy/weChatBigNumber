//weChatBigNumber.js
//基于微信小程序的多进制高精度库

var radix = 16;    //进制调整

//去除开头的0
function ltrimZero(str) {
  for (var i = 0; i < str.length && str.charAt(i) === '0'; i++);
  return str.slice(i);
}

//大数加
function add(a, b) {
  a = a + '';
  b = b + '';

  if (a.indexOf('-') >= 0 && b.indexOf('-') < 0) {
    a = a.substr(1);
    return subtract(b, a);
  } else if (a.indexOf('-') < 0 && b.indexOf('-') >= 0) {
    b = b.substr(1);
    return subtract(a, b);
  } else if (a.indexOf('-') >= 0 && b.indexOf('-') >= 0) {
    a = a.substr(1);
    b = b.substr(1);
    return '-' + addWithoutSign(a, b);
  } else {
    return addWithoutSign(a, b);
  }
}

//大数无符号加
function addWithoutSign(a, b) {
  var lena = a.split('').length;
  var lenb = b.split('').length;

  a = a.split('').reverse();
  b = b.split('').reverse();

  var total = [];
  let addFlag = 0;

  //a比较长的情况(分类讨论，以后可以改进)
  if (lena >= lenb) {
    for (let i = 0, j = 0; i < lena; i++ , j++) {
      if (j < lenb) {
        total[i] = parseInt(a[i], radix) + parseInt(b[j], radix) + addFlag;
        total[i] = total[i].toString(radix);
      } else {
        total[i] = parseInt(a[i], radix) + addFlag;
        total[i] = total[i].toString(radix);
      }
      var tempTotal = parseInt(total[i], radix);
      if (tempTotal >= radix) {
        total[i] = (tempTotal - radix).toString(radix);
        if (i == (lena - 1)) {
          total[lena] = '1';
        }
        addFlag = 1;
      } else {
        addFlag = 0;
      }
    }
    total = total.reverse().join('');
    return total;
  } else {
    for (let i = 0, j = 0; i < lenb; i++ , j++) {
      if (j < lena) {
        total[i] = parseInt(a[j], radix) + parseInt(b[i], radix) + addFlag;
        total[i] = total[i].toString(radix);
      } else {
        total[i] = parseInt(b[i], radix) + addFlag;
        total[i] = total[i].toString(radix);
      }

      var tempTotal = parseInt(total[i], radix);
      if (tempTotal >= radix) {
        total[i] = (tempTotal - radix).toString(radix);
        if (i == (lenb - 1)) {
          total[lenb] = 1;
        }
        addFlag = 1;
      } else {
        addFlag = 0;
      }
    }
    total = total.reverse().join('');
    return total;
  }
}

//大数乘
function multiply(a, b) {
  a = a + '';
  b = b + '';

  if (a.indexOf('-') >= 0 && b.indexOf('-') < 0) {
    a = a.substr(1);
    return '-' + multiplyWithoutSign(a, b);
  } else if (a.indexOf('-') < 0 && b.indexOf('-') >= 0) {
    b = b.substr(1);
    return '-' + multiplyWithoutSign(a, b);
  } else if (a.indexOf('-') >= 0 && b.indexOf('-') >= 0) {
    a = a.substr(1);
    b = b.substr(1);
    return multiplyWithoutSign(a, b);
  } else {
    return multiplyWithoutSign(a, b);
  }
}

//大数无符号乘
function multiplyWithoutSign(a, b) {
  var str1, str2, len1, len2, maxlen;
  var result = [];
  var output = [];
  str1 = a.split('').reverse();
  str2 = b.split('').reverse();
  len1 = str1.length;
  len2 = str2.length;

  for (var i = 0; i < len1; i++) {
    for (var j = 0; j <= len2; j++) {
      result[i + j] = 0;
      output[i + j] = result[i + j].toString(radix);
    }
  }

  for (var i = 0; i < len1; i++) {
    for (var j = 0; j < len2; j++) {
      result[i + j] += parseInt(str1[i], radix) * parseInt(str2[j], radix);
      output[i + j] = result[i + j].toString(radix);
    }
  }

  var n = result.length;
  for (var k = 0; k < n; k++) {
    var temp = result[k];
    if (temp >= radix) {
      result[k] = temp % radix;
      result[k + 1] += Math.floor(temp / radix);
      output[k] = result[k].toString(radix);
      output[k + 1] = result[k + 1].toString(radix);
    }
  }

  output = output.reverse().join('');
  output = ltrimZero(output);
  if (output == '') {
    output = '0';
  }
  return output
}

//大数减
function subtract(a, b) {
  a = a + '';
  b = b + '';

  if (a.indexOf('-') >= 0 && b.indexOf('-') < 0) {
    a = a.substr(1);
    return '-' + addWithoutSign(a, b);
  } else if (a.indexOf('-') < 0 && b.indexOf('-') >= 0) {
    b = b.substr(1);
    return addWithoutSign(a, b);
  } else if (a.indexOf('-') >= 0 && b.indexOf('-') >= 0) {
    a = a.substr(1);
    b = b.substr(1);
    return subtractWithoutSign(b, a);
  } else {
    return subtractWithoutSign(a, b);
  }
}

//大数无符号减
function subtractWithoutSign(a, b) {
  a = a + '';
  b = b + '';

  var result = [];
  var output = [];
  var minusOne = 0;

  a = ltrimZero(a);
  b = ltrimZero(b);

  //补0对齐
  while (a.length < b.length) {
    a = '0' + a;
  }
  while (b.length < a.length) {
    b = '0' + b;
  }
  //从后面位数向前相减
  for (var i = a.length - 1; i >= 0; i--) {
    var c1 = parseInt(a.charAt(i), radix) - 0;
    var c2 = parseInt(b.charAt(i), radix) - 0;
    //如果当前位数无须借位
    if (c1 - minusOne >= c2) {
      result.unshift(c1 - c2 - minusOne);
      output.unshift((c1 - c2 - minusOne).toString(radix));
      minusOne = 0;
    } else {
      result.unshift(c1 + radix - c2 - minusOne);
      output.unshift((c1 + radix - c2 - minusOne).toString(radix));
      minusOne = 1;
    }
  }
  //如果最高位仍然要借位
  if (minusOne) {
    var newResult = subtract(b, a);
    newResult = ltrimZero(newResult);
    return '-' + newResult;
  }

  result = result.join('');
  output = output.join('');
  result = ltrimZero(result);
  output = ltrimZero(output);
  if (output == '') {
    output = '0';
  }
  return output;
}

//大数除法(只支持整数除法)
function divide(a, b) {
  a = a + '';
  b = b + '';

  if (a.indexOf('-') >= 0 && b.indexOf('-') < 0) {
    a = a.substr(1);
    return '-' + divideWithoutSign(a, b);
  } else if (a.indexOf('-') < 0 && b.indexOf('-') >= 0) {
    b = b.substr(1);
    return '-' + divideWithoutSign(a, b);
  } else if (a.indexOf('-') >= 0 && b.indexOf('-') >= 0) {
    a = a.substr(1);
    b = b.substr(1);
    return divideWithoutSign(a, b);
  } else {
    return divideWithoutSign(a, b);
  }
}

//无符号除法,返回商
function divideWithoutSign(a, b) {
  a = a + '';
  b = b + '';

  if (compare(a, b) < 0) {
    return '0';
  } else if (compare(a, b) == 0) {
    return '1';
  }

  var alen = a.length;
  var blen = b.length;
  var times = alen - blen + 1;
  var result = [];

  for (var c = 0; c < times; c++) {
    var tempb = b;
    result[c] = 0;
    //补0
    while (tempb.length < alen - c) {
      tempb = tempb + '0';
    }
    while (compare(a, tempb) >= 0) {
      result[c]++;
      a = subtract(a, tempb);
    }
  }

  for (var c = 0; c < result.length; c++) {
    result[c] = result[c].toString(radix);
  }
  var output = ltrimZero(result.join(''));
  return output;
}

//取余(a可正可负，b只能为正数),最后的结果恒为非负数 
function mod(a, b) {
  a = a + '';
  b = b + '';
  if (b.indexOf('-') != -1) {
    return 'b只能为正数';
  }
  // a - (a/b)*b
  var output = divide(a, b);
  output = multiply(output, b);
  output = subtract(a, output);

  if (output.indexOf('-') != -1) {
    output = add(output, b);
  }
  return output;
}

//比较函数(1:a大，±0：相等，-1,：b大)
function compare(a, b) {
  a = a + '';
  b = b + '';

  var sign = 1;
  a = a.toString();
  b = b.toString();
  if (a.indexOf('-') >= 0 && b.indexOf('-') < 0) {
    return -1;
  } else if (a.indexOf('-') < 0 && b.indexOf('-') >= 0) {
    return 1;
  } else if (a.indexOf('-') >= 0 && b.indexOf('-') >= 0) {
    sign = -1;
    a = a.substr(1);
    b = b.substr(1);
  }

  a = a.replace(/^0+/, '');
  b = b.replace(/^0+/, '');

  var flag;

  if (a.length < b.length) {
    flag = -1;
  } else if (a.length > b.length) {
    flag = 1;
  } else {
    flag = 0;
  }

  if (flag == 0) {
    var aArr = a.split('');
    var bArr = b.split('');
    for (var i = 0; i <= aArr.length; i++) {
      if (aArr[i] > bArr[i]) {
        flag = 1;
        break;
      } else if (aArr[i] < bArr[i]) {
        flag = -1;
        break;
      }
    }
  }
  return sign * flag;
}

//大数随机数(生成0-n之间的随机数)
function randomNum(n) {
  n = n + '';
  var flag = 10000000000000000;
  var randomWithoutRadix = Math.random();
  var random = randomWithoutRadix.toString(radix);
  var randomOutput = random.substr(random.indexOf('.') + 1, random.length);
  var multiplyNum = multiply(randomOutput, n);
  var finalNum = divide(multiplyNum, flag.toString(radix));
  return finalNum;
}

module.exports = {
  add: add,
  multiply: multiply,
  subtract: subtract,
  compare: compare,
  divide: divide,
  mod: mod,
  randomNum: randomNum
}