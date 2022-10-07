import NextAuth from  'next-auth'

import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export default  NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: 'NextAuth Credentials',
            credentials: {},
            async authorize(credentials) {

                console.log(credentials);
                // Here should be inserted the connection with backend,  set headers

                /**
                 *  await api.post('/signin', credentials)
                 *  api.headers('/signin', credentials)
                 */
                
                // Above is one fake mock of return of backend
                return {
                    name: 'Thiago Dias',
                    email: 'thiago.dias@ausy.pt',
                    image: 'https://github.com/thiagobmd.png'
                }
            }
        }),
    ],
    secret: process.env.SECRET
})