import json
import csv
from pathlib import Path

PATH_DATA = Path(__file__).parent.resolve()
PATH_IN = PATH_DATA / 'main.csv'
PATH_OUT = PATH_DATA / 'main.json'

KEYS = [
    'Type', 'Temp', 'Size',
    'Flavour - Tea 1', 'Flavour - Tea 2', 'Flavour - Other',
    'Base - tea', 'Base - milk', 'Base - water',
    'Creamer', 'Decoration',
    'Sugar - 1', 'Sugar - 2',
    'Ice'
]

data = []

with open(PATH_IN, 'r') as f:
    reader = csv.reader(f, delimiter=';')

    # Header row
    next(reader)

    for row in reader:
        obj = {k: v for (k, v) in zip(KEYS, row)}
        data.append(obj)

with open(PATH_OUT, 'w') as f:
    f.write(json.dumps(data))
