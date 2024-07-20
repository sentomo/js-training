// クラスを使った場合
export class WarriorClass {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

export class MagicWarriorClass extends WarriorClass {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// prototypeを使った場合
export function Warrior(atk) {
  this.atk = atk;
}

Warrior.prototype = { // prototype全体を上書きしてしまっているのNG Warrior.prototype.attack = { }としないといけない
  attack: function() { //constructorプロパティを前提にしたコードが入っていない　
    return this.atk * 2;
  }
}

export function MagicWarrior(atk, mgc) {
  Warrior.call(this, atk);
  this.mgc = mgc;
}

MagicWarrior.prototype = Object.create(Warrior.prototype); // Warriorを継承
MagicWarrior.prototype.attack = function() {
  return Warrior.prototype.attack.call(this) + this.mgc;
};

