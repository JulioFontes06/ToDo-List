import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

app.use(express.static("../public"))

httpServer.listen(5500)