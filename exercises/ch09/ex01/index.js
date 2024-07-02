export class C {
  static method() { // C.method()
    return 1;
  }

  method() { //new C().mehtod()
    return 2;
  }

  static get C() { // 静的プロパティ
    return class { // クラス定義を返す
      static method() { // C.C.method()
        return 3;
      }

      method() { // C.C().method()
        return 4;
      }
    };
  }

  get C() { // インスタンスプロパティ
    return class { // クラス定義を返す
      static method() { // C().C.method()
        return 5;
      }

      method() { // C().C().method()
        return 6;
      }
    };
  }
}