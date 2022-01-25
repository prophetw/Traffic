// how to detect other car's distance with you  realLife there are cejuyi  leida
// know which lane is
// know which road is

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
  speedUpRate: number; //
  constructor(speedUpRate: number) {
    this.speedUpRate = speedUpRate;
  }
}

class ClassicDriverStrategy extends DriverStrategy {
  constructor() {
    super(0.5); //medAcceleration
  }
}

class SportsDriverStrategy extends DriverStrategy {
  constructor() {
    super(1); // maxAcceleration
  }
}

class Car {
  width: number;
  lenth: number;
  acceleration: number;
  _curSpeed: number;
  maxSpeed: number;
  distance: number;
  driver: DriverStrategy;
  timecost: number;
  safeDistance: number;
  frontCar?: Car;
  set curSpeed(speed: number) {
    this._curSpeed = speed; // km/h
    // need 3 seconds to slow down to 0 speed
    this.safeDistance = Math.max(
      2,
      ((this._curSpeed * 3) / 3600) * 1000 -
        (((1 / 2) * this._curSpeed) / 3) * ((3 * 3) / 3600) * 1000,
    );
  }
  get curSpeed() {
    return this._curSpeed;
  }
  constructor(strategy: DriverStrategy) {
    this.width = 2;
    this._curSpeed = 0;
    this.acceleration = 20;
    this.distance = 0;
    this.safeDistance = 2;
    this.lenth = 3;
    this.maxSpeed = 200;
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
    const rate = this.driver.speedUpRate * this.acceleration;
    // v = v0 + at
    // s = vt + 1/2*a*t*t
    this.distance =
      this.distance +
      this.curSpeed * seconds +
      (1 / 2) * rate * seconds * seconds;
    this.curSpeed = this.curSpeed + rate * seconds;
    this.curSpeed = Math.min(this.maxSpeed, this.curSpeed);
    this.curSpeed = Math.max(0, this.curSpeed);
  }
  getCurLane() {}
  getRoadLimitSpeed() {}
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
  setFrontCar(car: Car) {
    this.frontCar = car;
  }
  getFrontCar() {
    return this.frontCar;
  }
  getCarLB5M() {}
}
class TruckCar extends Car {
  constructor(strategy: DriverStrategy) {
    super(strategy);
    this.acceleration = 10;
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
  vehicleAry: Car[];
  constructor(lenth = 100, canSwitchLeft = false, canSwitchRight = false) {
    this.lenth = lenth;
    this.disabled = false;
    this.vehicleAry = [];
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

export { Car, TruckCar, Lane, ClassicDriverStrategy };
