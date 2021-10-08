// function getCookie(cname) {
//   const name = `${cname}=`;
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// }

const langMap = {
  'zh-TW': {
    text1: '访问禁止',
    text2: '由于您所在地區的限制，',
    text3: '您所尝试的网页现在无法打开。',
    text4: '我们暂时无法提供服务，',
    text5: '由​​此给您带来的不便我们深表歉意',
    text6: '您的IP位置',
  },
  'zh-CN': {
    text1: '访问禁止',
    text2: '由于您所在地區的限制，',
    text3: '您所尝试的网页现在无法打开。',
    text4: '我们暂时无法提供服务，',
    text5: '由​​此给您带来的不便我们深表歉意',
    text6: '您的IP位置',
  },
  th: {
    text1: 'ปิดการทำงาน',
    text2: 'เนื่องจากระบบไม่รองรับพื้นที่ของคุณ ',
    text3: 'จึงไม่สามารถใช้งานได้',
    text4: 'ไม่สามารถให้บริการได้ชั่วคราว ',
    text5: 'ขออภัยในความไม่สะดวก',
    text6: '您的IP位置',
  },
  vn: {
    text1: 'Cấm truy cập',
    text2: 'Do giới hạn khu vực ',
    text3: 'Không thể truy cập vào trang web này',
    text4: 'Chúng tôi hiện không thể cung cấp dịch vụ ',
    text5: 'Xin lỗi về sự bất tiện này',
    text6: '您的IP位置',
  },
  jp: {
    text1: '入れません',
    text2: 'お住いの地域の制限により、',
    text3: 'このページは現在開けません',
    text4: '一時的にサービス提供できません,',
    text5: 'ご不便おかけし申し訳ございません',
    text6: '您的IP位置',
  },
  en: {
    text1: 'Access denied',
    text2: 'Due to the restriction of your current region',
    text3: 'You can not access to the page you are trying to open',
    text4: 'We can not offer any service at the moment',
    text5: 'We deeply apologize for the inconvenience',
    text6: 'Your IP address',
  },
};

const langImgMap = {
  'zh-TW': {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
  'zh-CN': {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
  th: {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
  vn: {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
  en: {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
  en: {
    img1: './bg-maintain.png',
    img2: './mtzlogo.svg',
  },
};

const siteMap = {
  14: 'mtz',
  801: 'mtz',
  802: 'rowz',
};

const localeMap = {
  th_th: 'th',
  vi_vn: 'vn',
  zh_cn: 'zh-CN',
  ja_jp: 'jp',
  en_us: 'en',
};

let locale = '';
let siteName = '';

function setContentLang(curLang) {
  if (!curLang || !Object.prototype.hasOwnProperty.call(langMap, curLang)) {
    curLang = 'zh-CN';
  }

  const langObj = langMap[curLang];
  const langImgObj = langImgMap[curLang];
  if (langObj) {
    Object.keys(langObj).forEach((keyName) => {
      document.getElementById(keyName).textContent = langObj[keyName];
    });
  }

  if (langImgObj) {
    Object.keys(langImgObj).forEach((keyName) => {
      document.getElementById(`pc-${keyName}`).setAttribute('src', langImgObj[keyName]);
    });
  }

  const pcImg = document.querySelector('#pc-img2');
  if (pcImg) {
    pcImg.src = `./${siteName}logo.svg`;
  }
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.ipify.org/', true);
xhr.onload = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      document.getElementsByClassName('no-service-bottom')[0].textContent = xhr.responseText;
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = () => {
  console.error(xhr.statusText);
};
xhr.send(null);

const xhr1 = new XMLHttpRequest();

const siteHost = `${window.location.origin}/mainten/info/get`;
// const siteHost = 'https://3-dev.dingyi.io//mainten/info/get';
// const siteHost = 'https://169-dev.dingyi.io//mainten/info/get';
// const siteHost = 'https://401-prod.168-system.com/mainten/info/get';

xhr1.open('GET', siteHost, true);
xhr1.onload = () => {
  if (xhr1.readyState === 4) {
    if (xhr1.status === 200) {
      const res = JSON.parse(xhr1.response);
      siteName = siteMap[res.siteId];
      locale = localeMap[res.locale];
    } else {
      console.error(xhr1.statusText);
    }
    setContentLang(locale);
  }
};
xhr1.onerror = () => {
  console.error(xhr.statusText);
  setContentLang();
};
xhr1.send(null);
