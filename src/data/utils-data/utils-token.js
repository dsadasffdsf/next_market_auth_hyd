import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'secret'; // Ключ для подписи токена

// Функция для генерации токена
export function generateToken(userId) {
  // Данные, которые будут зашифрованы в токене
  const payload = {
    id: userId, // Уникальный идентификатор пользователя
  };

  // Опции токена, такие как срок его действия
  const options = {
    expiresIn: '24h', // Время жизни токена (например, 1 час)
  };

  // Генерация и подпись токена
  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
}
