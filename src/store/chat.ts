import { makeObservable, observable, action } from "mobx";
import { Role } from "../utility/enums";

class ChatStore {
  isScrollToEnd: boolean = false;

  constructor() {
    makeObservable(this, {
      isScrollToEnd: observable,
      setIsScrollToEnd: action,
    });
  }

  setIsScrollToEnd(level: boolean) {
    this.isScrollToEnd = level;
  }
}

const chatStore = new ChatStore();
export default chatStore;
