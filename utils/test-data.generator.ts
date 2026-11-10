const { faker } = require('@faker-js/faker');

export const generateUserData = () => ({
  username: `qa_${faker.string.alphanumeric(8)}`,
  email: faker.internet.email({ provider: 'test.qa' }),
  password: `Pass_${faker.string.alphanumeric(10)}!`,
});

export const generateArticleData = () => ({
  title: `${faker.lorem.words(3)}_${Date.now()}`,
  description: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(2),
  tags: [faker.word.sample(), faker.word.sample()],
});
