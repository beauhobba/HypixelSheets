import requests

mojang_api = 'https://api.mojang.com/users/profiles/minecraft/'
hypixel_api = 'https://api.hypixel.net/skyblock/profiles'

username = 'nh3'
key = '3edf51b6-2d71-4d0e-bc9e-b0d8d595d41f'

def return_lapis_lazuli(username, key):
    response = requests.get(mojang_api+username)
    if(response.status_code != 200):
        return "Error: Mojang API Call"
    uuid = response.json()['id']; 
    
    response = requests.get(hypixel_api, params={'key': key, 'uuid':uuid})
    if(response.status_code != 200):
        return "Error: Hypixel API Call"
    try:
        lapis_count = response.json()["profiles"][1]["members"][uuid]["collection"]['INK_SACK:4'];
    except:
        return "Error: Returning Lapis Count"
    
    return "Lapis Count is: "+str(lapis_count)


print(return_lapis_lazuli(username, key))
