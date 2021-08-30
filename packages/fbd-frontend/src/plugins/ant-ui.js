import {
  Button, message,
} from 'ant-design-vue';

const useAntUI = (app) => {
  const curApp = app;
  curApp.use(Button);

  message.config({
    maxCount: 1,
  });

  curApp.config.globalProperties.$message = message;
  return curApp;
};

export default useAntUI;
