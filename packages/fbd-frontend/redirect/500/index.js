function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const langMap = {
  'zh-TW': {
    text1: '由于目前系统停机升级中，请待更新后再进行登录',
    text2: '造成不便 敬请见谅 !',
    'time-text1': '维护时间：',
    service: '在线客服',
  },
  'zh-CN': {
    text1: '由于目前系统停机升级中，请待更新后再进行登录',
    text2: '造成不便 敬请见谅 !',
    'time-text1': '维护时间：',
    service: '在线客服',
  },
  th: {
    text1: 'เนื่องจากตอนนี้เรากำลังปรับปรุงระบบ',
    text2: 'กรุณาเข้าใหม่ภายหลัง ขออภัยในความไม่สะดวก!',
    'time-text1': 'กำลังปรับปรุง：',
    service: 'บริการออนไลน์',
  },
  vn: {
    text1: 'Hệ thống hiện đang bảo trì',
    text2: 'Vui lòng chờ cập nhật rồi đăng nhập sau',
    text3: 'Xin lỗi bạn về sự bất tiện này !',
    'time-text1': 'Thời gian bảo trì：',
    service: 'CSKH trực tuyến',
  },
  en: {
    text1: 'System upgrading. Please log in again after update.',
    text2: 'Sorry for your the inconvenience',
    'time-text1': 'Maintenance time:',
    service: 'Online Customer service',
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

let siteName = '';
let locale = '';
let time = '';
// let year = '';

// const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// const mode = isMobile() ? 'mobile' : 'pc';

function setContentLang() {
  let curLang = localeMap[locale] || getCookie('i18n_redirected') || navigator.language || navigator.userLanguage;

  if (!curLang || !Object.prototype.hasOwnProperty.call(langMap, curLang)) {
    curLang = 'zh-CN';
  }

  document.getElementsByClassName('pc')[0].style.display = 'block';

  const langObj = langMap[curLang];
  if (langObj) {
    Object.keys(langObj).forEach((keyName) => {
      const desc = document.getElementById(`pc-${keyName}`);
      if (desc) {
        desc.textContent = langObj[keyName];
      }
    });
  }

  const langImgObj = langImgMap[curLang];
  if (langImgObj) {
    Object.keys(langImgObj).forEach((keyName) => {
      document.getElementById(`pc-${keyName}`).setAttribute('src', langImgObj[keyName]);
    });
  }

  const pcImg = document.querySelector('#pc-img2');
  if (pcImg) {
    pcImg.src = `./${siteName}logo.svg`;
  }

  document.querySelectorAll('.time').forEach((name) => {
    name.textContent = time;
  });

  // document.querySelectorAll('.year').forEach((name) => {
  //   name.textContent = year;
  // });
}

const siteHost = `${window.location.origin}/mainten/info/get`;
// const siteHost = 'https://169-stage.dingyi.io//mainten/info/get';

const xhr = new XMLHttpRequest();

xhr.open('POST', siteHost, true);

xhr.onload = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      const res = JSON.parse(xhr.response);

      siteName = siteMap[res.siteId];
      locale = res.locale;
      time = `${`${res.startYear}/${res.startDate} ${res.startTime}`} - ${`${res.startYear}/${res.endDate} ${res.endTime}`}`;
      // year = res.startYear;
    } else {
      console.error(xhr.statusText);
    }
    setContentLang();
  }
};
xhr.onerror = () => {
  console.error(xhr.statusText);
  setContentLang();
};
xhr.send(null);
