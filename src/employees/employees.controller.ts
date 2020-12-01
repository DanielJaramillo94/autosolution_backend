import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';
import { Logger} from '@nestjs/common';
import * as crypto from 'crypto';
import * as forge from 'node-forge';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAnmFkKq7CnYarrvP06e72WNqjR6VdeW0sJ+fLMMCD8JMfRQg3
8TkbArPw9dgAIXzLoiMlxmT3g166uD2hX1GxycOYHlsaRQkZA4FbVcmgPhDW/2KN
MR5SRewJevyF4glCXY6ijC1y4/iTIAe7v6p8sQn1Oxw6hzGGOaWKIgSMbdb6fuaa
2Ak5C8ifn8phHWAL9kXUhUihgn2yURp/wV7U34VZXk8U1O25K7wWsfRgf9nSYkhm
424UrJzwqthGiS3DErkdro+kaW06ik23h6w9j0M1+ZJr6MI7GiUWJ4efsOLWz+gv
cI46lYhHgU8Gb92P/QLRfKvR1tYtzjjg2nJORwIDAQABAoIBAAUsj1YpoWf+B0vO
4nhl+xxKAD2N9HDMFT40f1nXYDgSxlm9+/3gbLZ45G1ToiV16z0fwtMpZ0CebqEo
OkZf59v8jNKpDUGmG3AW4MH7tUVxzWRIdu5c3Dk2jdS7vS/2N3nQ+BR2Q6OY8k2A
kyyeyDYMajuFH5BdGNJ3SvzzgxbvetTcNJcbqsPRe9xpMDvxPNGECVhUZ0LLdAGu
0bzuJTErDbzVndUSFQoMaFz64aVlGU7JPtIHMZlNObBgwa7wJJan4XjfWIiZkXN4
r5cZ6yH3I09aXIH6JQgmQ85Oib2LBLITcel/NE0OwxTLfKgnL6TtFBedRZ+82ojg
GxKGMlECgYEAzSUtZKQ2oegStcYUfYvLzv24NxuaLITbQpw4efwdfec0pIZn8Fnn
6au81gRzrblUtbVmBCnwjCKL02wqploTOR8lH9Mjdd/l5QjQP58A8xLqVi2/vW1Z
cjwMC+GbNGMl3M0xmHieH9mH0C6ab1KZ71SPMv9mWXwuc7EgC+6r3v8CgYEAxaRz
VC1VxjExOpKuCiya9nQ0ynJwsCeEr+ZJR+w/xUu+9iRiss5+NGbVeTAp711UH62n
uULBX9OBCHyuky/2IGUdH5r+9y7DO43oty/fRqxhzx4BzxWTtZTipBd9NpA/hNII
BL2xeUh9R+gZsVffVROADV4juQpdzMyMs5rp2LkCgYBi5jhzG4PHHGXgwkTgncO8
366uypzSN56pBz1m+beSGiPT6YQ0aHOYwJXCK9VE/GMtUu2CtmFkfcchPzV0i1pX
IH+6TwT6b92aRFx5P4OqrATTVSzp+syzeOVp2PMFF4OKZlYxpny86BdEsyL65jyW
GBMNR/mkzGxslAjaF88+KwKBgQCNJH2/9Yg1u1eerrVfSq93pVE16jgTdIVLYLeg
h1SbPxamjSF29AQow+9bVkv8RrgWz1rh8IxMNK0HNJMvRacNR2he8791Io4F77fr
amKXA+/ti05bZttPZ33bFXM0DhtubNeRGy6soFnnihcfENPK29wsr7fvIzoNUV6B
vPWW8QKBgQCB+55vnoGT2k3Z59KcazHnrmgTf6sdS4Kc5rcksnpd4hVdKV/rtDxA
AdtzotIiGy2kG+HMbvkdq955iUVbL9dd6x0W47MxV2xayEDL7oPrP+CKluHlsMYL
4J6r9Y5+kno2OF1TvsaWFVHmZnID0pbByQjNQ5sAd/NVueZwnJDisg==
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmFkKq7CnYarrvP06e72
WNqjR6VdeW0sJ+fLMMCD8JMfRQg38TkbArPw9dgAIXzLoiMlxmT3g166uD2hX1Gx
ycOYHlsaRQkZA4FbVcmgPhDW/2KNMR5SRewJevyF4glCXY6ijC1y4/iTIAe7v6p8
sQn1Oxw6hzGGOaWKIgSMbdb6fuaa2Ak5C8ifn8phHWAL9kXUhUihgn2yURp/wV7U
34VZXk8U1O25K7wWsfRgf9nSYkhm424UrJzwqthGiS3DErkdro+kaW06ik23h6w9
j0M1+ZJr6MI7GiUWJ4efsOLWz+gvcI46lYhHgU8Gb92P/QLRfKvR1tYtzjjg2nJO
RwIDAQAB
-----END PUBLIC KEY-----`
        
@Controller('employees')
export class EmployeesController {    
    private readonly logger = new Logger(EmployeesController.name)
    constructor (private employeesService: EmployeesService) {}

    @Get('test')
    testCrypt() {
        console.log('OEEE')
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
        })
        console.log(
            publicKey.export({
                type: "pkcs1",
                format: "pem",
            }),
        
            privateKey.export({
                type: "pkcs1",
                format: "pem",
            })
        )
        const data = "my secret data";

        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(data)
        )

        console.log("encypted data: ", encryptedData.toString("base64"));

        const decryptedData = crypto.privateDecrypt(
            {
                key: privateKey,
                // In order to decrypt the data, we need to specify the
                // same hashing function and padding scheme that we used to
                // encrypt the data in the previous step
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            encryptedData
        )
        
        //console.log("decrypted data: ", decryptedData.toString())

        return decryptedData.toString()
        
    }

    @Post('tests')
    async login(@Body() login: any){            

        //const keypair = await this.encriptar();
        const encryptedEncodePass = login.password;

        console.log(login)
        console.log(login.password)

        const encryptedPass = forge.util.decode64(encryptedEncodePass)
        console.log(encryptedPass.trim())

        const priv = forge.pki.privateKeyFromPem(privateKey);

        const decryptedPass = priv.decrypt(encryptedPass.trim());

        console.log(decryptedPass)
        return 'Hola bolvi';
    }

    encriptar(): Promise<any> {
        return new Promise((f, r) => forge.pki.rsa.generateKeyPair(
            2048, (err, pair) => err ? r(err) : f(pair)))
            .then( (keypair: any) => {
                console.log("[Enc/Dec]");
                const priv = keypair.privateKey;
                const pub = keypair.publicKey;
                console.log('INICIO RRRRRRRRRRRRRRRRRRRRRRR')
                console.log(forge.pki.privateKeyToPem(priv))
                console.log('FIN Priv')
                console.log('')
                console.log('INICIO PUB')
                console.log(forge.pki.publicKeyToPem(pub))
                console.log('FIN PUB')
                const keyPub = forge.pki.publicKeyToPem(pub);
                const encrypted = pub.encrypt("Hello World!");
                console.log("encrypted:", forge.util.encode64(encrypted));
                
                const decrypted = priv.decrypt(encrypted);
                console.log("decrypted:", decrypted);
                return keypair;
            }).catch(err => console.log(err))
    }

    @Get()
    findAll() {
       return this.employeesService.query({filter:{}});
    }

    @Get(':email')
    async findByEmail(@Param('email') employeeEmail: string) {
        return await this.employeesService.findByEmail(employeeEmail);
    }

/*     @Get(':id')
    async findByIdentifier(@Param('id') employeeId: number) {
        return await this.employeesService.findByIdentifier(employeeId);
    } */

    @Post()
    async create(@Body() newEmployee: EmployeeDTO){
        return this.employeesService.create(newEmployee);
    }

    @Put(':id')
    async replace(@Param('id') employeeId: number, @Body() newEmployee: EmployeeDTO) {
        return this.employeesService.replace(employeeId, newEmployee);
    }

    @Delete(':id')
    async delete(@Param('id') employeeId) {
       return this.employeesService.deleteOne(employeeId);
    }    
}
