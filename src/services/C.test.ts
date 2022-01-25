import { Car, Lane, ClassicDriverStrategy } from './C';

const sleep = async (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, delay * 1000);
  });
};
describe(' test ', () => {
  test('prop', async () => {
    console.log('1');
    const stg = new ClassicDriverStrategy();
    const newC = new Car(stg);
    newC.runFor(3);
    console.log(newC);
    expect(newC.lenth).toBe(3);
  });
});
