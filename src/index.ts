import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import multer from "multer"

// import http from "http";
import morganOptions from "./middleware/morgan";
import morgan from "morgan-body"
import logger from "./middleware/logger";
import health from "./middleware/health";
import version from "./middleware/version";
import connection from "./middleware/connection";
import ssl from "./middleware/ssl";
// import forceHttps from "./middleware/forcehttps";
import routes from "./routes";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Panama");

const app = express();
const upload = multer({
  dest: process.env.DEST_CEDULA_PATH
});

app.set('port', process.env.PORT || 3000)

// app.use(forceHttps);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


morgan(app, {
  noColors: true,
  stream: morganOptions.stream,
  skip: morganOptions.skip
});

app.use(health);
app.use(version);
app.use(connection)
app.use(upload.any());
app.use(ssl)
app.use('/api', routes);

//export html files from dist
app.use(express.static('client/dist', { maxAge: 0 }))
//seend index.html for all other requests
app.get('*', (_req, res) => {
  // check if request is to api
  if (_req.url.startsWith('/api')) {
    return res.status(404).json({ message: `Method not found ${_req.path}` })
  }

  //make that site dont save cache
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  res.sendFile('index.html', { root: 'client/dist' })
})

app.listen(app.get('port'), () => {
  logger.info(`Server is running on port ${app.get('port')}`)
})

