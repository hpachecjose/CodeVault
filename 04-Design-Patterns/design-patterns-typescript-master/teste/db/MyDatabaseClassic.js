class MyDatabaseClassic {
  static instance = null;
  users = [];

  constructor() {
    if (MyDatabaseClassic.instance) {
      return MyDatabaseClassic.instance;
    }
    MyDatabaseClassic.instance = this;
  }

  static getInstance() {
    if (MyDatabaseClassic.instance === null) {
      MyDatabaseClassic.instance = new MyDatabaseClassic();
    }
    return MyDatabaseClassic.instance;
  }

  add(user) {
    this.users.push(user);
  }

  remove(index) {
    this.users.splice(index, 1);
  }

  show() {
    this.users.forEach(user => console.log(user));
  }
}

const myDatabaseClassic = MyDatabaseClassic.getInstance();
myDatabaseClassic.add({ name: 'Luiz', age: 30 });
myDatabaseClassic.add({ name: 'Auiz', age: 3330 });
myDatabaseClassic.add({ name: 'Buiz', age: 3330 });
myDatabaseClassic.show();
