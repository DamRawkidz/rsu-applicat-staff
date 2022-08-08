import * as fromStatus from './status.actions';

describe('loadStatuss', () => {
  it('should return an action', () => {
    expect(fromStatus.loadStatuss().type).toBe('[Status] Load Statuss');
  });
});
