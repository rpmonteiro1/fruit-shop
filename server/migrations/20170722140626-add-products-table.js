'use strict'

exports.up = function (db) {
  return db.createTable('products', {
    id:          { type: 'int',     primaryKey:  true, autoIncrement: true },
    title:       { type: 'string',  notNull:     true },
    price:       { type: 'decimal', notNull:     true },
    description: { type: 'string' },
    images:      { type: 'text[]', defaultValue: '{}' },
    sweetness:   { type: 'int' },
    created_at:  { type: 'timestamptz', notNull: true, defaultValue:  new String('now()') }
  })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO products (title, price, description, images, sweetness)
         VALUES (
           'Apple',
           0.25,
           'This delicious Maigold Apple from Wädenswil (ZH) will make you want to eat 3 in a row. Buy 3 apples, please. Look how shiny they are!',
           '{
             "http://www.colourbox.com/preview/2168915-697469-red-apple-isolated-on-white-background.jpg",
             "https://w-dog.net/wallpapers/12/3/435654772712591/close-up-background-apple-food-fruits-village-nature-supplies.jpg",
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9WSei5Bl-4a9S2EgAalNOYYAaDABu2h-zVsYexm5u6pLgynYO"
           }',
           70
         ),
         (
           'Orange',
           0.30,
           'From sunny Algarve (south of Portugal), this is the oldest and best kind of Orange there is. Yum!',
           '{
             "http://gdamas.com/wp-content/uploads/2016/04/logo.png",
             "http://www.amesaportuguesa.pt/wp-content/uploads/2016/01/DSC_00271.jpg",
             "http://c7.quickcachr.fotos.sapo.pt/i/Bb215c538/16824713_vbh8e.jpeg"
           }',
           60
         ),
         (
           'Red Banana',
           0.15,
           'Yes, Red Banana! From the Americas, these bananas will impress your entire family when they come to visit you.',
           '{
            "https://images-realfoodtorontoc.netdna-ssl.com/D.cache.large/BananasFruit_94236_Red_Bananas_bunch2-m-1000px.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9allpAegjglB3gj4tdPE0vui3pyszHUC1c6xcGOyq7idaOD1",
            "https://images-realfoodtorontoc.netdna-ssl.com/P.cache.large/BananasFruit_94236_Red_Bananas_bunch1-m-1000px.jpg"
          }',
           90
         ),
         (
           'Papaya',
           '0.5',
           'Soft and plump, our incredible papayas from Mexico go well with anything. ¡Qué bueno!',
           '{
             "https://www.organicfacts.net/wp-content/uploads/2013/05/Papaya2-1020x765.jpg",
             "http://juicing-for-health.com/wp-content/uploads/2012/06/papaya1.jpg",
             "http://balconygardenweb.com/wp-content/uploads/2016/01/how-to-grow-papaya.jpg"
           }',
           75
         )
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('products')
}
