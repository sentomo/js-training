// Animalクラス
class Animal {
  eat() {
    ...
  }
}

// SoundMakerクラス
class SoundMaker {
  makeSound() {
    ...
  }
}

// Dogクラス
class Dog extends Animal {
  constructor() {
    this.soundMaker = new SoundMaker();
  }

  bite() {
    ...
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// Huskyクラス
class Husky extends Dog {
  ...
}

// Catクラス
class Cat extends Animal {
  constructor() {
    this.soundMaker = new SoundMaker();
  }

  scratch() {
    ...
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// Birdクラス
class Bird extends Animal {
  constructor() {
    this.soundMaker = new SoundMaker();
  }

  fly() {
    ...
  }

  makeSound() {
    this.soundMaker.makeSound();
  }
}

// Fishクラス
class Fish extends Animal {
  swim() {
    ...
  }
}

