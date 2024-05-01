import * as jose from "jose"

class JWT {

  static decodeToken(token: string) {
    return jose.decodeJwt(token)
  }

  static verifyValidToken(token: string): boolean {
    const exp = this.decodeToken(token).exp

    if(exp) {
      const tokenTime = new Date(exp * 1000)
      const currentTime = new Date()

      if(tokenTime < currentTime) {
        return false
      } else {
        return true
      }

    }

    return false

  }

}

export default JWT