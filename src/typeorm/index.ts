import { User } from 'src/typeorm/User';
import { SessionEntity } from 'src/typeorm/Session';

const entities = [User, SessionEntity];

export { User, SessionEntity };

export default entities;
