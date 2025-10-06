import { Request, Response } from "express";
import * as pontoService from "../services/pontoCulturalService";

// Criar ponto cultural
export const createPonto = async (req: Request, res: Response) => {
  try {
    const ponto = await pontoService.create(req.body);
    return res.status(201).json(ponto);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Buscar todos os pontos culturais
export const getAllPontos = async (req: Request, res: Response) => {
  try {
    const pontos = await pontoService.getAll();
    return res.status(200).json(pontos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Buscar um ponto por ID
export const getPontoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const ponto = await pontoService.getById(id);
    if (!ponto) return res.status(404).json({ message: "Ponto cultural não encontrado" });
    return res.status(200).json(ponto);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Atualizar ponto cultural
export const updatePonto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const pontoAtualizado = await pontoService.update(id, req.body);

    if (!pontoAtualizado) {
      return res.status(404).json({ message: "Ponto cultural não encontrado" });
    }

    return res.status(200).json(pontoAtualizado);
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ message: "Ponto cultural não encontrado" });
    return res.status(400).json({ message: error.message });
  }
};

// Deletar ponto cultural
export const deletePonto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await pontoService.remove(id);
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ message: "Ponto cultural não encontrado" });
    return res.status(400).json({ message: error.message });
  }
};
