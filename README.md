# SemanticBits 'Heroes' coding Challenge

This application was written as a programming challenge from [SemanticBits](https://semanticbits.com/) in December, 2020.  

The challenge was dependent on a backend project provide by SemanticBits:
[https://github.com/semanticbits/interview-api](https://github.com/semanticbits/interview-api).  

My challenge in the interview was to:
* Make some fixes and enhancements to [routes/hereos/index.js](https://github.com/semanticbits/interview-api/blob/master/routes/heroes/index.js).  
From the *interview-api* project. These fixes are pasted later down in this file.
* Write the client React code in the present project

## Comments to Interviewers
To Jeff Tassin and Austin Hendry:

First, I realized that the server layer in my code was 
unnecessary.  It was sufficient to simply point the 
proxy in [package.json](https://github.com/gregsandell/semanticbitsfrontendchallenge/blob/master/package.json) directlty at
*http://localhost:9000*, where the `interview-api` server is running.  That
server code has been removed.

Second, you may recall that our meeting ended with me blocked on a bug; 
I found it's source:

In my server code (now deleted), I set the endpoint URL to 
`http://localhost:9000/heroes` and my server's endpoint 
was calling `/heroes` from that, resulting in the mistaken
URL `http://localhost:9000/heroes/heroes`
  
I found the solution within 60 seconds of hanging up the call! :-)


## Instructions
1. Have Node.js v.14 installed
2. In terminal:  `nvm use` (unless you don't have nvm installed)
3. In terminal:  `npm install`
4. In terminal:  `npm start`
5. In browser: Navigate to [localhost:3000](http://localhost:3000).


## Technology Choices
1. *create-react-app* for scaffolding
2. Node.js *Express* for proxying requests to the Twitter REST api
3. *fetch* api for AJAX calls
4. React hooks

## Stylistic Preferences
1. I prefer the 'no semicolons' approach favored by [Standard JS](https://standardjs.com).
2. I prefer to have the server and React client code in a single project.
3.  I use a `jsconfig.json` to establish default import paths.  This avoids clumsy relative path imports such as:

```javascript
import Tag from '../containers/Tag'
```

## Edited version of routes/hereos/index.js
```
const router = require('express').Router();

let heroes = [
  {
    id: 3,
    firstName: 'Tony',
    lastName: 'Stark',
    organization: 'Marvel'
  },
  {
    id: 7,
    firstName: 'Orora',
    lastName: 'Munroe',
    organization: 'Marvel'
  },
  {
    id: 1,
    firstName: 'Bruce',
    lastName: 'Banner',
    organization: 'Marvel'
  },
  {
    id: 2,
    firstName: 'Bruce',
    lastName: 'Wayne',
    organization: 'DC'
  },
  {
    id: 5,
    firstName: 'Clark',
    lastName: 'Kent',
    organization: 'DC'
  },
  {
    id: 8,
    firstName: 'Miles',
    lastName: 'Morales',
    organization: 'Marvel'
  },
  {
    id: 4,
    firstName: 'John',
    lastName: 'Stark',
    organization: 'Marvel'
  },
  {
    id: 6,
    firstName: 'Selina',
    lastName: 'Kyle',
    organization: 'DC'
  }
];

const ascendingSortById = function compare(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
/*
Instructions for enhancements (copied from the README):

- only include heroes from the Marvel organization
- hero last names should be unique (no duplicate last names)
- heroes should be sorted by id (ascending)
- each hero should have an added name property that is a combination of firstName and lastName
 */
router.get('/', async (req, res) => {
  let lastnameMap = {}
  let _heroes = heroes
      .filter(hero => {
        const result = hero.organization === 'Marvel' && !(hero.lastName in lastnameMap)
        if (!(hero.lastName in lastnameMap)) {
          lastnameMap[hero.lastName] = hero.lastName
        }
        return result
      })
      .map(hero => ({ ...hero, name: `${hero.firstName} ${hero.lastName}`}))
      .sort(ascendingSortById)
  res.json({
    heroes: _heroes
  });
});

router.get('/:id', function (req, res) {
  try {
    let id, person
    if (req.params.id) {
      id = req.params.id;
    }
     person = heroes.find(hero => hero.id === Number(id))
    res.json({
      person: person
    });
  } catch (e) {
    res.json({
      message: e
    });
  }
});

module.exports = router;

```
