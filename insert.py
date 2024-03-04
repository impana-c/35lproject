import csv
from pymongo import MongoClient

wantToReset = False
client = MongoClient('mongodb://localhost:27017/')
db = client['database'] 
collection = db['coffee_shops']
if wantToReset:
    collection.delete_many({})
    print("Collection cleared to insert more")

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
            'bathrooms': row['bathrooms'],
            'wifi':row['wifi'],
            'noise':row['noise'],
            'studyability':row['studyability'],
            'ratings': row['ratings']
        })

print("Data imported successfully into MongoDB.")
