import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Criar usuário
export const create = async (data: any): Promise<any> => {
    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(data.senha, salt);

    const usuario = await prisma.usuario.create({
        data: {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            segmento_cultural: data.segmento_cultural,
            senha_hash,
        },
    });

    const { senha_hash: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
};

// Buscar todos os usuários
export const getAll = async () => {
    return prisma.usuario.findMany({
        select: { id: true, nome: true, email: true, segmento_cultural: true }
    });
};

// Buscar um usuário pelo ID
export const getById = async (id: number) => {
    return prisma.usuario.findUnique({
        where: { id },
        select: { id: true, nome: true, email: true, cpf: true, segmento_cultural: true }
    });
};

// Atualizar usuário
export const update = async (id: number, data: any): Promise<any> => {
    try {
        let dadosAtualizados: any = {
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            segmento_cultural: data.segmento_cultural,
        };

        // Se o usuário quiser alterar a senha
        if (data.senha) {
            const salt = await bcrypt.genSalt(10);
            dadosAtualizados.senha_hash = await bcrypt.hash(data.senha, salt);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id },
            data: dadosAtualizados,
        });

        const { senha_hash: _, ...usuarioSemSenha } = usuarioAtualizado;
        return usuarioSemSenha;

    } catch (error: any) {
        if (error.code === 'P2025') {
            return null; // usuário não encontrado
        }
        throw error;
    }
};

// Deletar usuário
export const remove = async (id: number): Promise<void> => {
    try {
        await prisma.usuario.delete({
            where: { id },
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new Error('Usuário não encontrado');
        }
        throw error;
    }
};
