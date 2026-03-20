export interface Airport {
  city: string;
  airport: string;
  code: string;
  country: string;
  searchText: string;
}

export const airports: Airport[] = [
  { city: 'Miami', airport: 'Miami International', code: 'MIA', country: 'USA', searchText: 'miami mia usa florida' },
  { city: 'Fort Lauderdale', airport: 'Fort Lauderdale-Hollywood', code: 'FLL', country: 'USA', searchText: 'fort lauderdale fll usa florida' },
  { city: 'New York', airport: 'John F. Kennedy', code: 'JFK', country: 'USA', searchText: 'new york jfk usa ny' },
  { city: 'New York', airport: 'LaGuardia', code: 'LGA', country: 'USA', searchText: 'new york laguardia lga usa ny' },
  { city: 'New York', airport: 'Newark Liberty', code: 'EWR', country: 'USA', searchText: 'new york newark ewr usa nj' },
  { city: 'Los Angeles', airport: 'Los Angeles International', code: 'LAX', country: 'USA', searchText: 'los angeles lax usa california' },
  { city: 'Atlanta', airport: 'Hartsfield-Jackson', code: 'ATL', country: 'USA', searchText: 'atlanta atl usa georgia' },
  { city: 'Chicago', airport: "O'Hare International", code: 'ORD', country: 'USA', searchText: 'chicago ohare ord usa illinois' },
  { city: 'Chicago', airport: 'Midway International', code: 'MDW', country: 'USA', searchText: 'chicago midway mdw usa illinois' },
  { city: 'Orlando', airport: 'Orlando International', code: 'MCO', country: 'USA', searchText: 'orlando mco usa florida' },
  { city: 'Las Vegas', airport: 'Harry Reid International', code: 'LAS', country: 'USA', searchText: 'las vegas las usa nevada' },
  { city: 'Boston', airport: 'Logan International', code: 'BOS', country: 'USA', searchText: 'boston logan bos usa massachusetts' },
  { city: 'Washington', airport: 'Dulles International', code: 'IAD', country: 'USA', searchText: 'washington dulles iad usa dc virginia' },
  { city: 'Washington', airport: 'Reagan National', code: 'DCA', country: 'USA', searchText: 'washington reagan dca usa dc virginia' },
  { city: 'Dallas', airport: 'Dallas/Fort Worth', code: 'DFW', country: 'USA', searchText: 'dallas fort worth dfw usa texas' },
  { city: 'Houston', airport: 'George Bush', code: 'IAH', country: 'USA', searchText: 'houston bush iah usa texas' },
  { city: 'San Francisco', airport: 'San Francisco International', code: 'SFO', country: 'USA', searchText: 'san francisco sfo usa california' },
  { city: 'Seattle', airport: 'Seattle-Tacoma', code: 'SEA', country: 'USA', searchText: 'seattle tacoma sea usa washington' },
  { city: 'Philadelphia', airport: 'Philadelphia International', code: 'PHL', country: 'USA', searchText: 'philadelphia phl usa pennsylvania' },
  { city: 'Phoenix', airport: 'Sky Harbor', code: 'PHX', country: 'USA', searchText: 'phoenix phx usa arizona' },
  { city: 'Denver', airport: 'Denver International', code: 'DEN', country: 'USA', searchText: 'denver den usa colorado' },
  { city: 'Detroit', airport: 'Detroit Metropolitan', code: 'DTW', country: 'USA', searchText: 'detroit dtw usa michigan' },
  { city: 'Minneapolis', airport: 'Minneapolis-St. Paul', code: 'MSP', country: 'USA', searchText: 'minneapolis st paul msp usa minnesota' },
  { city: 'Charlotte', airport: 'Charlotte Douglas', code: 'CLT', country: 'USA', searchText: 'charlotte clt usa north carolina' },
  { city: 'Toronto', airport: 'Pearson International', code: 'YYZ', country: 'Canada', searchText: 'toronto pearson yyz canada ontario' },
  { city: 'Vancouver', airport: 'Vancouver International', code: 'YVR', country: 'Canada', searchText: 'vancouver yvr canada british columbia' },
  { city: 'Montreal', airport: 'Montreal-Trudeau', code: 'YUL', country: 'Canada', searchText: 'montreal trudeau yul canada quebec' },
  { city: 'Kingston', airport: 'Norman Manley', code: 'KIN', country: 'Jamaica', searchText: 'kingston norman manley kin jamaica' },
  { city: 'Montego Bay', airport: 'Sangster International', code: 'MBJ', country: 'Jamaica', searchText: 'montego bay sangster mbj jamaica' },
  { city: 'London', airport: 'Heathrow', code: 'LHR', country: 'UK', searchText: 'london heathrow lhr uk england' },
  { city: 'London', airport: 'Gatwick', code: 'LGW', country: 'UK', searchText: 'london gatwick lgw uk england' },
  { city: 'Paris', airport: 'Charles de Gaulle', code: 'CDG', country: 'France', searchText: 'paris charles de gaulle cdg france' },
  { city: 'Frankfurt', airport: 'Frankfurt Airport', code: 'FRA', country: 'Germany', searchText: 'frankfurt fra germany' },
  { city: 'Amsterdam', airport: 'Schiphol', code: 'AMS', country: 'Netherlands', searchText: 'amsterdam schiphol ams netherlands' },
  { city: 'Dubai', airport: 'Dubai International', code: 'DXB', country: 'UAE', searchText: 'dubai dxb uae' },
  { city: 'Tokyo', airport: 'Narita', code: 'NRT', country: 'Japan', searchText: 'tokyo narita nrt japan' },
  { city: 'Tokyo', airport: 'Haneda', code: 'HND', country: 'Japan', searchText: 'tokyo haneda hnd japan' },
  { city: 'Hong Kong', airport: 'Hong Kong International', code: 'HKG', country: 'Hong Kong', searchText: 'hong kong hkg' },
  { city: 'Singapore', airport: 'Changi Airport', code: 'SIN', country: 'Singapore', searchText: 'singapore changi sin' },
  { city: 'Sydney', airport: 'Kingsford Smith', code: 'SYD', country: 'Australia', searchText: 'sydney syd australia' },
  { city: 'Melbourne', airport: 'Melbourne Airport', code: 'MEL', country: 'Australia', searchText: 'melbourne mel australia' },
  { city: 'Mexico City', airport: 'Mexico City International', code: 'MEX', country: 'Mexico', searchText: 'mexico city mex' },
  { city: 'Cancun', airport: 'Cancun International', code: 'CUN', country: 'Mexico', searchText: 'cancun cun mexico' },
  { city: 'Nassau', airport: 'Lynden Pindling', code: 'NAS', country: 'Bahamas', searchText: 'nassau nas bahamas' },
  { city: 'Bridgetown', airport: 'Grantley Adams', code: 'BGI', country: 'Barbados', searchText: 'bridgetown bgi barbados' },
  { city: 'Port of Spain', airport: 'Piarco International', code: 'POS', country: 'Trinidad', searchText: 'port of spain piarco pos trinidad' },
  { city: 'San Juan', airport: 'Luis Munoz Marin', code: 'SJU', country: 'Puerto Rico', searchText: 'san juan sju puerto rico' },
  { city: 'Punta Cana', airport: 'Punta Cana International', code: 'PUJ', country: 'Dominican Republic', searchText: 'punta cana puj dominican republic' },
  { city: 'Havana', airport: 'Jose Marti International', code: 'HAV', country: 'Cuba', searchText: 'havana hav cuba' },
  { city: 'Panama City', airport: 'Tocumen International', code: 'PTY', country: 'Panama', searchText: 'panama city tocumen pty panama' },
];

export const popularDestinations = [
  'MIA', 'FLL', 'JFK', 'ATL', 'ORD', 'LGA'
];
