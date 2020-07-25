/*  表单验证 */
const numberReg = /^-?[1-9][0-9]?.?[0-9]*$/;
const intReg = /^-?[1-9][0-9]*$/;
const phoneReg = /^1[0-9]{10,10}$/;
const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const pwdReg = /^.{6,16}$/;
const inviteCodeReg = /^[a-zA-Z0-9]{6,16}$/;

export function isToday(timestamp) {
  const time = timestamp * 1000;
  const startT = new Date(
    new Date().toLocaleDateString()
  ).getTime();
  const endT =
    new Date(new Date().toLocaleDateString()).getTime() +
    24 * 60 * 60 * 1000 -
    1;
  return startT < time && time <= endT;
}
export function isNumber(val) {
  return numberReg.test(val);
}
export function isInt(val) {
  return intReg.test(val);
}
export function isPhone(val) {
  return phoneReg.test(val);
}
export function isEmail(val) {
  return emailReg.test(val);
}
export function isPwd(val) {
  return pwdReg.test(val);
}
export function isInviteCode(val) {
  return inviteCodeReg.test(val);
}
export function validate(data, rules) {
  let res = { isOk: true, errmsg: "" };
  if (!rules || !rules.length) {
    return res;
  }
  for (let rule of rules) {
    // rule: {name:'', type:'', errmsg:'', min:1, max:2, eq:'', required:Boolean, regex:''}
    if (!rule || !rule.name || !rule.type) {
      continue;
    }

    // 如果值不存在
    if (!data[rule.name]) {
      // 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
      if (rule.type === "required" || rule.required) {
        res = { isOk: false, errmsg: rule.errmsg };
        if (!res.errmsg) {
          res.errmsg = "请正确输入所有数据"; //默认提示
        }
        return res;
      }
      // 如果不是必填项就跳过
      continue;
    }
    switch (rule.type) {
      // required 上面已经判断过了
      case "equals":
      case "eq":
        if (data[rule.name] !== data[rule.eqName]) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "number":
        if (!numberReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "int":
        if (!intReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "phone":
        if (!phoneReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "email":
        if (!emailReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "pwd":
        if (!pwdReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "inviteCode":
        if (!inviteCodeReg.test(data[rule.name])) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "range": // 数字类型的值取值范围
        // {name: 'xxx', type: 'range', min: 6, max: 6, required: true, errmsg: 'xxx'}
        let val = data[rule.name];
        if (val) {
          if (numberReg.test(val)) {
            if (rule.min && val < rule.min) {
              res = { isOk: false, errmsg: rule.errmsg };
            } else if (rule.max && val > rule.max) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
          } else {
            res = { isOk: false, errmsg: rule.errmsg };
          }
        }
        break;
      case "lengthRange": // 字符串长度取值范围
        // {name: 'xxx', type: 'lengthRange', min: 6, max: 6, errmsg: 'xxx'}
        let le = data[rule.name]
          ? data[rule.name].length
          : 0;
        if (rule.min && le < rule.min) {
          res = { isOk: false, errmsg: rule.errmsg };
        } else if (rule.max && le > rule.max) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
      case "regex": // 自定义正则表达式
        // {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, errmsg: 'xxx'}
        if (
          rule.regex &&
          !rule.regex.test(data[rule.name])
        ) {
          res = { isOk: false, errmsg: rule.errmsg };
        }
        break;
    }
    // 发现任何一个错误就立即返回，后面的不再判断
    if (!res.isOk) {
      if (!res.errmsg) {
        res.errmsg = "请正确输入所有数据"; //默认提示
      }
      return res;
    }
  }
  return res;
}

// 去除字符串中的空格
export function rejectSpace(str = "") {
  return str ? str.replace(/ /g, "") : "";
}
/*
 * 格式化时间
 * @param {number} timestamp 时间戳
 * @param {string} fmt 格式化
 */
export function formatTimeExt(timestamp, fmt) {
  var date = timestamp ? new Date(timestamp) : new Date();
  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
/* 函数节流 */
export function throttle(fn, interval) {
  var enterTime = 0; // 触发的时间
  var gapTime = interval || 300; // 间隔时间，如果interval不传，则默认300ms
  return function(...data) {
    var context = this;
    var backTime = new Date(); // 第一次函数return即触发的时间
    console.log(111);
    if (backTime - enterTime > gapTime) {
      console.log(22222);
      fn.apply(context, data);
      enterTime = backTime; // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/* 函数防抖 */
export function debounce(fn, timeout, immediate = false) {
  let timer;
  let timer2;
  let flag = immediate;
  timeout = timeout >= 0 ? timeout : 1000;
  return function(...args) {
    if (timer) clearTimeout(timer);
    if (timer2) clearTimeout(timer2);
    if (flag) {
      fn.apply(this, args);
      flag = false;
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer2 = setTimeout(() => {
        immediate && (flag = true);
      }, timeout);
    }, timeout);
  };
}
/*
 * url字符串转成query对象
 * @param  {string} url 路由字符串
 * @return {Object} query 处理后的对象
 */
export function getUrlQuery(url = "") {
  const query = {};
  let arr = "";
  if (url.split("?")[1]) {
    arr = url.split("?")[1].split("&");
  } else {
    arr = url.split("&");
  }

  arr.forEach(item => {
    const a = item.split("=");
    query[a[0]] = a[1];
  });
  return query;
}
/**format M D H M */
export function formatMD(timestamp) {
  const time = new Date(timestamp * 1000);
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${month}月${day}日`;
}
export function formatHM(timestamp) {
  const time = new Date(timestamp * 1000);
  const hour = time.getHours();
  let timeMinutes = time.getMinutes();
  timeMinutes =
    timeMinutes > 9 ? timeMinutes : `0${timeMinutes}`;
  return `${hour}小时${timeMinutes}分`;
}
/**
 *  轮询逻辑函数；目前使用在下单成功与否的结果轮询
 * @param {Function} fn 待执行函数(返回值为Promise的异步函数)
 * @param {Number} seconds 轮询秒数 (ms)
 * @param {Number} times 轮询总次数
 * @param {Any} forwardVal 期待值（fn中获得的值为期待值，即返回，不再继续轮询，如果不是期待值，继续轮询，直到到达轮询总次数）
 * @returns {Promise} value: "SUCCESS"成功拿到；"TIMEOUT"超时未拿到
 */
export function pollingStrategy(
  fn,
  seconds,
  times,
  forwardVal,
  otherVal
) {
  return function(...args) {
    return new Promise((resolve) => {
      let _this = this,
        timerQueue = [],
        result = { status: "", res: 0 };
      for (let i = 1; i <= times; i++) {
        timerQueue[i] = setTimeout(function() {
          fn.apply(_this, [...args]).then((res) => {
            result.res = res;
            if (result.res.status === forwardVal) {
              for (let j = i + 1; j < timerQueue.length; j++) {
                clearTimeout(timerQueue[j]);
              }
              result.status = "SUCCESS";
              resolve(result);
            } else if (result.res.status === otherVal) {
              for (let j = i + 1; j < timerQueue.length; j++) {
                clearTimeout(timerQueue[j]);
              }
              result.status = "OTHER";
              resolve(result);
            } else if (i === times) {
              result.status = "TIMEOUT";
              resolve(result);
            }
          });
        }, seconds * i);
      }
    });
  };
}
export function RandomString(len) {
  len = len || 32;
  var $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(
      Math.floor(Math.random() * maxPos)
    );
  }
  return pwd;
}

/**
 *  as an example: pagesModule/settings/settings
 */
export function GetCurrentPages() {
  const pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  const url = currentPage.route; //当前页面url
  const options = currentPage.options; //获取url中所带的参数 //拼接url的参数
  currentPage = url + "?";
  for (var key in options) {
    var value = options[key];
    currentPage += key + "=" + value + "&";
  }
  currentPage = currentPage.substring(
    0,
    currentPage.length - 1
  );
  console.log(`CurrentPages = ${currentPage}`);
  return currentPage;
}

export default {
  isToday,
  isNumber,
  isInt,
  isPhone,
  isEmail,
  isPwd,
  isInviteCode,
  validate,
  rejectSpace,
  formatTimeExt,
  throttle,
  debounce,
  getUrlQuery,
  formatMD,
  formatHM
};
