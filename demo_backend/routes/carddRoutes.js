import express from 'express';
import Cardd from '../models/carddModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const carddRouter = express.Router();


carddRouter.get('/', async (req, res) => {
  const cardds = await Cardd.find();
  res.send(cardds);
});
carddRouter.post(
  
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCardd = new Cardd({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      category: 'sample category',
      description: 'sample description',
      active: 1,
      number: 0,
    });
    const cardd = await newCardd.save();
    res.send({ message: 'Cardd Created', cardd });
  })
);
carddRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const carddId = req.params.id;
    const cardd = await Cardd.findById(carddId);
    if (cardd) {
      cardd.name = req.body.name;
      cardd.slug = req.body.slug;
      
      
      cardd.category = req.body.category;
      cardd.active=req.body.active
      cardd.description = req.body.description;
      cardd.number=req.body.number;
      await cardd.save();
      res.send({ message: 'Cardd Updated' });
    } else {
      res.status(404).send({ message: 'Cardd Not Found' });
    }
  })
);
carddRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const cardd = await Cardd.findById(req.params.id);
    if (cardd) {
      await cardd.remove();
      res.send({ message: 'Cardd Deleted' });
    } else {
      res.status(404).send({ message: 'Cardd Not Found' });
    }
  })
);

const PAGE_SIZE = 3;
carddRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const cardds = await Cardd.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countCardds = await Cardd.countDocuments();
    res.send({
      cardds,
      countCardds,
      page,
      pages: Math.ceil(countCardds / pageSize),
    });
  })
);
carddRouter.get('/slug/:slug', async (req, res) => {
  const cardd = await Cardd.findOne({ slug: req.params.slug });
  if (cardd) {
    res.send(cardd);
  } else {
    res.status(404).send({ message: 'Cardd Not Found' });
  }
});
carddRouter.get('/:id', async (req, res) => {
  const cardd = await Cardd.findById(req.params.id);
  if (cardd) {
    res.send(cardd);
  } else {
    res.status(404).send({ message: 'Cardd Not Found' });
  }
});

export default carddRouter; 