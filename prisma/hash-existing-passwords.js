require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany()
    for (const user of users) {
        if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
            console.log(`User ${user.email} already hashed, skipping.`)
            continue
        }
        const hashed = await bcrypt.hash(user.password, 12)
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashed },
        })
        console.log(`Hashed password for ${user.email}`)
    }
    console.log('Done.')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
