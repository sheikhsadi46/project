import express from 'express';
import Account from '../models/accountModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';

const accountRouter = express.Router();


accountRouter.get('/', async (req, res) => {
  const accounts = await Account.find();
  res.send(accounts);
});
accountRouter.post(
  
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newAccount = new Account({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      category: 'sample category',
      description: 'sample description',
      amount: 0,
    });
    const account = await newAccount.save();
    res.send({ message: 'Account Created', account });
  })
);
accountRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);
    if (account) {
      account.name = req.body.name;
      account.slug = req.body.slug;
      
      
      account.category = req.body.category;
      
      account.description = req.body.description;
      account.amount=req.body.amount;
      await account.save();
      res.send({ message: 'Account Updated' });
    } else {
      res.status(404).send({ message: 'Account Not Found' });
    }
  })
);
accountRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if (account) {
      await account.remove();
      res.send({ message: 'Account Deleted' });
    } else {
      res.status(404).send({ message: 'Account Not Found' });
    }
  })
);

const PAGE_SIZE = 3;
accountRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const accounts = await Account.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countAccounts = await Account.countDocuments();
    res.send({
      accounts,
      countAccounts,
      page,
      pages: Math.ceil(countAccounts / pageSize),
    });
  })
);
accountRouter.get('/slug/:slug', async (req, res) => {
  const account = await Account.findOne({ slug: req.params.slug });
  if (account) {
    res.send(account);
  } else {
    res.status(404).send({ message: 'Account Not Found' });
  }
});
accountRouter.get('/:id', async (req, res) => {
  const account = await Account.findById(req.params.id);
  if (account) {
    res.send(account);
  } else {
    res.status(404).send({ message: 'Account Not Found' });
  }
});

export default accountRouter; 