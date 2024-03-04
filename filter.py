import csv
from pymongo import MongoClient

from math import radians, sin, cos, sqrt, atan2

client = MongoClient('mongodb://localhost:27017/')
db = client['database'] 
collection = db['coffee_shops'] 

noId = {"_id": 0}

def findByName(data, shopName):
    return data.find(
        {
            'name': shopName
        },
        noId
    )


def find_ratings_GT(data, num):
    return data.find({
        "averageRating": {"$gt" : num}
    }, noId)

def find_num_ratings_GT(data, num):
    return data.find({
        "numRatings": {"$gt": num}
    }, noId)

def find_cost_LT(data, num): 
    return data.find({

    })

def general_find(data, field, value, compare=None):
    if compare:
        result = data.find({
        field: {compare: value}
        }, noId)
    else:
        result = data.find({
            field: value
        }, noId)
    return result

def calculate_distance(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1 = 34.068920
    lon1 = -118.445183
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)
    
    # Radius of the Earth in kilometers
    R = 6371.0
    
    # Compute the change in coordinates
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    
    # Apply the Haversine formula
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    distance_miles = distance * 0.621371
    
    return distance_miles

def find_location(data, num):
    lat1 = 34.068920
    lon1 = -118.445183
    less = []
    result = data.find()
    for shop in result:
        lat2 = shop['location']['coordinates'][0]
        lon2 = shop['location']['coordinates'][1]
        distance_from = calculate_distance(lat1, lon1, lat2, lon2)
        if (distance_from <= num):
            less.append(shop)
    return less


if __name__ == "__main__":
    # Coordinates for New York City
    lat1, lon1 = 40.7128, -74.0060
    
    # Coordinates for Los Angeles
    lat2, lon2 = 34.0522, -118.2437
    
    # Calculate the distance
    distance = calculate_distance(lat1, lon1, lat2, lon2)
    
    print("The distance between New York City and Los Angeles is {:.2f} miles.".format(distance))        
    '''with open('data.csv', 'r') as csvfile:
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
            })'''

    for results in find_location(collection, 5):
        print(results)
    '''
    lat1, lon1 = 40.7128, -74.0060
        
    # Coordinates for Los Angeles
    lat2, lon2 = 34.0522, -118.2437

    # Calculate the distance
    distance = calculate_distance(lat1, lon1, lat2, lon2)

    print("The distance between New York City and Los Angeles is {:.2f} miles.".format(distance))
    for results in findByName(collection, "Ministry of Coffee"):
        print(results)
    print('\n')
    for results in findRatingsGT(collection, 3.6):
        print(results)
    print('\n')
    for results in findNumRatingsGT(collection, 700):
        print(results)

    print('\n')
    for results in generalFind(collection, 'numRatings', 700, '$gt'):
        print(results)'''