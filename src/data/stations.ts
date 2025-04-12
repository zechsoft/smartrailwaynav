import  { Station, Notification } from '../types';

export const stationData: Record<string, Station> = {
  'chennai-central': {
    id: 'chennai-central',
    name: 'Chennai Central Railway Station',
    code: 'MAS',
    city: 'Chennai',
    state: 'Tamil Nadu',
    crowdLevel: 'high',
    isFavorite: true,
    coordinates: {
      latitude: 13.0827,
      longitude: 80.2707
    },
    amenities: [
      { id: 'a1', name: 'Washrooms', icon: 'User', crowdLevel: 'medium', location: 'Ground Floor, Near Platform 1 & 6', details: 'Clean facilities with attendants', lastUpdated: '10 minutes ago' },
      { id: 'a2', name: 'Ticket Counter', icon: 'CreditCard', crowdLevel: 'high', location: 'Main Entrance Hall', details: 'Multiple counters for different ticket types', lastUpdated: '5 minutes ago' },
      { id: 'a3', name: 'Waiting Room', icon: 'Clock', crowdLevel: 'medium', location: 'First Floor, Above Platform 4-5', details: 'AC and non-AC waiting areas available', lastUpdated: '15 minutes ago' },
      { id: 'a4', name: 'Luggage Room', icon: 'Package', crowdLevel: 'low', location: 'East Wing, Near Platform 8', details: 'Secure storage with 24/7 surveillance', lastUpdated: '30 minutes ago' },
      { id: 'a5', name: 'Food Court', icon: 'Coffee', crowdLevel: 'high', location: 'Central Concourse', details: 'Various food options including South Indian cuisine', lastUpdated: '20 minutes ago' },
      { id: 'a6', name: 'Information', icon: 'Info', crowdLevel: 'medium', location: 'Near Main Entrance', details: 'Multilingual staff available', lastUpdated: '25 minutes ago' },
      { id: 'a7', name: 'ATM', icon: 'CreditCard', crowdLevel: 'low', location: 'Near Platform 2 Entrance', details: 'Multiple bank ATMs available', lastUpdated: '40 minutes ago' },
      { id: 'a8', name: 'Medical Room', icon: 'HelpCircle', crowdLevel: 'low', location: 'Between Platforms 8-9', details: 'First aid and emergency assistance', lastUpdated: '1 hour ago' },
      { id: 'a9', name: 'Foreign Exchange', icon: 'Globe', crowdLevel: 'low', location: 'Main Concourse, Near Enquiry', details: 'Currency exchange services', lastUpdated: '2 hours ago' },
      { id: 'a10', name: 'Porter Service', icon: 'Users', crowdLevel: 'medium', location: 'All Platform Entrances', details: 'Licensed porters in red uniforms', lastUpdated: '15 minutes ago' }
    ],
    ticketCounters: [
      {
        name: 'General Ticket Counter',
        currentQueue: {
          total: 35,
          averageWaitTime: '25 minutes',
          status: 'high',
          queuePercentage: 85,
          lastUpdated: '3 minutes ago'
        },
        services: ['Unreserved Tickets', 'Platform Tickets', 'Season Passes']
      },
      {
        name: 'Reservation Counter',
        currentQueue: {
          total: 20,
          averageWaitTime: '15 minutes',
          status: 'medium',
          queuePercentage: 60,
          lastUpdated: '5 minutes ago'
        },
        services: ['Reserved Tickets', 'Tatkal Booking', 'Cancellations']
      },
      {
        name: 'Premium Counter',
        currentQueue: {
          total: 8,
          averageWaitTime: '5 minutes',
          status: 'low',
          queuePercentage: 30,
          lastUpdated: '4 minutes ago'
        },
        services: ['Premium Tatkal', 'Foreign Tourist Booking', 'Senior Citizen Priority']
      }
    ],
    platforms: [
      {
        number: 1,
        currentTrain: {
          number: '12243',
          name: 'Chennai-Coimbatore Shatabdi Express',
          destination: 'Coimbatore',
          platform: 1,
          arrivalTime: '14:30',
          departureTime: '15:00',
          status: 'On Time',
          lastUpdated: '2 minutes ago'
        }
      },
      {
        number: 2,
        currentTrain: {
          number: '12658',
          name: 'Chennai-Bengaluru Mail',
          destination: 'Bengaluru',
          platform: 2,
          arrivalTime: '15:45',
          departureTime: '16:15',
          status: 'Delayed by 20 min',
          delay: 20,
          lastUpdated: '5 minutes ago'
        }
      },
      {
        number: 4,
        currentTrain: {
          number: '12839',
          name: 'Chennai-Howrah Mail',
          destination: 'Howrah',
          platform: 4,
          arrivalTime: '16:30',
          departureTime: '17:00',
          status: 'On Time',
          lastUpdated: '10 minutes ago'
        }
      }
    ],
    upcomingTrains: [
      { number: '12622', name: 'Tamil Nadu Express', destination: 'New Delhi', platform: 5, arrivalTime: '17:30', status: 'On Time', lastUpdated: '15 minutes ago' },
      { number: '16057', name: 'Saptagiri Express', destination: 'Tirupati', platform: 3, arrivalTime: '18:00', status: 'On Time', lastUpdated: '20 minutes ago' },
      { number: '12631', name: 'Chennai-Thiruvananthapuram Nellai Express', destination: 'Thiruvananthapuram', platform: 8, arrivalTime: '18:45', status: 'Delayed by 15 min', delay: 15, lastUpdated: '15 minutes ago' },
      { number: '12695', name: 'Chennai-Tuticorin Pearl City Express', destination: 'Tuticorin', platform: 6, arrivalTime: '19:15', status: 'On Time', lastUpdated: '30 minutes ago' }
    ]
  },
  'central': {
    id: 'central',
    name: 'Central Railway Station',
    code: 'CNT',
    city: 'Mumbai',
    state: 'Maharashtra',
    crowdLevel: 'medium',
    isFavorite: false,
    coordinates: {
      latitude: 18.9402,
      longitude: 72.8360
    },
    amenities: [
      { id: 'a1', name: 'Washrooms', icon: 'User', crowdLevel: 'low', location: 'Ground Floor, West Wing', details: 'Clean and well-maintained facilities', lastUpdated: '5 minutes ago' },
      { id: 'a2', name: 'Ticket Counter', icon: 'CreditCard', crowdLevel: 'high', location: 'Main Entrance', details: 'Multiple counters for different ticket types', lastUpdated: '10 minutes ago' },
      { id: 'a3', name: 'Waiting Room', icon: 'Clock', crowdLevel: 'medium', location: 'Platform 2', details: 'Comfortable seating, charging points available', lastUpdated: '15 minutes ago' },
      { id: 'a4', name: 'Luggage Room', icon: 'Package', crowdLevel: 'low', location: 'East Wing', details: 'Secure storage with 24/7 surveillance', lastUpdated: '20 minutes ago' },
      { id: 'a5', name: 'Food Court', icon: 'Coffee', crowdLevel: 'medium', location: 'Central Concourse', details: 'Multiple cuisine options', lastUpdated: '25 minutes ago' },
      { id: 'a6', name: 'Information', icon: 'Info', crowdLevel: 'low', location: 'Main Entrance', details: 'Multilingual staff available', lastUpdated: '30 minutes ago' },
      { id: 'a7', name: 'ATM', icon: 'CreditCard', crowdLevel: 'low', location: 'East Wing', details: '24/7 cash withdrawal', lastUpdated: '35 minutes ago' },
      { id: 'a8', name: 'Medical Room', icon: 'HelpCircle', crowdLevel: 'low', location: 'West Wing', details: 'First aid available', lastUpdated: '40 minutes ago' }
    ],
    ticketCounters: [
      {
        name: 'Counter A',
        currentQueue: {
          total: 25,
          averageWaitTime: '20 minutes',
          status: 'high',
          queuePercentage: 75,
          lastUpdated: '5 minutes ago'
        },
        services: ['General Tickets', 'Reservation', 'Cancellation']
      },
      {
        name: 'Counter B',
        currentQueue: {
          total: 10,
          averageWaitTime: '10 minutes',
          status: 'medium',
          queuePercentage: 40,
          lastUpdated: '10 minutes ago'
        },
        services: ['Express Tickets', 'Online Booking']
      }
    ],
    platforms: [
      {
        number: 1,
        currentTrain: {
          number: 'A123',
          name: 'Mumbai Express',
          destination: 'Mumbai',
          platform: 1,
          arrivalTime: '14:30',
          departureTime: '15:00',
          status: 'On Time',
          lastUpdated: '2 minutes ago'
        }
      },
      {
        number: 2,
        currentTrain: {
          number: 'B456',
          name: 'Delhi Rajdhani',
          destination: 'Delhi',
          platform: 2,
          arrivalTime: '15:45',
          departureTime: '16:15',
          status: 'Delayed by 15 min',
          delay: 15,
          lastUpdated: '5 minutes ago'
        }
      },
      {
        number: 3,
        currentTrain: {
          number: 'C789',
          name: 'Kolkata Mail',
          destination: 'Kolkata',
          platform: 3,
          arrivalTime: '16:30',
          departureTime: '17:00',
          status: 'On Time',
          lastUpdated: '10 minutes ago'
        }
      }
    ],
    upcomingTrains: [
      { number: 'D012', name: 'Chennai Express', destination: 'Chennai', platform: 1, arrivalTime: '17:00', status: 'On Time', lastUpdated: '15 minutes ago' },
      { number: 'E345', name: 'Bangalore Shatabdi', destination: 'Bangalore', platform: 2, arrivalTime: '17:30', status: 'On Time', lastUpdated: '20 minutes ago' },
      { number: 'F678', name: 'Hyderabad Special', destination: 'Hyderabad', platform: 3, arrivalTime: '18:15', status: 'On Time', lastUpdated: '25 minutes ago' }
    ]
  },
  'southern': {
    id: 'southern',
    name: 'Southern Railway Station',
    code: 'STH',
    city: 'Chennai',
    state: 'Tamil Nadu',
    crowdLevel: 'low',
    isFavorite: false,
    coordinates: {
      latitude: 13.0823,
      longitude: 80.2755
    },
    amenities: [
      { id: 'b1', name: 'Drinking Water', icon: 'Droplet', crowdLevel: 'low', location: 'Near Waiting Area', details: 'RO water purifiers', lastUpdated: '5 minutes ago' },
      { id: 'b2', name: 'Food Court', icon: 'Coffee', crowdLevel: 'medium', location: 'Central Concourse', details: 'Multiple cuisine options', lastUpdated: '10 minutes ago' },
      { id: 'b3', name: 'Information', icon: 'Info', crowdLevel: 'low', location: 'Main Entrance', details: 'Multilingual staff available', lastUpdated: '15 minutes ago' },
      { id: 'b4', name: 'ATM', icon: 'CreditCard', crowdLevel: 'low', location: 'East Wing', details: '24/7 cash withdrawal', lastUpdated: '20 minutes ago' },
      { id: 'b5', name: 'Medical Room', icon: 'HelpCircle', crowdLevel: 'low', location: 'West Wing', details: 'First aid available', lastUpdated: '25 minutes ago' },
      { id: 'b6', name: 'Ticket Counter', icon: 'CreditCard', crowdLevel: 'medium', location: 'Main Entrance', details: 'Multiple counters for different ticket types', lastUpdated: '30 minutes ago' },
      { id: 'b7', name: 'Waiting Room', icon: 'Clock', crowdLevel: 'low', location: 'Platform 1', details: 'Comfortable seating, charging points available', lastUpdated: '35 minutes ago' },
      { id: 'b8', name: 'Luggage Room', icon: 'Package', crowdLevel: 'low', location: 'East Wing', details: 'Secure storage with 24/7 surveillance', lastUpdated: '40 minutes ago' }
    ],
    ticketCounters: [
      {
        name: 'Counter X',
        currentQueue: {
          total: 15,
          averageWaitTime: '15 minutes',
          status: 'medium',
          queuePercentage: 50,
          lastUpdated: '5 minutes ago'
        },
        services: ['Local Tickets', 'Information']
      },
      {
        name: 'Counter Y',
        currentQueue: {
          total: 8,
          averageWaitTime: '8 minutes',
          status: 'low',
          queuePercentage: 30,
          lastUpdated: '10 minutes ago'
        },
        services: ['Express Tickets', 'Online Booking']
      }
    ],
    platforms: [
      {
        number: 1,
        currentTrain: {
          number: 'X456',
          name: 'Chennai Express',
          destination: 'Chennai',
          platform: 1,
          arrivalTime: '15:00',
          departureTime: '15:30',
          status: 'On Time',
          lastUpdated: '15 minutes ago'
        }
      },
      {
        number: 2,
        currentTrain: {
          number: 'Y789',
          name: 'Bangalore Shuttle',
          destination: 'Bangalore',
          platform: 2,
          arrivalTime: '16:00',
          departureTime: '16:30',
          status: 'On Time',
          lastUpdated: '20 minutes ago'
        }
      }
    ],
    upcomingTrains: [
      { number: 'Z012', name: 'Madurai Special', destination: 'Madurai', platform: 1, arrivalTime: '17:00', status: 'On Time', lastUpdated: '25 minutes ago' },
      { number: 'W345', name: 'Trivandrum Mail', destination: 'Trivandrum', platform: 2, arrivalTime: '18:30', status: 'On Time', lastUpdated: '30 minutes ago' }
    ]
  },
  'egmore': {
    id: 'egmore',
    name: 'Chennai Egmore Railway Station',
    code: 'MS',
    city: 'Chennai',
    state: 'Tamil Nadu',
    crowdLevel: 'medium',
    isFavorite: false,
    coordinates: {
      latitude: 13.0732,
      longitude: 80.2614
    },
    amenities: [
      { id: 'c1', name: 'Washrooms', icon: 'User', crowdLevel: 'medium', location: 'Near Platform 3', details: 'Clean facilities available', lastUpdated: '8 minutes ago' },
      { id: 'c2', name: 'Ticket Counter', icon: 'CreditCard', crowdLevel: 'medium', location: 'Main Hall', details: 'Multiple service counters', lastUpdated: '15 minutes ago' },
      { id: 'c3', name: 'Waiting Area', icon: 'Clock', crowdLevel: 'low', location: 'First Floor', details: 'Air-conditioned facility available', lastUpdated: '12 minutes ago' },
      { id: 'c4', name: 'Food Stalls', icon: 'Coffee', crowdLevel: 'medium', location: 'Opposite Platform 2', details: 'Various local and fast food options', lastUpdated: '20 minutes ago' }
    ],
    ticketCounters: [
      {
        name: 'General Counter',
        currentQueue: {
          total: 18,
          averageWaitTime: '15 minutes',
          status: 'medium',
          queuePercentage: 60,
          lastUpdated: '6 minutes ago'
        },
        services: ['General Tickets', 'Platform Tickets']
      }
    ],
    platforms: [
      {
        number: 1,
        currentTrain: {
          number: '16859',
          name: 'Chennai-Pondicherry Express',
          destination: 'Pondicherry',
          platform: 1,
          arrivalTime: '14:45',
          departureTime: '15:15',
          status: 'On Time',
          lastUpdated: '5 minutes ago'
        }
      }
    ],
    upcomingTrains: [
      { number: '12695', name: 'Chennai-Tuticorin Express', destination: 'Tuticorin', platform: 2, arrivalTime: '16:30', status: 'On Time', lastUpdated: '10 minutes ago' }
    ]
  }
};

export const navigationRoutes = {
  'chennai-central': [
    {
      id: 'chennai-central-ticket',
      name: 'To Ticket Counter',
      steps: [
        'Enter through the main entrance on EVR Periyar Salai',
        'Walk straight for 30 meters through the main hall',
        'Turn left at the information desk',
        'The ticket counters are arranged in parallel rows ahead'
      ],
      estimatedTime: '3 minutes',
      difficulty: 'Easy',
      waypoints: [
        { x: 25, y: 30, label: 'Main Entrance' },
        { x: 50, y: 30, label: 'Info Desk' },
        { x: 60, y: 50, label: 'Ticket Counter' }
      ]
    },
    {
      id: 'chennai-central-platform',
      name: 'To Platforms',
      steps: [
        'From the ticket hall, exit through the eastern side',
        'Walk through the security check area',
        'Follow the large central concourse straight ahead',
        'Platforms 1-6 are to your right, 7-12 to your left'
      ],
      estimatedTime: '4 minutes',
      difficulty: 'Medium',
      waypoints: [
        { x: 40, y: 40, label: 'Ticket Hall' },
        { x: 60, y: 40, label: 'Security Check' },
        { x: 70, y: 60, label: 'Platforms' }
      ]
    },
    {
      id: 'chennai-central-waiting',
      name: 'To Waiting Rooms',
      steps: [
        'From the main entrance hall, take the stairs or elevator to the first floor',
        'At the top, turn right and walk for 20 meters',
        'The AC waiting room is on your left',
        'The general waiting room is further ahead'
      ],
      estimatedTime: '5 minutes',
      difficulty: 'Medium',
      waypoints: [
        { x: 30, y: 30, label: 'Main Hall' },
        { x: 45, y: 45, label: 'Stairs/Elevator' },
        { x: 55, y: 35, label: 'Waiting Rooms' }
      ]
    },
    {
      id: 'chennai-central-washroom',
      name: 'To Washrooms',
      steps: [
        'From the main concourse, look for signs directing to washrooms',
        'The main washrooms are located near Platform 1 entrance',
        'Additional washrooms are available near Platform 6',
        'Follow the corridor to the end for the largest facilities'
      ],
      estimatedTime: '3 minutes',
      difficulty: 'Easy',
      waypoints: [
        { x: 35, y: 45, label: 'Concourse' },
        { x: 50, y: 60, label: 'Corridor' },
        { x: 65, y: 65, label: 'Washrooms' }
      ]
    }
  ],
  'central': [
    {
      id: 'central-ticket',
      name: 'To Ticket Counter',
      steps: [
        'Start from main entrance',
        'Walk straight for 20 meters',
        'Turn right at information desk',
        'Ticket counters are 10 meters ahead'
      ],
      estimatedTime: '2 minutes',
      difficulty: 'Easy',
      waypoints: [
        { x: 25, y: 30, label: 'Start' },
        { x: 50, y: 30, label: 'Info Desk' },
        { x: 60, y: 50, label: 'Ticket Counter' }
      ]
    },
    {
      id: 'central-platform',
      name: 'To Platforms',
      steps: [
        'Start from main hall',
        'Follow yellow line on floor',
        'Take escalator to upper level',
        'Platforms are located on level 2'
      ],
      estimatedTime: '3 minutes',
      difficulty: 'Medium',
      waypoints: [
        { x: 40, y: 40, label: 'Main Hall' },
        { x: 60, y: 40, label: 'Escalator' },
        { x: 70, y: 60, label: 'Platforms' }
      ]
    }
  ],
  'southern': [
    {
      id: 'southern-food',
      name: 'To Food Court',
      steps: [
        'Exit main entrance',
        'Walk left for 15 meters',
        'Enter central concourse',
        'Food court is on your right'
      ],
      estimatedTime: '2 minutes',
      difficulty: 'Easy',
      waypoints: [
        { x: 30, y: 40, label: 'Start' },
        { x: 40, y: 50, label: 'Concourse' },
        { x: 50, y: 60, label: 'Food Court' }
      ]
    },
    {
      id: 'southern-platform',
      name: 'To Platforms',
      steps: [
        'Start from ticket counter',
        'Walk straight for 30 meters',
        'Take stairs to level 1',
        'Platforms are straight ahead'
      ],
      estimatedTime: '3 minutes',
      difficulty: 'Medium',
      waypoints: [
        { x: 35, y: 45, label: 'Ticket Counter' },
        { x: 55, y: 45, label: 'Stairs' },
        { x: 65, y: 55, label: 'Platforms' }
      ]
    }
  ],
  'egmore': [
    {
      id: 'egmore-ticket',
      name: 'To Ticket Counter',
      steps: [
        'Enter the main station building',
        'Turn right at the information booth',
        'Proceed 15 meters ahead',
        'Ticket counters are in the large hall on your left'
      ],
      estimatedTime: '2 minutes',
      difficulty: 'Easy',
      waypoints: [
        { x: 25, y: 35, label: 'Entrance' },
        { x: 45, y: 35, label: 'Info Booth' },
        { x: 65, y: 45, label: 'Ticket Hall' }
      ]
    },
    {
      id: 'egmore-platform',
      name: 'To Platforms',
      steps: [
        'From the main hall, proceed to security check',
        'Show your ticket to the RPF personnel',
        'Follow the signs for respective platforms',
        'Use the foot overbridge to reach platforms 2-5'
      ],
      estimatedTime: '4 minutes',
      difficulty: 'Medium',
      waypoints: [
        { x: 30, y: 40, label: 'Main Hall' },
        { x: 50, y: 40, label: 'Security' },
        { x: 70, y: 60, label: 'Platforms' }
      ]
    }
  ]
};

export const notifications: Notification[] = [
  { id: '1', message: 'Train 12658 Chennai-Bengaluru Mail is delayed by 20 minutes', time: '5 minutes ago', isRead: false },
  { id: '2', message: 'Platform 4 is now changed to Platform 6 for Tamil Nadu Express', time: '15 minutes ago', isRead: false },
  { id: '3', message: 'General ticket counter queue has reduced to 10 minutes wait', time: '30 minutes ago', isRead: true },
  { id: '4', message: 'New food outlet opened near Platform 8', time: '2 hours ago', isRead: true }
];

export const getStationList = (): Station[] => {
  return Object.values(stationData);
};

export const getStation = (id: string): Station | undefined => {
  return stationData[id];
};

export const getRoutes = (stationId: string): any[] => {
  return navigationRoutes[stationId as keyof typeof navigationRoutes] || [];
};

// Calculate distance between two coordinates in kilometers
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Find nearest station based on coordinates
export const findNearestStation = (latitude: number, longitude: number): Station | null => {
  if (!latitude || !longitude) return null;

  let nearestStation: Station | null = null;
  let minDistance = Infinity;

  getStationList().forEach(station => {
    if (station.coordinates) {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        station.coordinates.latitude, 
        station.coordinates.longitude
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    }
  });

  return nearestStation;
};
 