import { doc, collection, setDoc, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './'
import { loadNotes } from '../../helpers/loadNotes'
import { fileUpload } from '../../helpers/fileUpload'



export const startNewNote = () => {
    return async (dispatch, getState) => {

        //TODO: tarea dispatch
        dispatch(savingNewNote())

        //uid
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes/`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        //!dispatch
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error("UID user doesn't exist")

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true }) //*Unión de campos que existen aquí pero no en la BD

        dispatch(updateNote(note))

    }
}

export const startUpLoadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())


        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }


        //!No se puede hacer  error map is not a function
        //! const fileUploadPromises = files.map((files)=>fileUpload(file))

        const photosUrl = await Promise.all(fileUploadPromises)


        dispatch(setPhotosToActiveNote(photosUrl))
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        const { active: note } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))
    }
}