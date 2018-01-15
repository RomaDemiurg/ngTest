import { auth, storage, database, firestore } from 'firebase'

const firebaseAuth = auth()
const firebaseStorage = storage()

firebaseAuth.createUserWithEmailAndPassword('a', 'b').then(res => {

})

interface User {
    name: string
}
