import { Car, Lane, TruckCar, ClassicDriverStrategy } from './C';

describe(' test ', () => {
  test.skip(' limitSpeed ', async () => {
    console.log('1');
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    newC.runFor(3);
    console.log(newC);
    const newC2 = new TruckCar(stg);
    newC2.runFor(3);
    expect(newC2.curSpeed).toBe(15);
    newC2.runFor(3);
    expect(newC2.curSpeed).toBe(30);
    newC2.runFor(3);
    expect(newC2.curSpeed).toBe(45);
    newC2.runFor(11);
    console.log(newC2);
    expect(newC2.curSpeed).toBe(newC2.maxSpeed);
    expect(newC.curSpeed).toBe(30);
    newC.runFor(30);
    expect(newC.curSpeed).toBe(newC.getMaxSpeed());
  });
  test(' stop ', () => {
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    newC.runFor(3);
    newC.stop();
    console.log(newC);

    expect(newC.curSpeed).toBe(0);
    expect(newC.safeDistance).toBe(2);
    expect(newC.distance).toBe(90);
    newC.runFor(3);
    console.log(newC);
    expect(newC.distance).toBe(135);
    newC.runFor(3);
    console.log(newC);
    expect(newC.distance).toBe(270);
    newC.runFor(14);
    expect(newC.curSpeed).toBe(newC.getMaxSpeed());
  });
  test.only(' stop at distance ', () => {
    //
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    newC.start();
    newC.stopAt(3000);
    expect(newC.distance).toBe(3000);
    expect(newC.curSpeed).toBe(0);
  });
  test(' maxSpeed ', () => {
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    newC.runFor(20);
    expect(newC.distance).toBe(1680);
    newC.stop();
    newC.destroy();
    console.log(newC);
    newC.runFor(3);
    newC.runFor(3);
    newC.runFor(14);
    console.log(newC);
    expect(newC.distance).toBe(1680);
    expect(newC.curSpeed).toBe(newC.getMaxSpeed());
  });
  test(' no collision ', () => {
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    const newC2 = new TruckCar(stg);
    newC.setFrontCar(newC2);
    newC2.runFor(10);
    console.log(newC2);
    newC.runFor(10);
    const isCollision = newC.isCollision(newC2);
    expect(isCollision).toBeFalsy();
  });
  test(' get position info ', () => {
    // 1 use distance
    // 2 like gps x y z
    // 3 lane offsetFromStart
  });
  test(' safe distance ', () => {
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    const newC2 = new TruckCar(stg);
    newC.setFrontCar(newC2);
    newC2.runFor(10);
    console.log(newC2);
    newC.runFor(9);
    expect(newC.curSpeed).toBe(newC2.curSpeed);
  });
  test(' switch lane and speed up and overtake ', () => {});
  test(' get frontCar from lane carAry ', () => {});
  test(' get limitSpeed from roadInfo ', () => {});
  test(' frontCar run 30s then stopped the car which after frontCar stop after front car', () => {});
  test(' frontCar run 30s then run at maxSpeed the car which after frontCar run the same maxSpeed and keep safedistance', () => {});
  test(' red green light ', () => {});
});
