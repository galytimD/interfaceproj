import axios from 'axios';

export class DatasetService {
  // Определение базового URL для всех запросов
  static baseUrl = "http://127.0.0.1:4000";

  static async getAll() {
    try {
      const response = await axios.get(`${this.baseUrl}/datasets`);
      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw error;
    }
  }

  // Метод для получения датасета по ID
  static async getById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/datasets/${id}`);
      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных для ID:", id, error);
      throw error;
    }
  }
  static async getPreprocessed() {
      const response = await axios.get(`${this.baseUrl}/datasets/preprocessed`);
      return response;
   
  }
  static async preprocessing(dataset_id, width, height, checkedRot, checkedMirror, checkedZoom) {
    try {
      const params = {
        width,
        height,
        rotate: checkedRot,
        mirror: checkedMirror,
        zoom: checkedZoom,
        dataset_id: dataset_id
      };
  
      console.log("Отправка данных:", params);
  
      const response = await axios.post(`${this.baseUrl}/datasets/preprocessing`, params);
  
      console.log("Ответ сервера:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      throw error; // Переброс ошибки для дальнейшей обработки
    }
  }
  
  static async upload(name) {
    try {
      const params = {project_name: name};
  
      console.log("Отправка данных:", params);
  
      const response = await axios.post(`${this.baseUrl}/datasets/upload`, params);
  
      console.log("Ответ сервера:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error.response ? error.response.data : error.message);
      throw error; // Переброс ошибки для дальнейшей обработки
    }
  }
  
  

  static async deleteFile(datasetId, imageId){
    try {
      const response = await axios.delete(`${this.baseUrl}/datasets/${datasetId}/images/${imageId}}`);
      if (response){
        return true;
      }
    } catch (error) {
      console.error("Ошибка при удалении файла:", datasetId, error);
      throw error;
    }
  }

  static async getCoordinates(){
    try {
      const response = await axios.get(`${this.baseUrl}/images/coordinates`);
      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw error;
    }
  }

  static async getImagesCount(){
    try {
      const response = await axios.get(`${this.baseUrl}/images/count_preproccessed`);
      return response;
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      throw error;
    }
  }
}
