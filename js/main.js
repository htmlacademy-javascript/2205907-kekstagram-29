import { getPhotoInfo } from './photoData.js';
import './util.js';
import './photorender.js';
import './viewer.js';
import './commentGenerator.js';
import './form.js';
import { LoadedImgPreview } from './form.js';

getPhotoInfo(25);
LoadedImgPreview();


//Для проверки корректности работы функции createPhotosData() , необходимо ее испортировать из файла ./data.js
// console.log(createPhotosData());
