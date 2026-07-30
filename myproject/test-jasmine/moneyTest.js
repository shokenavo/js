import { formatCurrency } from '../scripts/utils/money.js';

describe('test suite : formatCurrency',()=>{
  it('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  })

  it('working with 0 ',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  })

  it('working with rounded number',()=>{
    expect(formatCurrency(2000.4)).toEqual('20.01');
  })
  
})