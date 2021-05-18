// Задание 1
// Напиши функцию delay(ms), которая возвращает промис, переходящий в состояние "resolved" 
// через ms миллисекунд.Значением исполнившегося промиса должно быть то кол - во миллисекунд
// которое передали во время вызова функции delay.

const delay = ms => {
    console.log(ms)
    return Promise.resolve(setTimeout(() => ms, ms));   
};

// const delay = ms => {

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(ms);           
//   }, ms);
//     })   
// };

const logger1 = time => console.log(`Resolved after ${time} ms`);

// // Вызовы функции для проверки
delay(2000).then(logger1); // Resolved after 2000ms
delay(1000).then(logger1); // Resolved after 1000ms
delay(1500).then(logger1); // Resolved after 1500ms

// Задание 2
// Перепиши функцию toggleUserState() так, чтобы она не использовала callback - функцию callback,
//     а принимала всего два параметра allUsers и userName и возвращала промис.

const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  const updatedUsers = allUsers.map(user =>
    user.name === userName ? { ...user, active: !user.active } : user,
  );
    
    return Promise.resolve(updatedUsers);

    // return new Promise((resolve, reject) => {
    //     resolve(updatedUsers);        
    //     reject('erro')    
    // })
};

const logger2 = updatedUsers => console.table(updatedUsers);

// /*
//  * Сейчас работает так
//  */
// // toggleUserState(users, 'Mango', logger2);
// // toggleUserState(users, 'Lux', logger2);

// /*
//  * Должно работать так
//  */
toggleUserState(users, 'Mango').then(logger2);
toggleUserState(users, 'Lux').then(logger2);


// Задание 3
// Перепиши функцию makeTransaction() так, чтобы она не использовала callback - функции
// onSuccess и onError, а принимала всего один параметр transaction и возвращала промис.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
    const delay = randomIntegerFromInterval(200, 500);
    
    return new Promise((resolve, reject) => {
        const canProcess = Math.random() > 0.3;
        setTimeout(() => {
            if (canProcess) {
                resolve({id: transaction.id, time: delay });
            }
            reject(transaction.id);
        }, delay);
    });
};

const logSuccess = ({id, time}) => {
 console.log(`Transaction ${id} processed in ${time} ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Работает так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
//  */
makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);