import { UserI } from '@interfaces/ProductI';
import { apiRequest } from '../apiReq';

//!+Вроде и костыль ,но задачи закрывает . 1) Сюда я могу (сейчас) дотянуться тестами 2)Привести данные к удобному виду для rtk слайса и типизация там теперь выглядит приемлемо

//Получение списка пользователей для sign in
export const fetchGetUserListReq = async () => {
  const res = await apiRequest<{ userList: UserI[] }>({ url: '/users', method: 'get' });
  return res.userList;
};

export const fetchPostUserRegistrationReq = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await apiRequest<{ user: UserI }>({
    url: '/users',
    method: 'post',
    data,
  });
  return res.user;
};
//! разобраться с dto
export const fetchDeleteUserReq = async (id: string) => {
  const res = await apiRequest<{ user: UserI }>({
    url: `/users/${id}`,
    method: 'delete',
  });
  return res.user;
};
