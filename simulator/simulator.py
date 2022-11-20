import datetime
import json
import secrets
import time
from collections.abc import Iterator
from pprint import pprint
from random import SystemRandom
from typing import Final

from firebase_admin import credentials, db, initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin.db import Reference

from config import \
    COORDINATES_PATH, \
    DATABASE_REFERENCE_PATH, \
    DATABASE_URL, \
    KEY_PATH, \
    ULTRAVIOLET_VALUE_RANGE, \
    AIR_TEMPERATURE_RANGE, \
    WATER_TEMPERATURE_RANGE, \
    WATER_DEPTH_RANGE, \
    WIND_DIRECTION_RANGE, \
    WIND_SPEED_RANGE, \
    EXPECTED_GENERATED_ENV_DATA_AMOUNT
from models import Coordinate, Temperature, Ultraviolet, WaterDepth, Wind, EnvData, CoordinateRaw


def read_raw_coordinates_data() -> CoordinateRaw:
    with open(COORDINATES_PATH) as json_file:
        raw_coordinates_data: Final[CoordinateRaw] = json.load(json_file)

    return raw_coordinates_data


def insert_data(data: EnvData) -> None:
    ref: Final[Reference] = db.reference(DATABASE_REFERENCE_PATH)
    ref.set(data.to_json_serializable)
    pprint('Send data to db: {}'.format(data))


def env_data_generator(raw_coordinate_data: CoordinateRaw) -> Iterator[EnvData]:
    raw_data_length: Final[int] = len(raw_coordinate_data)
    random: Final[SystemRandom] = secrets.SystemRandom()
    current_index: int = 0

    while raw_data_length != 0:
        current_coordinates: [CoordinateRaw] = raw_coordinate_data[current_index % raw_data_length]
        current_index += 1

        current_time = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

        assert len(current_coordinates) == 2, 'Length of raw Coordinates must be 2'

        latitude = current_coordinates[0]
        longitude = current_coordinates[1]
        coordinate_data: Coordinate = Coordinate(latitude=latitude, longitude=longitude)

        ultraviolet_amount = random.randrange(ULTRAVIOLET_VALUE_RANGE.start, ULTRAVIOLET_VALUE_RANGE.stop)
        ultraviolet_data: Ultraviolet = Ultraviolet(amount=ultraviolet_amount, time=current_time)

        air_temperature = random.uniform(AIR_TEMPERATURE_RANGE.start, AIR_TEMPERATURE_RANGE.stop)
        water_temperature = random.uniform(WATER_TEMPERATURE_RANGE.start, WATER_TEMPERATURE_RANGE.stop)
        temperature_data: Temperature = Temperature(air=air_temperature, water=water_temperature, time=current_time)

        water_depth = random.uniform(WATER_DEPTH_RANGE.start, WATER_DEPTH_RANGE.stop)
        water_depth_data: WaterDepth = WaterDepth(value=water_depth, time=current_time)

        wind_direction = random.uniform(WIND_DIRECTION_RANGE.start, WIND_DIRECTION_RANGE.stop)
        wind_speed = random.uniform(WIND_SPEED_RANGE.start, WIND_SPEED_RANGE.stop)
        wind_data: Wind = Wind(direction=wind_direction, speed=wind_speed)

        yield EnvData(
            coordinate=coordinate_data,
            ultraviolet=ultraviolet_data,
            temperature=temperature_data,
            water_depth=water_depth_data,
            wind=wind_data
        )


def run_data_generation() -> None:
    generated_data_amount: int = 0
    raw_coordinates_data: Final[CoordinateRaw] = read_raw_coordinates_data()
    generator: Iterator[EnvData] = env_data_generator(raw_coordinates_data)

    while generated_data_amount < EXPECTED_GENERATED_ENV_DATA_AMOUNT:
        data: EnvData = next(generator)
        insert_data(data)
        generated_data_amount += 1
        time.sleep(1)


def init() -> None:
    cred: Final[Certificate] = credentials.Certificate(KEY_PATH)
    initialize_app(cred, {
        'databaseURL': DATABASE_URL
    })

    run_data_generation()


if __name__ == '__main__':
    init()
