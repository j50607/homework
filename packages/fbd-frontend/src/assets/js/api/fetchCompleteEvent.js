class FetchCompleteEvent extends Event {
  constructor(type, data) {
    super(type);
    this.data = data;
  }
}

export default FetchCompleteEvent;
