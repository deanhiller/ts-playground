import { myContainer } from "./inversify.config";
import {injectable} from "inversify";
import {ThrowableWeapon, Warrior} from "./interfaces";
import {TYPES} from "./types";

@injectable()
class MockShurikan implements ThrowableWeapon {
    public throw() {
        return "testingThrow";
    }
}

myContainer.unbind(TYPES.ThrowableWeapon);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(MockShurikan);

const ninja = myContainer.get<Warrior>(TYPES.Warrior);

const answer = ninja.sneak();

console.log("numbers2" + answer);
