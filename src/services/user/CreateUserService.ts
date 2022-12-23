import prismaClient from "../../prisma";
import { hash } from "bcryptjs";


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email,password}: UserRequest){
            
//Verficação do email

        if(!email){
            throw new Error('Email incorreto')
        }

        const userExistente = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userExistente){
            throw new Error("Usuário já existe")
        }


        const passwordHash = await hash(password, 8)
        
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                email: true,
                name: true
            }
       
        })
        
        return user;
    }
}

export {CreateUserService}