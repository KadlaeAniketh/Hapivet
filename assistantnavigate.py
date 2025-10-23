import asyncio
import websockets
import json

async def handler(websocket):
    print("Client connected ✅")
    async for message in websocket:
        print(f"Received: {message}")

        msg = message.lower()
        if "home" in msg:
            page = "home"
        elif "schedule" in msg:
            page = "schedule"
        elif "inventory" in msg:
            page = "inventory"
        elif "patients" in msg:
            page = "patients"
        else:
            page = None

        if page:
            response = {"command": "navigate", "page": page}
            await websocket.send(json.dumps(response))
            print(f"Navigating to {page} page 🔄")

start_server = websockets.serve(handler, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
