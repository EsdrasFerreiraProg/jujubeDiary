import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

async function main() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

async function createUser(name: string, email: string, password: string){

    const saltRound = 20;

    bcrypt.hash(password, saltRound, async (err: any, hash: string) =>{

        if (err) {console.log (err)}

        await prisma.$connect()

        await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
                dairyPage: {},
            },
        }).then(()=>{
            return "User created successfully";
        }).catch((err : any) =>{
            return "An error occurred: " + err;
        })
    })

}

createUser("Jujuba", "jujuba@gmail.com", "123456")
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})


