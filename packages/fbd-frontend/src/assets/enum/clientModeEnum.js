class ClientModeEnum {
  constructor(mode) {
    this.mode = mode;
  }
}

ClientModeEnum.PC = new ClientModeEnum('pc');
ClientModeEnum.MOBILE = new ClientModeEnum('mobile');

export default ClientModeEnum;
