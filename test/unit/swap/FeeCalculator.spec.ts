// tslint:disable:max-line-length
import { expect } from 'chai';
import { OutputType } from '../../../lib/consts/Enums';
import { estimateFee } from '../../../lib/FeeCalculator';
import { getHexBuffer } from '../../../lib/Utils';

describe('FeeCalculator', () => {
  it('should estimate the fee for PKH inputs and outputs correctly', () => {
    const allTypesArray = [
      { type: OutputType.Bech32 },
      { type: OutputType.Compatibility },
      { type: OutputType.Legacy },
    ];

    const testData = {
      args: {
        satsPerVbyte: 1,
        inputs: allTypesArray,
        outputs: allTypesArray,
      },
      result: 414,
    };

    const result = estimateFee(testData.args.satsPerVbyte, testData.args.inputs, testData.args.outputs);
    expect(result).to.be.equal(testData.result);
  });

  it('should estimate the fee for swaps inputs and outputs correctly', () => {
    const swapDetails = {
      redeemScript: getHexBuffer('a914e2ac8cb97af3d59b1c057db4b0c4f9aa12a9127387632103f8109578aae1e5cfc497e466cf6ae6625497cd31886e87b2f4f54f3f0f46b539670354df07b1752103ec0c1e45b709d708cd376a6f2daf19ac27be229647780d592e27d7fb7efb207a68ac'),
      preimage: getHexBuffer('b5b2dbb1f0663878ecbc20323b58b92c'),
    };

    const testData = {
      args: {
        satsPerVbyte: 1,
        inputs: [
          {
            swapDetails,
            type: OutputType.Bech32,
          },
          {
            swapDetails,
            type: OutputType.Compatibility,
          },
          {
            swapDetails,
            type: OutputType.Legacy,
          },
        ],
        outputs: [
          {
            type: OutputType.Bech32,
            isSh: true,
          },
          {
            type: OutputType.Compatibility,
            isSh: true,
          },
          {
            type: OutputType.Legacy,
            isSh: true,
          },
        ],
      },
      result: 569,
    };

    const result = estimateFee(testData.args.satsPerVbyte, testData.args.inputs, testData.args.outputs);
    expect(result).to.be.equal(testData.result);
  });
});
