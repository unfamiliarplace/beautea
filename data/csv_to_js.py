import json
import csv
from pathlib import Path

PATH_DATA = Path(__file__).parent.resolve()
PATH_IN = PATH_DATA / 'main.csv'
PATH_OUT = PATH_DATA / 'drinkData.js'

RAISE_KEYS = [
    'name',
    'colour1', 'colour2'
]

KEYS = [
    'name', 'temp', 'size',
    'flavourTea1', 'flavourTea2', 'flavourOther',
    'baseTea', 'baseMilk', 'baseWater',
    'creamer', 'decoration',
    'sugar1', 'sugar2',
    'ice',
    'colour1', 'colour2'
    
    # 'Type', 'Temp', 'Size',
    # 'Flavour - Tea 1', 'Flavour - Tea 2', 'Flavour - Other',
    # 'Base - tea', 'Base - milk', 'Base - water',
    # 'Creamer', 'Decoration',
    # 'Sugar - 1', 'Sugar - 2',
    # 'Ice'
    # 'Colour - 1', 'Colour - 2'
    
]

data = []
obj_drink = {}
last_drink = ''

with open(PATH_IN, 'r') as f:
    reader = csv.reader(f, delimiter=';')

    # Header row
    next(reader)

    for row in reader:
        obj_variety = {k: v for (k, v) in zip(KEYS, row)}
        drink = obj_variety['name']

        if last_drink and (last_drink != drink):
            data.append(obj_drink)
            obj_drink = {}

        # First one...
        if not obj_drink:
            obj_drink = {'varieties': []}

            for key in RAISE_KEYS:
                obj_drink[key] = obj_variety[key]
                del obj_variety[key]

        obj_drink['varieties'].append(obj_variety)
        last_drink = drink
        
data.append(obj_drink)

with open(PATH_OUT, 'w') as f:
    f.write('const drinkData = ' + json.dumps(data))
