'use client';

import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils'

export type Network = 'mainnet' | 'sepolia'
type ApiPrefix = '/api' | '/apiMain'
type IndexApiPrefix = '/index' | '/indexMain'
export interface Store {
  network: Network
  apiPrefix: ApiPrefix
  indexApiPrefix: IndexApiPrefix
}

export const DefaultNetwork = 'sepolia'


export const store = proxy<Store>({
  network: DefaultNetwork,
  apiPrefix: '/api',
  indexApiPrefix: '/index'
});

subscribeKey(store, 'network', (v) => {
  if (v === 'mainnet') {
    store.apiPrefix = '/apiMain'
    store.indexApiPrefix = '/indexMain'
  } else {
    store.apiPrefix = '/api'
    store.indexApiPrefix = '/index'
  }
})

export const setNetwork = (u: Network) => {
  store.network = u
}