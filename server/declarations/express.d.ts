/* tslint:disable */
import { IUserToken } from '../interfaces/userToken';
import * as express from 'express';

declare module "express" {
  interface Request {
    user: IUserToken;
  }
}