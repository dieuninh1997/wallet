export default class EventBus {
  notify(event, data) {
    this.trigger(event, data);
  }
}
