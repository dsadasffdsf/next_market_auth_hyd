import path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const usersFilePath = path.join(process.cwd(), 'src/data/users.json');

export async function getUsers() {
  const data = await fs.readFile(usersFilePath, 'utf-8');

  return JSON.parse(data);
}
export async function createUser({ email, name, password, userList }) {
  const newId = uuidv4();
  //   console.log(newId);
  console.log(name, '----------name');

  const newUser = {
    id: newId,
    email: email,
    name: name,
    password: password,
    role: 'user',
    basket: [],
  };

  //   console.log(newUser, '------------------');

  await saveUsers([...userList, newUser]);
  //! _password
  const { password: _password, basket: _basket, ...dto } = newUser;

  return dto;
}

export async function saveUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

// export async function authGoogle({ email, name }) {
//   const userList = await getUsers();

//   //   console.log(userList,"--------------------------");

//   const user = userList.find((user) => {
//     return user.email === email;
//   });
//   //   console.log(user, '-----------------------');

//   if (!user) {
//     const newUser = await createUser({ email, name });

//     return newUser;
//   }

//   return user;
// }

export async function auth({ email, password }) {
  const userList = await getUsers();

  //   console.log(userList,"--------------------------");

  const user = userList.find((user) => {
    return user.email === email;
  });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  // const token = generateToken(user.id);
  const dto = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    // basket: user.basket,
  };

  return dto;
}
export async function registration({ name, email, password }) {
  const userList = await getUsers();
  console.log(name, '----------name');
  //   console.log(userList,"--------------------------");

  const user = userList.find((user) => {
    return user.name === name;
  });
  // console.log(user, '-----------------------------user');

  if (user) {
    throw new Error('Такой пользователь уже существует');
  }

  if (userList.some((user) => user.email === email)) {
    throw new Error('Эта почта уже зарегистрирована');
  }

  const dto = await createUser({ name, email, password, userList });
  // console.log(dto, 'dto---------------');

  return dto;
}

