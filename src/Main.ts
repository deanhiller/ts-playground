import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { Warrior } from "./interfaces";

console.log("dadsfasssssssd");

const ninja = myContainer.get<Warrior>(TYPES.Warrior);

const answer = ninja.sneak();

console.log("numbers2" + answer);
