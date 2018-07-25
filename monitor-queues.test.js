jest.mock('bull-arena');
const { monitorQueues } = require('./monitor-queues');
describe('monitorQueues', () => {
  test('It should return an Arena instance with parsed data from REDIS_URL', () => {
    const redisPort = 5555;
    const REDIS_URL = `redis://h:passsssword@hosting:${redisPort}/database-name`;
    const QUEUE_MONITORING_PATH = '/arena';
    const ArenaConstructor = require('bull-arena');
    ArenaConstructor.mockReset();
    monitorQueues({ REDIS_URL, QUEUE_MONITORING_PATH });
    expect(ArenaConstructor).toHaveBeenCalledTimes(1);
    expect(ArenaConstructor.mock.calls[0]).toMatchSnapshot();
  });
  test('It should return an Arena instance with defaulted redis data when REDIS_URL is empty', () => {
    const REDIS_URL = '';
    const QUEUE_MONITORING_PATH = '/arena';
    const ArenaConstructor = require('bull-arena');
    ArenaConstructor.mockReset();
    monitorQueues({ REDIS_URL, QUEUE_MONITORING_PATH });
    expect(ArenaConstructor).toHaveBeenCalledTimes(1);
    expect(ArenaConstructor.mock.calls[0]).toMatchSnapshot();
  });
});
