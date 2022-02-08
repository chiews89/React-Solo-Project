"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Images",
      [
        {
          spotId: 1,
          url: "https://markstewart.com/wp-content/uploads/2015/07/MM-640-FRONT-RENDERING-6-15-2020-scaled.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: "https://www.theplancollection.com/Upload/Designers/126/1853/Plan1261853MainImage_19_4_2017_6_381_251.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: "https://i.insider.com/5d0a5ee4e3ecba260b512c15?width=750&format=jpeg&auto=webp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 4,
          url: "https://i.ytimg.com/vi/35wYjQRnOZA/maxresdefault.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 5,
          url: "https://casepractice.ro/wp-content/uploads/2016/08/proiecte-de-case-medii-cu-mansarda-Medium-sized-loft-houses-1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 6,
          url: "https://static2.mansionglobal.com/production/media/article-images/f295466b19b3aa87590429833e63067e/large_large_942bD71c2ffd444-O5343423.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 7,
          url: "https://town-n-country-living.com/wp-content/uploads/2015/01/farmhouse-exterior.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 8,
          url: "https://image.made-in-china.com/2f0j00nCKfMjSPpZqk/Light-Steel-House-Prefab-House-105sqm-Medium-Size-for-Family-Civil-Housing-Economic-Light-Steel-Structure-Customlized-Prefabricated-Building-House.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 9,
          url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Images", null, {});
  },
};
