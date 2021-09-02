import {
  Button, message, Modal, Collapse,
} from 'ant-design-vue';

const useAntUI = (app) => {
  const curApp = app;
  curApp.use(Button);
  curApp.use(Modal);
  curApp.use(Collapse);

  message.config({
    maxCount: 1,
  });

  curApp.config.globalProperties.$message = message;
  return curApp;
};

export default useAntUI;
