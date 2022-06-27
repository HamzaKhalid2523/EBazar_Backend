const redis = require("redis");

const authRedis = redis.createClient({'host':process.env.redisHost || 'localhost'});
const cacheRedis = redis.createClient({ db: 1,'host':process.env.redisHost || 'localhost' });

const { promisify } = require("util");

bindingClient(authRedis);
bindingClient(cacheRedis);

function bindingClient(client: any) {
  const getAsync = promisify(client.get).bind(client);
  const setAsync = promisify(client.set).bind(client);
  const delAsync = promisify(client.del).bind(client);
  const keysAsync = promisify(client.keys).bind(client);

  client.get = getAsync;
  client.set = setAsync;
  client.del = delAsync;
  client.keys = keysAsync;
}
module.exports = { authRedis, cacheRedis };
