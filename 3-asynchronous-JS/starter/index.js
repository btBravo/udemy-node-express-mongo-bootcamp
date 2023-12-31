const fs = require('fs');
// const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😟');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file 😟');
      resolve('Success!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err.message);
  }
  return '2: READY 🐶';
};
console.log('1: Will get dog pics')
getDogPic();
console.log('3: Done getting dog pics')

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message);

//     // fs.writeFile('dog-img.txt', res.body.message, err => {
//     //   if (err) return console.log(err.message);
//     //   console.log('Random dog image saved to file!');
//     // });
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });
//
//
//
//
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       //   if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });
