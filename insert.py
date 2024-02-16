import csv
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['database'] 
collection = db['coffee_shops']  

with open('data.csv', 'r') as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        latitude = float(row['lat'])
        longitude = float(row['long'])
        
        collection.insert_one({
            'name': row['name'],
            'location': {
                'address': row['address'],
                'coordinates': [latitude, longitude] 
            },
            'averageRating': float(row['averageRating']),
            'numRatings': int(row['numRatings']),
            'cost': int(row['cost']),
            'features': row['features'],
            'ratings': row['ratings']
        })

print("Data imported successfully into MongoDB.")
