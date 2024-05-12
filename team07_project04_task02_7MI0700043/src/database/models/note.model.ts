import { model } from 'mongoose';
import { NoteSchema } from '../schemas/note.schema';

export const NoteModel = model("Note", NoteSchema);