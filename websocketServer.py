import asyncio
import websockets
from datetime import datetime
import json

fname = ""

async def accept(websocket, path):
  while True:
    data = await websocket.recv()
    s = str(json.loads(data))
    print(s)
    fname = str(datetime.now())

    with open("./MockApp_RunData/"+fname+".json","w") as file:
      file.write(s)
      file.close()
    
    #if (s[:5] == "pose_"):
    #  fname = s
    #  #Create a file and save as
    #  with open(fname+".csv","w") as file:
    #    file.write(cols+"\n")
    #elif (s == "REC_STOP"):
    #  #Close the File
    #  print("End")
    #elif ((s != "REC_START") & (len(s) >= 20)):
    #  #Append to the file
    #  with open(fname+".csv","a") as file:
    #    file.write(s+"\n")

    # コンソールに出力
    #print("receive : " + str(data))
    ## クライアントでechoを付けて再送信する。
    #await websocket.send("echo : " + str(data))
# WebSocketサーバー生成。ホストはlocalhost、portは9998に生成する。
#start_server = websockets.serve(accept, "localhost", 8080)
#if gmc's ip changes, change this line "172.24.55.112" to a new value (can be obtained with ifconfig, 255 is for broadcast)
start_server = websockets.serve(accept, "172.24.55.112", 8080)
#start_server = websockets.serve(accept, "gmc.cps.akita-pu.ac.jp", 8080)
# 非同期でサーバを待機する。
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
