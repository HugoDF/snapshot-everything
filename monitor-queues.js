const Arena = require('bull-arena');
const JOB_TYPES = {
  MY_TYPE: 'MY_TYPE'
};
const url = require('url');
function getRedisConfig(redisUrl) {
  const redisConfig = url.parse(redisUrl);
  return {
    host: redisConfig.hostname || 'localhost',
    port: Number(redisConfig.port || 6379),
    database: (redisConfig.pathname || '/0').substr(1) || '0',
    password: redisConfig.auth ? redisConfig.auth.split(':')[1] : undefined
  };
}
const monitorQueues = ({ REDIS_URL, QUEUE_MONITORING_PATH }) =>
  Arena(
    {
      queues: [
        {
          name: JOB_TYPES.MY_TYPE,
          hostId: 'Worker',
          redis: getRedisConfig(REDIS_URL)
        }
      ]
    },
    {
      basePath: QUEUE_MONITORING_PATH,
      disableListen: true
    }
  );
module.exports = {
  monitorQueues
};
