import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Provider } from './providers.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  providersCollection: CollectionReference
  // userCollection: any

  constructor(
    public firestore: Firestore
  ) {
    this.providersCollection = collection(firestore, 'providers')
  }

  getProviders(): Observable<Provider[]> {
    return collectionData<Provider>(this.providersCollection);
  }

  addProvider(providerData: Provider): Observable<any> {
    const promise = addDoc(this.providersCollection, providerData).then(res => {
      res
    })
    return from(promise)
  }
}
