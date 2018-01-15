import { auth, storage, database, firestore } from 'firebase'

const firebaseAuth = auth()

firebaseAuth.createUserWithEmailAndPassword('a', 'b').then(res => {

})

interface User {
    name: string
}
