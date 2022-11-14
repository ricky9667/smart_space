import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime
import time
import json
import secrets
from pprint import pprint

KEY_PATH = './firebase.json'
COORDINATES_PATH = 'coordinates.json'
DATABASE_REFERENCE_PATH = 'datas/'
DATABASE_URL = 'https://smartspace-84906-default-rtdb.firebaseio.com/'

random = secrets.SystemRandom()

cred = credentials.Certificate(KEY_PATH)
firebase_admin.initialize_app(cred, {
        'databaseURL': DATABASE_URL
})

with open(COORDINATES_PATH) as json_file:
    coordinates_data = json.load(json_file)

used_coordinates_count = 0

def add(data):
    # timestamp = str(int(time.time() * 1000000))
    ref = db.reference(DATABASE_REFERENCE_PATH)
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
    ultraviolet = random.randrange(0, 11)
    air_temperature = random.uniform(20.0, 30.0)
    water_temperature = random.uniform(15.0, 30.0)
    water_depth = random.uniform(0, 1000)
    wind_direction = random.uniform(0, 360)
    wind_speed = random.uniform(0, 100)
    current_time = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    coordinate_data = {'latitude': latitude, 'longitude': longitude}
    ultraviolet_data = {'ultraviolet': ultraviolet, 'time': current_time}
    temperature_data = {'airTemperature': air_temperature, 'waterTemperature': water_temperature, 'time': current_time}
    water_depth_data = {'waterDepth': water_depth, 'time': current_time}
    wind_data = {'windDirection': wind_direction, 'windSpeed': wind_speed}

    return {'coordinateData': coordinate_data, 'ultravioletData': ultraviolet_data, 'temperatureData': temperature_data, 'waterDepthData': water_depth_data, 'windData': wind_data}

while True:
    add(create_data())
    time.sleep(1)

print('Done')
