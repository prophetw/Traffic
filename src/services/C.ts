class SpeedUpStrategy {}

class DriverStrategy {}

class ClassicDriverStrategy extends DriverStrategy {}

class SportsDriverStrategy extends DriverStrategy {}

class CCC {
  width: number;
  lenth: number;
  maxSpeed: number;
  constructor() {
    this.width = 2;
    this.lenth = 3;
    this.maxSpeed = 120;
  }
  switchLane() {}
  start() {}
  stop() {}
  speedUp() {}
  slowDown() {}
  init() {}
  destroy() {}
}

class Lane {
  lenth: number;
  canSwitchLeft: boolean;
  canSwitchRight: boolean;
  constructor() {
    this.lenth = 10;
    this.canSwitchLeft = false;
    this.canSwitchRight = false;
  }
}

class RoadDevice {
  constructor() {}
}

class RGLight extends RoadDevice {
  Rtime: number;
  Gtime: number;
  Ytime: number;
  constructor() {
    super();
    this.Rtime = 30;
    this.Gtime = 30;
    this.Ytime = 3;
  }
  init() {}
}

class Road {
  lanes?: Lane[];
  constructor() {}
  init() {}
  destroy() {}
}
