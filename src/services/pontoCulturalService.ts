import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar ponto cultural
export const create = async (data: any) => {
  const ponto = await prisma.pontoCultural.create({
    data: {
      nome: data.nome,
      descricao: data.descricao ?? null,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      usuario: data.usuarioId ? { connect: { id: Number(data.usuarioId) } } : undefined, // FK opcional via relation connect
    },
  });

  return ponto;
};

// Buscar todos os pontos culturais (inclui usuário básico e contagem de eventos)
export const getAll = async () => {
  return prisma.pontoCultural.findMany({
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      _count: {
        select: { eventos: true },
      },
    },
  });
};

// Buscar ponto por ID (inclui usuário e eventos)
export const getById = async (id: number) => {
  return prisma.pontoCultural.findUnique({
    where: { id },
    include: {
      usuario: {
        select: {
          id: true,
          nome: true,
          email: true,
        },
      },
      eventos: true,
    },
  });
};

// Atualizar ponto cultural
export const update = async (id: number, data: any) => {
  try {
    const updated = await prisma.pontoCultural.update({
      where: { id },
      data: {
        nome: data.nome ?? undefined,
        descricao: data.descricao ?? undefined,
        latitude: data.latitude !== undefined ? Number(data.latitude) : undefined,
        longitude: data.longitude !== undefined ? Number(data.longitude) : undefined,
        usuario: data.usuarioId !== undefined ? { connect: { id: Number(data.usuarioId) } } : undefined,
      },
    });
    return updated;
  } catch (error: any) {
    if (error.code === "P2025") return null;
    throw error;
  }
};

// Deletar ponto cultural
export const remove = async (id: number) => {
  try {
    await prisma.pontoCultural.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === "P2025") {
      const e: any = new Error("Ponto cultural não encontrado");
      e.code = "P2025";
      throw e;
    }
    throw error;
  }
};
