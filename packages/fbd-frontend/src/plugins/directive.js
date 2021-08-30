const useDirective = (app) => {
  const curApp = app;
  const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  };

  curApp.directive('first-not-zero', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^[1-9]\d*$/g)) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  // 搭配input-type="text" 及 input-mode="numeric"使用
  curApp.directive('all-number', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^[0-9]+$/g)) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('number-password', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^\d*/g)[0]) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('two-decimal-places', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('four-decimal-places', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,4})/g)[0]) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('six-decimal-places', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,6})/g)[0]) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('one-decimal-places', {
    mounted: (el) => {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null;
          lastValue = e.target.value;
          trigger(e.target, 'input');
        }
      });
    },
  });

  curApp.directive('positive-places', {
    mounted(el, binding) {
      let lastValue = '';
      el.addEventListener('input', (e) => {
        if (e.target.value !== lastValue) {
          let formatedNumber = (e.target.value.match(/^\d*/g)[0]) || '';

          if (binding.value) {
            formatedNumber = formatedNumber.substring(0, binding.value);
          }

          lastValue = formatedNumber;
          e.target.value = formatedNumber;
          trigger(e.target, 'input');
        }
      });
    },
  });

  return curApp;
};

export default useDirective;
