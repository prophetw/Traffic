// how to detect other car's distance with you  realLife there are cejuyi  leida
// know which lane is
// know which road is
import EventEmitter from 'eventemitter3';
class GlobalService extends EventEmitter {
  EmitTrafficLightAhead() {
    // 100m ahead traffic light
    this.emit('trafficLightAhead', 100);
  }
}
const globalService = new GlobalService();

class SpeedUpStrategy {
  // RLS === road limit speed
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
  globalService?: GlobalService;
  width: number;
  lenth: number;
  acceleration: number;
  _curSpeed: number;
  maxSpeed: number;
  distance: number;
  offset: number;
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
    if (speed === 0) {
      this.safeDistance = 2;
    }
  }
  get curSpeed() {
    return this._curSpeed;
  }
  constructor(strategy: DriverStrategy) {
    this.width = 2;
    this._curSpeed = 0;
    this.acceleration = 20;
    this.offset = 0; // offset to start of lane
    this.distance = 0; // total
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
  start() {
    // speed up until stop event is emitted
  }
  runFor(seconds: number) {
    // test car run period of time
    const rate = this.driver.speedUpRate * this.acceleration;
    // v = v0 + at
    // s = vt + 1/2*a*t*t
    const stableSpeed = this.getMaxSpeed();
    const totalAccelerationSeconds = (stableSpeed - this.curSpeed) / rate; // acceleration time
    const avalibleAccelerationSeconds = Math.min(
      seconds,
      totalAccelerationSeconds,
    );
    const restSeconds = Math.max(0, seconds - totalAccelerationSeconds); // stableSpeed run time
    this.distance =
      this.distance +
      this.curSpeed * avalibleAccelerationSeconds +
      (1 / 2) *
        rate *
        avalibleAccelerationSeconds *
        avalibleAccelerationSeconds +
      restSeconds * stableSpeed;
    this.curSpeed = this.curSpeed + rate * avalibleAccelerationSeconds;
    this.curSpeed = Math.min(stableSpeed, this.curSpeed);
    this.curSpeed = Math.max(0, this.curSpeed);
  }
  getMaxSpeed() {
    const roadLimitSpeed = this.getRoadLimitSpeed();
    const carMaxSpeed = this.maxSpeed;
    return Math.min(carMaxSpeed, roadLimitSpeed);
  }
  getCurLane() {}
  getRoadLimitSpeed() {
    return 120;
  }
  stop() {
    // assume stop in 3 seconds
    const secondsToStop = 3;
    const slowDownRate = -this.curSpeed / secondsToStop;
    this.distance =
      this.distance +
      this.curSpeed * secondsToStop +
      (1 / 2) * slowDownRate * secondsToStop * secondsToStop;
    this.curSpeed = this.curSpeed + slowDownRate * secondsToStop;
    this.curSpeed = Math.max(0, this.curSpeed);
  }
  getTargetSpeedDistance(targetSpeed: number) {
    // distance that  0 => targetSpeed => 0
    const speedUpDistance = this.getSpeedUpToTargetSpeedDistance(targetSpeed);
    const slowDownDistance = this.getSlowToZeroDistance();
    return speedUpDistance + slowDownDistance;
  }
  getSlowToZeroDistance() {
    // assume 3s to stop
    const secondsStopNeed = 3;
    const rate = -this.curSpeed / secondsStopNeed;
    const distance = this.curSpeed * secondsStopNeed + (1 / 2) * rate * 9;
    return distance;
  }
  getSpeedUpToTargetSpeedDistance(targetSpeed: number) {
    // assume 3s to stop
    const rate = this.driver.speedUpRate * this.acceleration; //
    // const rate = thi
    const secondsNeedToTargetSp = (targetSpeed - this.curSpeed) / rate;
    const distance =
      this.curSpeed * secondsNeedToTargetSp +
      (1 / 2) * rate * secondsNeedToTargetSp * secondsNeedToTargetSp;
    return distance;
  }
  stopAt(distance: number) {
    // speed up to prop position
    const maxSpeedAvaliable = this.getMaxSpeed();
    const;
    if (this.curSpeed < maxSpeedAvaliable) {
      // first speed up to maxSpeed and run at maxSpeed before stop
      // then slow down to stop at dest
    } else {
      // run at maxSpeed then slow down to stop at dest
    }
  }
  speedUp() {}
  speedUpTo(specifiedSpeed: number) {}
  slowDown() {}
  slowDownTo(specifiedSpeed: number) {
    // slow down to a speed
  }
  takeover(frontCar: Car) {
    // takeover beyond frontcar
  }
  getPosition() {
    // 1. simple method use distance
    // 2. lane + offset       switch lane then update new offset
  }
  isCollision(otherCar: Car) {
    // how to calculate isCollision
    // const position = this.distance
    // position
    return true;
  }
  init() {
    this.timecost = Date.now();
  }
  destroy() {
    this.timecost = Date.now() - this.timecost;
    console.log('reach end time cost is: ', this.timecost);
    this.curSpeed = 0;
    this.distance = 0;
    this.safeDistance = 2;
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

class StopLine extends RoadDevice {
  // stop at this line if condition
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

export { Car, TruckCar, Lane, ClassicDriverStrategy, SportsDriverStrategy };
