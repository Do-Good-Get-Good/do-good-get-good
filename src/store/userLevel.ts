import { makeObservable, observable, action } from "mobx";
import { Role } from "../utility/enums";

class UserLevelStore {
  userLevel: Role | undefined = undefined;

  constructor() {
    makeObservable(this, {
      userLevel: observable,
      setUserLevel: action,
    });
  }

  setUserLevel(level: Role | undefined) {
    this.userLevel = level;
  }
}

const userLevelStore = new UserLevelStore();
export default userLevelStore;
