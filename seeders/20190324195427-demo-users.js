'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        firstname: 'bob',
        lastname: 'nguyen',
        email: 'some@email.com',
        password: '$2a$08$QnFK0KcbjaFQMZp/lgilAOSIfmYuH7ZBt7RrwkaGVV92NAqYYLXMq',
        user_id: '27af8b1e-c0c9-4084-8304-256b2ae0c8b2',
        is_admin: false

     },
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'demo@demo.com',
        password: '$2a$08$QnFK0KcbjaFQMZp/lgilAOSIfmYuH7ZBt7RrwkaGVV92NAqYYLXMq',
        user_id: '28bf8b1e-c0c9-4044-8304-256b2ae0c8b2',
        is_admin: false
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'demo2@demo.com',
        password: '$2a$08$QnFK0KcbjaFQMZp/lgilAOSIfmYuH7ZBt7RrwkaGVV92NAqYYLXMq',
        user_id: '29bf8b1e-d0c9-4044-8304-256b2ae0c8b3',
        is_admin: false
      },
      {
        firstname: 'Boss',
        lastname: 'Man',
        email: 'admin@example.com',
        password: '$2a$08$QnFK0KcbjaFQMZp/lgilAOSIfmYuH7ZBt7RrwkaGVV92NAqYYLXMq',
        user_id: 'dbe5019a-614a-4f51-b8c2-5dacc3334427',
        is_admin: true
      },
      {
        firstname: 'Admin',
        lastname: 'Admin',
        email: 'admin@admin.com',
        password: '$2a$08$pI.SLTknayQqtYTr6rlkq.WEWEX8HCcBUZT5fze41PbQNbfAMW3oG',
        user_id: 'c25ba8e2-66d8-4125-b54c-eae0e4366e74',
        is_admin: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
