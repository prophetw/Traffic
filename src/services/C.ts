// how to detect other car's distance with you  realLife there are cejuyi  leida

class SpeedUpStrategy {
  // RLS road limit speed
  // 10s to speed up to RLS and < carMaxSpeed and NoCollision
  // 5s to speed up to RLS and < carMaxSpeed and NoCollision
}

class SwitchLaneStrategy {
  // switchLane till speed reach the road limit speed
  // only switchLane  if cur speed is blow roadLimitSpeed-20
}

class DriverStrategy {
  speedUpRate: number;
  slowDownRate: number;
  constructor(speedUpRate: number, slowDownRate: number) {
    this.speedUpRate = speedUpRate;
    this.slowDownRate = slowDownRate;
  }
}

class ClassicDriverStrategy extends DriverStrategy {
  constructor() {
    super(10, 10);
  }
}

class SportsDriverStrategy extends DriverStrategy {
  constructor() {
    super(20, 20);
  }
}

class Car {
  width: number;
  lenth: number;
  curSpeed: number;
  maxSpeed: number;
  distance: number;
  driver: DriverStrategy;
  timecost: number;
  constructor(strategy: DriverStrategy) {
    this.width = 2;
    this.curSpeed = 0;
    this.distance = 0;
    this.lenth = 3;
    this.maxSpeed = 220;
    this.driver = strategy;
    this.timecost = Date.now();
  }
  switchLane() {
    let canSwitch = false;
    canSwitch = true;
    if (canSwitch) {
      //
    } else {
      // wait till can switch
    }
  }
  start() {}
  runFor(seconds: number) {
    // test car run period of time
    const rate = this.driver.speedUpRate;
    // v = v0 + at
    // s = vt + 1/2*a*t*t
    this.distance =
      this.distance +
      this.curSpeed * seconds +
      (1 / 2) * rate * seconds * seconds;
    this.curSpeed = this.curSpeed + rate * seconds;
  }
  stop() {}
  speedUp() {}
  slowDown() {}
  init() {
    this.timecost = Date.now();
  }
  destroy() {
    this.timecost = Date.now() - this.timecost;
    console.log('reach end time cost is: ', this.timecost);
    this.curSpeed = 0;
    this.distance = 0;
  }
  getFrontCarInfo() {}
  getCarLB5M() {}
}
class TruckCar extends Car {
  constructor(strategy: DriverStrategy) {
    super(strategy);
    this.width = 2;
    this.lenth = 10;
    this.maxSpeed = 100;
  }
}

class Lane {
  lenth: number;
  disabled: boolean;
  canSwitchLeft: boolean;
  canSwitchRight: boolean;
  constructor(lenth = 100, canSwitchLeft = false, canSwitchRight = false) {
    this.lenth = lenth;
    this.disabled = false;
    this.canSwitchLeft = canSwitchLeft;
    this.canSwitchRight = canSwitchRight;
  }
  setDisabled(disable: boolean) {
    this.disabled = disable;
  }
}

class RoadDevice {
  constructor() {}
}

class RGLight extends RoadDevice {
  Rtime: number;
  Gtime: number;
  Ytime: number;
  constructor(rTime: number, gTime: number, yTime = 3) {
    super();
    this.Rtime = rTime;
    this.Gtime = gTime;
    this.Ytime = yTime;
  }
  init() {}
}

class RoadSegment {
  lanes?: Lane[];
  limitSpeed: number;
  constructor(limitSpeed: number) {
    this.limitSpeed = limitSpeed;
  }
  init() {}
  destroy() {}
}

class Road {
  roadSegmentAry?: RoadSegment[];
  constructor() {}
}

export { Car, Lane, ClassicDriverStrategy };
