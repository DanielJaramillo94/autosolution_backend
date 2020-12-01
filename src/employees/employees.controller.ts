import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';
import { Logger} from '@nestjs/common';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';

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
        
        console.log("decrypted data: ", decryptedData.toString())

        return decryptedData.toString()
        
    }

    @Post('tests')
    async login(@Body() login: any){
        const privateKey = `-----BEGIN RSA PRIVATE KEY-----
        MIIEogIBAAKCAQEAmbUxk0iPtrKMNR8Tkv4K0xFRsNACtZCclQ+1GMcP8t2+I7qC
        QWrSQIuDzvpQXHT7Z2MGLPFbDCD9lD8sfbHbTRxUjai93uN/w+L/qOY86c0gdRFd
        qO+XW1FjtHx+jaCaHXs4nHutzjfcBH0rXydzkuUUoTzdxuB4psJYAOnOh7xWQpzb
        R9w7FDAeBXQ8rNtgFHhe46SifO68G1y3Enbl2QBsITmz58UJE9Bsv7MFn2fnyVTU
        WwYpAYGcTlTXND0rZsr1/RPyTsx9pOdb5okxQx9kIP+8MUXhNBTW+VdT0cVkAPtg
        pMuROttyvL8JgLvIPXQjWcql25DsoSX3D9Ph5QIDAQABAoIBABa2/TWL0pkoN6oe
        BpGBc24PsCfWBaB5V3p70MJxoHy+oju7c0Zhl+Kr+3WZ7khLjV+Q9besj0zyjyba
        UyPcJdF2b1Rj7HNE4Xu8TxXRuIzAoJxMTbAKgC6hj397qmQZqMzUieAuMtg3zw7m
        xIMSXHUH342YZhne0FWsgL7ZzoimZOJBCOMjyjuNWZ5JXK2y243HBG3cRVrKjmcn
        TdRGX0tWcrEv6FYWGrJdM30d+aWfDVBRr3thf+Wpz6cQZ4iOMHRybuBkjQmAPJw+
        gGoDBNTDhEzAnAsd2b64KtBA+pzOUNh9swRvqZdEtZYB8nbIier6bvZFAPiwRNup
        hAqONZ0CgYEAyTzFdisOEwJg9PzZ0N41UNm7IQMC5zbcp9YWzX3K55eMS08BVxt/
        g5De0EhtdlUoqgD5vVCo8L6c9ZxPhYGvWow3UgS7WXPfSsyojrY5wKilcQX7Wk72
        demrcMpV8h+sqAqp5K11TLJF8UliQbUMPccGZd3w7W39dFcTsujbsccCgYEAw4lE
        PaTc0RjgtQEEfwWqz4lVsxwB40O/NS/YDxLGzqh+rI2+ajnSuvjqUdaTVKxR7lD8
        cKU0+2H1j0eFr8Wy0jzot/UwdgP+4Qyog77MEufPHScZZtWLy32I5IwAONzrW84t
        3bXfMCEeZ3LLEkNzrcoUIpiweqnBvSyx38/kzvMCgYBilAqG4IB8f2XPnS12S+QC
        PyaT/U2mxhFBhnaVI1IKMQrguUsGyMmmQYlkrpYwqXbKEMBGJQUdKcLp7jBmTikA
        Sj+vRfIg18pCcg8AGfQglHy26R9AFf5VtKnvDq8bdLi3eMHQ68fSUmJA2JnxZicg
        /CX+MMKdDIxkOWPE+JzmcQKBgGcujSMWVyvDu/fn1I6O2AbyCpYcRma9vi171MCH
        gP9WbJnzpjJ51tixNzz+RPqegBGJDN0IYL/yflkgPcx2P5mvaIKCURNFon7xZg83
        ZIrpZiKVGlNohn9X/B/WPNvEwDHOx+dB7MeCAoBGVCCMFYP0qdFjz2S7JbAE4Mwg
        8TW/AoGAVCeVYNYQHSkuWjJS0kLHHIx+NxIv0ifmiM3RxgYlf+yQ2lC0Jh5ERt3g
        Js3SHfks2n0p/2S4GyyYgjgyrcQL79C5Sh/qm3U1CmWRAKOmvm7WeEW/RugfcdQr
        BsjZemUZYp+Pu/Jhn9JYqCAKI/ayFPoFrUTOY0RhE728ZbAMBlM=
        -----END RSA PRIVATE KEY-----`

        const publicKey = `-----BEGIN RSA PUBLIC KEY-----
        MIIBCgKCAQEAmbUxk0iPtrKMNR8Tkv4K0xFRsNACtZCclQ+1GMcP8t2+I7qCQWrS
        QIuDzvpQXHT7Z2MGLPFbDCD9lD8sfbHbTRxUjai93uN/w+L/qOY86c0gdRFdqO+X
        W1FjtHx+jaCaHXs4nHutzjfcBH0rXydzkuUUoTzdxuB4psJYAOnOh7xWQpzbR9w7
        FDAeBXQ8rNtgFHhe46SifO68G1y3Enbl2QBsITmz58UJE9Bsv7MFn2fnyVTUWwYp
        AYGcTlTXND0rZsr1/RPyTsx9pOdb5okxQx9kIP+8MUXhNBTW+VdT0cVkAPtgpMuR
        OttyvL8JgLvIPXQjWcql25DsoSX3D9Ph5QIDAQAB
        -----END RSA PUBLIC KEY-----`
        
        // Decrypt
        const textoDesencriptado = CryptoJS.AES.decrypt(
            login.password, publicKey).toString(CryptoJS.enc.Utf8);
          console.log(textoDesencriptado)

        console.log(login)
        console.log(typeof(textoDesencriptado))
        console.log(login.password)
        return 'Hola bolvi';
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
