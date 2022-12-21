import express from 'express';
import Check from '../models/checkModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const checkRouter = express.Router();


checkRouter.get('/', async (req, res) => {
  const checks = await Check.find();
  res.send(checks);
});
checkRouter.post(
  
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCheck = new Check({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      category: 'sample category',
      description: 'sample description',
      number: 0,
    });
    const check = await newCheck.save();
    res.send({ message: 'Check Created', check });
  })
);
checkRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const checkId = req.params.id;
    const check = await Check.findById(checkId);
    if (check) {
      check.name = req.body.name;
      check.slug = req.body.slug;
      
      
      check.category = req.body.category;
      
      check.description = req.body.description;
      check.number=req.body.number;
      await check.save();
      res.send({ message: 'Check Updated' });
    } else {
      res.status(404).send({ message: 'Check Not Found' });
    }
  })
);
checkRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const check = await Check.findById(req.params.id);
    if (check) {
      await check.remove();
      res.send({ message: 'Check Deleted' });
    } else {
      res.status(404).send({ message: 'Check Not Found' });
    }
  })
);

const PAGE_SIZE = 3;
checkRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const checks = await Check.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countChecks = await Check.countDocuments();
    res.send({
      checks,
      countChecks,
      page,
      pages: Math.ceil(countChecks / pageSize),
    });
  })
);
checkRouter.get('/slug/:slug', async (req, res) => {
  const check = await Check.findOne({ slug: req.params.slug });
  if (check) {
    res.send(check);
  } else {
    res.status(404).send({ message: 'Check Not Found' });
  }
});
checkRouter.get('/:id', async (req, res) => {
  const check = await Check.findById(req.params.id);
  if (check) {
    res.send(check);
  } else {
    res.status(404).send({ message: 'Check Not Found' });
  }
});

export default checkRouter; 