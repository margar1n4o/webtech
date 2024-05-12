import { Router } from 'express';
import mongoose from 'mongoose';
import  { NoteModel } from '../../database/models/note.model';

export const notesController = Router();

// Create note
notesController.post('/create', async (req, res) => {

    const newNote = new NoteModel({
        id: new mongoose.Types.ObjectId,
        title: req.body.title,
        content: req.body.description,
        status: req.body.status
    });

    const validation = newNote.validateSync();
    if (validation) {
        return res.status(400).json(validation);
    }

    if (!newNote.assignedTo && newNote.status !== "open") {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        await newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Get notes by status
notesController.get('/getByStatus/:status', async (req, res) => {
    try {
        const notes = await NoteModel.find({ status: req.params.status });
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Get all notes
notesController.get('/getAll', async (req, res) => {
    try {
        const notes = NoteModel.find();
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Delete note by id
notesController.delete('/deleteById/:id', async (req, res) => {
    try {
        const deletedNote = NoteModel.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedNote);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

notesController.patch('/updateStatusById/:id', async (req, res) => {
    try {
        const updateNote = await NoteModel.findByIdAndUpdate(req.params.id,
            { $set: { status: req.body.status, updateDate: new Date() }});
            return res.status(200).json(updateNote);
    } catch (error) {
        return res.status(404).json({ message: error });
    }
})

