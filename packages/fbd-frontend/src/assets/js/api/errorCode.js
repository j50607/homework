// 使用責任鏈去處理api code不等於200時的狀況
import Chain from '@/assets/js/api/chain';

class ErrorCode {
  static httpErrorHandler(error) {
    const store = window.$vue.$store;

    const code401 = (errorData) => {
      const { code } = errorData;
      if (code !== 401) return 'next';
      window.$vue.$message.error({ content: window.$vue.$t('common_notVerify'), key: code });
      window.$vue.$router.replace('/loginAndRester').catch(() => {});
      return errorData.message;
    };

    const code403 = (errorData) => {
      const { code } = errorData;
      if (code !== 403) return 'next';
      window.$vue.$message.error({ content: window.$vue.$t('common_reLogin'), key: code });
      store.commit('CLEAR');
      window.$vue.$router.replace('/loginAndRegister').catch(() => {});
      return errorData.message;
    };
    const code4000 = (errorData) => {
      const { code } = errorData;
      if (code !== 4000) return 'next';
      return errorData.message;
    };
    const codeElse = (errorData) => {
      window.$vue.$message.error({ content: errorData.message, key: errorData.code });
      return errorData.message;
    };

    const chainRequest401 = new Chain(code401);
    const chainRequest403 = new Chain(code403);
    const chainRequest4000 = new Chain(code4000);
    const chainRequestElse = new Chain(codeElse);

    chainRequest401
      .setSuccessor(chainRequest403)
      .setSuccessor(chainRequest4000)
      .setSuccessor(chainRequestElse);

    chainRequest401.passRequest(error);
  }
}

export default ErrorCode;
