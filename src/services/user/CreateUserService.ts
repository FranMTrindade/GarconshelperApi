import prismaClient from "../../prisma";


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

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: password,
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