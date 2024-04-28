import React from 'react';
import imageSrc from './esca_416_cam2.jpg'; // Убедитесь, что имя файла правильное и регистр символов совпадает
import { Image } from 'primereact/image';
const Home = () => {
  return (
    <div className='main-home'>
      <Image src={imageSrc}alt="Image" width="250" />
    </div>
  );
};

export default Home;
