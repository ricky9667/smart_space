from os import environ
from typing import Final

EXPECTED_GENERATED_ENV_DATA_AMOUNT: Final[int] = 100000

KEY_PATH: Final[str] = './firebase.json'
COORDINATES_PATH: Final[str] = 'coordinates.json'
DATABASE_REFERENCE_PATH: Final[str] = 'datas/'
DATABASE_URL: Final[str] = 'https://smartspace-84906-default-rtdb.firebaseio.com/'
K_DATA_UPDATE_INTERVAL: Final[str] = 'DATA_UPDATE_INTERVAL'
DEFAULT_DATA_UPDATE_INTERVAL_SEC: Final[float] = 1
DATA_UPDATE_INTERVAL_SEC: Final[float] = float(environ.get(K_DATA_UPDATE_INTERVAL, DEFAULT_DATA_UPDATE_INTERVAL_SEC))

"""Ranges of random values"""
ULTRAVIOLET_VALUE_RANGE: Final[range] = range(11)
AIR_TEMPERATURE_RANGE: Final[range] = range(20, 31)
WATER_TEMPERATURE_RANGE: Final[range] = range(15, 31)
WATER_DEPTH_RANGE: Final[range] = range(1000)
WIND_DIRECTION_RANGE: Final[range] = range(360)
WIND_SPEED_RANGE: Final[range] = range(100)
