import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Creating New Users POST /api/users/create', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .send({
          username: 'test',
          email: 'test@gmail.com',
          password: 'testtest',
        })
        .expect(201);
    });

    it('should return a 400 error if invalid username is provided', () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .send({
          username: 'te',
          email: 'test@gmail.com',
          password: 'testtest',
        })
        .expect(400);
    });

    it('should return a 400 error if invalid password is provided', () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .send({
          username: 'test',
          email: 'test@gmail.com',
          password: 'test',
        })
        .expect(400);
    });

    it('should return a 400 error if invalid email is provided', () => {
      return request(app.getHttpServer())
        .post('/users/create')
        .send({
          username: 'test',
          email: 'testgmailcom',
          password: 'testtest',
        })
        .expect(400);
    });
  });
});
