import TMaxVaryingSet from "./TMaxVaryingSet";

describe('TMaxVaryingSet', () => {
   it('should calculate the weight as the multiple of the trainingMax and multiplier', () => {
       const trainingMax = 100;
       const multiplier = 0.8;
       const set = new TMaxVaryingSet(5, trainingMax, multiplier);
       expect(set.weight).toBe(trainingMax * multiplier);
   });

   it('should have the same weight as the training max if the multiplier is not defined', () => {
       const trainingMax = 100;
       const set = new TMaxVaryingSet(5,trainingMax);
       expect(set.weight).toBe(trainingMax);
   });

   it('should give the multiplier as a percentage correctly', () => {
       const multiplier = 0.8;
       const set = new TMaxVaryingSet(6,100,multiplier);
       expect(set.multiplierAsPercentage).toBe('80%');
   })
});