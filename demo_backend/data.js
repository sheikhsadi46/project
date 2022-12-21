import bcrypt from 'bcryptjs';
const data = {
    accounts:[
      {
        name: 'Current Account',
        slug: 'current',
        category:'current',
        description: 'current',
        amount: 19990000,
      },
      {
        name: 'Saving Account',
        slug: 'saving',
        category: 'saving',
        description: 'saving',
        amount: 120000,
      },
    ],
    cardds:[
      {
        name: 'Current Card',
        slug: 'current',
        category:'current',
        description: 'current',
        acive: 1,
        number: 88888819990000,
      },],
      checks:[
        {
          name: 'New check',
          slug: 'current',
          category:'current',
          description: 'current',
          acive: 1,
          number: 1000000019990000,
        },],

    
    users: [
      {
        name: 'sheikhsadi',
        email: 'sheikhsadi@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
      },
      
    ],
    products: [
      {
        name: 'Rahim',
        slug: 'rahim',
        category: 'Account',
        image: '/images/p1.jpg', // 679px × 829px
        price: 121,
        countInStock: 10,
        brand: 'DBBL',
        rating: 4.5,
        numReviews: 10,
        description: 'DBBL Current Account',
      },
      {
        name: 'Karim',
        slug: 'karim',
        category: 'Account',
        image: '/images/p2.jpg',
        price: 4646464250,
        countInStock: 0,
        brand: 'Brac Bank',
        rating: 4.0,
        numReviews: 10,
        description: 'Brac Bank Current Account',
      },
      {
        name: 'Banificiary1',
        slug: 'banificiary1',
        category: 'Account',
        image: '/images/p3.jpg',
        price: 25,
        countInStock: 15,
        brand: 'Demo Bank',
        rating: 4.5,
        numReviews: 14,
        description: 'Demo Bank Current Account',
      },
      {
        name: 'Banificiary2',
        slug: 'banificiary2',
        category: 'Account',
        image: '/images/p3.jpg',
        price: 25,
        countInStock: 15,
        brand: 'Demo Bank',
        rating: 4.5,
        numReviews: 14,
        description: 'Demo Bank Current Account',
      },
      {
        name: 'Banificiary2',
        slug: 'banificiary2',
        category: 'Account',
        image: '/images/p3.jpg',
        price: 25,
        countInStock: 15,
        brand: 'Demo Bank',
        rating: 4.5,
        numReviews: 14,
        description: 'Demo Bank Current Account',
      },
      
    ],
  };
  export default data;