import { Request, Response } from 'express';
import * as usuarioService from '../services/usuarioService';

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await usuarioService.create(req.body);
        res.status(201).json(usuario);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await usuarioService.getAll();
        res.status(200).json(usuarios);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.getById(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const usuarioAtualizado = await usuarioService.update(id, req.body);

        if (!usuarioAtualizado) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(usuarioAtualizado);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(400).json({ message: error.message });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await usuarioService.remove(id);
        res.status(204).send(); 
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(400).json({ message: error.message });
    }
};