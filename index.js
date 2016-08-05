import server from './server';
import './lib/mongoose.js';
import { PORT } from './config';

server.listen(PORT, () => console.log(`Server start at ${PORT}`));
