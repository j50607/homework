import {
  Button, message, Modal, Collapse, Input, Form, Statistic,
} from 'ant-design-vue';

const useAntUI = (app) => {
  const curApp = app;
  curApp.use(Button);
  curApp.use(Modal);
  curApp.use(Collapse);
  curApp.use(Input);
  curApp.use(Form);
  curApp.use(Statistic);

  message.config({
    maxCount: 1,
  });

  curApp.config.globalProperties.$message = message;
  return curApp;
};

export default useAntUI;
