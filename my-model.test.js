test('It should initialise correctly', () => {
  class MockModel { }
  MockModel.init = jest.fn();
  jest.setMock('sequelize', {
    Model: MockModel
  });
  jest.resetModuleRegistry();
  const MyModel = require('./my-model');
  const mockSequelize = {};
  const mockDataTypes = {
    UUID: 'UUID',
    ENUM: jest.fn((...arr) => `ENUM-${arr.join(',')}`),
    TEXT: 'TEXT',
    STRING: 'STRING'
  };
  MyModel.init(mockSequelize, mockDataTypes);
  expect(MockModel.init).toHaveBeenCalledTimes(1);
  expect(MockModel.init.mock.calls[0]).toMatchSnapshot();
});


jest.mock('sequelize');
const MyModel = require('./my-model');

test('It should call model.findOne with correct order clause', () => {
  const findOneStub = jest.fn();
  const realFindOne = MyModel.findOne;
  MyModel.findOne = findOneStub;
  const mockDb = {
    Association: 'Association',
    OtherAssociation: 'OtherAssociation',
    SecondNestedAssociation: 'SecondNestedAssociation'
  };
  MyModel.getSomethingWithNestedStuff('1234', mockDb);
  expect(findOneStub).toHaveBeenCalled();
  expect(findOneStub.mock.calls[0][0].order).toMatchSnapshot();
  MyModel.findOne = realFindOne;
});
