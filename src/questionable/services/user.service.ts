import { Injectable } from '@angular/core'
import { Guid } from '../utilities'
import { UserSummary } from '../models/user'

@Injectable()
export class UserService {
    
    public isLoggedIn() {
        const token = this.getJwt()
        return token && this.VerifySigniture(token)
    }

    public LogIn(username: string, password: string) {
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        }

        const payload = {
            sub: username,
            name: 'Shiba Inu',
            title: 'Jr. Software Developer'
        }

        const signiture = { }

        let token = `${this.base64url(header)}.${this.base64url(payload)}.${this.base64url(signiture)}}`

        localStorage.setItem('user-token', token)
    }

    public VerifySigniture(token: string) {
        return true;
    }

    public getLoggedInUser(): UserSummary {
        if(!this.isLoggedIn())
            this.LogIn('1742c880-9507-4f62-bc11-36cc0ca94c09', '');

        const payload = this.getJetPayload()
        return <UserSummary> {
            id: payload.sub,
            fullname: 'Shiba Inu',
            title: 'Jr. Software Developer'
        }
    }

    private base64url(source: any) {
        return btoa(JSON.stringify(source))
            .replace(/=+$/, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
    }

    private base64UrlDecode(source: any) {
        return JSON.parse(atob(`${source}=`
            .replace(/\-/g, '+')
            .replace(/\_/g, '/')))
    }

    private getJwt() {
        return localStorage.getItem('user-token')
    }

    private getJetPayload(): any {
        const jwt = this.getJwt()
        const payloadEncoded = jwt.split('.')[1]
        return this.base64UrlDecode(payloadEncoded)
    }
}