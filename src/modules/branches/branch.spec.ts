import { BranchService } from './branches.service';

describe('Branch', () => {
  it('should be defined', () => {
    expect(new BranchService()).toBeDefined();
  });
});
