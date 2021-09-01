import {
  Button, message, Modal, Collapse, Input, Form,
} from 'ant-design-vue';

const useAntUI = (app) => {
  const curApp = app;
  curApp.use(Button);
  curApp.use(Modal);
  curApp.use(Collapse);
  curApp.use(Input);
  curApp.use(Form);

  message.config({
    maxCount: 1,
  });

  curApp.config.globalProperties.$message = message;
  return curApp;
};

export default useAntUI;
