#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets
import ssl

from datetime import datetime

logging.basicConfig()
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

# Generate with Lets Encrypt, copied to this location, chown to current user and 400 permissions
ssl_cert = "/home/jo/ssl_pem/fullchain.pem"
ssl_key = "/home/jo/ssl_pem/privkey.pem"

ssl_context.load_cert_chain(ssl_cert, keyfile=ssl_key)

fname = ""
dir_name = "./MockApp_RunData/"

async def accept(websocket, path):
  while True:
    data = await websocket.recv()
    s = str(json.loads(data))
    print("Received data: ", s)
    fname = str(datetime.now())
    fname = fname.replace(" ", "-").replace(":", "-")

    with open(dir_name+fname+".json", "w") as file:
      file.write(s)
      print("Saved as: ", dir_name+fname)
      file.close()

      
#start_server = websockets.serve(accept, "0.0.0.0", 8080, ssl=ssl_context)
start_server = websockets.serve(accept, "140.227.201.242", 8080, ssl=ssl_context)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
