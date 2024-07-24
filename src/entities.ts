// file entities.ts
import { injectable, inject } from "inversify";
import { provide, buildProviderModule } from "inversify-binding-decorators";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";
import { TYPES } from "./types";
@injectable()
class Katana implements Weapon {
    public hit() {
        return "cut!";
    }
}
@injectable()
class Shuriken implements ThrowableWeapon {
    public throw() {
        return "hit!";
    }
}

@provide(ThrowableProxy)
class ThrowableProxy {
    private _shuriken: ThrowableWeapon;
    public constructor(
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
    ) {
        this._shuriken = shuriken;
    }

    public sneak() { return this._shuriken.throw(); }
}

@injectable()
class Ninja implements Warrior {
    private _katana: Weapon;
    private throwProxy: ThrowableProxy;
    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        throwProxy: ThrowableProxy
    ) {
        this._katana = katana;
        this.throwProxy = throwProxy;
    }
    public fight() { return this._katana.hit(); }
    public sneak() { return this.throwProxy.sneak(); }
}

export { Ninja, Katana, Shuriken };
