export default class User {
  id: string | null
  username: string | null
  authorized: boolean = false

  constructor(id: string | null, username: string | null, authorized: boolean) {
    this.id = id
    this.username = username
    this.authorized = authorized
  }
}
