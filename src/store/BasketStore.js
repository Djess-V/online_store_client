import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._basket = null;
    this._totalCount = 0;
    this._devices = { ids: [], entities: {} };
    this._remoteDevices = { ids: [], entities: {} };
    makeAutoObservable(this);
  }

  setBasket(basket) {
    this._basket = basket;
  }

  setTotalCount(totalCount, count = undefined) {
    if (count || count === 0) {
      this._totalCount = this.totalCount - count;
    } else {
      this._totalCount = totalCount;
    }
  }

  setDevice(device) {
    this._devices.ids.push(device.id);
    this._devices.entities[device.id] = device;
    this._devices.entities[device.id].count = 1;
    this._totalCount = this.totalCount + 1;
  }

  removeDevice(id) {
    this._remoteDevices.ids.push(id);
    this._remoteDevices.entities[id] = { ...this.devices.entities[id] };
    this._remoteDevices.entities[id].count = 1;
    this._devices.ids = this.devices.ids.filter((i) => i !== id);

    const newDevices = { ...this.devices };
    delete newDevices.entities[id];

    this.setDevices(newDevices);
  }

  reestablishDevice(id) {
    this._devices.ids.push(id);
    this._devices.entities[id] = { ...this._remoteDevices.entities[id] };
    this._remoteDevices.ids = this._remoteDevices.ids.filter((i) => i !== id);

    const newDevices = { ...this._remoteDevices };
    delete newDevices.entities[id];

    this.setRemoteDevices(newDevices);

    this._totalCount = this.totalCount + 1;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  changeCountDevice(id, bool) {
    const device = this.devices.entities[id];

    if (bool) {
      this._devices.entities[id].count = device.count + 1;
      this._totalCount = this.totalCount + 1;
    } else if (!bool && device.count > 1) {
      this._devices.entities[id].count = device.count - 1;
      this._totalCount = this.totalCount - 1;
    }
  }

  setRemoteDevices(devices) {
    this._remoteDevices = devices;
  }

  emptyTrash() {
    for (let id of this.devices.ids) {
      this.removeDevice(id);
    }
  }

  removeDeviceFromRemoteDevices(id) {
    this._remoteDevices.ids = this._remoteDevices.ids.filter((i) => i !== id);
    delete this._remoteDevices.entities[id];
  }

  get basket() {
    return this._basket;
  }

  get totalCount() {
    return this._totalCount;
  }

  get devices() {
    return this._devices;
  }

  get remoteDevices() {
    return this._remoteDevices;
  }
}
