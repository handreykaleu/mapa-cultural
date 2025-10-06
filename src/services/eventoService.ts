import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Criar evento
export const create = async (data: any) => {
  return prisma.evento.create({
    data: {
      nome: data.nome,
      descricao: data.descricao,
      data: new Date(data.data_inicio), // campo 'data' no schema  
      localId: data.localId,     // id do ponto cultural
    },
  });
};

// ✅ Buscar todos os eventos
export const getAll = async () => {
  return prisma.evento.findMany({
    include: {
      local: {
        select: {
          id: true,
          nome: true,
          descricao: true,
          latitude: true,
          longitude: true,
        },
      },
    },
  });
};

// ✅ Buscar evento por ID
export const getById = async (id: number) => {
  return prisma.evento.findUnique({
    where: { id },
    include: {
      local: {
        select: {
          id: true,
          nome: true,
          descricao: true,
        },
      },
    },
  });
};

// ✅ Atualizar evento
export const update = async (id: number, data: any) => {
  return prisma.evento.update({
    where: { id },
    data: {
      nome: data.nome,
      descricao: data.descricao,
      data: data.data ? new Date(data.data) : undefined,
      localId: data.localId,
    },
  });
};

// ✅ Deletar evento
export const remove = async (id: number) => {
  return prisma.evento.delete({
    where: { id },
  });
};
