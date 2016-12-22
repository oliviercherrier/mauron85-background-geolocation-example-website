import {Path} from './path'

export class User{
    _id: String;
    first_name: String;
    last_name: String;
    nickname: String;
    email: String;
    phone_uuid: String;
    paths: Path[];
}

