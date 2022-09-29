import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { SessionEntity } from '../src/typeorm/Session';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
    app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
        store: new TypeormStore({
          cleanupLimit: 100,
        }).connect(sessionRepository),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('Authentication', () => {
    let cookie;
    const URL = '/auth/login';
    it('should login', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({
          email: 'gaurav@gmail.com',
          password: '12345678',
        })
        .expect(201)
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
        });
    });
    it('should visit the guarded routes', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
