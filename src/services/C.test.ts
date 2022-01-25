import { Car, Lane, TruckCar, ClassicDriverStrategy } from './C';

const sleep = async (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, delay * 1000);
  });
};
describe(' test ', () => {
  test(' limitSpeed ', async () => {
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
    expect(newC.curSpeed).toBe(newC.maxSpeed);
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
});
