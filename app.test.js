import request from 'supertest';
import app from './app';

const reqBody = {
  heartbeat: {
    monitorID: 6,
    status: 1,
    time: '2022-12-26 13:29:56.530',
    msg: '200 - OK',
    ping: 122,
    important: true,
    duration: 37
  },
  monitor: {
    id: 6,
    name: 'xlsx-csv-server',
    url: 'https://xlsx-csv.neenus.io/',
    method: 'GET',
    hostname: null,
    port: null,
    maxretries: 0,
    weight: 2000,
    active: 1,
    type: 'http',
    interval: 30,
    retryInterval: 30,
    resendInterval: 0,
    keyword: null,
    expiryNotification: false,
    ignoreTls: false,
    upsideDown: false,
    maxredirects: 10,
    accepted_statuscodes: [Array],
    dns_resolve_type: 'A',
    dns_resolve_server: '1.1.1.1',
    dns_last_result: null,
    pushToken: null,
    docker_container: '',
    docker_host: null,
    proxyId: null,
    notificationIDList: [Object],
    tags: [],
    mqttUsername: '',
    mqttPassword: '',
    mqttTopic: '',
    mqttSuccessMessage: '',
    databaseConnectionString: null,
    databaseQuery: null,
    authMethod: null,
    authWorkstation: null,
    authDomain: null,
    radiusUsername: null,
    radiusPassword: null,
    radiusCalledStationId: null,
    radiusCallingStationId: null,
    radiusSecret: null
  },
  msg: '[xlsx-csv-server] [✅ Up] 200 - OK'
}

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

// Test /notify endpoint
describe('POST /notify', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).post('/notify').send(reqBody);
    expect(response.status).toBe(200);
  })

  it('should return a JSON object', async () => {
    const response = await request(app).post('/notify').send(reqBody);
    expect(response.type).toBe('application/json');
  });

  it('should return a JSON object with a message property', async () => {
    const response = await request(app).post('/notify').send(reqBody);
    expect(response.body).toHaveProperty("message");
  });

  it('should return a JSON object with a msg property with a value of "Notification received and will be handled shortly"', async () => {
    const response = await request(app).post('/notify').send(reqBody);
    expect(response.body.message).toBe('Notification received and will be handled shortly');
  });


});


// Test /notifycallback endpoint
describe('POST /notifycallback', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).post('/notifycallback');
    expect(response.status).toBe(200);
  });

  it('should return a JSON object', async () => {
    const response = await request(app).post('/notifycallback');
    expect(response.type).toBe('application/json');
  });

  it('should return a JSON object with a message property', async () => {
    const response = await request(app).post('/notifycallback');
    expect(response.body).toHaveProperty("message");
  });

  it('should return a JSON object with a msg property with a value of "Notification status callback received and will be handled shortly"', async () => {
    const response = await request(app).post('/notifycallback');
    expect(response.body.message).toBe('Notification status callback received and will be handled shortly');
  });
});



