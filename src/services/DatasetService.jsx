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
  static async preproccessing_one(dataset_id,width, height, checked) {
    try {
      // Отправляем POST запрос с данными инпутов на нужный вам эндпоинт
      const response = await axios.post(`${this.baseUrl}/datasets/${dataset_id}/update_preprocessing`, {
        resize:`${width}x${height}`,
        normalize: checked // Предполагая, что normalize - это чекбокс
      });

      // Обработка успешного ответа, например, перенаправление пользователя или обновление данных
      console.log("Успешный ответ:", response.data);
    } catch (error) {
      // Обработка ошибок, например, вывод сообщения об ошибке
      console.error("Ошибка при отправке данных:", error);
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
}
