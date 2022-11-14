import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import random
import datetime
import time
import json
from pprint import pprint

KEY_PATH = './firebase.json'
DATABASE_URL = 'https://smartspace-84906-default-rtdb.firebaseio.com/'

cred = credentials.Certificate(KEY_PATH)
firebase_admin.initialize_app(cred, {
        'databaseURL': DATABASE_URL
})

with open('coordinates.json') as json_file:
    coordinates_data = json.load(json_file)

used_coordinates_count = 0

def add(data):
    # timestamp = str(int(time.time() * 1000000))
    ref = db.reference('datas/')
    ref.set(data)
    pprint('Send data to db: {}'.format(data))

def create_data():
    global used_coordinates_count
    try:
        coordinate = coordinates_data[used_coordinates_count]
        if used_coordinates_count == len(coordinates_data):
            used_coordinates_count = 0
        else:
            used_coordinates_count += 1
    except:
        used_coordinates_count = 0
        coordinate = coordinates_data[used_coordinates_count]

    latitude = coordinate[0]
    longitude = coordinate[1]
    ultraviolet = random.randint(0, 11)
    airTemperature = random.uniform(20.0, 30.0)
    waterTemperature = random.uniform(15.0, 30.0)
    waterDepth = random.uniform(0, 1000)
    windDirection = random.uniform(0, 360)
    windSpeed = random.uniform(0, 100)
    currentTime = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    coordinateData = {'latitude': latitude, 'longitude': longitude}
    ultravioletData = {'ultraviolet': ultraviolet, 'time': currentTime}
    temperatureData = {'airTemperature': airTemperature, 'waterTemperature': waterTemperature, 'time': currentTime}
    waterDepthData = {'waterDepth': waterDepth, 'time': currentTime}
    windData = {'windDirection': windDirection, 'windSpeed': windSpeed}

    return {'coordinateData': coordinateData, 'ultravioletData': ultravioletData, 'temperatureData': temperatureData, 'waterDepthData': waterDepthData, 'windData': windData}

while True:
    add(create_data())
    time.sleep(1)

print('Done')
