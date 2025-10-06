import { Request, Response } from "express";
import * as eventoService from "../services/eventoService";

// Criar evento
export const createEvento = async (req: Request, res: Response) => {
  try {
    const evento = await eventoService.create(req.body);
    res.status(201).json(evento);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Buscar todos os eventos
export const getAllEvento = async (req: Request, res: Response) => {
  try {
    const eventos = await eventoService.getAll();
    res.status(200).json(eventos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar evento por ID
export const getEventoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const evento = await eventoService.getById(id);
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.status(200).json(evento);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar evento
export const updateEvento = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const eventoAtualizado = await eventoService.update(id, req.body);

    if (!eventoAtualizado) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(200).json(eventoAtualizado);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.status(400).json({ message: error.message });
  }
};

// Deletar evento
export const deleteEvento = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await eventoService.remove(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Evento não encontrado" });
    }
    res.status(400).json({ message: error.message });
  }
};
