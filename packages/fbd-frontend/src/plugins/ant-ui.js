import {
  Button, message, Modal, Collapse, Input, InputNumber, Form, Statistic, Checkbox, Radio,
} from 'ant-design-vue';

const useAntUI = (app) => {
  const curApp = app;
  curApp.use(Button);
  curApp.use(Modal);
  curApp.use(Collapse);
  curApp.use(Input);
  curApp.use(InputNumber);
  curApp.use(Form);
  curApp.use(Statistic);
  curApp.use(Checkbox);
  curApp.use(Radio);

  message.config({
    maxCount: 1,
  });

  curApp.config.globalProperties.$message = message;
  return curApp;
};

export default useAntUI;
