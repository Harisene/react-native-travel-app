export default [
  {
    id: 0,
    location: 'Pinnawala',
    path: require('../assets/images/1.jpg'),
    description:
      'Pinnawala Elephant Orphanage is an orphanage, nursery and captive breeding ground for wild Asian elephants located at Pinnawala village, 13 km (8.1 mi) northeast of Kegalle town in Sabaragamuwa Province of Sri Lanka. Pinnawala has the largest herd of captive elephants in the world.',
    date: '3 AUG - 5 AUG',
    days: 2,
    departure: {
      airport: 'LONDON HEATROW',
      time: '3 AUG, 10.00 AM',
    },
    moreDetails: [
      {
        id: 0,
        date: '3 Aug.',
        category: 'Hiking',
        map: require('../assets/images/map1.jpg'),
        time: '8 hours',
        distance: '20km',
      },
      {
        id: 1,
        date: '4 Aug.',
        category: 'Hiking',
        map: require('../assets/images/map2.jpg'),
        time: '7 hours',
        distance: '12km',
      },  
    ],
  },

  {
    id: 1,
    location: 'Polonnaruwa',
    path: require('../assets/images/2.jpg'),
    description:
      'Just walk into the Golden age by entering the city of Polonnaruwa which is not only its capital but also an ancient kingdom of Sri Lanka too. You will find some of the ancient remains of palaces, shrines and stupa. It is amongst the highly visited Sri Lanka tourist places.',
    date: '20 SEP - 24 SEP',
    time: '8 hours',
    distance: '20km',
    days: 4,
    departure: {
      airport: 'OSLA LUFTHVAN',
      time: '20 SEP, 9.00 PM',
    },
  },

  {
    id: 2,
    location: 'Anuradhapura',
    path: require('../assets/images/3.jpg'),
    description:
      'Anuradhapura is one of the world heritage site and the place gained importance only after the coming of the Bodhi tree which is known as the tree of enlightenment. The cutting of this tree was brought to Sri Lanka by Sanghamitta and is also one of the famous places to see in Sri Lanka.',
    date: '10 OCT - 18 OCT ',
    time: '8 hours',
    distance: '20km',
    days: 8,
    departure: {
      airport: 'AIRPORT 2',
      time: '3 AUG, 10.00 AM',
    },
  },
  {
    id: 3,
    location: 'The Temple Tooth ',
    path: require('../assets/images/4.jpg'),
    description:
      'Nestled close to the Udawattakele Sanctuary, The Temple of the Sacred Tooth Relic is one of the most important shrines of Sri Lanka. Also named as Dalada Maligawa, this temple is based in the royal palace of the Kingdom of Kandy.',
    date: '3 DEC - 5 DEC',
    time: '8 hours',
    distance: '20km',
    days: 2,
    departure: {
      airport: 'AIRPORT 3',
      time: '3 AUG, 10.00 AM',
    },
  },  
  
];
