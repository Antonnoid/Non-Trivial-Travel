'use strict';
const { Image } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/3c/85/c3/20170123-184259-largejpg.jpg',
        placeId: '1',
      },
      {
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/09/c6/ec/69/caption.jpg',
        placeId: '1',
      },
      {
        url: 'https://avatars.mds.yandex.net/get-altay/4435487/2a000001775e102583cefd3e71206ef18462/L_height',
        placeId: '1',
      },
      {
        url: 'https://images.fooby.ru/2/11/9/5504063',
        placeId: '2',
      },
      {
        url: 'https://avatars.mds.yandex.net/get-altay/4562252/2a0000018236767f8d6d885fb4c433f35960/L_height',
        placeId: '2',
      },
      {
        url: 'https://s16.stc.yc.kpcdn.net/share/i/4/1913901/wr-750.webp',
        placeId: '2',
      },
      {
        url: 'https://susanin.news/upload/iblock/edd/edde0f96e8d19d11ca131122210baff0.jpg',
        placeId: '3',
      },
      {
        url: 'https://izhlife.ru/upload/resize_cache/webp/iblock/74f/ie3pgu0sqwp2ilwcp3btz786qpkik1sw/imgs-1603788310.webp',
        placeId: '3',
      },
      {
        url: 'https://izhlife.ru/uploads/posts/2018-01/1516780831_vostochnyy.jpg',
        placeId: '3',
      },
      {
        url: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=JcrfcqpaFK_6gE0xr29gjQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=129.5261&pitch=0&thumbfov=100',
        placeId: '4',
      },
      {
        url: 'https://pivo.by/images/2018/07/old-beer-cans.jpg',
        placeId: '4',
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIj_KRqvVvecD8eGYIsHlgy4MrEAtv313VLA&usqp=CAU',
        placeId: '4',
      },
      {
        url: 'https://vasilev-life.ru/wp-content/uploads/%D0%9A%D0%B8%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B0%D1%8F-%D0%B1%D0%B5%D1%81%D0%B5%D0%B4%D0%BA%D0%B0-%D0%B2-%D0%9F%D1%8F%D1%82%D0%B8%D0%B3%D0%BE%D1%80%D1%81%D0%BA%D0%B5-3.jpg',
        placeId: '5',
      },
      {
        url: 'https://turist-kavkaz.ru/wp-content/uploads/2019/01/MG_9822-%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F-%D1%81-%D0%BF%D1%82%D0%B8%D1%86%D0%B0%D0%BC%D0%B8-1024x764.jpg',
        placeId: '5',
      },
      {
        url: 'https://www.kurort26.ru/upload/iblock/e0a/e0a72cb48787b429d029dd4872a53335.jpg',
        placeId: '5',
      },
      {
        url: 'https://www.geo360.ru/upload/iblock/012/IMG_20210515_135228.JPG',
        placeId: '6',
      },
      {
        url: 'https://russo-travel.ru/upload/medialibrary/cb0/cb03a721e029c062e0bf7df837d5e75b.jpg',
        placeId: '6',
      },
      {
        url: 'https://www.pyatigorsk.online/content/section/image_100.jpg',
        placeId: '6',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Image.destroy({});
  },
};
