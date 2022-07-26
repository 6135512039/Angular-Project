const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

let Movie = require('../models/Movie');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/register', async (req, res) => {
    const { email, password, name, surname, tel, img, address, age, sex, BirthDate} = req.body;
    const newUser = new User({email, password, name, surname, tel, img, address, age, sex, BirthDate});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

//Get All Books
router.get('/movies',(req, res) => {
    Movie.find((error, data) => {
      if (error) {
          return next(error);
      } else {
          res.json(data);
      }
    })
});


// Get Books By Id
router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
      })
});

//Add-books
router.post('/private-add-movie', (req, res, next) => {
    Movie.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
      })
});

// Update book
router.put('/private-update-movie/:id',(req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
        if (error) {
          return next(error);
          console.log(er)
        } else {
          res.json(data);
          console.log('Movie Updated Successfully')
        }
    })
});

// Delete book
router.delete('/private-delete-movie/:id',(req, res, next) => {
  Movie.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.status(200).json({
            msg: data
        });
    }
  })
});

//Get All Users
router.get('/users',(req, res) => {
    User.find((error, data) => {
      if (error) {
          return next(error);
      } else {
          res.json(data);
      }
    })
})

//Get User By Id
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
      })
});

// Delete Users
router.delete('/delete-user/:id',(req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
        return next(error);
    } else {
        res.status(200).json({
            msg: data
        });
    }
  })
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
