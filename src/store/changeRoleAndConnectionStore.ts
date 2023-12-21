import { makeAutoObservable, runInAction } from "mobx";
import { Role } from "../utilily/enums";

class ChangeRoleAndConnectionStore {
  userName: string;
  role: Role | undefined;
  constructor() {
    this.userName = "";
    this.role = undefined;

    makeAutoObservable(this);
  }

  resetStore() {
    this.userName = "";
  }
}
const changeRoleAndConnectionStore = new ChangeRoleAndConnectionStore();
export default changeRoleAndConnectionStore;
