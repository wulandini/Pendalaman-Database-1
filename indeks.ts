import 'source-map-support/register'

import dotenv from 'dotenv';
dotenv.config();

import express from 'express'

import connectDB from './connect';
import {customer, CustomerType } from './mongoose';

cons app = exress();
connectDB()

const customerModel = new customer();

//middlewares
app.use(express.json());
app.use(err: error, req: express.Request, res: express.response, next: express.NextFunction)
    res.status(500).json({
        success: false,
        message: err.massage
    });
});

//routers
//@route POST/customers
//@desc Create customers
app.post('/customers', async (req, res, next) => {
    let customers: customerType | customerType[];
    try {
        if(req.body instanceof Array) {
            customers = await customerModel.create(req.body);
        }   else {
            customers = await customerModel.create(req.body)
        }

    } catch (error) {
        return next(error);
    }
});

//@router GET /customer
//@desc     Fetch all customers
app.get('/customers', async (req, res, next) => {
    let customers: CustomerType[];
    const limit = Number(req.query.limit) || 10;
    try {
      customers = await customerModel.getAll(limit)
    } catch (error) {
      return next(error)
    }
  
    return res.send(customers)
  
  }); 
  
  app.get('/customers/search', async (req, res, next) => {
    let customers: CustomerType[];
    const keyword = req.query.keyword ? {
      first_name: {
        $regex: req.query.keyword as string,
        $options: 'i'
      }
    } : {};
  
    try {
      customers = await customerModel.getByName(keyword)
    } catch (error) {
      return next(error)
    }
  
    return res.send(customers)
  })
  
  app.get('/customers/type/:type', async (req, res, next) => {
    let customers: CustomerType[];
    const type = req.params.type as string;
  
    try {
      customers = await customerModel.getByType(type)
    } catch (error) {
      return next(error)
    }
  
    return res.send(customers)
  })

  app.get('/customers/state/:state', async (req, res, next) => {
    let customers: CustomerType[];
    const type = req.params.type as string;
  
    try {
      customers = await customerModel.getByState(type)
    } catch (error) {
      return next(error)
    }
  
    return res.send(customers)
  })
  
  app.listen(4000, () => {
    console.log('App listen to port 4000');
  });