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

with open('coords.json') as json_file:
    coords_data = json.load(json_file)

used_coords_count = 0

def add(data):
    # timestamp = str(int(time.time() * 1000000))
    ref = db.reference('datas/')
    ref.set(data)
    pprint('Send data to db: {}'.format(data))

def create_data():
    global used_coords_count
    pm25 = random.randint(20, 80)
    pm100 = random.randint(20, 80)
    o3 = random.randint(80, 130)
    so2 = random.randint(60, 90)
    no2 = random.randint(100, 120)
    co = random.randint(30, 50)
    temperature = random.uniform(20.0, 30.0)
    humidity = random.uniform(60.0, 70.0)
    uv = random.randint(0, 13)
    currentTime = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    try:
        coord = coords_data[used_coords_count]
        if used_coords_count == len(coords_data):
            used_coords_count = 0
        else:
            used_coords_count += 1
    except:
        used_coords_count = 0
        coord = coords_data[used_coords_count]

    return {'pm25': pm25, 'pm100': pm100, 'o3': o3, 'so2': so2, 'no2': no2, 'co': co, 'temperature': temperature, 'humidity': humidity, 'uv': uv, 'time': currentTime, 'coords': coord}

while True:
    add(create_data())
    time.sleep(1)

print('Done')
