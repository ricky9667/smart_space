from abc import ABCMeta
from dataclasses import dataclass, asdict
from json import dumps, JSONEncoder

CoordinateRaw = tuple[tuple[float, float]]


@dataclass(frozen=True)
class JsonSerializable(JSONEncoder, metaclass=ABCMeta):
    @property
    def __dict__(self) -> dict:
        return asdict(self)

    @property
    def __json__(self) -> str:
        return dumps(self.__dict__)

    @property
    def to_json_serializable(self) -> dict:
        return self.__dict__

    def default(self, o):
        return o.__dict__

    def __str__(self) -> str:
        return self.__json__

    __slots__ = ()


@dataclass(frozen=True, order=True, repr=True)
class Coordinate(JsonSerializable):
    latitude: float
    longitude: float


@dataclass(frozen=True, order=True, repr=True)
class Ultraviolet(JsonSerializable):
    amount: float
    time: str


@dataclass(frozen=True, order=True, repr=True)
class Temperature(JsonSerializable):
    air: float
    water: float
    time: str


@dataclass(frozen=True, order=True, repr=True)
class WaterDepth(JsonSerializable):
    value: float
    time: str


@dataclass(frozen=True, order=True, repr=True)
class Wind(JsonSerializable):
    direction: float
    speed: float


@dataclass(frozen=True, order=True, repr=True)
class EnvData(JsonSerializable):
    coordinate: Coordinate
    ultraviolet: Ultraviolet
    temperature: Temperature
    water_depth: WaterDepth
    wind: Wind
